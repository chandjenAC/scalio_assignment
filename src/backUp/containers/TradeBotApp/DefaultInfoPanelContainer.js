import React, { useState } from "react";
import ViewOrDownloadFile from "../../components/common/ViewOrDownloadFile";
import DocEntitiesContainer from "./DocEntitiesContainer";
import OcrAttributes from "../../components/tradebotApp/OcrAttributes";
import InvoiceAttributes from "../../components/tradebotApp/InvoiceAttributes";
import { env } from "../../ENV";
import { getTypeMeta } from "../../utils";
import GraphAttrContainer from "./GraphAttrContainer";
import PdfInputElasticContainer from "./PdfInputElasticContainer";

const DefaultInfoPanelContainer = (props) => {
  const {
    resource,
    lastSelectedNode,
    selectedNodeTrail,
    nodeDescriptions,
    setNodeDescriptions,
    typesMeta,
    tokenType,
    cachedDocs,
  } = props;

  const [selectedOcrTab, setSelectedOcrTab] = useState(0);

  return lastSelectedNode.doc || lastSelectedNode.logo ? (
    <ViewOrDownloadFile
      resource={resource}
      file={{
        fileId: lastSelectedNode.id,
        fileType: lastSelectedNode.doc ? "doc" : "image",
        fileFormat: lastSelectedNode.format,
        fileName: lastSelectedNode.docName,
      }}
      cachedDocs={cachedDocs}
    />
  ) : lastSelectedNode.ocrContent ? (
    <OcrAttributes
      resource={resource}
      ocrData={nodeDescriptions[lastSelectedNode.descriptionKey]}
      nodeDescriptions={nodeDescriptions}
      setNodeDescriptions={setNodeDescriptions}
      selectedOcrTab={selectedOcrTab}
      setSelectedOcrTab={setSelectedOcrTab}
    />
  ) : lastSelectedNode.invoiceEntity ? (
    <InvoiceAttributes
      resource={resource}
      invoiceData={{
        data: nodeDescriptions[lastSelectedNode.descriptionKey],
        columnHeadings: getTypeMeta(typesMeta.dataTypes, "invoice-doc-data")
          ?.uiMeta?.columns,
      }}
    />
  ) : lastSelectedNode.inputElasticPdf ? (
    <PdfInputElasticContainer
      resource={resource}
      url={env.INGESTED_INPUT_RETRIEVE}
      tokenId={lastSelectedNode.tokenId}
    />
  ) : lastSelectedNode.targetElasticPdf ? (
    <PdfInputElasticContainer
      resource={resource}
      url={env.INGESTED_DATA_RETRIEVE}
      tokenId={lastSelectedNode.tokenId}
    />
  ) : lastSelectedNode.docBatch ? (
    <DocEntitiesContainer
      resource={resource}
      url={env.INGESTED_INPUT_RETRIEVE}
      tokenId={lastSelectedNode.tokenId}
    />
  ) : lastSelectedNode.docTargetElastic ? (
    <DocEntitiesContainer
      resource={resource}
      url={env.INGESTED_DATA_RETRIEVE}
      tokenId={lastSelectedNode.tokenId}
    />
  ) : (
    <GraphAttrContainer
      resource={resource}
      nodeDescriptions={nodeDescriptions}
      lastSelectedNode={lastSelectedNode}
      selectedNodeTrail={selectedNodeTrail}
      typesMeta={typesMeta}
      tokenType={tokenType}
    />
  );
};

export default DefaultInfoPanelContainer;
