import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";
import capitalize from "lodash/capitalize";

export const getNodesFromTOPmetrics = (data) => {
  let parentMetricNodes = [];
  let allChildNodes = [];
  let parentY = 125;
  data.map((token, index) => {
    //gets the parent nodes ....avatars, tokis, assets...lets categorize them as tokens
    // getting nodes only for which the count >0
    if (token.tokenCount > 0) {
      parentMetricNodes.push({
        id: token.tokenType,
        displayName: capitalize(token.tokenType),
        count: token.tokenCount,
        parent: null,
        metric: true,
        expandGraph: true,
        x: 0,
        y: parentY,
      });
    }

    parentY = parentY + 200;
    //gets the child nodes directly under token ....which are Corporates, Anchors, Funders...these are subtypes
    token.subTypes.map((subType) => {
      if (subType.tokenCount > 0) {
        allChildNodes.push({
          id: `${token.tokenType}_${subType.name}`,
          displayName: subType.name,
          count: subType.tokenCount,
          parent: token.tokenType,
          metric: true,
          expandGraph: true,
        });
      }

      // firstChildY = firstChildY + 250;
      //gets the grand child nodes which comes under subtypes...which are active, WIP and error
      subType.status.map((status) => {
        if (status.tokenCount > 0) {
          allChildNodes.push({
            id: `${token.tokenType}_${subType.name}_${status.name}`,
            displayName: status.name,
            count: status.tokenCount,
            parent: `${token.tokenType}_${subType.name}`,
            metric: true,
            expandGraph: true,
            paginate: true,
          });
        }
      });
    });
  });
  const allNodes = [...parentMetricNodes, ...allChildNodes];
  //finding child nodes and grouping child nodes w.r.t parent for rendering
  const nodesGroupedByParentID = mapValues(groupBy(allNodes, "parent"));
  return nodesGroupedByParentID;
};
