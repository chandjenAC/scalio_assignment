export const addDimensionsToNodes = (nodes, nodeInfo, initialValues) => {
  let nodesWithDimensions;
  let childY = -65;
  if (nodes.length > 5) {
    let childX = initialValues.multiRowX;
    nodesWithDimensions = nodes.map((node, index) => {
      node.x = childX + 500;
      node.y = childY + 190;
      node[nodeInfo.type] = true;
      childY = childY + 190;
      if (index !== 0 && (index + 1) % 5 === 0) {
        childX = childX + initialValues.rowSpacing;
        childY = -65;
      }
      return node;
    });
  } else {
    nodesWithDimensions = nodes.map((node) => {
      node.x = initialValues.singleRowX;
      node.y = childY + 190;
      node[nodeInfo.type] = true;
      childY = childY + 190;
      return node;
    });
  }
  return nodesWithDimensions;
};
