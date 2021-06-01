import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";

const nodeTypes = {
  policy: "policy",
  policyCriteria: "policy-criteria",
  policyCriteriaDetail: "policy-criteria-detail",
};

export const getPolicyNodes = (policies) => {
  //giving x and y cordinates to parent nodes
  let parentY = -65;
  let parentX = -1500;
  let nodeDescription = {};
  let nodes = [];

  policies.map((policy, index) => {
    nodes.push({
      id: policy.id,
      displayName: policy.displayName,
      parent: null,
      nodeType: nodeTypes.policy,
      getCriterias: true, //flag => call api on select
      policy: true,
      policyNode: true,
      x: parentX + 500,
      y: parentY + 190,
    });
    nodeDescription[policy.id] = policy;
    parentY = parentY + 190;
    if (index !== 0 && (index + 1) % 5 === 0) {
      parentX = parentX + 500;
      parentY = -65;
    }
  });

  //childNodes are grouped with id as key. In this, the group with key as null are the parent nodes.
  const nodesGroupedByParentID = mapValues(groupBy(nodes, "parent"));
  return { nodes: nodesGroupedByParentID, nodeDescr: nodeDescription };
};

export const getPolicyCriteriaNodes = (criterias, selectedNode) => {
  let nodeDescription = {};
  let nodes = [];

  criterias.sort((a, b) =>
    a.sequence > b.sequence ? 1 : b.sequence > a.sequence ? -1 : 0
  );

  if (criterias.length > 0) {
    criterias.map((criteria, i) => {
      nodes.push({
        id: `${criteria.policyId}_${criteria.id}`,
        displayName: `${criteria.sequence}. ${criteria.displayName}`,
        parent: criteria.policyId,
        nodeType: nodeTypes.policyCriteria,
        policyId: criteria.policyId,
        criteriaId: criteria.id,
        criteria: true,
        policyNode: true,
      });
      nodes.push({
        id: `${criteria.policyId}_${criteria.id}`,
        parent: `${criteria.policyId}_${criteria.id}`,
        displayName: `${criteria.sequence}. ${criteria.displayName}`,
        nodeType: nodeTypes.policyCriteria,
        policyId: criteria.policyId,
        criteriaId: criteria.id,
        criteria: true,
        policyNode: true,
        duplicate: true, // this value is checked in parent container while getting whitelisted attributes. If duplicate=> the attributes are already rendered in the panel, so don't call whiltList utility function
      });
      nodeDescription[`${criteria.policyId}_${criteria.id}`] = criteria;
    });
  }

  //this parent node is the same node which is clicked to view its child nodes...child nodes are rendered along with its parent node..
  let parentNode = [
    {
      id: selectedNode.id,
      parent: selectedNode.id,
      displayName: selectedNode.displayName,
      nodeType: selectedNode.nodeType,
      policy: true,
      policyNode: true,
      duplicate: true,
    },
  ];

  const allNodes = [...parentNode, ...nodes];

  //childNodes are grouped with id as key. In this, the group with key as null are the parent nodes.
  const nodesGroupedByParentID = mapValues(groupBy(allNodes, "parent"));
  return { nodes: nodesGroupedByParentID, nodeDescr: nodeDescription };
};
