import React, { useContext, useEffect } from "react";
import AssetKeywords from "../../components/assetVaultApp/AssetKeywords";
import AppHeader from "../../components/common/AppHeader";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { env } from "../../ENV";
import InAppLayout from "../../layouts/InAppLayout";
import { get } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const AssetKeywordsContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "ASSET-VAULT", "Asset-Vault"),
        path: "/yogi-webb/asset-vault",
      },
      {
        title: getResourceValueByKey(resource, "KEYWORDS", "Keywords"),
        path: "/yogi-webb/asset-vault/keywords",
      },
    ]);
  }, []);

  const getKeywords = (query) => {
    let skip = query.page * query.pageSize;
    return new Promise((resolve, reject) => {
      let url = `${env.AV_LIST_KEYWORDS}?skip=${skip}&limit=${query.pageSize}`;
      get(url).then((result) => {
        if (result?.data?.items?.length > 0) {
          resolve({
            data: result.data.items,
            page: Number(query.page),
            totalCount: Number(result.data.total),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.data?.total),
          });
        }
      });
    });
  };

  const getHeader = () => {
    return (
      <AppHeader
        title={getResourceValueByKey(
          resource,
          "ASSET_KEYWORDS",
          "Asset Keywords"
        )}
      />
    );
  };

  const getMainSection = () => {
    return <AssetKeywords resource={resource} getKeywords={getKeywords} />;
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default AssetKeywordsContainer;
