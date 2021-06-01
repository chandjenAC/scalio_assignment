import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getBillingProjectReminders } from "../../utils/getData";
import { getBillingStatement } from "../../utils/getData";
import { useLocation, useParams } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import CustomerInfoCard from "../../components/billingApp/CustomerInfoCard";
import StatementHeader from "../../components/billingApp/StatementHeader";
import BillingCharges from "../../components/billingApp/BillingCharges";
import ActivityByClientContainer from "./ActivityByClientContainer";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import AddNoteAndLogPaymentContainer from "./AddNoteAndLogPaymentContainer";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import { updateInvoiceDetails, approveStatement } from "../../utils/getData";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles((theme) => ({
  title: { width: "100%" },
  mainCont: { padding: 12 },
  customerCardCont: { paddingLeft: 16 },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const RetrieveInvoiceContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const params = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const {
    selectedClient,
    selectedStatement,
    setSelectedStatement,
  } = useContext(BillingAppContext);

  const clientName =
    selectedClient?.customerName ||
    selectedStatement?.customerName ||
    selectedStatement?.billingDetails?.contactDetails?.emailId;

  const routedFromStatementMenuViewProfile =
    location.pathname.includes("statements") &&
    location.pathname.includes("profile");
  const routedFromActivityMenuViewProfile =
    location.pathname.includes("activity") &&
    location.pathname.includes("profile");
  const routedFromPendingApproval = location.pathname.includes(
    "pendingApproval"
  );
  const routedFromPastDue = location.pathname.includes("pastDue");
  const statementId = params.statementId;
  const clientTopId = params.clientTopId; // url param passed when called from ActivityAndStatementsTabsContainer which is being called from ActivityByClientContainer
  const projectId = params.projectId; // url param passed when called from ActivityAndStatementsTabsContainer

  const [viewBillingActivity, setViewBillingActivity] = useState(false);
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    if (clientTopId) {
      if (routedFromStatementMenuViewProfile) {
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
          {
            title: getResourceValueByKey(resource, "STATEMENT", "Statement"),
            path: `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}/statement/${statementId}`,
          },
        ]);
      } else if (routedFromActivityMenuViewProfile) {
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
          {
            title: getResourceValueByKey(resource, "STATEMENT", "Statement"),
            path: `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}/statement/${statementId}`,
          },
        ]);
      } else {
        setBreadcrumbs([
          {
            title: getResourceValueByKey(resource, "BILLING", "Billing"),
            path: "/yogi-webb/billing",
          },
          {
            title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
            path: `/yogi-webb/billing/statements`,
          },
          {
            title: getResourceValueByKey(resource, "CLIENT", "Client"),
            path: `/yogi-webb/billing/statements/${clientTopId}`,
          },
          {
            title: getResourceValueByKey(
              resource,
              "STATEMENT_INFO",
              "Statement Info"
            ),
            path: `/yogi-webb/billing/statements/${clientTopId}/${statementId}`,
          },
        ]);
      }
    } else if (routedFromPendingApproval) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "STATEMENTS", "Statments"),
          path: `/yogi-webb/billing/statements`,
        },
        {
          title: getResourceValueByKey(
            resource,
            "REQUIRING_APPROVAL",
            "Requiring Approval"
          ),
          path: `/yogi-webb/billing/statements/pendingApproval`,
        },
        {
          title: getResourceValueByKey(
            resource,
            "STATEMENT_INFO",
            "Statement Info"
          ),
          path: `/yogi-webb/billing/statements/pendingApproval/${statementId}`,
        },
      ]);
    } else if (routedFromPastDue) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "STATEMENTS", "Statments"),
          path: `/yogi-webb/billing/statements`,
        },
        {
          title: getResourceValueByKey(resource, "PAST_DUE", "Past Due"),
          path: `/yogi-webb/billing/statements/pastDue`,
        },
        {
          title: getResourceValueByKey(
            resource,
            "STATEMENT_INFO",
            "Statement Info"
          ),
          path: `/yogi-webb/billing/statements/pastDue/${statementId}`,
        },
      ]);
    } else if (projectId) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "CLIENT", "Client"),
          path: `/yogi-webb/billing/project/${projectId}`,
        },
        {
          title: getResourceValueByKey(resource, "STATEMENT", "Statement"),
          path: `/yogi-webb/billing/project/${projectId}/statement/${statementId}`,
        },
      ]);
    } else if (statementId) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "STATEMENT", "Statement"),
          path: `/yogi-webb/billing/notifications/${statementId}`,
        },
      ]);
    }
  }, []);

  const {
    isLoading,
    isFetching,
    error,
    data: statementData,
    refetch: refetchStatementData,
  } = useQuery(
    ["billingService_retrieveBillingStatement", statementId],
    getBillingStatement,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setSelectedStatement(data?.data);
      },
    }
  );

  const { refetch: refetchReminders } = useQuery(
    ["billingService_billingProjectReminders", statementId],
    getBillingProjectReminders,
    {
      onSuccess: (data) => {
        let reminders = [];
        if (data?.data?.[0]) {
          const {
            statementsRequiredApproval,
            statementsPastDue,
            contractsExpiringSoon,
          } = data.data[0];
          if (statementsRequiredApproval?.count > 0) {
            reminders.push(
              getResourceValueByKey(
                resource,
                "APPROVAL_PENDING_FOR_THE_CURRENT_STATEMENT!",
                "Approval pending for the current statement!"
              )
            );
          }
          if (statementsPastDue?.count > 0) {
            reminders.push(
              getResourceValueByKey(
                resource,
                "STATEMENT_IS_PAST_DUE!",
                "Statement is Past Due!"
              )
            );
          }
          if (contractsExpiringSoon?.count > 0) {
            reminders.push(
              getResourceValueByKey(
                resource,
                "CONTRACT_EXPIRING_SOON!",
                "Contract expiring soon!"
              )
            );
          }
          setReminders(reminders);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const [updateInvoiceDetailsMutation] = useMutation(updateInvoiceDetails, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      refetchStatementData();
    },
  });

  const [approveStatementMutation] = useMutation(approveStatement, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      refetchStatementData();
      refetchReminders();
    },
  });

  if (error) {
    return null;
  }

  const getHeader = () => {
    return (
      <Typography variant="h6" align="left" className={classes.title}>
        {clientName ? clientName : clientTopId}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <>
        {(isLoading || isFetching) && (
          <div className={classes.centerDiv}>
            <Loader />
          </div>
        )}
        {statementData?.data && (
          <Grid
            container
            alignItems="center"
            justify="space-evenly"
            className={classes.mainCont}
          >
            <Grid
              item
              xs={12}
              sm={5}
              md={4}
              lg={3}
              className={classes.customerCardCont}
            >
              <CustomerInfoCard
                resource={resource}
                selectedClient={
                  !isEmpty(selectedClient)
                    ? selectedClient
                    : statementData?.data
                }
              />
            </Grid>
            <Grid item xs={12} sm={7} md={8} lg={9}>
              <StatementHeader
                resource={resource}
                statementData={statementData.data}
                reminders={reminders}
                updateInvoiceDetailsMutation={updateInvoiceDetailsMutation}
                approveStatementMutation={approveStatementMutation}
              />
              <BillingCharges
                resource={resource}
                statementData={statementData.data}
                viewBillingActivity={viewBillingActivity}
                setViewBillingActivity={setViewBillingActivity}
                updateInvoiceDetailsMutation={updateInvoiceDetailsMutation}
              />
              <AddNoteAndLogPaymentContainer
                resource={resource}
                statementData={statementData.data}
                refetchStatementData={refetchStatementData}
              />
            </Grid>
          </Grid>
        )}
        {viewBillingActivity && (
          <ActivityByClientContainer
            hideActions={true}
            statementId={statementId}
            resource={resource}
            hideTitle={true}
            clientName={clientName}
            defaultFlag={false}
          />
        )}
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default RetrieveInvoiceContainer;
