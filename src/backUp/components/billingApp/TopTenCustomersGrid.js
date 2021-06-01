import React from "react";
import { formatNumber } from "../../utils";
import Mtable from "../common/organisms/Mtable";
import { makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import UpdateFavouriteContainer from "../../containers/BillingApp/UpdateFavouriteContainer";

const useStyles = makeStyles((theme) => ({
  favIconDiv: {
    width: "100%",
    "& svg": {
      width: 16,
      height: "auto",
      color: "#faf600",
    },
  },
}));

const TopTenCustomersGrid = (props) => {
  const { resource, data, refetchPerformanceData } = props;

  const classes = useStyles();

  const columns = [
    {
      field: "",
      title: getResourceValueByKey(resource, "#", "#"),
      width: "10%",
      render: (rowData) => (
        <Typography variant="body2" color="textSecondary">
          {rowData.tableData.id + 1}
        </Typography>
      ),
    },
    {
      field: "name",
      width: "40%",
      title: getResourceValueByKey(resource, "SUPPLIER", "Supplier"),
      render: (rowData) => (
        <Typography variant="subtitle2">{rowData.name}</Typography>
      ),
      dontTruncate: true,
    },
    {
      field: "amount",
      title: getResourceValueByKey(resource, "TXN._AMOUNT", "Txn. Amount"),
      align: "right",
      render: (rowData) => (
        <Typography variant="subtitle2">
          <span style={{ color: "rgba(0,0,0,0.54)" }}>{rowData.ccy}</span>{" "}
          {formatNumber(rowData.total, 2, 2)}
        </Typography>
      ),
    },
    {
      field: "txnCount",
      title: getResourceValueByKey(resource, "NO._TXN", "No. Txn"),
      align: "right",
      render: (rowData) => (
        <Typography variant="subtitle2">
          {formatNumber(rowData.txnCount)}
        </Typography>
      ),
    },
    {
      field: "starred",
      title: "",
      width: "10%",
      align: "center",
      render: (rowData) => (
        <div className={classes.favIconDiv}>
          <UpdateFavouriteContainer
            resource={resource}
            favourite={rowData.favourite}
            projectId={rowData.topId}
            refetchProjectSummary={refetchPerformanceData}
            disableUpdate={true}
          />
        </div>
      ),
    },
  ];
  return (
    <Mtable
      style={{
        boxShadow: "none",
        width: "100%",
        padding: "0px 12px",
      }}
      title={""}
      columns={columns}
      data={data}
      options={{
        sorting: false,
        toolbar: false,
        filtering: false,
        draggable: false,
        search: false,
        paging: false,
      }}
    />
  );
};

export default TopTenCustomersGrid;
