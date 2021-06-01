import React, { useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getBillingProjectPerformance } from "../../utils/getData";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getBillingProjectPerformanceBody } from "../../utils/getPayloads/billingAppPayloads";
import { format } from "date-fns";
import SummaryCardsWithDetail from "../../components/common/organisms/SummaryCardsWithDetail";
import { formatNumber } from "../../utils";
import TotalTransactionsChart from "../../components/billingApp/TotalTransactionsChart";
import TwoMonthsRevenueChart from "../../components/billingApp/TwoMonthsRevenueChart";
import YtdRevenueChart from "../../components/billingApp/YtdRevenueChart";
import TopTenCustomersGrid from "../../components/billingApp/TopTenCustomersGrid";
import PerformanceFilters from "../../components/billingApp/PerformanceFilters";

const useStyles = makeStyles((theme) => ({
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  summaryCont: {
    position: "relative",
    padding: "12px 20px 12px 22px",
    height: 390,
  },
}));

const PerformanceContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const [activeFilters, setActiveFilters] = useState({
    client: { id: "", name: "" },
    txnDate: { gte: null, lte: null },
    ccy: "",
  });
  const [clientOptions, setClientOptions] = useState([]);
  const [ccyOptions, setCcyOptions] = useState([]);
  const [selectedKey, setSelectedKey] = useState("total transactions");

  const {
    isLoading,
    status,
    data: performanceData,
    refetch: refetchPerformanceData,
  } = useQuery(
    [
      "billingService_billingProjectPerformance",
      getBillingProjectPerformanceBody(activeFilters),
    ],
    getBillingProjectPerformance,
    {
      onSuccess: (data) => {
        let ccyOptions = [];
        let clientOptions = [];
        if (data?.data?.availableCCYs?.length > 0) {
          data.data.availableCCYs.forEach((ccy) => {
            ccyOptions.push({ label: ccy, value: ccy });
          });
        }
        if (data?.data?.allCustomers?.length > 0) {
          data.data.allCustomers.forEach((client) => {
            clientOptions.push({ label: client.name, value: client.topId });
          });
        }
        setCcyOptions(ccyOptions);
        setClientOptions(clientOptions);
      },
      refetchOnWindowFocus: false,
    }
  );

  const handleApplyCustomerFilter = (id) => {
    let filtered = clientOptions.find((x) => x.value === id);
    setActiveFilters({
      ...activeFilters,
      client: { id: id, name: filtered.label },
    });
  };

  const handleClearCustomerFilter = () => {
    setActiveFilters({ ...activeFilters, client: "" });
  };

  const handleApplyCcyFilter = (ccy) => {
    setActiveFilters({ ...activeFilters, ccy: ccy });
  };

  const handleClearCcyFilter = () => {
    setActiveFilters({ ...activeFilters, ccy: "" });
  };

  const handleApplyTxnDateFilter = (txnDate) => {
    setActiveFilters({
      ...activeFilters,
      txnDate: {
        gte: txnDate.gte && format(new Date(txnDate.gte), "yyyyMMdd"),
        lte: txnDate.lte && format(new Date(txnDate.lte), "yyyyMMdd"),
      },
    });
  };

  const handleClearTxnDateFilter = () => {
    setActiveFilters({
      ...activeFilters,
      txnDate: { gte: null, lte: null },
    });
  };

  const onSelect = (key) => {
    setSelectedKey(key);
  };

  const getSummaryByKey = (key) => {
    switch (key) {
      case "total transactions":
        return renderLabelValue({
          label: getResourceValueByKey(
            resource,
            "TOTAL_NO._TRANSACTIONS",
            "Total No. Transactions"
          ),
          value: formatNumber(performanceData?.data?.totalTxnCount),
        });
      case "2 months revenue":
        return renderLabelValue({
          label: getResourceValueByKey(
            resource,
            "REVENUE_(2_MONTHS)",
            "Revenue (2 months)"
          ),
          value: renderCurrency(
            formatNumber(
              performanceData?.data?.lastTwoMonthsRevenue.total,
              2,
              2
            ),
            performanceData?.data?.lastTwoMonthsRevenue.ccy
          ),
        });
      case "ytd revenue":
        return renderLabelValue({
          label: getResourceValueByKey(
            resource,
            "REVENUE_(YTD)",
            "Revenue (YTD)"
          ),
          value: renderCurrency(
            formatNumber(performanceData?.data?.ytdRevenue.total, 2, 2),
            performanceData?.data?.ytdRevenue.ccy
          ),
        });
      case "top 10 customers":
        return renderLabelValue({
          label: getResourceValueByKey(
            resource,
            "TOP_10_CUSTOMERS",
            "Top 10 Customers"
          ),
          value: renderCustomerPercent(
            performanceData?.data?.top10CustomersPercentage
          ),
        });
      default:
    }
  };

  const renderCustomerPercent = (percent) => {
    return (
      <Grid container alignItems="baseline" justify="space-between" spacing={1}>
        <Grid item>
          <Typography variant="h6">{`${percent}%`}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {getResourceValueByKey(resource, "OF_REVENUES", "of Revenues")}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderCurrency = (value, ccy) => {
    return (
      <Grid container alignItems="baseline" justify="space-between" spacing={1}>
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {ccy}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{value}</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderLabelValue = ({ label, value }) => {
    return (
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">{value}</Typography>
        </Grid>
      </Grid>
    );
  };

  const meta = [
    {
      summaryContent: getSummaryByKey("total transactions"),
      detailsContent: (
        <TotalTransactionsChart
          resource={resource}
          data={performanceData?.data?.totalTxnCountByMonth}
        />
      ),
      key: "total transactions",
    },
    {
      summaryContent: getSummaryByKey("2 months revenue"),
      detailsContent: (
        <TwoMonthsRevenueChart
          resource={resource}
          data={performanceData?.data?.monthlyPerformanceList}
        />
      ),
      key: "2 months revenue",
    },
    {
      summaryContent: getSummaryByKey("ytd revenue"),
      detailsContent: (
        <YtdRevenueChart
          resource={resource}
          data={performanceData?.data?.monthlyPerformanceList}
        />
      ),
      key: "ytd revenue",
    },
    {
      summaryContent: getSummaryByKey("top 10 customers"),
      detailsContent: (
        <TopTenCustomersGrid
          resource={resource}
          data={performanceData?.data?.top10Customers}
          refetchPerformanceData={refetchPerformanceData}
        />
      ),
      key: "top 10 customers",
    },
  ];

  if (status === "error") {
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

  return (
    <>
      <Grid container alignItems="center" justify="space-between">
        <Grid item>
          <Typography variant="h6" color="textSecondary">
            {getResourceValueByKey(resource, "PERFORMANCE", "Performance")}
          </Typography>
        </Grid>
        <Grid item>
          {performanceData?.data && (
            <PerformanceFilters
              resource={resource}
              activeFilters={activeFilters}
              performanceData={performanceData?.data}
              clientOptions={clientOptions}
              ccyOptions={ccyOptions}
              handleApplyCcyFilter={handleApplyCcyFilter}
              handleClearCcyFilter={handleClearCcyFilter}
              handleApplyCustomerFilter={handleApplyCustomerFilter}
              handleClearCustomerFilter={handleClearCustomerFilter}
              handleApplyTxnDateFilter={handleApplyTxnDateFilter}
              handleClearTxnDateFilter={handleClearTxnDateFilter}
            />
          )}
        </Grid>
      </Grid>
      <div className={classes.summaryCont}>
        {isLoading ? (
          <div className={classes.centerDiv}>
            <Loader />
          </div>
        ) : (
          <SummaryCardsWithDetail
            meta={meta}
            selectedKey={selectedKey}
            onSelect={onSelect}
          />
        )}
      </div>
    </>
  );
};

export default PerformanceContainer;
