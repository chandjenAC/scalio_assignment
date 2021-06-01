import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomerInfoCard from "../../components/billingApp/CustomerInfoCard";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { useSnackbar } from "notistack";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { makeStyles, Typography, Box, Grid } from "@material-ui/core";
import { getBillingProjectSummaryDetailBody } from "../../utils/getPayloads/billingAppPayloads";
import { getBillingProjectSummaryDetail } from "../../utils/getData";
import { useQuery } from "react-query";
import isEmpty from "lodash/isEmpty";
import BilledOsBalance from "../../components/billingApp/BilledOsBalance";
import PastDue from "../../components/billingApp/PastDue";
import LastVsCurrentBill from "../../components/billingApp/LastVsCurrentBill";
import TotalYtdRevenue from "../../components/billingApp/TotalYtdRevenue";
import ProgramType from "../../components/billingApp/ProgramType";
import FeeType from "../../components/billingApp/FeeType";
import InAppLayout from "../../layouts/InAppLayout";
import Loader from "../../components/common/atoms/Loaders/Loader";
import ActivityAndStatementTabsContainer from "./ActivityAndStatementTabsContainer";
import { viewOrDownloadFile } from "../../utils/viewOrDownloadFile";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    borderRadius: "25px 0px 0px 0px",
    margin: "auto",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  headerCont: {
    minHeight: "7vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0px 16px",
    borderBottom: "1px solid lightgrey",
  },
  scrollBox: { height: "80vh", overflowY: "auto", paddingBottom: 10 },
  mainCont: {
    padding: 16,
  },
  title: {
    width: "100%",
  },
  padding6: { padding: 6 },
  topCards: { padding: "3px 6px 3px 6px" },
  cardsCont: {
    padding: 0,
  },
  tableCont: {
    padding: "12px 20px",
    boxShadow: "2px 3px 10px -3px rgba(0,0,0,0.36)",
    margin: "0px 24px",
    borderRadius: 15,
    minHeight: 250,
  },
}));

const ViewProfileContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const { selectedClient, setSelectedClient } = useContext(BillingAppContext);

  const routedFromStatementMenu = location.pathname.includes("statements");
  const clientName = selectedClient?.customerName;
  const clientTopId = params.clientTopId; // url param passed when called from ActivityByClientContainer
  const projectId = params.projectId;

  useEffect(() => {
    if (clientTopId) {
      if (routedFromStatementMenu) {
        setBreadcrumbs([
          {
            title: getResourceValueByKey(resource, "BILLING", "Billing"),
            path: "/yogi-webb/billing",
          },
          {
            title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
            path: "/yogi-webb/billing/statements",
          },
          {
            title: getResourceValueByKey(resource, "CLIENT", "Client"),
            path: `/yogi-webb/billing/statements/${clientTopId}`,
          },
          {
            title: getResourceValueByKey(resource, "PROFILE", "Profile"),
            path: `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}`,
          },
        ]);
      } else {
        setBreadcrumbs([
          {
            title: getResourceValueByKey(resource, "BILLING", "Billing"),
            path: "/yogi-webb/billing",
          },
          {
            title: getResourceValueByKey(resource, "ACTIVITY", "Activity"),
            path: "/yogi-webb/billing/activity",
          },
          {
            title: getResourceValueByKey(resource, "CLIENT", "Client"),
            path: `/yogi-webb/billing/activity/${clientTopId}`,
          },
          {
            title: getResourceValueByKey(resource, "PROFILE", "Profile"),
            path: `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}`,
          },
        ]);
      }
    } else {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "CLIENT", "Client"),
          path: `/yogi-webb/billing/project/${projectId}`,
        },
      ]);
    }
  }, []);

  //this query will be changed to the new api to retrieve full profile details
  const { data: detailsData, isLoading, status } = useQuery(
    [
      "billingService_billingProjectSummary",
      getBillingProjectSummaryDetailBody(projectId),
    ],
    getBillingProjectSummaryDetail,
    {
      onSuccess: (data) => {
        if (isEmpty(selectedClient)) {
          setSelectedClient(data?.data);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const onClickDownloadIcon = () => {
    const fileId = detailsData?.data?.lastStatementDetails?.statementDocURL;
    const fileName =
      detailsData?.data?.lastStatementDetails?.statementReportReference;
    enqueueSnackbar(
      getResourceValueByKey(
        resource,
        "INITIALIZING_FILE_DOWNLOAD...",
        "Initiating file download..."
      ),
      { variant: "success" }
    );
    viewOrDownloadFile({
      id: fileId,
      name: fileName,
      viewOrDownloadKey: "download",
    });
  };

  const viewContract = (data) => {
    if (clientTopId) {
      if (routedFromStatementMenu) {
        navigate(
          `/yogi-webb/billing/statements/${clientTopId}/profile/${data.id}/contractDetails`
        );
      } else {
        navigate(
          `/yogi-webb/billing/activity/${clientTopId}/profile/${data.id}/contractDetails`
        );
      }
    } else {
      navigate(`/yogi-webb/billing/project/${data.id}/contractDetails`);
    }
  };

  const viewBillingStructure = (data) => {
    if (clientTopId) {
      if (routedFromStatementMenu) {
        navigate(
          `/yogi-webb/billing/statements/${clientTopId}/profile/${data.id}/billingStructure/${data.priceBookDetails.id}`
        );
      } else {
        navigate(
          `/yogi-webb/billing/activity/${clientTopId}/profile/${data.id}/billingStructure/${data.priceBookDetails.id}`
        );
      }
    } else {
      navigate(
        `/yogi-webb/billing/project/${data.id}/billingStructure/${data.priceBookDetails.id}`
      );
    }
  };

  const getHeader = () => {
    return (
      <Typography
        variant="h6"
        color="textSecondary"
        align="left"
        className={classes.title}
      >
        {clientName || clientTopId}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      detailsData?.data && (
        <>
          <Grid container className={classes.mainCont}>
            <Grid
              item
              className={classes.padding6}
              xs={12}
              sm={12}
              md={4}
              lg={3}
            >
              <CustomerInfoCard
                resource={resource}
                selectedClient={detailsData?.data}
              />
            </Grid>
            <Grid
              item
              className={classes.padding6}
              xs={12}
              sm={12}
              md={8}
              lg={9}
            >
              <Grid container className={classes.cardsCont}>
                <Grid
                  item
                  className={classes.topCards}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                >
                  <BilledOsBalance
                    resource={resource}
                    data={detailsData?.data}
                    onClickDownloadIcon={onClickDownloadIcon}
                  />
                </Grid>
                {detailsData?.data?.pastDueGroups && (
                  <Grid
                    item
                    className={classes.topCards}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <PastDue
                      resource={resource}
                      data={detailsData?.data?.pastDueGroups}
                    />
                  </Grid>
                )}
                <Grid
                  item
                  className={classes.topCards}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                >
                  <LastVsCurrentBill
                    resource={resource}
                    data={detailsData?.data}
                  />
                </Grid>
                <Grid
                  item
                  className={classes.topCards}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                >
                  <TotalYtdRevenue
                    resource={resource}
                    data={detailsData?.data}
                    viewContract={viewContract}
                    viewBillingStructure={viewBillingStructure}
                  />
                </Grid>
                {detailsData?.data?.totalFeeYTDTypes?.length > 0 && (
                  <Grid
                    item
                    className={classes.topCards}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <ProgramType resource={resource} data={detailsData?.data} />
                  </Grid>
                )}
                {detailsData?.data?.totalFeeYTDTypes?.length > 0 && (
                  <Grid
                    item
                    className={classes.topCards}
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
                  >
                    <FeeType resource={resource} data={detailsData?.data} />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Box className={classes.tableCont}>
            <ActivityAndStatementTabsContainer
              resource={resource}
              selectedClient={detailsData?.data}
              defaultFlag={true}
            />
          </Box>
        </>
      )
    );
  };

  if (isLoading) {
    return (
      <div className={classes.centerDiv}>
        <Loader />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={classes.centerDiv}>
        <Typography color="error" variant="body1">
          {getResourceValueByKey(
            resource,
            "SOMETHING_WENT_WRONG!",
            "Something went wrong!"
          )}
        </Typography>
      </div>
    );
  }

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default ViewProfileContainer;
