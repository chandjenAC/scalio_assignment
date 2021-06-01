import React from "react";
import ViewAsTable from "../common/molecules/ViewAsTable";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import TabPanel from "../common/atoms/TabPanel/TabPanel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  detailsBox: {
    maxHeight: 630,
    width: "100%",
    overflow: "scroll",
  },
  appBar: {
    position: "relative",
    width: "100%",
  },
  tabsRoot: {
    minHeight: 32,
  },
  tabRoot: {
    padding: 0,
    minHeight: 32,
  },
  button: {
    minWidth: 32,
    paddingBottom: "4px",
  },
  icon: {
    fontSize: "15px",
    margin: "6px 0px 0px 6px",
  },
}));

const InvoiceTabPanel = (props) => {
  const {
    resource,
    selectedTab,
    setSelectedTab,
    renderAttributes,
    data,
    invoiceData,
  } = props;
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Tabs
          classes={{ root: classes.tabsRoot }}
          value={selectedTab}
          indicatorColor="primary"
          onChange={handleChange}
        >
          <Tab
            classes={{ root: classes.tabRoot }}
            label={getResourceValueByKey(
              resource,
              "INVOICE_DATA",
              "Invoice Data"
            )}
            {...a11yProps(0)}
          />
          <Tab
            classes={{ root: classes.tabRoot }}
            label={getResourceValueByKey(
              resource,
              "TABLE_ITEMS",
              "Table Items"
            )}
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>

      <TabPanel value={selectedTab} index={0}>
        {renderAttributes(data)}
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <ViewAsTable
          data={invoiceData.data.lineItems}
          columnHeadings={invoiceData.columnHeadings}
        />
      </TabPanel>
    </div>
  );
};

export default InvoiceTabPanel;
