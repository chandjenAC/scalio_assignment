import React, { useContext, useState } from "react";
import { AppBar, makeStyles, Tab, Tabs, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import TabPanel from "../../components/common/atoms/TabPanel/TabPanel";
import cloneDeep from "lodash/cloneDeep";
import { format } from "date-fns";
import { useQuery } from "react-query";
import { getBillingFeeSummaryByTxnTypeBody } from "../../utils/getPayloads/billingAppPayloads";
import { getBillingFeeSummaryByTxnType } from "../../utils/getData";
import ActivityByTxnTypeSummary from "./ActivityByTxnTypeSummary";
import StatementsContainer from "./StatementsContainer";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ActivityTabFilters from "../../components/billingApp/ActivityTabFilters";
import StatementsTabFilters from "../../components/billingApp/StatementsTabFilter";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    position: "relative",
    width: "100%",
    boxShadow: "none",
  },
  tabsRoot: {
    minHeight: 32,
  },
  tabRoot: {
    padding: 0,
    minHeight: 32,
  },
  padding12: { padding: 12 },
  padding20: { padding: 20 },
}));

const ActivityAndStatementTabsContainer = (props) => {
  const { resource, defaultFlag, selectedClient } = props;

  const classes = useStyles();

  const { setSelectedStatement } = useContext(BillingAppContext);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  const routedFromStatementMenu = location.pathname.includes("statements");
  const projectId = params.projectId;
  const clientTopId = params.clientTopId; //url params passsed when called as child from ActivityByClientContainer tree.

  const [selectedTab, setSelectedTab] = useState(0);
  const [activeFilters, setActiveFilters] = useState({
    defaultFlag: defaultFlag,
    client: {
      value: selectedClient.customerTopId,
      label: selectedClient.customerName,
    },
    txnDate: { gte: null, lte: null },
    status: [],
  });
  const [selectedRows, setSelectedRows] = useState([]);
  const [reloadTable, setReloadTable] = useState(null);

  const [criteriaApplied, setCriteriaApplied] = useState({});

  const {
    isLoading: loadingFeeSummary,
    data: feeSummaryData,
    refetch: refetchBillingSummary,
  } = useQuery(
    [
      "billingService_billingFeeSummaryByTxnType",
      getBillingFeeSummaryByTxnTypeBody({
        activeFilters: activeFilters,
      }),
    ],
    getBillingFeeSummaryByTxnType,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        let txnDateFilterCriteria = data?.criteriaApplied?.filters?.find(
          (x) => x.fieldName === "txnInfo_txnDate"
        );
        if (txnDateFilterCriteria) {
          setActiveFilters((prevState) => ({
            ...prevState,
            txnDate: {
              gte: txnDateFilterCriteria.values[0],
              lte: txnDateFilterCriteria.values[1],
            },
          }));
        }
        setCriteriaApplied(data?.criteriaApplied);
        let statusFilterCriteria = data?.criteriaApplied?.filters?.find(
          (x) => x.fieldName === "status"
        );
        if (statusFilterCriteria) {
          setActiveFilters((prevState) => ({
            ...prevState,
            status: statusFilterCriteria.values,
          }));
        }
      },
    }
  );

  const statusOptions = [
    {
      label: getResourceValueByKey(resource, "NEW", "New"),
      value: "New",
    },
    {
      label: getResourceValueByKey(resource, "NOT_BILLED", "Not Billed"),
      value: "NotBilled",
    },
    {
      label: getResourceValueByKey(resource, "BILLED", "Billed"),
      value: "Billed",
    },
    {
      label: getResourceValueByKey(resource, "EXCLUDED", "Excluded"),
      value: "Excluded",
    },
  ];

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const handleReloadTable = () => {
    if (reloadTable === null) {
      setReloadTable(true);
    } else {
      setReloadTable(!reloadTable);
    }
  };

  const handleApplyTxnDateFilter = (txnDate) => {
    let activeFiltersCopy = cloneDeep(activeFilters);
    activeFiltersCopy.defaultFlag = false;
    activeFiltersCopy.txnDate.gte = format(new Date(txnDate.gte), "yyyyMMdd");
    activeFiltersCopy.txnDate.lte = format(new Date(txnDate.lte), "yyyyMMdd");
    setActiveFilters(activeFiltersCopy);
  };

  const handleClearTxnDateFilter = () => {
    let activeFiltersCopy = cloneDeep(activeFilters);
    activeFiltersCopy.defaultFlag = false;
    activeFiltersCopy.txnDate.gte = null;
    activeFiltersCopy.txnDate.lte = null;
    setActiveFilters(activeFiltersCopy);
  };

  const handleApplyStatusFilter = (values) => {
    let activeFiltersCopy = cloneDeep(activeFilters);
    let status = [];
    values.forEach((item) => {
      status.push(item.value);
    });
    activeFiltersCopy.defaultFlag = false;
    activeFiltersCopy.status = status;
    setActiveFilters(activeFiltersCopy);
  };

  const handleClearStatusFilter = () => {
    let activeFiltersCopy = cloneDeep(activeFilters);
    activeFiltersCopy.defaultFlag = false;
    activeFiltersCopy.status = [];
    setActiveFilters(activeFiltersCopy);
  };

  const handleSelectRows = (rows) => {
    setSelectedRows(rows);
  };

  const retrieveStatementDetails = (rowData) => {
    setSelectedStatement(rowData);
    if (clientTopId) {
      if (routedFromStatementMenu) {
        navigate(
          `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}/statement/${rowData.id}`
        );
      } else {
        navigate(
          `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}/statement/${rowData.id}`
        );
      }
    } else {
      navigate(
        `/yogi-webb/billing/project/${projectId}/statement/${rowData.id}`
      );
    }
  };

  return (
    <div>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Tabs
          classes={{ root: classes.tabsRoot }}
          value={selectedTab}
          indicatorColor="primary"
          onChange={handleChange}
        >
          <Tab
            classes={{ root: classes.tabRoot }}
            label={
              <Typography variant="subtitle1">
                {getResourceValueByKey(resource, "ACTIVITY", "Activity")}
              </Typography>
            }
            {...a11yProps(0)}
          />
          <Tab
            classes={{ root: classes.tabRoot }}
            label={
              <Typography variant="subtitle1">
                {getResourceValueByKey(resource, "STATEMENTS", "Statements")}
              </Typography>
            }
            {...a11yProps(1)}
          />
          {selectedTab === 0 && (
            <ActivityTabFilters
              resource={resource}
              activeFilters={activeFilters}
              statusOptions={statusOptions}
              handleApplyTxnDateFilter={handleApplyTxnDateFilter}
              handleClearTxnDateFilter={handleClearTxnDateFilter}
              handleApplyStatusFilter={handleApplyStatusFilter}
              handleClearStatusFilter={handleClearStatusFilter}
              selectedClient={selectedClient}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              handleReloadTable={handleReloadTable}
              refetchBillingSummary={refetchBillingSummary}
            />
          )}
          {selectedTab === 1 && (
            <StatementsTabFilters
              resource={resource}
              activeFilters={activeFilters}
              statusOptions={statusOptions}
              handleApplyTxnDateFilter={handleApplyTxnDateFilter}
              handleClearTxnDateFilter={handleClearTxnDateFilter}
              handleApplyStatusFilter={handleApplyStatusFilter}
              handleClearStatusFilter={handleClearStatusFilter}
              selectedClient={selectedClient}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              handleReloadTable={handleReloadTable}
              refetchBillingSummary={refetchBillingSummary}
            />
          )}
        </Tabs>
      </AppBar>

      <TabPanel value={selectedTab} index={0}>
        <div className={classes.padding12}>
          <ActivityByTxnTypeSummary
            resource={resource}
            loadingFeeSummary={loadingFeeSummary}
            feeSummaryData={feeSummaryData}
            criteriaApplied={criteriaApplied}
            activeFilters={activeFilters}
            reloadTable={reloadTable}
            handleReloadTable={handleReloadTable}
            refetchBillingSummary={refetchBillingSummary}
            handleSelectRows={handleSelectRows}
          />
        </div>
      </TabPanel>

      <TabPanel value={selectedTab} index={1}>
        <div className={classes.padding20}>
          <StatementsContainer
            resource={resource}
            clientTopId={selectedClient.customerTopId}
            reloadTable={reloadTable}
            retrieveStatementDetails={retrieveStatementDetails}
            handleReloadTable={handleReloadTable}
          />
        </div>
      </TabPanel>
    </div>
  );
};

export default ActivityAndStatementTabsContainer;
