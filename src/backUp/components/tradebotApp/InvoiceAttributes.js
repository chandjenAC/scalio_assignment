import React, { useState } from "react";
import ViewAsTable from "../common/molecules/ViewAsTable";
import LabelAndValue from "../common/LabelAndValue";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InvoiceTabPanel from "./InvoiceTabPanel";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles((theme) => ({
  invoiceAttrsRoot: {
    height: "100%",
  },
  title: {
    height: "auto",
    width: "100%",
    textAlign: "center",
  },
  detailsPanel: {
    width: "100%",
    paddingTop: 4,
    flexGrow: "1",
  },
  typoGraphAttr: {
    color: theme.palette.grey[500],
  },
  typotitle: {
    color: theme.palette.primary.main,
  },
  objTitle: {
    paddingLeft: 4,
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const InvoiceAttributes = (props) => {
  const { resource, invoiceData } = props;
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  let data = cloneDeep(invoiceData.data);
  delete data.lineItems;

  const containsLineItems =
    invoiceData.data.lineItems && invoiceData.data.lineItems.length > 0;
  const containsData = !isEmpty(invoiceData.data);

  const labelAndValue = (label, value, index) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
        <LabelAndValue label={label} value={value} index={index} />
      </Grid>
    );
  };

  const renderObject = (key, data, i) => {
    return (
      <Grid item xs={12} sm={12} md={12} lg={12} key={i}>
        {data !== undefined && !isEmpty(data) && (
          <Typography
            variant="subtitle2"
            align="left"
            className={classes.objTitle}
            color="primary"
          >
            {key}
          </Typography>
        )}
        <Grid container justify="flex-start" alignItems="flex-start">
          {Object.keys(data).map((k, j) => {
            return labelAndValue(k, data[k], j);
          })}
        </Grid>
      </Grid>
    );
  };

  const renderAttributes = (data, name) => {
    return (
      <Grid container justify="flex-start" alignItems="flex-start">
        {typeof data === "string" ||
        typeof data === "boolean" ||
        typeof data === "number"
          ? labelAndValue(name, data, 1)
          : Object.keys(data).map((key, i) => {
              if (
                typeof data[key] === "string" ||
                typeof data[key] === "boolean" ||
                typeof data[key] === "number"
              ) {
                return labelAndValue(key, data[key], i);
              } else if (data[key] !== null && typeof data[key] === "object") {
                return renderObject(key, data[key], i);
              }
            })}
      </Grid>
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.invoiceAttrsRoot}
    >
      <Grid item className={classes.title}>
        <Grid container alignItems="baseline" justify="center">
          <Grid item>
            <Typography variant="body2" className={classes.typoGraphAttr}>
              {getResourceValueByKey(resource, "GRAPH_ATTR", "Graph Attr.")} -
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" className={classes.typotitle}>
              &nbsp;
              {getResourceValueByKey(resource, "INVOICE_DATA", "Invoice Data")}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.detailsPanel}>
        {containsData && containsLineItems ? (
          <InvoiceTabPanel
            resource={resource}
            data={data}
            invoiceData={invoiceData}
            renderAttributes={renderAttributes}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ) : containsData ? (
          renderAttributes(data)
        ) : containsLineItems ? (
          <ViewAsTable
            data={invoiceData.data.lineItems}
            columnHeadings={invoiceData.columnHeadings}
          />
        ) : (
          <div className={classes.centerDiv}>
            <Typography variant="error">
              {getResourceValueByKey(
                resource,
                "NO_INVOICE_DATA",
                "No invoice data!"
              )}
            </Typography>
          </div>
        )}
      </Grid>
    </Grid>
  );
};

export default InvoiceAttributes;
