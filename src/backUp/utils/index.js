import subSeconds from "date-fns/subSeconds";
import subMinutes from "date-fns/subMinutes";
import subHours from "date-fns/subHours";
import subDays from "date-fns/subDays";
import subWeeks from "date-fns/subWeeks";
import subMonths from "date-fns/subMonths";
import subYears from "date-fns/subYears";
import addSeconds from "date-fns/addSeconds";
import addMinutes from "date-fns/addMinutes";
import addHours from "date-fns/addHours";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import startOfMinute from "date-fns/startOfMinute";
import startOfSecond from "date-fns/startOfSecond";
import startOfHour from "date-fns/startOfHour";
import startOfDay from "date-fns/startOfDay";
import startOfWeek from "date-fns/startOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";
import format from "date-fns/format";
import { parseISO } from "date-fns";

export const errorHandler = (error, errorInfo) => {
  console.log("Logging error", error, errorInfo);
};

export const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
    c
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const getGraphData = (data) => {
  let formattedData = [];
  for (let i = 0; i < data.length; i++) {
    let factor = {
      id: data[i].name,
      data: data[i].datapoints,
    };
    formattedData.push(factor);
  }
  return formattedData;
};

export const getRechartsData = (data) => {
  let datapoints = [];
  data.map((item, i) => {
    item.datapoints.map((point, j) => {
      if (i === 0) {
        datapoints.push({
          name: point.x,
          [item.name]: point.y,
        });
      } else {
        datapoints[j][item.name] = point.y;
      }
    });
  });
  return datapoints;
};

export const flatten = (obj, prefix = "", res = {}) =>
  Object.entries(obj).reduce((r, [key, val]) => {
    const k = `${prefix}${key}`;
    if (typeof val === "object") {
      flatten(val, `${k}.`, r);
    } else {
      res[k] = val;
    }
    return r;
  }, res);

// [
//   {
//     "ocr-itemId": "1",
//     Quantity_Shipped: "4.000",
//     Extended_Value: "61.76",
//     Country_of_Origin: ""
//   },
//   {
//     "ocr-itemId": "2",
//     Quantity_Shipped: "4.000",
//     Extended_Value: "61.76",
//     Country_of_Origin: ""
//   }
// ];
// Above shown is the sample data used to extract column headings which is then used to render rows by mapping data... `data[index].columnHeading` will be the corresponding row value

export const getTableColumnHeadings = (data) => {
  let columnHeadings = [];
  let maxLength = 0;
  let lengthiestObj = {};

  for (let i = 0; i < data.length; i++) {
    let length = Object.keys(data[i]).length;
    if (length > maxLength) {
      lengthiestObj = data[i];
      maxLength = length;
    }
  }

  Object.keys(lengthiestObj).map((key) => {
    return columnHeadings.push(key);
  });
  return columnHeadings;
};

export const getOrderedColumnHeadings = (data) => {
  let columnHeadings = [];

  data[0].map((item) => {
    return columnHeadings.push(item.keyword);
  });

  return columnHeadings;
};

export const getWhiteListedValues = (data, whiteList) => {
  let whiteListedKeyValues = {};
  let parent = []; //contains the array of whitelisted values like address line1, line2, city, state..

  const check = (keyName) => {
    if (data.hasOwnProperty(keyName)) {
      if (whiteList[keyName] === null) {
        let parentKey = keyName.split(".")[0];
        parent.push(data[keyName]);
        whiteListedKeyValues[whiteList[parentKey]] = parent;
      } else {
        whiteListedKeyValues[whiteList[keyName]] = data[keyName];
      }
    }
  };

  Object.keys(whiteList).map((keyName, i) => {
    return check(keyName);
  });

  return whiteListedKeyValues;
};

export const getTypeMeta = (types, key) => {
  let selectedType = types.filter((e) => e.id === key);
  return selectedType[0];
};

export const formatHashAddress = (str) => {
  let formattedStr =
    str.substring(0, 8) + "....." + str.substring(50, str.length);
  return formattedStr;
};

export const trimString = (str) => {
  let formattedStr = `${str.toString().substring(0, 30)}...`;
  return formattedStr;
};

export const addColumn = (tableItems, index, columnName) => {
  tableItems.columns.splice(index - 1, 0, columnName);
  tableItems.lineItems.map((item) => {
    item[columnName] = "";
  });
};

export const deleteColumn = (tableItems, index, columnName) => {
  tableItems.columns.splice(index - 1, 1);
  tableItems.lineItems.map((item) => {
    delete item[columnName];
  });
};

//function to reorder list
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
  return array;
};

const mlist = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const getMonthName = (month) => {
  return mlist[month - 1];
};

const options = [
  "Seconds ago",
  "Minutes ago",
  "Hours ago",
  "Days ago",
  "Weeks ago",
  "Months ago",
  "Years ago",
  "Seconds from now",
  "Minutes from now",
  "Hours from now",
  "Days from now",
  "Weeks from now",
  "Months from now",
  "Years from now",
];

export const calcDateFromOffset = (offset, offsetBy, checked) => {
  switch (offsetBy) {
    case "Seconds ago":
      return checked
        ? startOfSecond(subSeconds(new Date(), offset))
        : subSeconds(new Date(), offset);

    case "Minutes ago":
      return checked
        ? startOfMinute(subMinutes(new Date(), offset))
        : subMinutes(new Date(), offset);

    case "Hours ago":
      return checked
        ? startOfHour(subHours(new Date(), offset))
        : subHours(new Date(), offset);

    case "Days ago":
      return checked
        ? startOfDay(subDays(new Date(), offset))
        : subDays(new Date(), offset);

    case "Weeks ago":
      return checked
        ? startOfWeek(subWeeks(new Date(), offset))
        : subWeeks(new Date(), offset);

    case "Months ago":
      return checked
        ? startOfMonth(subMonths(new Date(), offset))
        : subMonths(new Date(), offset);

    case "Years ago":
      return checked
        ? startOfYear(subYears(new Date(), offset))
        : subYears(new Date(), offset);

    case "Seconds from now":
      return addSeconds(new Date(), offset);

    case "Minutes from now":
      return addMinutes(new Date(), offset);

    case "Hours from now":
      return addHours(new Date(), offset);

    case "Days from now":
      return addDays(new Date(), offset);

    case "Weeks from now":
      return addWeeks(new Date(), offset);

    case "Months from now":
      return addMonths(new Date(), offset);

    case "Years from now":
      return addYears(new Date(), offset);

    default:
      break;
  }
};

export const formatAmount = (amount) => {
  let locale = localStorage.getItem("locale") || "en-US";
  amount = Number(amount) || 0;
  let formattedAmount = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(amount);
  return formattedAmount;
};

export const formatNumber = (
  number,
  mininumFractionDigits,
  maximumFractionDigits,
  notation
) => {
  let locale = localStorage.getItem("locale") || "en-US";
  number = Number(number);
  let formattedNumber = new Intl.NumberFormat(locale, {
    notation: notation || "standard",
    minimumFractionDigits: mininumFractionDigits || 0,
    maximumFractionDigits: maximumFractionDigits || 0,
  }).format(number);
  return formattedNumber;
};

export const formatAmountByCcy = ({
  amount,
  ccy,
  minFractionDigits,
  maxFractionDigits,
  currencyDisplay,
  notation,
}) => {
  let locale = localStorage.getItem("locale") || "en-US";
  let formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: ccy,
    notation: notation || "compact",
    compactDisplay: "short",
    currencyDisplay: currencyDisplay || "narrowSymbol",
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
  }).format(amount);
  return formattedAmount;
};

export const seperateAndFormatDate = (date) => {
  // seperate dates of format "yyyymmdd"
  let year, month, day;
  year = date.substring(0, 4);
  month = date.substring(4, 6);
  day = date.substring(6, 8);
  return format(new Date(year, month - 1, day), "MM/dd/yyyy");
};

export const formatTime = (time) => {
  let hour = time.substring(0, 2);
  let min = time.substring(2, 4);
  let sec = time.substring(4, 6);
  let formattedTime = `${hour}:${min}:${sec}`;
  return formattedTime;
};

export const isDashboard = (pathname) => {
  if (isEpDashboard(pathname) || isAuditDashboard(pathname)) {
    return true;
  }
  return false;
};

export const isEpDashboard = (pathname) => {
  if (pathname[2] === "dashboard") {
    if (
      pathname.length === 3 ||
      (pathname.length === 4 && pathname[3] === "")
    ) {
      return true;
    }
  }
  return false;
};

export const isAuditDashboard = (pathname) => {
  if (pathname[2] === "audit") {
    if (
      pathname.length === 3 ||
      (pathname.length === 4 && pathname[3] === "")
    ) {
      return true;
    }
  }
  return false;
};

export const customTickFormatter = (amount, ccy) => {
  return ccy
    ? formatAmountByCcy({
        amount: amount || 0,
        ccy: ccy,
        minFractionDigits: 0,
        maxFractionDigits: 1,
      })
    : amount;
};

export const renderSnackbar = (enqueueSnackbar, response) => {
  const msg = response?.status?.message;
  const variant = response?.status?.success ? "success" : "error";
  enqueueSnackbar(msg, { variant });
};

export const getFilterLabelByValue = (filterOptions, value) => {
  let filter = filterOptions.find((o) => o.value === value);
  return filter.label;
};

export const findIfDateOnXaxis = (gte) => {
  if (["now-1M/M", "now-1w/w"].includes(gte)) {
    return true;
  }
  return false;
};

export const findIfTimeOnXaxis = (gte) => {
  if (["now-1d/d", "now-1h"].includes(gte)) {
    return true;
  }
  return false;
};

export const getLineGraphDataFromResponse = (data) => {
  let sampleGraphData = {
    data: [],
    lines: [],
  };
  let longest = {};
  data.data.top_hits.buckets.map((bucket) => {
    sampleGraphData.lines.push({ key: bucket.key, name: bucket.key });
    if (
      Object.keys(bucket.sampleBy.buckets).length > Object.keys(longest).length
    ) {
      longest = bucket.sampleBy.buckets;
    }
  });
  Object.keys(longest).map((key) =>
    sampleGraphData.data.push({ name: longest[key].key_as_string })
  );
  sampleGraphData.data.map((item) => {
    data.data.top_hits.buckets.map((bucket) => {
      item[bucket.key] = bucket.sampleBy.buckets[item.name]?.doc_count
        ? bucket.sampleBy.buckets[item.name].doc_count
        : 0;
    });
  });
  return sampleGraphData;
};

export const getComposedGraphDataFromResponse = (data) => {
  let sampleGraphData = { data: [], bars: { apps: [], starfleets: [] } };
  data.data.top_hits_by_day.buckets.map((bucket) => {
    let tempData = {};

    tempData.name = bucket.key_as_string;
    tempData.count = bucket.doc_count;
    bucket.top_apps.buckets.map((app) => {
      tempData[app.key] = app.doc_count;
      if (!sampleGraphData.bars.apps.includes(app.key)) {
        sampleGraphData.bars.apps.push(app.key);
      }
    });
    bucket.top_starfleets.buckets.map((starfleet) => {
      tempData[starfleet.key] = starfleet.doc_count;
      if (!sampleGraphData.bars.starfleets.includes(starfleet.key)) {
        sampleGraphData.bars.starfleets.push(starfleet.key);
      }
    });
    sampleGraphData.data.push(tempData);
  });
  return sampleGraphData;
};

export const getPieChartDataFromResponse = (data) => {
  let temp = [];
  data.map((bucket) => {
    temp.push({ name: bucket.key, value: bucket.doc_count });
  });
  return temp;
};

export const formatXAxis = (tickItem, isDateOnXaxis, isTimeOnXaxis) => {
  return isDateOnXaxis
    ? format(new Date(parseISO(tickItem)), "MM/dd/yyyy")
    : isTimeOnXaxis
    ? format(new Date(tickItem), "HH:mm a")
    : tickItem;
};
