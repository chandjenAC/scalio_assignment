import React, { useState, useContext, useEffect } from "react";
import { makeStyles, Fade, Paper, Grid } from "@material-ui/core";
import CcyAndPeriodFilters from "../../components/dashboardApp/CcyAndPeriodFilters";
import EpDashboardSummary from "./EpDashboardSummary";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import GenerateDataContainer from "./GenerateDataContainer";
import { useQuery } from "react-query";
import { epDashboardGetFiltersBody } from "../../utils/getPayloads/epDashboard";
import { getEpDashboardFilters } from "../../utils/getData";
import currencies from "../../meta/currencies.json";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    background: "transparent",
  },
  dashboardRoot: {
    height: "100%",
    flexWrap: "noWrap",
  },
  summary: {
    flex: "1 1 auto",
    width: "100%",
  },
}));

const EpDashboardContainer = (props) => {
  const { resource } = props;
  const classes = useStyles();

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const initialPeriodFilterOptions = [
    {
      label: getResourceValueByKey(resource, "DAILY", "Daily"),
      value: "Daily",
    },
    {
      label: getResourceValueByKey(resource, "MONTHLY", "Monthly"),
      value: "Monthly",
    },
    {
      label: getResourceValueByKey(resource, "QUARTERLY", "Quarterly"),
      value: "Quarterly",
    },
    { label: getResourceValueByKey(resource, "YTD", "YTD"), value: "YTD" },
    {
      label: getResourceValueByKey(resource, "YEARLY", "Yearly"),
      value: "Yearly",
    },
    {
      label: getResourceValueByKey(
        resource,
        "YEAR_OVER_YEAR",
        "Year over Year"
      ),
      value: "Year over Year",
    },
  ];

  const [openGenerateDataDialog, setOpenGenerateDataDialog] = useState(false);
  const [reload, setReload] = useState(false);
  const [anchorInitialOptions, setAnchorInitialOptions] = useState([]);
  const [ccyFilterOptions, setCcyFilterOptions] = useState(currencies);
  const [periodFilterOptions, setPeriodFilterOptions] = useState(
    initialPeriodFilterOptions
  );
  const [filters, setFilters] = useState({
    currency: "USD",
    period: "Yearly",
    scope: {
      value: "",
      label: "",
    },
  });

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "DASHBOARD", "Dashboard"),
        path: "",
      },
    ]);
  }, []);

  useQuery(
    [
      "dashboardService_getFilters",
      epDashboardGetFiltersBody({
        anchorTopId: filters.scope.id,
      }),
    ],
    getEpDashboardFilters,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data?.data?.anchor) {
          let initialOptions = [
            {
              label: getResourceValueByKey(
                resource,
                "RECENTLY_SELECTED",
                "Recently Selected"
              ),
              options: [],
            },
            {
              label: getResourceValueByKey(resource, "TOP_5", "Top 5"),
              options: [],
            },
            {
              label: getResourceValueByKey(
                resource,
                "TOP_5_DOMESTIC",
                "Top 5 Domestic"
              ),
              options: [],
            },
            {
              label: getResourceValueByKey(
                resource,
                "TOP_5_INTERNATIONAL",
                "Top 5 International"
              ),
              options: [],
            },
          ];
          data.data.anchor.recentlySelectedAnchor.forEach((anchor) => {
            initialOptions[0].options.push({
              label: anchor.name,
              value: anchor.id,
            });
          });
          data.data.anchor.top5Anchors.forEach((anchor) => {
            initialOptions[1].options.push({
              label: anchor.name,
              value: anchor.id,
            });
          });
          data.data.anchor.top5Domestic.forEach((anchor) => {
            initialOptions[2].options.push({
              label: anchor.name,
              value: anchor.id,
            });
          });
          data.data.anchor.top5International.forEach((anchor) => {
            initialOptions[3].options.push({
              label: anchor.name,
              value: anchor.id,
            });
          });
          setAnchorInitialOptions(initialOptions);
          setCcyFilterOptions(currencies);
          setPeriodFilterOptions(initialPeriodFilterOptions);
        }
        if (data?.data?.ccy) {
          let ccyOptions = [];
          data.data.ccy.forEach((ccy) => {
            ccyOptions.push({ label: ccy, value: ccy });
          });
          setCcyFilterOptions(ccyOptions);
          //from the ccyOptions present for the selected anchor, the currency filter is defaulted to the first option
          setFilters({ ...filters, currency: ccyOptions?.[0]?.value });
        }
        if (data?.data?.period) {
          let periodOptions = [];
          data.data.period.forEach((period) => {
            periodOptions.push({ label: period, value: period });
          });
          setPeriodFilterOptions(periodOptions);
          setFilters({ ...filters, period: periodOptions?.[0]?.value });
        }
      },
    }
  );

  const applyCcyFilter = (ccy) => {
    setFilters({ ...filters, currency: ccy });
  };

  const clearCurrencyFilter = () => {
    setFilters({ ...filters, currency: "USD" });
  };

  const applyPeriodFilter = (period) => {
    setFilters({ ...filters, period: period });
  };

  const clearPeriodFilter = () => {
    setFilters({ ...filters, period: periodFilterOptions[0].value });
  };

  const applyScopeFilter = (selectedOption) => {
    setFilters({
      ...filters,
      scope: {
        value: selectedOption.value,
        label: selectedOption.label,
      },
    });
  };

  const clearScopeFilter = () => {
    //when scope filter is cleared, the ccy and period filters are defaulted..coz ccy and period filter options changes w.r.t anchor(scope)
    setFilters({
      currency: "USD",
      period: "Yearly",
      scope: {
        value: "",
        label: "",
      },
    });
  };

  const reloadDashboard = () => {
    setReload(!reload);
  };

  return (
    <>
      <Fade in={true} timeout={500}>
        <Paper elevation={0} className={classes.fadePaper}>
          <Grid container direction="column" className={classes.dashboardRoot}>
            <Grid item>
              <CcyAndPeriodFilters
                resource={resource}
                filters={filters}
                ccyFilterOptions={ccyFilterOptions}
                periodFilterOptions={periodFilterOptions}
                applyCcyFilter={applyCcyFilter}
                applyPeriodFilter={applyPeriodFilter}
                clearCurrencyFilter={clearCurrencyFilter}
                clearPeriodFilter={clearPeriodFilter}
                anchorInitialOptions={anchorInitialOptions}
                applyScopeFilter={applyScopeFilter}
                clearScopeFilter={clearScopeFilter}
                reloadDashboard={reloadDashboard}
                setOpenGenerateDataDialog={setOpenGenerateDataDialog}
              />
            </Grid>
            <Grid item className={classes.summary}>
              <EpDashboardSummary
                resource={resource}
                filters={filters}
                reload={reload}
              />
            </Grid>
          </Grid>
        </Paper>
      </Fade>
      {openGenerateDataDialog && (
        <GenerateDataContainer
          resource={resource}
          anchorInitialOptions={anchorInitialOptions}
          setOpenGenerateDataDialog={setOpenGenerateDataDialog}
        />
      )}
    </>
  );
};

export default EpDashboardContainer;
