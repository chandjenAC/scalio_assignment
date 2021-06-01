import React, { useEffect, useMemo } from "react";
import KpiTrendsContainer from "./KpiTrendsContainer";
import InfoGraphsContainer from "./InfoGraphsContainer";
import YogiObsAndRecsContainer from "./YogiObsAndRecsContainer";
import { makeStyles, Fade, Paper, Typography } from "@material-ui/core";
import { ideasAndRecommendations } from "./ideasAndRecommendations";
import { useQuery } from "react-query";
import { getEpDashboardData } from "../../utils/getData";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { epDashboardDataBody } from "../../utils/getPayloads/epDashboard";
import { getResourceValueByKey } from "../../utils/resourceHelper";
// import epDashboardData from "./dataReturned.json";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    background: "transparent",
  },
  summaryRoot: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr auto",
    gridTemplateAreas:
      "'kpiTrendsCont kpiTrendsCont' 'infographics yogiRecs' 'infographics yogiRecs'",
  },
  kpiTrendsCont: {
    gridArea: "kpiTrendsCont",
  },

  infographics: { gridArea: "infographics", padding: "10px 20px 6px 36px" },
  yogiRecs: {
    gridArea: "yogiRecs",
    padding: "10px 36px 6px 8px",
  },
  divider: { width: "100%" },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const EpDashboardSummary = (props) => {
  const { resource, filters, reload } = props;
  const classes = useStyles();

  const { isLoading, error, data: epDashboardData, refetch } = useQuery(
    [
      "dashboardService_epDashboard",
      epDashboardDataBody({
        ccy: filters.currency,
        period: filters.period,
        scope: {
          type: "ANCHOR",
          id: filters.scope.value,
        },
        keys: [
          "totalEpAmount",
          "totalRevenue",
          "avgWeightedAprRate",
          "totalVolumeAndTotalRevenueChart",
          "avgVolumeAndAvgRevenueChart",
          "avgUtilized",
          "avgAvailable",
          "dailyLimitAndDailyAvailableChart",
          "avgUtilizedChart",
          "rejectedAmount",
          "rejectedAmountChart",
          "rejectedWeightedApr",
          "limitRejectedWeightedApr",
          "yieldRejectedWeightedApr",
          "rejectedAmountChart",
          "rejectedByTypeChart",
          "lowOfferRate",
          "highOfferRate",
          "avgApr",
          "highLowOfferChart",
          "yogiObservations",
          "yogiRecommendations",
          "supplierCountryAndTotalEpaWorldMap",
          "supplierCountryAndTotalRevenueEarnedWorldMap",
          "supplierCountryAndAvgWeightedAprWorldMap",
          "supplierCountryAndRejectedAmountWorldMap",
          "top10SuppliersByTotalRevenueEarned",
          "top10SuppliersByAvgWeightedApr",
          "top10SuppliersByTotalRejectedAmount",
          "top10SuppliersByTotalEPAmount",
          "avgWeightedAprRateChart",
        ],
      }),
    ],
    getEpDashboardData,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [reload]);

  const getKpiTrendsData = () => {
    let data = ideasAndRecommendations.recommendations.filter(
      (idea) => idea.layout === "kpi/trend"
    );
    return data[0];
  };

  const getInfographsData = () => {
    let data = ideasAndRecommendations.recommendations.filter(
      (idea) => idea.layout === "infographs"
    );
    return data[0];
  };

  const kpiTrendsData = useMemo(() => getKpiTrendsData(), [
    ideasAndRecommendations,
  ]);

  const infographsData = useMemo(() => getInfographsData(), [
    ideasAndRecommendations,
  ]);

  if (isLoading) {
    return (
      <div className={classes.centerDiv}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return null;
  }

  if (!epDashboardData?.status.success) {
    return (
      <div className={classes.centerDiv}>
        <Typography variant="body2" color="error">
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
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        <div className={classes.summaryRoot}>
          <div className={classes.kpiTrendsCont}>
            <KpiTrendsContainer
              resource={resource}
              epDashboardData={epDashboardData.data}
              filters={filters}
              kpiTrendsData={kpiTrendsData}
              // handleYogiButtonClick={handleYogiButtonClick}
            />
          </div>
          {/* <div item className={classes.divider}>
            <Divider variant="middle" />
          </div> */}
          <div className={classes.infographics}>
            <InfoGraphsContainer
              resource={resource}
              epDashboardData={epDashboardData.data}
              infographsData={infographsData}
              ccy={filters.currency}
            />
          </div>
          <div className={classes.yogiRecs}>
            <YogiObsAndRecsContainer
              resource={resource}
              epDashboardData={epDashboardData.data}
              recommendationsMeta={kpiTrendsData.recommendations}
              observationsMeta={kpiTrendsData.observations}
            />
          </div>
        </div>{" "}
      </Paper>
    </Fade>
  );
};

export default EpDashboardSummary;
