import React, { useState, useEffect } from "react";
import { getWhiteListedValues } from "../../utils/getWhiteListedValues";
import WhiteListedData from "../../components/tradebotApp/WhiteListedData";

const GraphAttrContainer = (props) => {
  const {
    resource,
    nodeDescriptions,
    lastSelectedNode,
    selectedNodeTrail,
    typesMeta,
    tokenType,
  } = props;

  const [attributes, setAttributes] = useState(null); //is the description of a specific node taken from tokenDescription
  const [uiMeta, setUiMeta] = useState(null);
  //gets the whitelisted values of selected node to render in viewPanel
  useEffect(() => {
    if (
      nodeDescriptions &&
      lastSelectedNode &&
      !lastSelectedNode.duplicate &&
      !lastSelectedNode.networkTree
    ) {
      getCurrentGraphPathAttributes();
    }
  }, [lastSelectedNode, nodeDescriptions]);

  //on View Graph Attributes button click, render the last selected node attributes
  const getCurrentGraphPathAttributes = () => {
    let whiteList;
    if (lastSelectedNode && !lastSelectedNode.directory) {
      whiteList = getWhiteListedValues(
        nodeDescriptions,
        lastSelectedNode,
        typesMeta,
        tokenType
      );
      if (whiteList.attributes) {
        setAttributes(whiteList.attributes);
        setUiMeta(whiteList.uiMeta);
      }
    } else {
      let lastNodeBeforeDirectory =
        selectedNodeTrail[selectedNodeTrail.length - 2];
      if (lastNodeBeforeDirectory.directory) {
        lastNodeBeforeDirectory =
          selectedNodeTrail[selectedNodeTrail.length - 3];
      }
      whiteList = getWhiteListedValues(
        nodeDescriptions,
        lastNodeBeforeDirectory,
        typesMeta,
        tokenType
      );
      if (whiteList.attributes) {
        setAttributes(whiteList.attributes);
        setUiMeta(whiteList.uiMeta);
      }
    }
  };

  return (
    <WhiteListedData
      resource={resource}
      uiMeta={uiMeta}
      data={attributes}
      tokenData={nodeDescriptions[tokenType]}
    />
  );
};

export default GraphAttrContainer;
