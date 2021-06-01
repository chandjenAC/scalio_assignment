import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Box, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import SelectedMenuTitle from "../../components/billingApp/SelectedMenuTitle";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import SummaryContainer from "./SummaryContainer";
import InAppLayout from "../../layouts/InAppLayout";
import PerformanceContainer from "./PerformanceContainer";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import NotificationHeader from "../../components/billingApp/NotificationHeader";
import Notifications from "../../components/billingApp/Notifications";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getBillingProjectReminders } from "../../utils/getData";
import cloneDeep from "lodash/cloneDeep";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { format, parseISO } from "date-fns";
import { formatAmountByCcy } from "../../utils";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  summaryBox: {
    padding: "8px 8px 0px 8px",
    width: ({ notificationsCount }) =>
      notificationsCount > 0 ? "75%" : "100%",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("md")]: {
      width: "100% !important",
    },
  },
  notificationBox: {
    width: ({ notificationsCount }) => (notificationsCount > 0 ? "25%" : 0),
    backgroundColor: "#fafbfc",
    transition: "all 0.3s ease",
    [theme.breakpoints.down("md")]: {
      width: "0% !important",
    },
  },
  notificationCont: { padding: "0px 16px", height: "100%" },
  scrollCont: {
    position: "relative",
    minHeight: "50vh",
    maxHeight: "74vh",
    overflowY: "scroll",
  },
}));

const BillingHomeContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [notificationsCount, setNotificationsCount] = useState(0);

  const classes = useStyles({ notificationsCount });

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "BILLING", "Billing"),
        path: "/yogi-webb/billing",
      },
    ]);
  }, []);

  const {
    isLoading,
    status: notificationStatus,
    data: notificationsData,
  } = useQuery(
    ["billingService_billingProjectReminders"],
    getBillingProjectReminders,
    {
      onSuccess: (data) => {
        let notifications = [];
        let count = 0;
        if (data?.data?.[0]) {
          const {
            statementsRequiredApproval,
            statementsPastDue,
            contractsExpiringSoon,
          } = data.data[0];
          if (statementsRequiredApproval?.count > 0) {
            let statements = cloneDeep(statementsRequiredApproval.statements);
            if (statements.length > 2) {
              statements = statements.splice(0, 2);
            }
            statements.forEach((statement) => {
              notifications.push({
                client: statement.customerName,
                logoId: statement.logoId,
                customerTopId: statement.customerTopId,
                statementId: statement.statementId,
                title: getResourceValueByKey(
                  resource,
                  "BILLING_APPROVAL_REQUIRED",
                  "Billing Approval Required"
                ),
                caption: {
                  label: getResourceValueByKey(resource, "DUE:", "Due:"),
                  value: format(
                    new Date(parseISO(statement.dueDate)),
                    "MM/dd/yyyy"
                  ),
                },
                actionText: getResourceValueByKey(
                  resource,
                  "VIEW_BILL",
                  "View Bill"
                ),
                action: viewBill,
              });
              count++;
            });
          }
          if (statementsPastDue?.count > 0) {
            let statements = cloneDeep(statementsPastDue.statements);
            if (statements.length > 2) {
              statements = statements.splice(0, 2);
            }
            statements.forEach((statement) => {
              notifications.push({
                client: statement.customerName,
                logoId: statement.logoId,
                customerTopId: statement.customerTopId,
                statementId: statement.statementId,
                title: getResourceValueByKey(
                  resource,
                  "PAYMENT_PAST_DUE",
                  "Payment Past Due"
                ),
                caption: {
                  label: getResourceValueByKey(
                    resource,
                    "PAST_DUE:",
                    "Past Due:"
                  ),
                  value: `${differenceInCalendarDays(
                    new Date(parseISO(statement.dueDate)),
                    new Date()
                  )}d- ${formatAmountByCcy({
                    amount: statement.amount || 0,
                    ccy: statement.ccy,
                    minFractionDigits: 2,
                    maxFractionDigits: 2,
                    currencyDisplay: "code",
                    notation: "standard",
                  })}`,
                },
                actionText: getResourceValueByKey(
                  resource,
                  "VIEW_BILL",
                  "View Bill"
                ),
                action: viewBill,
              });
              count++;
            });
          }
          if (contractsExpiringSoon?.count > 0) {
            let contracts = cloneDeep(contractsExpiringSoon.contracts);
            if (contracts.length > 2) {
              contracts = contracts.splice(0, 2);
            }
            contracts.forEach((contract) => {
              notifications.push({
                client: contract.customerName,
                projectId: contract.id,
                logoId: contract.logoId,
                title: getResourceValueByKey(
                  resource,
                  "CONTRACT_EXPIRING_SOON",
                  "Contract Expiring Soon"
                ),
                caption: {
                  label: getResourceValueByKey(
                    resource,
                    "EXPIRES:",
                    "Expires:"
                  ),
                  value: format(
                    new Date(parseISO(contract.expiresOn)),
                    "MM/dd/yyyy"
                  ),
                },
                actionText: getResourceValueByKey(
                  resource,
                  "VIEW_CONTRACT",
                  "View Contract"
                ),
                action: viewContract,
              });
              count++;
            });
          }
          setNotifications(notifications);
          setNotificationsCount(count);
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const viewBill = (data) => {
    navigate(`/yogi-webb/billing//notifications/${data.statementId}`);
  };

  const viewContract = (data) => {
    navigate(`/yogi-webb/billing/admin/${data.projectId}`, {
      state: { projectIds: [data.projectId] },
    });
  };

  const getHeader = () => {
    return (
      <SelectedMenuTitle
        resource={resource}
        showNetworkOperator={true}
        hideCcyFilter={true}
        menuTitle={getResourceValueByKey(resource, "BILLING", "Billing")}
      />
    );
  };

  const getMainSection = () => {
    return (
      <Box display="flex" className={classes.flexCont}>
        <Box className={classes.summaryBox}>
          <SummaryContainer resource={resource} />
          <PerformanceContainer resource={resource} />
        </Box>

        <Box className={classes.notificationBox}>
          {notificationsCount > 0 && (
            <div className={classes.notificationCont}>
              <NotificationHeader
                resource={resource}
                notificationsCount={notificationsCount}
              />
              <div className={classes.scrollCont}>
                {isLoading ? (
                  <div className={classes.centerDiv}>
                    <Loader />
                  </div>
                ) : notificationStatus === "error" ? (
                  <div className={classes.centerDiv}>
                    <Typography color="error" variant="body1">
                      {getResourceValueByKey(
                        resource,
                        "SOMETHING_WENT_WRONG!",
                        "Something went wrong!"
                      )}
                    </Typography>
                  </div>
                ) : (
                  <Notifications
                    resource={resource}
                    notifications={notifications}
                  />
                )}
              </div>
            </div>
          )}
        </Box>
      </Box>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default BillingHomeContainer;
