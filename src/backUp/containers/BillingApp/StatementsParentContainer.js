import React, { useContext, useEffect, useState } from "react";
import { Box, Grid } from "@material-ui/core";
import { makeStyles, Typography } from "@material-ui/core";
import { getBillingProjectReminders } from "../../utils/getData";
import { getBillingProjectSummary } from "../../utils/getData";
import { useQuery } from "react-query";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import ActivityFilters from "../../components/billingApp/ActivityFilters";
import ClientCarousel from "../../components/billingApp/ClientCarousel";
import { useNavigate } from "react-router-dom";
import ReminderCard from "../../components/billingApp/ReminderCard";
import { ReactComponent as SignatureIcon } from "../../images/common/signature.svg";
import { ReactComponent as StatementIcon } from "../../images/common/statement.svg";
import { ReactComponent as CalendarIcon } from "../../images/common/calendar.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrow from "../../components/common/atoms/CarouselCustomArrows/CustomLeftArrow";
import CustomRightArrow from "../../components/common/atoms/CarouselCustomArrows/CustomRightArrow";
import { reminderCardsBreakpoints } from "../../utils/constants";
import SelectedMenuTitle from "../../components/billingApp/SelectedMenuTitle";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import { getBillingProjectSummaryBody } from "../../utils/getPayloads/billingAppPayloads";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  filtersCont: { padding: "12px 0px" },
  clientCarouselCont: { minHeight: 250, position: "relative" },
  remindersCont: { paddingTop: 12 },
  reminderCardsBox: {
    position: "relative",
    display: "grid",
    marginTop: 10,
    minHeight: 250,
  },
  favIconDiv: {
    position: "absolute",
    width: 24,
    height: "auto",
    color: "#faf600",
    top: 6,
    right: 6,
  },
}));

const StatementsParentContainer = (props) => {
  const { resource } = props;
  const classes = useStyles();
  const navigate = useNavigate();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const { setSelectedClient } = useContext(BillingAppContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "BILLING", "Billing"),
        path: "/yogi-webb/billing",
      },
      {
        title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
        path: "/yogi-webb/billing/statements",
      },
    ]);
  }, []);

  const [reminders, setReminders] = useState([]);
  const [activeFilters, setActiveFilters] = useState({
    client: { label: "", value: "" },
    txnEvent: "",
    txnType: "",
    txnDate: "",
  });

  const {
    isLoading,
    error,
    data: projectSummary,
    refetch: refetchProjectSummary,
  } = useQuery(
    [
      "billingService_billingProjectSummary",
      getBillingProjectSummaryBody(activeFilters),
    ],
    getBillingProjectSummary,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: isLoadingReminders, error: isErrorReminders } = useQuery(
    ["billingService_billingProjectReminders"],
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
            reminders.push({
              title: getResourceValueByKey(
                resource,
                "STATEMENTS_REQUIRING_APPROVAL",
                "Statement Requiring Approval"
              ),
              count: statementsRequiredApproval.count,
              icon: StatementIcon,
              caption1: "",
              caption2:
                statementsRequiredApproval.clients.length > 1
                  ? getResourceValueByKey(
                      resource,
                      "MULTIPLE_CLIENTS",
                      "Multiple Clients"
                    )
                  : `${getResourceValueByKey(
                      resource,
                      "1_CLIENT_-",
                      "1 Client -"
                    )} ${statementsRequiredApproval.clients[0].customerName}`,
            });
          }
          if (statementsPastDue?.count > 0) {
            reminders.push({
              title: getResourceValueByKey(
                resource,
                "STATEMENTS_PAST_DUE",
                "Statements Past Due"
              ),
              count: statementsPastDue.count,
              icon: CalendarIcon,
              caption1: `${
                statementsPastDue.clients.length
              } ${getResourceValueByKey(
                resource,
                "CLIENTS",
                "Clients"
              )} | ${getResourceValueByKey(
                resource,
                "AVG.",
                "Avg."
              )} ${statementsPastDue?.averageDueDate ||
                30} ${getResourceValueByKey(resource, "DAYS", "Days")}`,
              caption2:
                statementsPastDue.ccys.length > 1
                  ? getResourceValueByKey(
                      resource,
                      "MULTIPLE_CCY",
                      "Multiple CCY"
                    )
                  : `${getResourceValueByKey(resource, "1_CCY_-", "1 CCY -")} ${
                      statementsPastDue.ccys[0]
                    }`,
            });
          }
          if (contractsExpiringSoon?.count > 0) {
            let projectIds = [];
            contractsExpiringSoon.contracts.forEach((contract) =>
              projectIds.push(contract.id)
            );
            reminders.push({
              title: getResourceValueByKey(
                resource,
                "CONTRACT_EXPIRING_SOON",
                "Contract Expiring Soon"
              ),
              count: contractsExpiringSoon.count,
              projectIds: projectIds,
              icon: SignatureIcon,
              caption1: getResourceValueByKey(
                resource,
                "WITHIN_30_DAYS",
                "Within 30 Days"
              ),
              caption2: `${
                contractsExpiringSoon?.contracts?.length
              } ${getResourceValueByKey(resource, "CLIENTS", "Clients")}`,
            });
          }
          setReminders(reminders);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const handleApplyClientFilter = (client) => {
    setActiveFilters({ ...activeFilters, client: client });
  };

  const handleClearClientFilter = () => {
    setActiveFilters({ ...activeFilters, client: { label: "", value: "" } });
  };

  const handleApplyTxnDateFilter = (txnDate) => {
    setActiveFilters({ ...activeFilters, txnDate: txnDate });
  };

  const handleClearTxnDateFilter = () => {
    setActiveFilters({ ...activeFilters, txnDate: "" });
  };

  const onClickReminderCard = (data) => {
    if (data.title === "Statements Requiring Approval") {
      navigate("pendingApproval");
    } else if (data.title === "Contract Expiring Soon") {
      navigate("contractsExpiringSoon", {
        state: { projectIds: data.projectIds },
      });
    } else if (data.title === "Statements Past Due") {
      navigate("pastDue");
    }
  };

  const onClickLogIt = () => {
    navigate("logPayment");
  };

  const onSelectCard = (item) => {
    setSelectedClient(item);
    navigate(`${item.customerTopId}`);
  };

  if (error || isErrorReminders) {
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

  const getHeader = () => {
    return (
      <SelectedMenuTitle
        resource={resource}
        menuTitle={getResourceValueByKey(
          resource,
          "BILLING_STATEMENTS",
          "Billing Statements"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <>
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.filtersCont}
        >
          <Grid item>
            <Typography variant="h6">
              {getResourceValueByKey(resource, "CLIENT", "Client")}
            </Typography>
          </Grid>
          <Grid item>
            <ActivityFilters
              resource={resource}
              activeFilters={activeFilters}
              handleApplyClientFilter={handleApplyClientFilter}
              handleClearClientFilter={handleClearClientFilter}
              handleApplyTxnDateFilter={handleApplyTxnDateFilter}
              handleClearTxnDateFilter={handleClearTxnDateFilter}
            />
          </Grid>
        </Grid>
        <div className={classes.clientCarouselCont}>
          {isLoading ? (
            <div className={classes.centerDiv}>
              <Loader />
            </div>
          ) : (
            <ClientCarousel
              resource={resource}
              activeView={"Statements Home"}
              projectSummary={projectSummary}
              refetchProjectSummary={refetchProjectSummary}
              onSelectCard={onSelectCard}
              onClickLogIt={onClickLogIt}
            />
          )}
        </div>
        <Box className={classes.remindersCont}>
          <Typography variant="h6" align="left">
            {getResourceValueByKey(resource, "REMINDERS", "Reminders")}
          </Typography>
          <Box className={classes.reminderCardsBox}>
            {isLoadingReminders ? (
              <div className={classes.centerDiv}>
                <Loader />
              </div>
            ) : (
              <Carousel
                responsive={reminderCardsBreakpoints}
                customLeftArrow={<CustomLeftArrow arrowColor={"gradient"} />}
                customRightArrow={<CustomRightArrow arrowColor={"gradient"} />}
              >
                {reminders.map((data, index) => {
                  return (
                    <ReminderCard
                      key={index}
                      resource={resource}
                      data={data}
                      onClick={onClickReminderCard}
                    />
                  );
                })}
              </Carousel>
            )}
          </Box>
        </Box>
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default StatementsParentContainer;
