import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";

export const getNodesAfterFileUpload = (token) => {
  let nodes;
  let childY = -65;
  nodes = token.data.map((node) => {
    node.parent = null;
    node.x = -900;
    node.y = childY + 190;
    node.token = true;
    childY = childY + 190;
    return node;
  });
  const nodesGroupedByParentID = mapValues(groupBy(nodes, "parent"));
  return nodesGroupedByParentID;
};
