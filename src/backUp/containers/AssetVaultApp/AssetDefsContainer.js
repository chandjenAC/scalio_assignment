import React, { useContext, useEffect } from "react";
import AssetDefs from "../../components/assetVaultApp/AssetDefs";
import AppHeader from "../../components/common/AppHeader";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { env } from "../../ENV";
import InAppLayout from "../../layouts/InAppLayout";
import { get } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const AssetDefsContainer = (props) => {
  const { resource } = props;

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "ASSET-VAULT", "Asset-Vault"),
        path: "/yogi-webb/asset-vault",
      },
    ]);
  }, []);

  const getDefinitions = (query) => {
    let skip = query.page * query.pageSize;
    return new Promise((resolve, reject) => {
      get(
        `${env.AV_LIST_DEFINITIONS}?skip=${skip}&limit=${query.pageSize}`
      ).then((result) => {
        if (result?.items?.length > 0) {
          resolve({
            data: result.items,
            page: Number(query.page),
            totalCount: Number(result.totalCount),
          });
        } else {
          resolve({
            data: [],
            page: Number(query.page),
            totalCount: Number(result?.totalCount),
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
          "ASSET_DEFINTIONS",
          "Asset Definitions"
        )}
      />
    );
  };

  const getMainSection = () => {
    return <AssetDefs resource={resource} getDefinitions={getDefinitions} />;
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default AssetDefsContainer;
