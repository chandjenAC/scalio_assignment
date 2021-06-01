import { addDimensionsToNodes } from "./addDimensionsToNodes";

const getPolicyNodesDimensions = (nodes) => {
  let childNodes = [];
  let childY = -65;
  if (nodes[0].networkTreeDir) {
    childNodes = nodes.map((node) => {
      node.x = -1000;
      node.y = childY + 190;
      childY = childY + 190;
      return node;
    });
  } else if (nodes[0].nodeType) {
    childNodes = addDimensionsToNodes(
      nodes,
      { type: "policy" },
      {
        singleRowX: -1000,
        multiRowX: -1500,
        rowSpacing: 400,
      }
    );
  }
  return childNodes;
};

const setNetworkNodesDimensions = (nodes) => {
  let childNodes = [];
  let childY = -65;
  if (nodes[0].networkTreeDir) {
    childNodes = nodes.map((node) => {
      node.x = 0;
      node.y = childY + 190;
      childY = childY + 190;
      return node;
    });
  } else if (nodes[0].nodeType) {
    childNodes = addDimensionsToNodes(
      nodes,
      { type: "network" },
      {
        singleRowX: 0,
        multiRowX: -700,
        rowSpacing: 400,
      }
    );
  }
  return childNodes;
};

const setTokenDimensionsWithPagination = (nodes) => {
  let childNodes = [];
  childNodes = addDimensionsToNodes(
    nodes,
    { type: "token" },
    {
      singleRowX: -840,
      multiRowX: -1400,
      rowSpacing: 600,
    }
  );
  return childNodes;
};

const getNetworkNodesDimensions = (nodes) => {
  let childNodes = setNetworkNodesDimensions(nodes);
  return childNodes;
};

const getTokenNodesDimensions = (
  nodes,
  tokenChildNodePagination,
  setTokenChildNodePagination
) => {
  let childNodes = [];
  let childY = -65;

  //if contains a type attribute ie; avatar,toki,asset etc, then...
  if (nodes[0].type) {
    childNodes = setTokenDimensionsWithPagination(nodes);
  } else if (nodes[0].nodeType) {
    if (nodes.length > 5) {
      let recordIndex;
      setTokenChildNodePagination((prevState) => ({
        ...prevState,
        totalRecords: nodes.length,
      }));
      for (let i = -1; i < 4; i++) {
        recordIndex = tokenChildNodePagination.currentPage * 5 - 4 + i;
        if (nodes[recordIndex]) {
          nodes[recordIndex].x = -840;
          nodes[recordIndex].y = childY + 190;
          childY = childY + 190;
          childNodes.push(nodes[recordIndex]);
        }
      }
    } else {
      setTokenChildNodePagination({
        currentPage: 1,
        showNavButton: false,
        totalRecords: null,
      });
      childNodes = nodes.map((node) => {
        node.x = -840;
        node.y = childY + 190;
        childY = childY + 190;
        return node;
      });
    }
  }
  return childNodes;
};

const getMetricNodesDimensions = (nodes) => {
  let childNodes = [];
  childNodes = addDimensionsToNodes(
    nodes,
    { type: "metric" },
    {
      singleRowX: 0,
      multiRowX: -1400,
      rowSpacing: 600,
    }
  );
  return childNodes;
};

export const getChildNodesWithDimensions = (
  nodesGroupedByID,
  tokenChildNodePagination,
  setTokenChildNodePagination,
  selectedNode
) => {
  let childNodes = [];
  let key = selectedNode.id;
  if (nodesGroupedByID.hasOwnProperty(key)) {
    let nodes = nodesGroupedByID[key];
    if (selectedNode.metric) {
      if (selectedNode.paginate) {
        childNodes = getTokenNodesDimensions(
          nodes,
          tokenChildNodePagination,
          setTokenChildNodePagination
        );
      } else {
        childNodes = getMetricNodesDimensions(nodes);
      }
    } else if (selectedNode.token) {
      childNodes = getTokenNodesDimensions(
        nodes,
        tokenChildNodePagination,
        setTokenChildNodePagination
      );
    } else if (selectedNode.networkTree) {
      childNodes = getNetworkNodesDimensions(nodes);
    } else if (selectedNode.policyNode) {
      childNodes = getPolicyNodesDimensions(nodes);
    }
  }
  return childNodes;
};
