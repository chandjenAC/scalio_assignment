import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Popover } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { renderSnackbar } from "../../utils";
import { useMutation } from "react-query";
import { logPayment } from "../../utils/getData";
import LogPaymentForm from "../../components/billingApp/LogPaymentForm";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    minWidth: 250,
    maxWidth: 450,
    overflowX: "scroll",
    padding: "12px 20px",
    position: "relative",
  },
}));

const LogPaymentPopUpContainer = (props) => {
  const {
    resource,
    statementData,
    viewLogPayment,
    anchorEl,
    handleClose,
    refetchStatementData,
  } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [logPaymentMutation, mutationStatus] = useMutation(logPayment, {
    onSuccess: (response) => {
      renderSnackbar(enqueueSnackbar, response);
      handleClose();
      refetchStatementData();
    },
  });

  const [paymentTag, setPaymentTag] = useState("Paid");
  const [amount, setAmount] = useState(
    statementData.invoiceAmount.value || statementData?.statementAmount?.value
  );
  const [date, setDate] = useState(new Date());

  const handleDateChange = (date) => {
    setDate(date);
  };

  const isSelected = (flag) => {
    if (paymentTag === flag) {
      return true;
    }
    return false;
  };

  const handlePaymentTagClick = (flag) => {
    let amountConsidered =
      statementData.invoiceAmount.value || statementData.statementAmount.value;
    if (flag === "Partially Paid") {
      setPaymentTag("Partially Paid");
      let amount = amountConsidered / 2;
      setAmount(amount);
    } else {
      setPaymentTag("Paid");
      let amount = amountConsidered;
      setAmount(amount);
    }
  };

  const handleClickApply = () => {
    const userInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
    const userEmail = userInfo?.loginProfile?.userProfile?.emailId;
    const body = {
      id: statementData.id,
      paidStatus: paymentTag,
      paidDate: format(new Date(date), "yyyyMMdd"),
      paidAmount: {
        ccy: statementData.statementAmount.ccy,
        value: amount,
      },
      paymentDetails: {
        addedBy: userEmail,
        addedOn: new Date().toISOString(),
      },
    };
    logPaymentMutation(body);
  };

  const getButtonDisable = () => {
    if (!amount || !date || mutationStatus.isLoading) {
      return true;
    }
    return false;
  };

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  return (
    <Popover
      classes={{ paper: classes.popoverPaper }}
      open={viewLogPayment}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <LogPaymentForm
        resource={resource}
        statementData={statementData}
        isLoading={mutationStatus.isLoading}
        amount={amount}
        date={date}
        handleClickCancel={handleClose}
        handleClickApply={handleClickApply}
        getButtonDisable={getButtonDisable}
        handlePaymentTagClick={handlePaymentTagClick}
        handleChangeAmount={handleChangeAmount}
        isSelected={isSelected}
        handleDateChange={handleDateChange}
      />
    </Popover>
  );
};
export default LogPaymentPopUpContainer;
