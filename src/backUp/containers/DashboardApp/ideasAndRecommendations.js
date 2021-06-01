const { create_UUID } = require("../../utils");

export const ideasAndRecommendations = {
  id: create_UUID(),
  intent: "dashboard",
  ideaName: "Filters",
  displayName: "Filter by Currency and Period",
  layout: "filters",
  ideas: [
    {
      id: create_UUID(),
      ideaName: "Filter by Currency",
      displayName: "Currency",
      recommendations: [
        {
          id: create_UUID(),
          displayName: "GBP",
          routeInfo: { url: "/getDashboardData", params: { ccy: "GBP" } },
        },
        {
          id: create_UUID(),
          displayName: "INR",
          routeInfo: { url: "/getDashboardData", params: { ccy: "INR" } },
        },
        {
          id: create_UUID(),
          displayName: "USD",
          routeInfo: { url: "/getDashboardData", params: { ccy: "USD" } },
        },
      ],
    },
    {
      id: create_UUID(),
      ideaName: "Filter by Period",
      displayName: "Period",
      recommendations: [
        {
          id: create_UUID(),
          displayName: "Daily",
          routeInfo: { url: "/getDashboardData", params: { period: "daily" } },
        },
        {
          id: create_UUID(),
          displayName: "Monthly",
          routeInfo: {
            url: "/getDashboardData",
            params: { period: "monthly" },
          },
        },
        {
          id: create_UUID(),
          displayName: "Quarterly",
          routeInfo: {
            url: "/getDashboardData",
            params: { period: "quarterly" },
          },
        },
        {
          id: create_UUID(),
          displayName: "YTD",
          routeInfo: { url: "/getDashboardData", params: { period: "ytd" } },
        },
        {
          id: create_UUID(),
          displayName: "Yearly",
          routeInfo: {
            url: "/getDashboardData",
            params: { period: "yearly" },
          },
        },
        {
          id: create_UUID(),
          displayName: "Year over Year",
          routeInfo: {
            url: "/getDashboardData",
            params: { period: "yearOverYear" },
          },
        },
      ],
    },
  ],
  recommendations: [
    {
      id: create_UUID(),
      displayName: "KPI's and Trend's",
      layout: "kpi/trend",
      ideas: [
        {
          id: create_UUID(),
          ideaName: "EP Volume and Revenue",
          displayName: "EP Volume and Revenue",
          ideaData: {
            kpis: [
              {
                id: create_UUID(),
                type: "radialBar",
                dataKeys: [
                  { key: "totalRevenue", unitInCcy: true },
                  { key: "totalEpAmount", unitInCcy: true },
                ],
              },
            ],
            trends: [
              {
                id: create_UUID(),
                type: "lineChart",
                currencyOnYaxis: true,
                lines: [
                  {
                    key: "totalVolume",
                    name: "Total Volume",
                    dashedLine: false,
                  },
                  {
                    key: "totalRevenue",
                    name: "Total Revenue",
                    dashedLine: false,
                  },
                ],
                dataKey: "totalVolumeAndTotalRevenueChart",
              },
              {
                id: create_UUID(),
                type: "lineChart",
                currencyOnYaxis: true,
                lines: [
                  {
                    key: "avgVolume",
                    name: "Average Volume",
                    dashedLine: false,
                  },
                  {
                    key: "avgRevenue",
                    name: "Average Revenue",
                    dashedLine: false,
                  },
                ],
                dataKey: "avgVolumeAndAvgRevenueChart",
              },
            ],
          },
        },
        {
          id: create_UUID(),
          ideaName: "Avg. Weighted APR",
          displayName: "Avg. Weighted APR",
          ideaData: {
            kpis: [
              {
                id: create_UUID(),
                type: "guage",
                dataKey: "avgWeightedAprRate",
              },
            ],
            trends: [
              {
                id: create_UUID(),
                type: "lineChart",
                lines: [
                  {
                    key: "avgApr",
                    name: "Average Weighted APR",
                    dashedLine: false,
                  },
                ],
                dataKey: "avgWeightedAprRateChart",
              },
            ],
          },
        },
        {
          id: create_UUID(),
          ideaName: "Utilization",
          displayName: "Utilization",
          ideaData: {
            kpis: [
              {
                id: create_UUID(),
                type: "radialBar",
                detailsOnLegend: true,
                dataKeys: [
                  {
                    key: "avgUtilized",
                    unitInCcy: true,
                  },
                  {
                    key: "avgAvailable",
                    unitInCcy: true,
                  },
                ],
              },
            ],
            trends: [
              {
                id: create_UUID(),
                type: "lineChart",
                currencyOnYaxis: true,
                lines: [
                  {
                    key: "dailyLimit",
                    name: "Daily Limit",
                    dashedLine: false,
                  },
                  {
                    key: "dailyAvailable",
                    name: "Daily Available",
                    dashedLine: false,
                  },
                ],
                dataKey: "dailyLimitAndDailyAvailableChart",
              },
              {
                id: create_UUID(),
                type: "lineChart",
                currencyOnYaxis: true,
                lines: [
                  {
                    key: "avgUtilized",
                    name: "Average Utilized",
                    dashedLine: false,
                  },
                ],
                dataKey: "avgUtilizedChart",
              },
            ],
          },
        },
        {
          id: create_UUID(),
          ideaName: "Accepted vs Rejected offers",
          displayName: "Accepted vs Rejected offers",
          ideaData: {
            kpis: [
              {
                id: create_UUID(),
                type: "radialBar",
                dataKeys: [
                  { key: "rejectedWeightedApr", unitInCcy: false },
                  { key: "rejectedAmount", unitInCcy: true },
                ],
              },
              {
                id: create_UUID(),
                type: "radialBar",
                dataKeys: [
                  { key: "yieldRejectedWeightedApr", unitInCcy: false },
                  { key: "limitRejectedWeightedApr", unitInCcy: false },
                ],
              },
            ],
            trends: [
              {
                id: create_UUID(),
                type: "lineChart",
                currencyOnYaxis: true,
                lines: [
                  {
                    key: "rejectedAmount",
                    name: "Rejected Amount",
                    dashedLine: false,
                  },
                ],
                dataKey: "rejectedAmountChart",
              },
              {
                id: create_UUID(),
                type: "lineChart",
                currencyOnYaxis: true,
                lines: [
                  {
                    key: "yieldRejected",
                    name: "Yield Rejected",
                    dashedLine: false,
                  },
                  {
                    key: "limitRejected",
                    name: "Limit Rejected",
                    dashedLine: false,
                  },
                ],
                dataKey: "rejectedByTypeChart",
              },
            ],
          },
        },
        {
          id: create_UUID(),
          ideaName: "Offers",
          displayName: "Offers",
          ideaData: {
            kpis: [
              {
                id: create_UUID(),
                type: "radialBar",
                dataKeys: [
                  { key: "lowOfferRate", unitInCcy: false },
                  { key: "highOfferRate", unitInCcy: false },
                ],
              },
            ],
            trends: [
              {
                id: create_UUID(),
                type: "differenceBarChart",
                unit: "%",
                dataKey: "highLowOfferChart",
              },
            ],
          },
        },
      ],
      observations: { dataKey: "yogiObservations" },
      recommendations: {
        dataKey: "yogiRecommendations",
        routeInfo: {
          url: "/recommendations",
          params: {},
        },
      },
    },
    {
      id: create_UUID(),
      ideaName: "Infographs",
      displayName: "Infographs",
      layout: "infographs",
      defaultFilter: {
        idea: "Top 10 Suppliers",
        recommendation: "Total Early Payment Amount",
      },
      ideas: [
        {
          id: create_UUID(),
          ideaName: "Supplier’s Country/Region",
          displayName: "Supplier’s Country/Region",
          recommendations: [
            {
              id: create_UUID(),
              name: "Total Early Payment Amount",
              displayName: "Total Early Payment Amount",
              tableData: {
                columns: [
                  {
                    field: "country.name",
                    title: "Country",
                    dontTruncate: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "totalEpa",
                    title: "Total EPA",
                    dontTruncate: true,
                    width: "35%",
                    formatByCurrency: true,
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "supplierCountryAndTotalEpaWorldMap",
              },
            },
            {
              id: create_UUID(),
              name: "Total Revenue Earned",
              displayName: "Total Revenue Earned",
              tableData: {
                columns: [
                  {
                    field: "country.name",
                    title: "Country",
                    dontTruncate: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "totalRevenueEarned",
                    title: "Tot. Revenue Earned",
                    dontTruncate: true,
                    width: "35%",
                    formatByCurrency: true,
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "supplierCountryAndTotalRevenueEarnedWorldMap",
              },
            },
            {
              id: create_UUID(),
              name: "Avg Weighted APR",
              displayName: "Avg Weighted APR",
              tableData: {
                columns: [
                  {
                    field: "country.name",
                    title: "Country",
                    dontTruncate: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "avgWeightedAPR",
                    title: "Avg. Weighted APR",
                    dontTruncate: true,
                    width: "35%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "supplierCountryAndAvgWeightedAprWorldMap",
              },
            },
            {
              id: create_UUID(),
              name: "Rejected Amount",
              displayName: "Rejected Amount",
              tableData: {
                columns: [
                  {
                    field: "country.name",
                    title: "Country",
                    dontTruncate: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "rejectedAmount",
                    title: "Rejected Amount",
                    dontTruncate: true,
                    width: "35%",
                    formatByCurrency: true,
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "supplierCountryAndRejectedAmountWorldMap",
              },
            },
          ],
        },
        {
          id: create_UUID(),
          ideaName: "Top 10 Suppliers",
          displayName: "Top 10 Suppliers",
          recommendations: [
            {
              id: create_UUID(),
              name: "Total Early Payment Amount",
              displayName: "Total Early Payment Amount",
              tableData: {
                columns: [
                  {
                    field: "supplierTopId",
                    title: "Supplier",
                    dontTruncate: true,

                    renderAvatarComp: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "totalEPAmount",
                    title: "Total EPA",
                    dontTruncate: true,
                    width: "35%",
                    formatByCurrency: true,
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "top10SuppliersByTotalEPAmount",
              },
            },
            {
              id: create_UUID(),
              name: "Total Revenue Earned",
              displayName: "Total Revenue Earned",
              tableData: {
                columns: [
                  {
                    field: "supplierTopId",
                    title: "Supplier",
                    dontTruncate: true,
                    renderAvatarComp: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "totalRevenueEarned",
                    title: "Tot. Revenue Earned",
                    dontTruncate: true,
                    width: "35%",
                    formatByCurrency: true,
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "top10SuppliersByTotalRevenueEarned",
              },
            },
            {
              id: create_UUID(),
              name: "Avg Weighted APR",
              displayName: "Avg Weighted APR",
              tableData: {
                columns: [
                  {
                    field: "supplierTopId",
                    title: "Supplier",
                    dontTruncate: true,
                    renderAvatarComp: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "avgWeightedAPR",
                    title: "Avg. Weighted APR",
                    dontTruncate: true,
                    width: "35%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "top10SuppliersByAvgWeightedApr",
              },
            },
            {
              id: create_UUID(),
              name: "Rejected Amount",
              displayName: "Rejected Amount",
              tableData: {
                columns: [
                  {
                    field: "supplierTopId",
                    title: "Supplier",
                    dontTruncate: true,
                    renderAvatarComp: true,
                    width: "65%",
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                  {
                    field: "totalRejectedAmount",
                    title: "Rejected Amount",
                    dontTruncate: true,
                    width: "35%",
                    formatByCurrency: true,
                    cellStyle: { borderColor: "#5c5c5c" },
                  },
                ],
                dataKey: "top10SuppliersByTotalRejectedAmount",
              },
            },
          ],
        },
      ],
    },
  ],
};
