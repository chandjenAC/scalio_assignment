import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";

export const addDimensionToParentNodes = (nodes) => {
  //giving x and y cordinates to parent nodes

  let parentY = -65;
  let parentX = -1500;
  let nodesWithDimensions = [];
  nodes.map((node, index) => {
    nodesWithDimensions.push({
      id: node.id,
      displayName: node.tokenDisplayName,
      parent: null,
      // nodeType: shape.nodeType,
      token: true,
      type: node.type,
      tokenRetrieve: true,
      x: parentX + 500,
      y: parentY + 190,
    });
    parentY = parentY + 190;
    if (index !== 0 && (index + 1) % 5 === 0) {
      parentX = parentX + 500;
      parentY = -65;
    }
  });

  //childNodes are grouped with id as key. In this, the group with key as null are the parent nodes.
  const nodesGroupedByParentID = mapValues(
    groupBy(nodesWithDimensions, "parent")
  );
  return nodesGroupedByParentID;
};
