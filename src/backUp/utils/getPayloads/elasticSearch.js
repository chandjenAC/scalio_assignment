export const getElasticSearchPayload = (
  serverName,
  indexName,
  must,
  paging,
  sort
) => {
  let body;
  let criteria;
  if (must.length > 0) {
    criteria = {
      query: {
        bool: {
          must: must,
        },
      },
      from: paging.from,
      size: paging.pageSize,
      sort: sort,
    };
  } else {
    criteria = {
      from: paging.from,
      size: paging.pageSize,
      sort: sort,
    };
  }
  body = {
    serverName: serverName,
    indexName: indexName,
    criteria: criteria,
  };
  return body;
};

export const getAggregatePayload = (serverName, indexName, size, field) => {
  let body = {
    serverName: serverName,
    indexName: indexName,
    options: {
      slimObject: false,
    },
    criteria: {
      size: 0,
      aggs: {
        my_buckets: {
          composite: {
            size: size,
            sources: [
              {
                uniqueValue: {
                  terms: {
                    field: field,
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
  return body;
};

const getSamplingFreqByGte = (gte) => {
  return gte === "now-1h"
    ? "10m"
    : gte === "now-1d/d"
    ? "2h"
    : gte === "now-1w/w"
    ? "1d"
    : gte === "now-1M/M"
    ? "1d"
    : "";
};

const getLtFromGte = (gte) => {
  return gte === "now-1h/h"
    ? "now/h"
    : gte === "now-1d/d"
    ? "now/d"
    : gte === "now-1w/w"
    ? "now/w"
    : gte === "now-1M/M"
    ? "now/M"
    : "now";
};

export const getTopHitsByField = ({ serverName, indexName, field, size }) => {
  let body = {
    serverName: serverName,
    indexName: indexName,
    options: {
      slimObject: false,
    },
    criteria: {
      size: 0,
      aggs: {
        top_hits: {
          terms: {
            field: field,
            size: size,
          },
        },
      },
    },
  };
  return body;
};

export const getAggTopHitsByField = ({
  serverName,
  indexName,
  field,
  gte,
  size,
}) => {
  let body = {
    serverName: serverName,
    indexName: indexName,
    options: {
      slimObject: false,
    },
    criteria: {
      size: 0,
      query: {
        bool: {
          filter: {
            range: {
              timestamp: {
                gte: gte,
                lt: getLtFromGte(gte),
              },
            },
          },
        },
      },
      aggs: {
        top_hits: {
          terms: {
            field: field,
            size: size,
          },
          aggs: {
            sampleBy: {
              date_histogram: {
                field: "timestamp",
                fixed_interval: getSamplingFreqByGte(gte),
                keyed: true,
              },
            },
          },
        },
      },
    },
  };
  return body;
};

export const getTopDates = ({ serverName, indexName, size }) => {
  let body = {
    serverName: serverName,
    indexName: indexName,
    options: {
      slimObject: false,
    },
    criteria: {
      size: 0,
      aggs: {
        top_hits_by_day: {
          date_histogram: {
            field: "timestamp",
            fixed_interval: "1d",
            format: "yyyy-MM-dd",
            order: {
              _count: "desc",
            },
          },
          aggs: {
            top_five: {
              bucket_sort: {
                sort: [],
                size: size,
              },
            },
          },
        },
      },
    },
  };
  return body;
};

export const getAggTopDates = ({ serverName, indexName, gte, size }) => {
  let body = {
    serverName: serverName,
    indexName: indexName,
    options: {
      slimObject: false,
    },
    criteria: {
      size: 0,
      query: {
        bool: {
          filter: {
            range: {
              timestamp: {
                gte: gte,
                lt: getLtFromGte(gte),
              },
            },
          },
        },
      },
      aggs: {
        top_hits_by_day: {
          date_histogram: {
            field: "timestamp",
            fixed_interval: getSamplingFreqByGte(gte),
            // format: "yyyy-MM-dd",
            order: {
              _count: "desc",
            },
          },
          aggs: {
            top_apps: {
              terms: {
                field: "clientAppId.keyword",
                size: 3,
              },
            },
            top_starfleets: {
              terms: {
                field: "starfleetName.keyword",
                size: 3,
              },
            },
            top_five: {
              bucket_sort: {
                sort: [],
                size: size,
              },
            },
          },
        },
      },
    },
  };
  return body;
};

export const getRecentActivityByFilters = ({
  activityType,
  userId,
  org,
  starfleet,
  app,
  status,
  dateTime,
  size,
}) => {
  let must = [];
  if (activityType) {
    must.push({
      match: {
        "activityType.keyword": activityType,
      },
    });
  }
  if (userId) {
    must.push({
      match: {
        "userId.keyword": userId,
      },
    });
  }
  if (org) {
    must.push({
      match: {
        "avatarName.keyword": org,
      },
    });
  }
  if (starfleet) {
    must.push({
      match: {
        "starfleetName.keyword": starfleet,
      },
    });
  }
  if (app) {
    must.push({
      match: {
        "clientAppId.keyword": app,
      },
    });
  }
  if (status) {
    must.push({
      match: {
        "status.keyword": status,
      },
    });
  }

  if (dateTime.gte && dateTime.lte) {
    must.push({
      range: {
        ["timestamp"]: {
          gte: dateTime.gte,
          lte: dateTime.lte,
        },
      },
    });
  }

  let body = {
    serverName: "txn",
    indexName: "user-audit-log-*",
    options: {
      slimObject: false,
    },
    criteria: {
      query: {
        bool: {
          must: must,
        },
      },
      from: 0,
      size: size,
      sort: [
        {
          timestamp: {
            order: "desc",
          },
        },
      ],
    },
  };
  return body;
};
