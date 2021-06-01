import React from "react";
import SearchResultsContainer from "./SearchResultsContainer";
import NetworkTreeContainer from "./NetworkTreeContainer";
import DAYTcontainer from "./DAYTcontainer";
import SelectedDaytContainer from "./SelectedDaytContainer";
import TopMetricsContainer from "./TopMetricsContainer";
import { useLocation, useParams } from "react-router-dom";
import { dataTypesMetaBody } from "../../utils/getPayloads/tokenPayloads";
import { tokenTypesMetaBody } from "../../utils/getPayloads/tokenPayloads";
import { getDataTypesMeta, getTokenTypesMeta } from "../../utils/getData";
import { useQuery } from "react-query";

const SwitchData = (props) => {
  const { resource } = props;
  const location = useLocation();
  const params = useParams();

  if (!window["pdfjs-dist/build/pdf"]) {
    let script = document.createElement("script");
    let head = document.querySelector("head");
    script.src = "https://mozilla.github.io/pdf.js/build/pdf.js";
    head.appendChild(script);
  }

  const {
    isLoading: loadingDataTypesMeta,
    error: errorDataTypesMeta,
    data: dataTypesMeta,
  } = useQuery(
    ["tokenService_dataTypesMeta", dataTypesMetaBody()],
    getDataTypesMeta,
    {
      enabled: !location?.state?.networkInfo,
      refetchOnWindowFocus: false,
    }
  );

  const {
    isLoading: loadingTokenTypesMeta,
    error: errorTokenTypesMeta,
    data: tokenTypesMeta,
  } = useQuery(
    ["tokenService_tokenTypesMeta", tokenTypesMetaBody()],
    getTokenTypesMeta,
    {
      enabled: !location?.state?.networkInfo,
      refetchOnWindowFocus: false,
    }
  );

  return location?.state?.searchKey ? (
    <SearchResultsContainer
      resource={resource}
      queryText={location.state.searchKey}
      typesMeta={{
        dataTypes: dataTypesMeta?.data,
        tokenTypes: tokenTypesMeta?.data,
      }}
    />
  ) : location?.state?.networkInfo ? (
    <NetworkTreeContainer
      resource={resource}
      typesMeta={{
        dataTypes: dataTypesMeta?.data,
        tokenTypes: tokenTypesMeta?.data,
      }}
    />
  ) : params.formatId ? (
    <DAYTcontainer
      resource={resource}
      formatName={location.state?.formatName}
      params={params}
      typesMeta={{
        dataTypes: dataTypesMeta?.data,
        tokenTypes: tokenTypesMeta?.data,
      }}
    />
  ) : params?.docId ? (
    <SelectedDaytContainer // when viewing folder contents from endpoints app
      resource={resource}
      params={params}
      docName={location.state?.dayt?.name}
      typesMeta={{
        dataTypes: dataTypesMeta?.data,
        tokenTypes: tokenTypesMeta?.data,
      }}
    />
  ) : (
    <TopMetricsContainer
      resource={resource}
      typesMeta={{
        dataTypes: dataTypesMeta?.data,
        tokenTypes: tokenTypesMeta?.data,
      }}
    />
  );
};

export default SwitchData;
