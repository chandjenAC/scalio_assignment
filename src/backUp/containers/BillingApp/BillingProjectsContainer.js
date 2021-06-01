import React, { useContext, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import BillingProjects from "../../components/billingApp/BillingProjects";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import PriceBookContainer from "./PriceBookContainer";
import { env } from "../../ENV";
import { del, post, put ,usePostApiCall} from "../../utils/callApi";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { renderSnackbar } from "../../utils";
import { useSnackbar } from "notistack";
import AsyncPaginatedSelect from "../Common/AsyncPaginatedSelect";
import { buyerLoadOptions } from "../../utils/loadOptions";
import ViewBillingProjectDetails from "../../components/billingApp/ViewBillingProjectDetails";
import EditBillingProjectDetails from "../../components/billingApp/EditBillingProjectDetails";
import InAppLayout from "../../layouts/InAppLayout";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";

const useStyles = makeStyles((theme) => ({
  title: { width: "100%" },
}));

const BillingProjectsContainer = (props) => {
  const { resource } = props;

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setBreadcrumbs } = useContext(BreadcrumbContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const post=usePostApiCall()

  const routedFromStatementMenu = location.pathname.includes("statements");
  const routedFromContractsExpSoon = location.pathname.includes(
    "contractsExpiringSoon"
  );
  const projectIds = location?.state?.projectIds;
  const projectId = params.projectId; // passed as url param when called from ViewProfileContainer
  const clientTopId = params.clientTopId; //passed as url param when called from ActivityByClientContainer

  useEffect(() => {
    if (projectIds) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
          path: "/yogi-webb/billing/statements",
        },
        {
          title: getResourceValueByKey(resource, "CONTRACT", "Contract"),
        },
      ]);
    } else if (clientTopId) {
      if (routedFromStatementMenu) {
        setBreadcrumbs([
          {
            title: getResourceValueByKey(resource, "BILLING", "Billing"),
            path: "/yogi-webb/billing",
          },
          {
            title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
            path: "/yogi-webb/billing/statements",
          },
          {
            title: getResourceValueByKey(resource, "CLIENT", "Client"),
            path: `/yogi-webb/billing/statements/${clientTopId}`,
          },
          {
            title: getResourceValueByKey(resource, "PROFILE", "Profile"),
            path: `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}`,
          },
          {
            title: getResourceValueByKey(resource, "CONTRACT", "Contract"),
            path: `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}/contractDetails`,
          },
        ]);
      } else {
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
          {
            title: getResourceValueByKey(resource, "PROFILE", "Profile"),
            path: `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}`,
          },
          {
            title: getResourceValueByKey(resource, "CONTRACT", "Contract"),
            path: `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}/contractDetails`,
          },
        ]);
      }
    } else if (routedFromContractsExpSoon) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "STATMENTS", "Statements"),
          path: `/yogi-webb/billing/statements`,
        },
        {
          title: getResourceValueByKey(resource, "CONTRACT", "Contract"),
          path: `/yogi-webb/billing/statements/contractsExpiringSoon`,
        },
      ]);
    } else if (projectId) {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "CLIENT", "Client"),
          path: `/yogi-webb/billing/project/${projectId}`,
        },
        {
          title: getResourceValueByKey(resource, "CONTRACT", "Contract"),
          path: `/yogi-webb/billing/project/${projectId}/contractDetails`,
        },
      ]);
    } else {
      setBreadcrumbs([
        {
          title: getResourceValueByKey(resource, "BILLING", "Billing"),
          path: "/yogi-webb/billing",
        },
        {
          title: getResourceValueByKey(resource, "ADMIN", "Admin"),
          path: `/yogi-webb/billing/admin`,
        },
      ]);
    }
  }, []);

  const columns = [
    {
      field: "customerTopId",
      title: getResourceValueByKey(resource, "CUSTOMER_NAME", "Customer Name"),
      render: (rowData) => (
        <Typography variant="caption" style={{ fontWeight: 600 }}>
          {rowData.customerName}
        </Typography>
      ),
      editComponent: (props) => {
        const getValue = (selectedOption) => {
          props.rowData.customerName = selectedOption?.label;
          props.onChange(selectedOption?.value);
        };
        return (
          <AsyncPaginatedSelect
            defaultValue={{
              value: props.rowData.customerTopId,
              label: props.rowData.customerName,
            }}
            loadOptions={buyerLoadOptions}
            onChange={getValue}
          />
        );
      },
      copy: true,
    },
    {
      field: "billingDetails.billingAccount.accountName",
      title: getResourceValueByKey(resource, "ACCOUNT_NAME", "Account Name"),
    },
    {
      field: "projectName",
      title: getResourceValueByKey(resource, "PROJECT_NAME", "Project Name"),
    },
    {
      field: "projectNumber",
      title: getResourceValueByKey(resource, "PROJECT_NUMBER", "Project No."),
    },
    {
      field: "billingDetails.billingCycle.cycleDate",
      title: getResourceValueByKey(resource, "CYCLE_DATE", "Cycle Date"),
      type: "numeric",
      align: "left",
    },
    {
      field: "billingDetails.billingCycle.cyclePeriod",
      title: getResourceValueByKey(resource, "CYCLE_PERIOD", "Cycle Period"),
    },
    {
      field: "status",
      title: getResourceValueByKey(resource, "STATUS", "Status"),
      editable: "never",
    },
    {
      field: "billingDetails",
      title: getResourceValueByKey(
        resource,
        "BILLING_DETAILS",
        "Billing Details"
      ),
      render: (rowData) => (
        <ViewBillingProjectDetails
          resource={resource}
          billingDetails={rowData.billingDetails}
        />
      ),
      editComponent: (props) => (
        <EditBillingProjectDetails
          resource={resource}
          billingDetails={props.rowData.billingDetails}
        />
      ),
    },
  ];

  const viewPricingModel = (data) => {
    if (clientTopId) {
      if (routedFromStatementMenu) {
        navigate(
          `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}/contractDetails/${data.id}`
        );
      } else {
        navigate(
          `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}/contractDetails/${data.id}`
        );
      }
    } else if (routedFromContractsExpSoon) {
      navigate(
        `/yogi-webb/billing/statements/contractsExpiringSoon/${data.id}`
      );
    } else if (projectId) {
      navigate(
        `/yogi-webb/billing/project/${projectId}/contractDetails/billingStructure/${data.id}`
      );
    } else {
      navigate(`${data.id}/pricingModel`, {
        state: { goBack: true, priceBookName: data.priceBookName },
      });
    }
  };

  const renderPricingBooksTable = (rowData) => {
    return (
      <div
        style={{
          padding: "5px 10px",
          marginLeft: 30,
          backgroundColor: "#f4f4f4",
        }}
      >
        <PriceBookContainer
          resource={resource}
          billingProjectId={rowData.id}
          viewPricingModel={viewPricingModel}
        />
      </div>
    );
  };

  const getBillingProjects = (query) => {
    return new Promise((resolve, reject) => {
      let filters = [];
      if (projectIds) {
        filters.push({
          fieldName: "id",
          operator: "in",
          values: projectIds,
        });
      }
      if (projectId) {
        filters.push({
          fieldName: "id",
          operator: "eq",
          values: projectId,
        });
      }
      let sort = [];
      let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
      let body = getFilterSortPaginate(filters, sort, paging);
      post(env.SEARCH_TOP_BILLING_PROJECTS, body).then((result) => {
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

  const addBillingProjects = async (newData) => {
    let response = await post(env.TOP_BILLING_PROJECTS, newData);
    renderSnackbar(enqueueSnackbar, response);
  };

  const updateBillingProjects = async (newData) => {
    let response = await put(
      `${env.TOP_BILLING_PROJECTS}/${newData.id}`,
      newData
    );
    renderSnackbar(enqueueSnackbar, response);
  };

  const deleteBillingProjects = async (oldData) => {
    let response = await del(`${env.TOP_BILLING_PROJECTS}/${oldData.id}`);
    renderSnackbar(enqueueSnackbar, response);
  };

  const getHeader = () => {
    return (
      <Typography
        variant="h6"
        align="left"
        color="textSecondary"
        className={classes.title}
      >
        {getResourceValueByKey(
          resource,
          "BILLING_PROJECTS",
          "Billing Projects"
        )}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <BillingProjects
        resource={resource}
        columns={columns}
        getBillingProjects={getBillingProjects}
        renderPricingBooksTable={renderPricingBooksTable}
        addBillingProjects={addBillingProjects}
        updateBillingProjects={updateBillingProjects}
        deleteBillingProjects={deleteBillingProjects}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default BillingProjectsContainer;
