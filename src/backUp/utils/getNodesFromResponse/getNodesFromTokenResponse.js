import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";
import cloneDeep from "lodash/cloneDeep";
import isEmpty from "lodash/isEmpty";
import { flatten } from "..";
import { getTypeMeta } from "../index";
import { env } from "../../ENV";
import { jsonDifference } from "../jsonDifference";
import { getColumnsDiff } from "../smartTable/getColumnsDiff";
import { getLineItemsDiff } from "../smartTable/getLineItemsDiff";
import { createColumnsMeta } from "../smartTable/createColumnsMeta";
import { createApiHeaders } from "../callApi";
import { getResourceValueByKey } from "../resourceHelper";
import resource from "../../resources/common.json";

const directories = {
  subtokens: "Subtokens",
  dimensions: "Dimensions",
  documents: "Documents",
  nodeType: "directory",
};

const documentNodeType = "document";
const imageNodeType = "image";

const editableDimensions = ["doc-ocr-data"];
const viewDocBatchGrid = [
  "FILE/XLS",
  "FILE/XLSX",
  "XLSX",
  "XLS",
  "FILE/CSV",
  "CSV",
];

const nodeShapesBasedOnKeyStatus = {
  "avatar-compliance-info": [
    {
      statusKey: "status",
      statusValue: "Met",
      shape: "avatar-compliance-info-met",
    },
  ],
  "digital-draft-sub-toki": [
    {
      statusKey: "status",
      statusValue: "Discarded",
      shape: "digital-draft-sub-toki-cancelled",
    },
    {
      statusKey: "status",
      statusValue: "DiscountInProgress",
      shape: "digital-draft-sub-toki-discountInProgress",
    },
    {
      statusKey: "status",
      statusValue: "Discounted",
      shape: "digital-draft-sub-toki-discounted",
    },
    {
      statusKey: "status",
      statusValue: "TransferInProgress",
      shape: "digital-draft-sub-toki-transferInProgress",
    },
    {
      statusKey: "status",
      statusValue: "Transferred",
      shape: "digital-draft-sub-toki-transferred",
    },
  ],
};

const getNodeShapesBasedOnKeyStatus = (dimension, key) => {
  let shape;
  nodeShapesBasedOnKeyStatus[key].map((item) => {
    if (dimension[item.statusKey] === item.statusValue) {
      shape = item.shape;
    }
  });
  return shape || key;
};

const getNodeShape = (dimension, key) => {
  let shape = nodeShapesBasedOnKeyStatus.hasOwnProperty(key)
    ? getNodeShapesBasedOnKeyStatus(dimension, key)
    : key;
  return shape;
};

export const getNodesFromTokenResponse = async (
  data,
  lastSelectedNode,
  dataTypesMeta,
  cachedDocs,
  setCachedDocs
) => {
  let nodesGroupedByParentID = [];
  const parentNodeID = data.data.id; // setting the parent node id from response. Here in this case its "avatar"
  const tokenType = data.data.type; //can be avatar, DocToken ..etc.. also can be "avatar-compliance"..etc. in case of subtokens [this can also be dimensionMeta.parentType]
  const tokenDescr = {}; // contains all the node data to be displayed on click event

  //parent node description
  tokenDescr[tokenType] = data.data;

  // const tokenFaceNodes = [];
  const dimensionNodesWithDirectoryNode = [];
  if (!isEmpty(data.data.dimensions)) {
    let directory = {
      id: `${tokenType}_${directories.dimensions}`,
      parent: parentNodeID,
      displayName: directories.dimensions,
      nodeType: directories.nodeType, // nodeType=> associates the node shape from config file..
      token: true,
      descriptionKey: null, // descriptionKey=> associates nodes with its descriptions contianed in tokenDescription...no description available for directory[so it is null here]
      directory: true, // helper to render graph attributes on panel...if the selected node is directory, then the viewPanel need not re render
    };
    dimensionNodesWithDirectoryNode.push(directory);
  }
  const subtokenNodesWithDirectoryNode = [];
  if (!isEmpty(data.data.subtokens)) {
    let directory = {
      id: `${tokenType}_${directories.subtokens}`,
      parent: parentNodeID,
      displayName: directories.subtokens,
      nodeType: directories.nodeType,
      token: true,
      descriptionKey: null,
      directory: true,
    };
    subtokenNodesWithDirectoryNode.push(directory);
  }
  const docNodesWithDirectoryNode = [];
  if (!isEmpty(data.data.docs)) {
    let directory = {
      id: `${tokenType}_${directories.documents}`,
      parent: parentNodeID,
      displayName: directories.documents,
      nodeType: directories.nodeType,
      token: true,
      descriptionKey: null,
      directory: true,
    };
    docNodesWithDirectoryNode.push(directory);
  }

  let editableDimensionArray = [];
  const getEditableDimensionNodeAndDescr = (dimension, dimensionMeta, key) => {
    if (dimension.hasOwnProperty("originalCopy")) {
      editableDimensionArray[1] = dimension; // originalCopy attribute is present only for the updated dimension which is => "originalCopy: false"
    } else {
      editableDimensionArray[0] = dimension; // first item of the array is set as the original copy for proper results while comparing jsons(like=> new and removed values)
    }
    //editableDimensionArray[0] and editableDimensionArray[1] not empty => both the original and updated copies are added to the array..now start comparison
    if (
      !isEmpty(editableDimensionArray[0]) &&
      !isEmpty(editableDimensionArray[1])
    ) {
      let compareDimensionRes = cloneDeep(editableDimensionArray[0]);
      let columnsMeta;

      if (!editableDimensionArray[1].changeSummary) {
        let originalColumns = editableDimensionArray[0].tableItems.columns;
        let meta = {
          tableItems: {
            columns: createColumnsMeta(originalColumns),
          },
        };
        editableDimensionArray[1].changeSummary = meta;
        columnsMeta =
          editableDimensionArray[1].changeSummary.tableItems.columns;
      } else {
        columnsMeta =
          editableDimensionArray[1].changeSummary.tableItems.columns;
      }

      let originalKeyList = editableDimensionArray[0].keyList;
      let originalLineItems = editableDimensionArray[0].tableItems.lineItems;
      let editedColumns = editableDimensionArray[1].tableItems.columns;
      let editedKeyList = editableDimensionArray[1].keyList;
      let editedLineItems = editableDimensionArray[1].tableItems.lineItems;

      let highlightedKeyList = jsonDifference(originalKeyList, editedKeyList);

      let highlightedColumns = getColumnsDiff(columnsMeta, editedColumns);

      let highlightedLineItems = getLineItemsDiff(
        originalLineItems,
        editedLineItems,
        editedColumns,
        columnsMeta
      );

      compareDimensionRes.editedCopy = editableDimensionArray[1];
      compareDimensionRes.originalValues = editableDimensionArray[0];
      compareDimensionRes.highlightedColumns = highlightedColumns;
      compareDimensionRes.highlightedLineItems = highlightedLineItems;
      compareDimensionRes.highlightedKeyList = highlightedKeyList;
      tokenDescr[
        `${dimension.type}_${editableDimensionArray[0].id}`
      ] = compareDimensionRes;
      dimensionNodesWithDirectoryNode.push({
        id: editableDimensionArray[0].id,
        tokenId: dimension.tokenId, // used to make retreive api call to get dimension docs
        tokenType: dimension.tokenType, // used to make retreive api call to get dimension docs
        parent: dimensionMeta.repeats
          ? `${tokenType}_${dimensionMeta.uiMeta.parentDirectory}`
          : `${tokenType}_${directories.dimensions}`,
        displayName:
          dimension.ocrSessionId || dimension.lineItems
            ? data.data.faces[0].displayId
            : dimension.dimensionDisplayName,
        nodeType: getNodeShape(dimension, key),
        descriptionKey: `${dimension.type}_${editableDimensionArray[0].id}`,
        dimension: key,
        token: true,
        ocrContent: dimension.ocrSessionId ? true : false,
        invoiceEntity: dimension.lineItems ? true : false,
      });
    }
  };

  if (isEmpty(data.data)) {
    return;
  }

  const getIngestedDocNodes = ({ doc, index, isPdf }) => {
    docNodesWithDirectoryNode.push({
      id: doc.id,
      format: doc.docMeta?.docType || doc.docType,
      parent: `${tokenType}_${directories.documents}`,
      nodeType: documentNodeType,
      docName: doc.docMeta?.docName,
      displayName: `${getResourceValueByKey(
        resource,
        "INPUT_FILE-",
        "Input-File-"
      )} ${doc.docMeta?.docName}`,
      token: true,
      doc: true,
    });
    docNodesWithDirectoryNode.push({
      id: `viewBatchGrid_${index}`,
      parent: `${tokenType}_${directories.documents}`,
      nodeType: documentNodeType,
      displayName: `${getResourceValueByKey(
        resource,
        "INPUT_ELASTIC-",
        "Input-Elastic-"
      )} ${doc.docMeta?.docName}`,
      tokenId: data.data.id,
      token: true,
      inputElasticPdf: isPdf && true,
      docBatch: !isPdf && true,
    });
    docNodesWithDirectoryNode.push({
      id: `targetElastic${index}`,
      parent: `${tokenType}_${directories.documents}`,
      nodeType: documentNodeType,
      displayName: `${getResourceValueByKey(
        resource,
        "TARGET_ELASTIC-",
        "Target-Elastic"
      )} ${doc.docMeta?.docName}`,
      tokenId: data.data.id,
      token: true,
      targetElasticPdf: isPdf && true,
      docTargetElastic: !isPdf && true,
    });
  };

  //getting doc. nodes
  data.data.docs.map((doc, index) => {
    if (doc.docMeta.docType.toLowerCase().indexOf("pdf") > -1) {
      let fileUrl = `${env.DOC_MGMT_SRVC_DOC_RETRIEVE_URL}${doc.docId}`;
      let pdfjsLib = window["pdfjs-dist/build/pdf"];
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "//mozilla.github.io/pdf.js/build/pdf.worker.js";
      pdfjsLib
        .getDocument({
          url: fileUrl,
          httpHeaders: createApiHeaders(),
        })
        .promise.then((pdfDoc_) => {
          let temp = {};
          temp[doc.id] = pdfDoc_;
          setCachedDocs({ ...cachedDocs, ...temp });
        });
      if (doc.docMeta?.isIngested) {
        getIngestedDocNodes({ doc: doc, index: index, isPdf: true });
      } else {
        docNodesWithDirectoryNode.push({
          id: doc.id,
          format: doc.docMeta?.docType || doc.docType,
          parent: `${tokenType}_${directories.documents}`,
          nodeType: documentNodeType,
          docName: doc.docMeta?.docName,
          displayName: data.data.faces[0]?.displayId || doc.docName, //"doc.docName" is used in case of a subtoken document
          descriptionKey: `${doc.category}_${doc.id}`,
          token: true,
          doc: true,
        });
      }
    } else if (
      viewDocBatchGrid.includes(
        (doc.docMeta?.docType || doc.docType).toUpperCase()
      )
    ) {
      if (doc.docMeta?.isIngested) {
        getIngestedDocNodes({ doc: doc, index: index, isPdf: false });
      } else {
        docNodesWithDirectoryNode.push({
          id: doc.id,
          format: doc.docMeta?.docType || doc.docType,
          parent: `${tokenType}_${directories.documents}`,
          nodeType: documentNodeType,
          docName: doc.docMeta?.docName,
          displayName: `${getResourceValueByKey(resource, "ACK-", "ACK-")} ${
            doc.docMeta?.docName
          }`,
          token: true,
          doc: true,
        });
      }
    }
    tokenDescr[`${doc.category}_${doc.id}`] = doc;
  });

  for (let key in data.data.dimensions) {
    let dimensionMeta = getTypeMeta(dataTypesMeta, key);
    if (dimensionMeta.repeats) {
      let childDirectory = {
        id: `${tokenType}_${dimensionMeta.uiMeta.parentDirectory}`,
        parent: `${tokenType}_${directories.dimensions}`,
        displayName: dimensionMeta.uiMeta.parentDirectory,
        nodeType: directories.nodeType,
        token: true,
        descriptionKey: null, // as directory doesn't have description
        directory: true,
      };
      dimensionNodesWithDirectoryNode.push(childDirectory);
    }
    data.data.dimensions[key].map((dimension) => {
      if (
        editableDimensions.includes(dimension.type) &&
        data.data.dimensions[key].length > 1 // length > 1 => more than one copy ie; originalCopy and the edited copy
      ) {
        getEditableDimensionNodeAndDescr(dimension, dimensionMeta, key);
      } else {
        tokenDescr[`${dimension.type}_${dimension.id}`] = dimension; // eg: if one dimension key contains multiple objects like more than one "avatar-user"=> then tokenDescription[`avatar-user_${id}`] will contain its own description

        dimensionNodesWithDirectoryNode.push({
          id: dimension.id,
          tokenId: dimension.tokenId, // used to make retreive api call to get dimension docs
          tokenType: dimension.tokenType, // used to make retreive api call to get dimension docs
          parent: dimensionMeta.repeats
            ? `${tokenType}_${dimensionMeta.uiMeta.parentDirectory}`
            : `${tokenType}_${directories.dimensions}`,
          displayName:
            dimension.ocrSessionId || dimension.lineItems
              ? data.data.faces[0].displayId
              : dimension.dimensionDisplayName,
          nodeType: getNodeShape(dimension, key),
          descriptionKey: `${dimension.type}_${dimension.id}`,
          dimension: key,
          token: true,
          ocrContent: dimension.ocrSessionId ? true : false,
          invoiceEntity: dimension.lineItems ? true : false,
        });
      }
    });
  }

  //gets the logo's from faces, and attached as a child of "Dimensions" directory
  data.data.faces &&
    data.data.faces.map((face) => {
      if (face.logoId) {
        tokenDescr[`${face.displayId}_${face.logoId}`] = face;
        dimensionNodesWithDirectoryNode.push({
          id: face.logoId,
          parent: `${tokenType}_${directories.dimensions}`,
          nodeType: imageNodeType,
          displayName: `Logo- ${face.displayId}`,
          descriptionKey: `${face.displayId}_${face.logoId}`,
          token: true,
          logo: true,
        });
      }
    });

  //getting subtoken nodes
  for (let key in data.data.subtokens) {
    data.data.subtokens[key].map((subtoken) => {
      tokenDescr[`${subtoken.type}_${subtoken.id}`] = flatten(subtoken);
      subtokenNodesWithDirectoryNode.push({
        id: subtoken.id,
        parent: `${tokenType}_${directories.subtokens}`,
        tokenId: parentNodeID,
        subtokenType: subtoken.type, //used to retrieve subtoken details(api call)
        displayName: subtoken.subTokenDisplayName,
        // nodeType: key,
        nodeType: getNodeShape(subtoken, key),
        descriptionKey: `${subtoken.type}_${subtoken.id}`,
        token: true,
        subtoken: true,
      });
    });
  }

  //this parent node is the same node which is clicked to view its child nodes...child nodes are rendered along with its parent node..
  let parentNode = [
    {
      id: lastSelectedNode.id,
      parent: parentNodeID,
      displayName:
        lastSelectedNode.tokenDisplayName || lastSelectedNode.displayName, // title=>if subtoken node .... name => token node.....
      nodeType: lastSelectedNode.nodeType || lastSelectedNode.type, // nodeType=>if subtoken node .....type => token node
      token: true,
      duplicate: true, // this value is checked in parent container while getting whitelisted attributes. If duplicate=> the attributes are already rendered in the panel, so don't call whiltList utility function
    },
  ];

  //all child nodes into an array
  const allNodes = [
    ...parentNode,
    ...docNodesWithDirectoryNode,
    ...dimensionNodesWithDirectoryNode,
    ...subtokenNodesWithDirectoryNode,
  ];

  nodesGroupedByParentID = mapValues(groupBy(allNodes, "parent"));

  return {
    newNodes: nodesGroupedByParentID,
    nodeDescr: tokenDescr,
  };
};
