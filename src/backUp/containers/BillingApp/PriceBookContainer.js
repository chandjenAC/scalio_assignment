import React, { useState } from "react";
import { Paper, Fade, makeStyles } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { del, post, put } from "../../utils/callApi";
import PriceBooks from "../../components/billingApp/PriceBooks";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import FormatDate from "../../components/common/FormatDate";
import { renderSnackbar } from "../../utils";
import { useSnackbar } from "notistack";
import { format, parseISO } from "date-fns";
import ClonePriceBookContainer from "./ClonePriceBookContainer";

const useStyles = makeStyles((theme) => ({
  fadePaper: {
    height: "100%",
    borderRadius: "25px 0px 0px 0px",
  },
}));

const PriceBookContainer = (props) => {
  const { resource, billingProjectId, viewPricingModel } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [clonePriceBook, setClonePriceBook] = useState(false);
  const [reloadTable, setReloadTable] = useState(null);

  const columns = [
    {
      field: "priceBookName",
      title: getResourceValueByKey(
        resource,
        "PRICE_BOOK_NAME",
        "Price Book Name"
      ),
      dontTruncate: true,
    },
    {
      field: "ccy",
      title: getResourceValueByKey(resource, "CURRENCY", "Currency"),
    },
    {
      field: "contractNumber",
      title: getResourceValueByKey(resource, "CONTRACT_NUMBER", "Contract No."),
    },
    {
      field: "contractStartDate",
      title: getResourceValueByKey(
        resource,
        "CONTRACT_START_DATE",
        "Contract Start Dt."
      ),
      render: (rowData) => (
        <FormatDate
          currentFormat={"yyyymmdd"}
          date={rowData.contractStartDate}
        />
      ),
      type: "date",
    },
    {
      field: "contractEndDate",
      title: getResourceValueByKey(
        resource,
        "CONTRACT_END_DATE",
        "Contract End Dt."
      ),
      render: (rowData) => (
        <FormatDate currentFormat={"yyyymmdd"} date={rowData.contractEndDate} />
      ),
      type: "date",
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      editable: "never",
    },
    {
      field: "version",
      title: getResourceValueByKey(resource, "VERSION", "Version"),
    },
    {
      field: "updateInfo.updatedOn",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      type: "datetime",
      editable: "never",
    },
  ];

  const handleReloadTable = () => {
    if (reloadTable === null) {
      setReloadTable(true);
    } else {
      setReloadTable(!reloadTable);
    }
  };

  const getPriceBooks = (query) => {
    let filter = [
      {
        fieldName: "billingProjectId",
        operator: "eq",
        values: [billingProjectId],
      },
    ];
    let sort = [];
    let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
    let body = getFilterSortPaginate(filter, sort, paging);
    return new Promise((resolve, reject) => {
      post(env.SEARCH_TOP_PRICE_BOOKS, body).then((result) => {
        if (result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result.recordCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
          });
        }
      });
    });
  };

  const addPriceBooks = async (newData) => {
    newData.billingProjectId = billingProjectId;
    newData.contractEndDate = format(
      new Date(newData.contractEndDate),
      "yyyyMMdd"
    );
    newData.contractStartDate = format(
      new Date(newData.contractStartDate),
      "yyyyMMdd"
    );
    let response = await post(env.TOP_PRICE_BOOKS, newData); //instead of post , create must be used
    renderSnackbar(enqueueSnackbar, response);
  };

  const updatePriceBooks = async (newData) => {
    let response = await put(`${env.TOP_PRICE_BOOKS}/${newData.id}`, newData);
    renderSnackbar(enqueueSnackbar, response);
  };

  const deletePriceBooks = async (oldData) => {
    let response = await del(`${env.TOP_PRICE_BOOKS}/${oldData.id}`);
    renderSnackbar(enqueueSnackbar, response);
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        {clonePriceBook && (
          <ClonePriceBookContainer
            resource={resource}
            billingProjectId={billingProjectId}
            setClonePriceBook={setClonePriceBook}
            handleReloadTable={handleReloadTable}
          />
        )}
        <PriceBooks
          resource={resource}
          columns={columns}
          getPriceBooks={getPriceBooks}
          addPriceBooks={addPriceBooks}
          updatePriceBooks={updatePriceBooks}
          deletePriceBooks={deletePriceBooks}
          setClonePriceBook={setClonePriceBook}
          reloadTable={reloadTable}
          viewPricingModel={viewPricingModel}
        />
      </Paper>
    </Fade>
  );
};

export default PriceBookContainer;
