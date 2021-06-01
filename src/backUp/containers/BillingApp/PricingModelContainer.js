import React, { useContext, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import PricingModel from "../../components/billingApp/PricingModel";
import { useLocation, useParams } from "react-router-dom";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { del, post, put } from "../../utils/callApi";
import { getFilterSortPaginate } from "../../utils/getPayloads/getFilterSortPaginate";
import PricingModelTierContainer from "./PricingModelTierContainer";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { formatAmount, renderSnackbar } from "../../utils";
import { useSnackbar } from "notistack";
import SelectMolecule from "../../components/common/molecules/SelectMolecule";
import TextField from "@material-ui/core/TextField";
import InAppLayout from "../../layouts/InAppLayout";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
  },
}));

const PricingModelContainer = (props) => {
  const { resource } = props;

  const params = useParams();
  const location = useLocation();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const routedFromStatementMenu = location.pathname.includes("statements");
  const routedFromHomeMenu = location.pathname.includes(
    "contractDetails/billingStructure"
  );
  const routedFromContractsExpSoon = location.pathname.includes(
    "contractsExpiringSoon"
  );
  const projectId = params.projectId; // url params passed when called from ViewProfileContainer
  const clientName = location?.state?.clientName; // location state passed when called from ViewProfileContainer
  const pricingBookId = params.pricingBookId;
  const clientTopId = params.clientTopId;
  const priceBookName = location.state?.priceBookName;

  useEffect(() => {
    if (clientTopId) {
      if (routedFromStatementMenu) {
        setBreadcrumbs([
          {
            title: getResourceValueByKey(resource, "BILLING", "Billing"),
            path: "/yogi-webb/billing",
          },
          {
            title: getResourceValueByKey(resource, "STATEMENTS", "STATEMENTS"),
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
            title: getResourceValueByKey(
              resource,
              "BILLING_STRUCTURE",
              "Billing Structure"
            ),
            path: `/yogi-webb/billing/statements/${clientTopId}/profile/${projectId}/billingStructure/${pricingBookId}`,
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
            title: getResourceValueByKey(
              resource,
              "BILLING_STRUCTURE",
              "Billing Structure"
            ),
            path: `/yogi-webb/billing/activity/${clientTopId}/profile/${projectId}/billingStructure/${pricingBookId}`,
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
          title: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
          path: `/yogi-webb/billing/statements`,
        },
        {
          title: getResourceValueByKey(resource, "CONTRACT", "Contract"),
          path: `/yogi-webb/billing/statements/contractsExpiringSoon`,
        },
        {
          title: getResourceValueByKey(
            resource,
            "BILLING_STRUCTURE",
            "Billing Structure"
          ),
          path: `/yogi-webb/billing/statements/contractsExpiringSoon/${pricingBookId}`,
        },
      ]);
    } else if (routedFromHomeMenu) {
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
        {
          title: getResourceValueByKey(
            resource,
            "BILLING_STRUCTURE",
            "Billing Structure"
          ),
          path: `/yogi-webb/billing/project/${projectId}/contractDetails`,
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
          title: getResourceValueByKey(
            resource,
            "BILLING_STRUCTURE",
            "Billing Structure"
          ),
          path: "/yogi-webb/billing",
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
          path: "/yogi-webb/billing/admin",
        },
        {
          title: priceBookName ? priceBookName : pricingBookId,
          path: `/yogi-webb/billing/admin/${pricingBookId}/pricingModel`,
        },
      ]);
    }
  }, []);

  const pricingTypeOptions = [
    {
      label: getResourceValueByKey(resource, "PERCENTAGE", "PERCENTAGE"),
      value: "PERCENTAGE",
    },
    {
      label: getResourceValueByKey(resource, "FIXED", "FIXED"),
      value: "FIXED",
    },
    {
      label: getResourceValueByKey(resource, "BPTS", "BPTS"),
      value: "BPTS",
    },
    {
      label: getResourceValueByKey(resource, "YIELD", "YIELD"),
      value: "YIELD",
    },
  ];

  const txnTypeOptions = [
    {
      label: getResourceValueByKey(resource, "EP", "EP"),
      value: "EP",
    },
    {
      label: getResourceValueByKey(resource, "APF", "APF"),
      value: "APF",
    },
    {
      label: getResourceValueByKey(resource, "EP-SEDA", "EP-SEDA"),
      value: "EP-SEDA",
    },
    {
      label: getResourceValueByKey(resource, "BAPD", "BAPD"),
      value: "BAPD",
    },
    {
      label: getResourceValueByKey(resource, "CAPD", "CAPD"),
      value: "CAPD",
    },
    {
      label: getResourceValueByKey(resource, "UDI", "UDI"),
      value: "UDI",
    },
    {
      label: getResourceValueByKey(resource, "COB", "COB"),
      value: "COB",
    },
    {
      label: getResourceValueByKey(resource, "COMPL-KYB", "COMPL-KYB"),
      value: "COMPL-KYB",
    },
    {
      label: getResourceValueByKey(resource, "COMPL-KYC", "COMPL-KYC"),
      value: "COMPL-KYC",
    },
  ];

  const txnEventOptions = {
    EP: [
      {
        label: getResourceValueByKey(resource, "ISSUANCE", "Issuance"),
        value: "Issuance",
      },
    ],
    "EP-SEDA": [
      {
        label: getResourceValueByKey(resource, "ISSUANCE", "Issuance"),
        value: "Issuance",
      },
    ],
    BAPD: [
      {
        label: getResourceValueByKey(resource, "ISSUANCE", "Issuance"),
        value: "Issuance",
      },
      {
        label: getResourceValueByKey(resource, "DISCOUNTING", "Discounting"),
        value: "Discounting",
      },
      {
        label: getResourceValueByKey(resource, "MATURITY-FGF", "Maturity-FGF"),
        value: "Maturity-FGF",
      },
      {
        label: getResourceValueByKey(resource, "MATURITY-UDD", "Maturity-UDD"),
        value: "Maturity-UDD",
      },
    ],
    CAPD: [
      {
        label: getResourceValueByKey(resource, "ISSUANCE", "Issuance"),
        value: "Issuance",
      },
      {
        label: getResourceValueByKey(resource, "DISCOUNTING", "Discounting"),
        value: "Discounting",
      },
      {
        label: getResourceValueByKey(resource, "MATURITY-FGF", "Maturity-FGF"),
        value: "Maturity-FGF",
      },
      {
        label: getResourceValueByKey(resource, "MATURITY-UDD", "Maturity-UDD"),
        value: "Maturity-UDD",
      },
    ],
    APF: [
      {
        label: getResourceValueByKey(resource, "DISCOUNTING", "Discounting"),
        value: "Discounting",
      },
      {
        label: getResourceValueByKey(
          resource,
          "NON-DISCOUNTED",
          "Non-Discounted"
        ),
        value: "Non-Discounted",
      },
    ],
    UDI: [
      {
        label: getResourceValueByKey(
          resource,
          "NON-DISCOUNTED",
          "Non-Discounted"
        ),
        value: "Non-Discounted",
      },
    ],
    COB: [
      {
        label: getResourceValueByKey(
          resource,
          "FULL_ONBOARDING",
          "Full-Onboarding"
        ),
        value: "Full-Onboarding",
      },
      {
        label: getResourceValueByKey(
          resource,
          "DEEPTIER_ONBOARDING",
          "DeepTier Onboarding"
        ),
        value: "DeepTier Onboarding",
      },
      {
        label: getResourceValueByKey(resource, "COMPLIANCE", "Compliance"),
        value: "Compliance",
      },
    ],
    "COMPL-KYB": [
      {
        label: getResourceValueByKey(resource, "TRULIOO", "Trulioo"),
        value: "Trulioo",
      },
      {
        label: getResourceValueByKey(resource, "AADHAR", "Aadhar"),
        value: "Aadhar",
      },
    ],
    "COMPL-KYC": [
      {
        label: getResourceValueByKey(resource, "TRULIOO", "Trulioo"),
        value: "Trulioo",
      },
      {
        label: getResourceValueByKey(resource, "AADHAR", "Aadhar"),
        value: "Aadhar",
      },
    ],
  };

  const tierByOptions = [
    {
      label: getResourceValueByKey(resource, "FEE_AMT", "FEE_AMT"),
      value: "FEE_AMT",
    },
    {
      label: getResourceValueByKey(resource, "TXN_AMOUNT", "TXN_AMOUNT"),
      value: "TXN_AMOUNT",
    },
    {
      label: getResourceValueByKey(resource, "TXN_COUNT", "TXN_COUNT"),
      value: "TXN_COUNT",
    },
    {
      label: getResourceValueByKey(resource, "NONE", "NONE"),
      value: "NONE",
    },
  ];

  const columns = [
    {
      field: "pricingType",
      title: getResourceValueByKey(resource, "PRICING_TYPE", "Pricing Type"),
      editComponent: (props) => (
        <SelectMolecule
          label={getResourceValueByKey(
            resource,
            "PRICING_TYPE",
            "Pricing Type"
          )}
          defaultValue={props.value}
          onChange={props.onChange}
          options={pricingTypeOptions}
        />
      ),
      dontTruncate: true,
    },
    {
      field: "pricingValue",
      title: getResourceValueByKey(resource, "PRICING_VALUE", "Pricing Value"),
      editComponent: (props) => (
        <TextField
          type={"number"}
          label={props.columnDef.editPlaceholder || props.columnDef.title}
          value={props.value === undefined ? "" : props.value}
          onChange={(event) => props.onChange(event.target.valueAsNumber)}
          InputProps={{
            style: {
              fontSize: "inherit",
            },
            inputProps: {
              "aria-label": props.columnDef.title,
            },
          }}
        />
      ),
    },
    {
      field: "txnType",
      title: getResourceValueByKey(resource, "TXN._TYPE", "Txn. Type"),
      editComponent: (props) => (
        <SelectMolecule
          label={getResourceValueByKey(resource, "TXN._TYPE", "Txn. Type")}
          defaultValue={props.value}
          onChange={props.onChange}
          options={txnTypeOptions}
        />
      ),
    },
    {
      field: "txnEvent",
      title: getResourceValueByKey(resource, "TXN._EVENT", "Txn. Event"),
      editComponent: (props) => (
        <SelectMolecule
          label={getResourceValueByKey(resource, "TXN._EVENT", "Txn. Event")}
          defaultValue={props.value}
          onChange={props.onChange}
          options={txnEventOptions[props.rowData?.txnType] || []}
          disabled={txnEventOptions[props.rowData?.txnType]?.length === 0}
        />
      ),
    },
    {
      field: "tierBy",
      title: getResourceValueByKey(resource, "TIER_BY", "Tier By"),
      editComponent: (props) => (
        <SelectMolecule
          label={getResourceValueByKey(resource, "TIER_BY", "Tier By")}
          defaultValue={props.value}
          onChange={props.onChange}
          options={tierByOptions}
        />
      ),
    },
    {
      field: "minFee",
      title: getResourceValueByKey(resource, "MIN._FEE", "Min. Fee"),
      render: (rowData) => {
        return (
          <Typography variant="subtitle2">
            {rowData.minFee === -1
              ? getResourceValueByKey(resource, "N.A", "N.A")
              : formatAmount(rowData.minFee)}
          </Typography>
        );
      },
      editComponent: (props) => (
        <TextField
          type={"number"}
          label={props.columnDef.editPlaceholder || props.columnDef.title}
          value={props.value === undefined ? "" : props.value}
          onChange={(event) => props.onChange(event.target.valueAsNumber)}
          InputProps={{
            style: {
              fontSize: "inherit",
            },
            inputProps: {
              "aria-label": props.columnDef.title,
            },
          }}
        />
      ),
    },
    {
      field: "maxFee",
      title: getResourceValueByKey(resource, "MAX._FEE", "Max. Fee"),
      render: (rowData) => {
        return (
          <Typography variant="subtitle2">
            {rowData.minFee === -1
              ? getResourceValueByKey(resource, "N.A", "N.A")
              : formatAmount(rowData.maxFee)}
          </Typography>
        );
      },
      editComponent: (props) => (
        <TextField
          type={"number"}
          label={props.columnDef.editPlaceholder || props.columnDef.title}
          value={props.value === undefined ? "" : props.value}
          onChange={(event) => props.onChange(event.target.valueAsNumber)}
          InputProps={{
            style: {
              fontSize: "inherit",
            },
            inputProps: {
              "aria-label": props.columnDef.title,
            },
          }}
        />
      ),
    },
  ];

  const getPricingModel = (query) => {
    let filter = [
      {
        fieldName: "pricingBookId",
        operator: "eq",
        values: [pricingBookId],
      },
    ];
    let sort = [];
    let paging = { pageSize: query.pageSize, currentPage: query.page + 1 };
    let body = getFilterSortPaginate(filter, sort, paging);
    return new Promise((resolve, reject) => {
      post(env.SEARCH_TOP_PRICING_MODEL, body).then((result) => {
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

  const renderPricingModelTier = (rowData) => {
    return (
      <div
        style={{
          padding: "5px 10px",
          marginLeft: 30,
          backgroundColor: "#f4f4f4",
        }}
      >
        <PricingModelTierContainer resource={resource} pricingModel={rowData} />
      </div>
    );
  };

  const addPricingModel = async (newData) => {
    newData.pricingBookId = pricingBookId;
    newData.tierValues = newData.tierValues || [];
    let response = await post(env.TOP_PRICING_MODEL, newData); //instead of post , create must be used
    renderSnackbar(enqueueSnackbar, response);
  };

  const updatePricingModel = async (newData) => {
    newData.tierValues = newData.tierValues || [];
    let response = await put(`${env.TOP_PRICING_MODEL}/${newData.id}`, newData);
    renderSnackbar(enqueueSnackbar, response);
  };

  const deletePricingModel = async (oldData) => {
    let response = await del(`${env.TOP_PRICING_MODEL}/${oldData.id}`);
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
        {`${
          priceBookName || clientName ? `${priceBookName || clientName}- ` : ""
        }${getResourceValueByKey(resource, "PRICING_MODEL", "Pricing Model")}`}
      </Typography>
    );
  };

  const getMainSection = () => {
    return (
      <PricingModel
        resource={resource}
        columns={columns}
        getPricingModel={getPricingModel}
        addPricingModel={addPricingModel}
        updatePricingModel={updatePricingModel}
        deletePricingModel={deletePricingModel}
        renderPricingModelTier={renderPricingModelTier}
      />
    );
  };
  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default PricingModelContainer;
