import { getTypeMeta } from "./index";

export const getWhiteListedValues = (
  nodeDescriptions,
  lastSelectedNode,
  typesMeta,
  tokenType
) => {
  let attributes;
  let typeMeta;
  let uiMeta;
  let renderkey =
    lastSelectedNode && lastSelectedNode.descriptionKey
      ? lastSelectedNode.descriptionKey.split("_")[0]
      : "";
  if (
    lastSelectedNode &&
    !lastSelectedNode.subtoken &&
    lastSelectedNode.descriptionKey
  ) {
    // if selected node is not token or subtoken but a node with descriptionKey
    attributes = nodeDescriptions[lastSelectedNode.descriptionKey];
    typeMeta = getTypeMeta(typesMeta.dataTypes, renderkey);
    uiMeta = typeMeta && typeMeta.uiMeta;
  } else if (lastSelectedNode && lastSelectedNode.subtoken) {
    // if selected node is subtoken
    attributes = nodeDescriptions[renderkey];
    typeMeta = getTypeMeta(typesMeta.tokenTypes, renderkey);
    uiMeta = typeMeta && typeMeta.uiMeta;
  } else {
    // if selected node is a token or any directory
    attributes = nodeDescriptions[tokenType];
    typeMeta = getTypeMeta(typesMeta.tokenTypes, tokenType);
    uiMeta = typeMeta && typeMeta.uiMeta;
  }
  return { attributes: attributes, uiMeta: uiMeta };
};
