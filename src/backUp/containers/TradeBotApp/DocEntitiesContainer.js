import React, { useEffect, useState } from "react";
import { post } from "../../utils/callApi";
import DocEntities from "../../components/tradebotApp/DocEntities";
import FormatDate from "../../components/common/FormatDate";
import { Typography } from "@material-ui/core";
import { formatAmount, formatTime } from "../../utils";
import isEmpty from "lodash/isEmpty";

const datePatterns = ["date", "createdon", "updatedon"];
const timePatterns = ["time"];
const amountPatterns = ["amount", "price"];

const DocEntitiesContainer = (props) => {
  const { resource, tokenId, url } = props;

  const [docEntities, setDocEntities] = useState(null);

  let headerColumns = [];
  let detailsColumns = [];
  let footerColumns = [];

  useEffect(() => {
    const getEntities = async () => {
      let body = {
        context: {},
        payload: {
          id: tokenId,
          paging: {
            pageSize: 20,
            currentPage: 1,
          },
        },
      };
      let response = await post(url, body);
      setDocEntities(response.data);
    };
    getEntities();
  }, []);

  const contains = (target, pattern) => {
    var value = 0;
    pattern.forEach(function(word) {
      value = value + target.includes(word);
    });
    return value === 1;
  };

  const getColumns = (data) => {
    let columnHeadings = [];
    let maxLength = 0;
    let lengthiestObj = {};
    if (data) {
      for (let i = 0; i < data.length; i++) {
        if (Object.keys(data[i])) {
          let length = Object.keys(data[i]).length;
          if (length > maxLength) {
            lengthiestObj = data[i];
            maxLength = length;
          }
        }
      }
      Object.keys(lengthiestObj).map((key) => {
        if (contains(key.toLowerCase(), datePatterns)) {
          columnHeadings.push({
            field: key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            render: (rowData) => <FormatDate date={rowData[key]} />,
          });
        } else if (contains(key.toLowerCase(), amountPatterns)) {
          columnHeadings.push({
            field: key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            render: (rowData) => (
              <Typography variant="body2">
                {formatAmount(rowData[key])}
              </Typography>
            ),
            align: "right",
          });
        } else if (
          contains(key.toLowerCase(), timePatterns) &&
          !["timezone", "timebelt"].includes(key.toLowerCase())
        ) {
          columnHeadings.push({
            field: key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
            render: (rowData) => (
              <Typography variant="body2">
                {rowData[key].length === 6
                  ? formatTime(rowData[key])
                  : rowData[key]}
              </Typography>
            ),
          });
        } else {
          columnHeadings.push({
            field: key,
            title: key.charAt(0).toUpperCase() + key.slice(1),
          });
        }
      });
    }

    return columnHeadings;
  };

  if (docEntities?.header) {
    headerColumns = getColumns([docEntities.header]);
  }
  if (docEntities?.detail?.length > 0) {
    detailsColumns = getColumns(docEntities.detail);
  }
  if (docEntities?.footer) {
    footerColumns = getColumns([docEntities.footer]);
  }

  const getDetailsGrid = (query) => {
    return new Promise((resolve, reject) => {
      let body = {
        context: {},
        payload: {
          id: tokenId,
          paging: {
            pageSize: query.pageSize,
            currentPage: query.page + 1,
          },
          requiredType: "detail",
        },
      };
      post(url, body).then((result) => {
        if (!isEmpty(result?.data)) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        }
      });
    });
  };

  return (
    <DocEntities
      resource={resource}
      docEntities={docEntities}
      getDetailsGrid={getDetailsGrid}
      headerColumns={headerColumns}
      detailsColumns={detailsColumns}
      footerColumns={footerColumns}
    />
  );
};

export default DocEntitiesContainer;
