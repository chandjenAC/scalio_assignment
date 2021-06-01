import React, { useContext, useEffect, useState } from "react";
import ActivityFilterCriterias from "../../components/billingApp/ActivityFilterCriterias";
import { Divider, Grid, Typography, makeStyles } from "@material-ui/core";
import ClientHeader from "../../components/billingApp/ClientHeader";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getBillingFeeSummaryByTxnType } from "../../utils/getData";
import { useQuery } from "react-query";
import { BillingAppContext } from "../../contextProviders/BillingAppContextProvider";
import format from "date-fns/format";
import cloneDeep from "lodash/cloneDeep";
import { getBillingFeeSummaryByTxnTypeBody } from "../../utils/getPayloads/billingAppPayloads";
import InAppLayout from "../../layouts/InAppLayout";
import ActivityByTxnTypeSummary from "./ActivityByTxnTypeSummary";
import ActivityIcons from "../../components/billingApp/ActivityIcons";
import BulkActionsContainer from "./BulkActionsContainer";
import TimeBasedActionsContainer from "./TimeBasedActionsContainer";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  title: { width: "100%" },
  subtitleCont: { paddingLeft: 12 },
  divider: {
    height: 1,
    marginBottom: 20,
  },
}));

const ActivityByClientContainer = (props) => {
  const {
    resource,
    hideTitle,
    clientName: clientNameProp,
    statementId,
    defaultFlag = true,
    hideActions,
  } = props;
  const classes = useStyles();

  const params = useParams();
  const navigate = useNavigate();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const { selectedClient } = useContext(BillingAppContext);

  const clientName = selectedClient.customerName;
  const clientTopId = params.clientTopId;

  useEffect(() => {
    if (!clientNameProp) {
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
      ]);
    }
  }, []);

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

  const [activeFilters, setActiveFilters] = useState({
    defaultFlag: defaultFlag,
    client: { value: clientTopId, label: clientName },
    txnDate: { gte: null, lte: null },
    status: [],
  });
  const [reloadTable, setReloadTable] = useState(null);
  const [selectedRows, setSelectedRows] = useState({}); //contains selectedRows by txnType
  const [distinctSelectedRows, setDistinctSelectedRows] = useState(new Set());
  const [criteriaApplied, setCriteriaApplied] = useState({});

  const {
    isLoading: loadingFeeSummary,
    data: feeSummaryData,
    refetch: refetchBillingSummary,
  } = useQuery(
    [
      "billingService_billingFeeSummaryByTxnType",
      getBillingFeeSummaryByTxnTypeBody({
        statementId: statementId,
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

  const handleReloadTable = () => {
    if (reloadTable === null) {
      setReloadTable(true);
    } else {
      setReloadTable(!reloadTable);
    }
  };

  const handleApplyClientFilter = (client) => {
    let activeFiltersCopy = cloneDeep(activeFilters);
    activeFiltersCopy.defaultFlag = false;
    activeFiltersCopy.client.label = client.label;
    activeFiltersCopy.client.value = client.value;
    setActiveFilters(activeFiltersCopy);
  };

  const handleClearClientFilter = () => {
    let activeFiltersCopy = cloneDeep(activeFilters);
    activeFiltersCopy.defaultFlag = false;
    activeFiltersCopy.client.label = "";
    activeFiltersCopy.client.value = "";
    setActiveFilters(activeFiltersCopy);
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

  const handleSelectRows = (txnType, row) => {
    if (distinctSelectedRows.has(row.id)) {
      let tempDistinct = cloneDeep(distinctSelectedRows);
      tempDistinct.delete(row.id);
      setDistinctSelectedRows(tempDistinct);
      setSelectedRows((prevState) => ({
        ...prevState,
        [txnType]: prevState[txnType].filter((x) => x.id !== row.id),
      }));
    } else {
      setDistinctSelectedRows((prevState) => prevState.add(row.id));
      setSelectedRows((prevState) => ({
        ...prevState,
        [txnType]: prevState[txnType] ? [...prevState[txnType], row] : [row],
      }));
    }
  };

  const handleClickViewProfile = () => {
    navigate(
      `/yogi-webb/billing/activity/${clientTopId}/profile/${selectedClient.id}`
    );
  };

  const getHeader = () => {
    return (
      !hideTitle && (
        <Typography
          variant="h6"
          align="left"
          color="textSecondary"
          className={classes.title}
        >
          {getResourceValueByKey(
            resource,
            "BILLING_ACTIVITY",
            "Billing Activity"
          )}
        </Typography>
      )
    );
  };

  const getMainSection = () => {
    return (
      <>
        {!hideTitle && (
          <ClientHeader
            resource={resource}
            projectId={selectedClient.id}
            clientName={clientName}
            clientTopId={clientTopId}
            handleClickViewProfile={handleClickViewProfile}
          />
        )}
        <Grid
          container
          alignItems="center"
          justify="space-between"
          className={classes.subtitleCont}
        >
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  {getResourceValueByKey(resource, "ACTIVITY", "Activity")}
                </Typography>
              </Grid>
              <Grid item>
                <ActivityIcons />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <ActivityFilterCriterias
                  resource={resource}
                  activeFilters={activeFilters}
                  statusOptions={statusOptions}
                  handleApplyClientFilter={handleApplyClientFilter}
                  handleClearClientFilter={handleClearClientFilter}
                  handleApplyTxnDateFilter={handleApplyTxnDateFilter}
                  handleClearTxnDateFilter={handleClearTxnDateFilter}
                  handleApplyStatusFilter={handleApplyStatusFilter}
                  handleClearStatusFilter={handleClearStatusFilter}
                />
              </Grid>
              {!hideActions && (
                <>
                  <Grid item>
                    <BulkActionsContainer
                      resource={resource}
                      selectedRows={selectedRows}
                      distinctSelectedRows={distinctSelectedRows}
                      setDistinctSelectedRows={setDistinctSelectedRows}
                      setSelectedRows={setSelectedRows}
                      handleReloadTable={handleReloadTable}
                      refetchBillingSummary={refetchBillingSummary}
                    />
                  </Grid>
                  <Grid item>
                    <TimeBasedActionsContainer
                      resource={resource}
                      refetchBillingSummary={refetchBillingSummary}
                      handleReloadTable={handleReloadTable}
                      clientInfo={{
                        clientName: clientName,
                        clientTopId: clientTopId,
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" className={classes.divider} />
        <ActivityByTxnTypeSummary
          resource={resource}
          loadingFeeSummary={loadingFeeSummary}
          feeSummaryData={feeSummaryData}
          criteriaApplied={criteriaApplied}
          statementId={statementId}
          activeFilters={activeFilters}
          reloadTable={reloadTable}
          handleReloadTable={handleReloadTable}
          refetchBillingSummary={refetchBillingSummary}
          selectedRows={selectedRows}
          handleSelectRows={handleSelectRows}
        />
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default ActivityByClientContainer;
