import React, { useContext, useEffect } from "react";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { del, post } from "../../utils/callApi";
import { renderSnackbar } from "../../utils";
import { useSnackbar } from "notistack";
import AllBanks from "../../components/banksApp/AllBanks";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import ViewBankCodes from "../../components/banksApp/ViewBankCodes";
import EditBankCodes from "../../components/banksApp/EditBankCodes";
import AccountSpecContainer from "./AccountSpecContainer";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

const AllBanksContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "BANKS", "Banks"),
        path: "/yogi-webb/banks",
      },
    ]);
  }, []);

  const columns = [
    {
      field: "bankName",
      title: getResourceValueByKey(resource, "BANK_NAME", "Bank Name"),
      dontTruncate: true,
    },
    {
      field: "branchName",
      title: getResourceValueByKey(resource, "BRANCH_NAME", "Branch Name"),
    },
    {
      field: "address",
      title: getResourceValueByKey(resource, "ADDRESS", "Address"),
      dontTruncate: true,
    },
    {
      field: "city",
      title: getResourceValueByKey(resource, "CITY", "City"),
    },
    {
      field: "province",
      title: getResourceValueByKey(resource, "PROVINCE", "Province"),
    },
    {
      field: "state",
      title: getResourceValueByKey(resource, "STATE", "State"),
    },
    {
      field: "countryCode",
      title: getResourceValueByKey(resource, "COUNTRY", "Country"),
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      editable: "never",
    },
    {
      field: "createdBy",
      title: getResourceValueByKey(resource, "CREATED_BY", "Created By"),
      editable: "never",
    },
    {
      field: "updateInfo.updatedOn",
      title: getResourceValueByKey(resource, "UPDATED_ON", "Updated On"),
      type: "datetime",
      editable: "never",
      filtering: false,
    },
    {
      field: "specName",
      title: getResourceValueByKey(resource, "ACCOUNT_SPEC.", "Account Spec."),
      render: (rowData) => {
        return (
          <AccountSpecContainer
            resource={resource}
            specName={rowData.specName}
          />
        );
      },
      editable: "never",
      dontTruncate: true,
    },
    {
      field: "bankCodes",
      title: getResourceValueByKey(resource, "BANK_CODES", "Bank Codes"),
      render: (rowData) => {
        return <ViewBankCodes resource={resource} rowData={rowData} />;
      },
      editComponent: (props) => (
        <EditBankCodes
          resource={resource}
          rowData={props.rowData}
          onChange={props.onChange}
        />
      ),
      filtering: false,
    },
  ];

  const getBanks = (query) => {
    let filters = [];
    let sort = [
      {
        fieldName: "bankName",
        sortOrder: "asc",
      },
    ];
    if (query.filters.length > 0 && query.filters[0].value) {
      query.filters.forEach((filter) => {
        if (filter.value) {
          filters.push({
            fieldName: filter.column.field,
            operator: "like",
            values: [filter.value],
            ignoreCase: true,
          });
        }
      });
    }
    let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
    let body = getFilterSortPaginate(filters, sort, paging);
    return new Promise((resolve, reject) => {
      post(env.SEARCH_BANKS, body).then((result) => {
        if (Array.isArray(result?.data) && result?.data?.length > 0) {
          resolve({
            data: result.data,
            page: Number(query.page),
            totalCount: Number(result?.recordCount),
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

  const addBank = async (newData) => {
    let response = await post(env.CREATE_BANK, newData);
    renderSnackbar(enqueueSnackbar, response);
  };

  const updateBank = async (newData) => {
    let response = await post(env.UPDATE_BANK, newData);
    renderSnackbar(enqueueSnackbar, response);
  };

  const deleteBank = async (oldData) => {
    let response = await del(`${env.DELETE_BANK}/${oldData.id}`);
    renderSnackbar(enqueueSnackbar, response);
  };

  const getHeader = () => {
    return (
      <AppHeader title={getResourceValueByKey(resource, "BANKS", "Banks")} />
    );
  };

  const getMainSection = () => {
    return (
      <AllBanks
        resource={resource}
        columns={columns}
        getBanks={getBanks}
        addBank={addBank}
        updateBank={updateBank}
        deleteBank={deleteBank}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default AllBanksContainer;
