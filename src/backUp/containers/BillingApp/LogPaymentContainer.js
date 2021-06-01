import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import SelectedMenuTitle from "../../components/billingApp/SelectedMenuTitle";
import InAppLayout from "../../layouts/InAppLayout";
import PaymentLog from "../../components/billingApp/PaymentLog";
import cloneDeep from "lodash/cloneDeep";
import { format } from "date-fns";
import { useMutation } from "react-query";
import { logPaymentBatch } from "../../utils/getData";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import Loader from "../../components/common/atoms/Loaders/Loader";
import TitleWithEditActions from "../../components/common/molecules/TitleWithEditActions";
import TableTitle from "../../components/common/molecules/TableTitle";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  logsContainer: { padding: "16px 30px", position: "relative" },
  tableItem: {
    display: "grid",
    placeItems: "center",
    border: "1px solid lightgrey",
    minHeight: 75,
    borderRadius: 5,
    margin: "8px 0px 4px 0px",
  },
}));

const LogPaymentContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [paymentLogs, setPaymentLogs] = useState([]);

  const [logPaymentBatchMutation, mutationStatus] = useMutation(
    logPaymentBatch,
    {
      onSuccess: (response) => {
        renderSnackbar(enqueueSnackbar, response);
        setPaymentLogs([]);
      },
    }
  );

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
      {
        title: getResourceValueByKey(resource, "LOG_PAYMENT", "Log Payment"),
        path: "/yogi-webb/billing/statements/payments",
      },
    ]);
  }, []);

  const onAddIconClick = () => {
    if (paymentLogs[paymentLogs.length - 1]?.id || paymentLogs.length === 0) {
      const userInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
      const userEmail = userInfo?.loginProfile?.userProfile?.emailId;
      let newRow = {
        id: "", // statementId
        statementDetails: {
          // statementDetails is not sent in payload..just for UI
          amount: 0,
          ccy: "",
          dueDate: null,
        },
        client: {
          // client is not sent in payload..just for UI
          id: "",
          name: "",
        },
        invoiceNumber: "", //not required in payload
        paidStatus: "",
        paidAmount: {
          ccy: "",
          value: 0,
        },
        paymentDate: format(new Date(), "yyyyMMdd"),
        paymentDetails: {
          addedBy: userEmail,
          addedOn: new Date().toISOString(),
        },
      };
      setPaymentLogs((prevState) => [...prevState, newRow]);
    }
  };

  const handleSelectRow = (e, index) => {
    let paymentLogsClone = cloneDeep(paymentLogs);
    paymentLogsClone[index].isRowSelected = e.target.checked;
    setPaymentLogs(paymentLogsClone);
  };

  const handleChangeSearch = (e, index) => {
    if (e) {
      let paymentLogsClone = cloneDeep(paymentLogs);
      paymentLogsClone[index].id = e.statementId;
      paymentLogsClone[index].client.name = e.customerName;
      paymentLogsClone[index].client.id = e.customerTopId;
      paymentLogsClone[index].invoiceNumber = e.invoiceNumber;
      paymentLogsClone[index].statementDetails.amount = e.statementAmount;
      paymentLogsClone[index].statementDetails.ccy = e.statementCcy;
      paymentLogsClone[index].paidAmount.ccy = e.statementCcy;
      paymentLogsClone[index].statementDetails.dueDate = e.statementDueDate;
      setPaymentLogs(paymentLogsClone);
    }
  };

  const handleDeleteRow = () => {
    let paymentLogsClone = cloneDeep(paymentLogs);
    let newRows = paymentLogsClone.filter((x) => !x.isRowSelected);
    setPaymentLogs(newRows);
  };

  const handleApply = () => {
    let paymentLogsClone = cloneDeep(paymentLogs);
    paymentLogsClone.forEach((item) => {
      // these attributes are not required in payload.. used just for rendering in UI
      delete item.invoiceNumber;
      delete item.isRowSelected;
      delete item.statementDetails;
      delete item.client;
    });
    logPaymentBatchMutation(paymentLogsClone);
  };

  const handleChangeAmount = (e, index) => {
    let paymentLogsClone = cloneDeep(paymentLogs);
    paymentLogsClone[index].paidAmount.value = e.target.value;
    paymentLogsClone[index].paidStatus = "";
    setPaymentLogs(paymentLogsClone);
  };

  const handlePaymentTagClick = (flag, index) => {
    let amountConsidered = paymentLogs[index]?.statementDetails?.amount;
    if (amountConsidered) {
      let paymentLogsClone = cloneDeep(paymentLogs);
      if (flag === "Partially Paid") {
        paymentLogsClone[index].paidStatus = "Partially Paid";
        paymentLogsClone[index].paidAmount.value = amountConsidered / 2;
        setPaymentLogs(paymentLogsClone);
      } else {
        paymentLogsClone[index].paidStatus = "Paid";
        paymentLogsClone[index].paidAmount.value = amountConsidered;
        setPaymentLogs(paymentLogsClone);
      }
    }
  };

  const handleDateChange = (date, index) => {
    let paymentLogsClone = cloneDeep(paymentLogs);
    paymentLogsClone[index].dateReceived = format(new Date(date), "yyyyMMdd");
    setPaymentLogs(paymentLogsClone);
  };

  const isSelected = (flag, index) => {
    const paidStatus = paymentLogs[index].paidStatus;
    if (paidStatus === flag) {
      return true;
    }
    return false;
  };

  const getApplyButtonDisable = () => {
    let disable = false;
    if (paymentLogs.length === 0) {
      disable = true;
    } else {
      paymentLogs.forEach((log) => {
        if (!log?.client?.id || !log?.id || !log.paidAmount.value) {
          disable = true;
        }
      });
    }
    return disable;
  };

  const getHeader = () => {
    return (
      <SelectedMenuTitle
        resource={resource}
        menuTitle={getResourceValueByKey(
          resource,
          "LOG_PAYMENT",
          "Log Payment"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <>
        <TitleWithEditActions
          title={getResourceValueByKey(
            resource,
            "ENTER_THE_AMOUNT_AND_DATE_PAYMENT_WAS_RECEIVED_BY_CLIENT.",
            "Enter the amount and date payment was received by client."
          )}
          onAddIconClick={onAddIconClick}
          onDelete={handleDeleteRow}
          onApply={handleApply}
          getApplyButtonDisable={getApplyButtonDisable}
        />
        {paymentLogs.length > 0 && (
          <div className={classes.logsContainer}>
            {mutationStatus.isLoading && (
              <div className={classes.centerDiv}>
                <Loader />
              </div>
            )}
            <TableTitle
              columnTitle1={getResourceValueByKey(
                resource,
                "CLIENT'S_INVOICE_NUMBER",
                "Client's Invoice Number"
              )}
              columnTitle2={getResourceValueByKey(
                resource,
                "AMOUNT_RECEIVED",
                "Amount Received"
              )}
              columnTitle3={getResourceValueByKey(
                resource,
                "DATE_RECEIVED",
                "Date Received"
              )}
            />
            <Grid container direction="column">
              {paymentLogs.map((log, index) => {
                return (
                  <Grid item className={classes.tableItem} key={index}>
                    <PaymentLog
                      index={index}
                      resource={resource}
                      log={log}
                      handleSelectRow={handleSelectRow}
                      handleChangeSearch={handleChangeSearch}
                      isSelected={isSelected}
                      handleChangeAmount={handleChangeAmount}
                      handlePaymentTagClick={handlePaymentTagClick}
                      handleDateChange={handleDateChange}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        )}
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default LogPaymentContainer;
