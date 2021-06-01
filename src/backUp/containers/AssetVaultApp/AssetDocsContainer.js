import React, { useContext, useEffect, useState } from "react";
import AssetDocs from "../../components/assetVaultApp/AssetDocs";
import { get, post } from "../../utils/callApi";
import { env } from "../../ENV";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import capitalize from "lodash/capitalize";
import format from "date-fns/format";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";
import AppHeader from "../../components/common/AppHeader";

// const operatorOptions = {
//   keyword: [{ label: "eq", value: "eq" }],
//   date: [
//     { label: "eq", value: "eq" },
//     { label: "gt", value: "gt" },
//     { label: "gte", value: "gte" },
//     { label: "lt", value: "lt" },
//     { label: "lte", value: "lte" },
//     { label: "range", value: "range" },
//   ],
//   float: [
//     { label: "eq", value: "eq" },
//     { label: "gt", value: "gt" },
//     { label: "gte", value: "gte" },
//     { label: "lt", value: "lt" },
//     { label: "lte", value: "lte" },
//     { label: "range", value: "range" },
//   ],
// };

const AssetDocsContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "ASSET-VAULT", "Asset-Vault"),
        path: "/yogi-webb/asset-vault",
      },
      {
        title: getResourceValueByKey(resource, "SEARCH-AV", "Search-AV"),
        path: "/yogi-webb/asset-vault/documents",
      },
    ]);
  }, []);

  const operatorOptions = [
    { label: getResourceValueByKey(resource, "EQ", "eq"), value: "eq" },
    { label: getResourceValueByKey(resource, "GT", "gt"), value: "gt" },
    { label: getResourceValueByKey(resource, "GTE", "gte"), value: "gte" },
    { label: getResourceValueByKey(resource, "LT", "lt"), value: "lt" },
    { label: getResourceValueByKey(resource, "LTE", "lte"), value: "lte" },
    {
      label: getResourceValueByKey(resource, "RANGE", "range"),
      value: "range",
    },
  ];

  const [defOptions, setDefOptions] = useState([]);
  const [indexOptions, setIndexOptions] = useState({});
  const [selectedDef, setSelectedDef] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [indexTypeOptions, setIndexTypeOptions] = useState({});
  const [selectedIndexType, setSelectedIndexType] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");
  const [queryText, setQueryText] = useState("");
  const [queryTextGte, setQueryTextGte] = useState("");
  const [queryTextLte, setQueryTextLte] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const getDefintions = async () => {
      let tempDefOptions = [];
      let tempIndexOptions = [];
      let tempTypeOptions = {};
      let response = await get(env.AV_LIST_DEFINITIONS);
      if (response?.items) {
        response.items.map((item) => {
          tempTypeOptions[item.name] = {};
          tempDefOptions.push({
            label: capitalize(item.name),
            value: item.name,
          });
          let tempOptions = [];
          Object.keys(item.indexing.fields).map((key) => {
            tempOptions.push({
              label: key,
              value: item.indexing.fields[key].as,
            });
            tempTypeOptions[item.name][key] = item.indexing.fields[key].type;
          });
          tempIndexOptions[item.name] = tempOptions;
        });
      }
      setDefOptions(tempDefOptions);
      setIndexOptions(tempIndexOptions);
      setIndexTypeOptions(tempTypeOptions);
    };
    getDefintions();
  }, []);

  const clearSearch = () => {
    if (searchResult?.length > 0) {
      setSearchResult(null);
    }
    if (queryText) {
      setQueryText("");
    }
    if (queryTextGte) {
      setQueryTextGte("");
    }
    if (queryTextLte) {
      setQueryTextLte("");
    }
  };

  const handleChangeDef = (value) => {
    setSelectedDef(value);
    setSelectedIndex("");
    clearSearch();
  };

  const handleChangeIndex = (value) => {
    setSelectedIndex(value);
    setSelectedIndexType(indexTypeOptions[selectedDef][value]);
    clearSearch();
  };

  const handleChangeOperator = (value) => {
    setSelectedOperator(value);
    clearSearch();
  };

  const handleChangeQueryText = (e) => {
    setQueryText(e.target.value);
  };

  const handleChangeDate = (e) => {
    setQueryText(e);
  };

  const handleChangeQueryTextGte = (e) => {
    setQueryTextGte(e.target.value);
  };

  const handleChangeQueryTextLte = (e) => {
    setQueryTextLte(e.target.value);
  };

  const handleChangeDateGte = (e) => {
    setQueryTextGte(e);
  };

  const handleChangeDateLte = (e) => {
    setQueryTextLte(e);
  };

  const onSearch = async () => {
    let gte, lte, date, value;
    if (selectedIndexType === "date") {
      if (queryTextGte || queryTextLte) {
        gte = format(queryTextGte, "yyyyMMdd");
        lte = format(queryTextLte, "yyyyMMdd");
      } else {
        date = format(queryText, "yyyyMMdd");
      }
    }
    if (gte || lte) {
      value = [gte, lte];
    } else if (date) {
      value = date;
    }
    let body = {
      query: {
        type: selectedDef,
        criteria: [
          {
            field: selectedIndex,
            operator: selectedOperator,
            value: value
              ? value
              : queryTextGte || queryTextLte
              ? [queryTextGte, queryTextLte]
              : queryText,
          },
        ],
      },
      related: true,
    };
    let response = await post(env.AV_SEARCH_DATA, body);
    setSearchResult(response?.items);
  };

  const getHeader = () => {
    return (
      <AppHeader
        title={getResourceValueByKey(
          resource,
          "SEARCH_ASSET_VAULT",
          "Search Asset Vault"
        )}
      />
    );
  };

  const getMainSection = () => {
    return (
      <AssetDocs
        resource={resource}
        defOptions={defOptions}
        selectedDef={selectedDef}
        handleChangeDef={handleChangeDef}
        indexOptions={indexOptions}
        selectedIndex={selectedIndex}
        handleChangeIndex={handleChangeIndex}
        operatorOptions={operatorOptions}
        selectedOperator={selectedOperator}
        handleChangeOperator={handleChangeOperator}
        queryText={queryText}
        handleChangeQueryText={handleChangeQueryText}
        selectedIndexType={selectedIndexType}
        handleChangeDate={handleChangeDate}
        queryTextGte={queryTextGte}
        queryTextLte={queryTextLte}
        handleChangeQueryTextGte={handleChangeQueryTextGte}
        handleChangeQueryTextLte={handleChangeQueryTextLte}
        handleChangeDateGte={handleChangeDateGte}
        handleChangeDateLte={handleChangeDateLte}
        onSearch={onSearch}
        searchResult={searchResult}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default AssetDocsContainer;
