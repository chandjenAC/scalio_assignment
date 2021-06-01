import mapValues from "lodash/mapValues";
import groupBy from "lodash/groupBy";
import capitalize from "lodash/capitalize";

// const sponsors = "sponsors";
const tenants = "tenants";
const starfleets = "starfleets";
const anchors = "anchors";
const users = "users";
// const avatars = "avatars";

export const getNodesFromNetworkTree = async (data) => {
  let parentMetricNodes = [];
  let allChildNodes = [];
  let networkName = data.networkName;
  let nodeDescription = {}; // key value pair => keys as graph level id's and values contain the id's of anchors, avatars or users as arrays which is used to call api and get node details like displayName on runtime during corresponding node selection

  let masterNode = [
    {
      id: data.networkId,
      displayName: networkName,
      nodeType: "networks",
      descriptionKey: null,
      networkTree: true,
      parent: null,
      flags: { network: true },
      x: 0,
      y: 125,
    },
  ];

  const getChildNode = ({ id, title, parent, nodeType, flags }) => {
    allChildNodes.push({
      id: id,
      displayName: title,
      parent: parent,
      nodeType: nodeType,
      flags: flags,
      networkTree: true,
    });
  };

  const getNodeWithCount = ({
    id,
    title,
    parent,
    count,
    starfleetId,
    flags,
  }) => {
    allChildNodes.push({
      id: id,
      displayName: title,
      parent: parent,
      count: count,
      networkTreeDir: true, //flag used in DAG container useEffect to set dimensions
      networkTree: true,
      getUsers: flags.users ? true : false,
      getAnchors: flags.anchors ? true : false,
      starfleetId: starfleetId,
    });
  };

  data.tenants.map((tenant) => {
    getChildNode({
      id: `${data.networkId}_${tenant.avatarId}`,
      title: tenant.avatarId,
      parent: data.networkId,
      nodeType: tenants,
      flags: { tenant: true },
    });

    tenant.starfleets.map((starfleet) => {
      getChildNode({
        id: `${data.networkId}_${tenant.avatarId}_${starfleet.starfleetId}`,
        title: starfleet.starfleetId,
        parent: `${data.networkId}_${tenant.avatarId}`,
        nodeType: starfleets,
        flags: { starfleet: true },
      });

      getNodeWithCount({
        id: `${data.networkId}_${tenant.avatarId}_${starfleet.starfleetId}_${users}`,
        title: capitalize(users),
        parent: `${data.networkId}_${tenant.avatarId}_${starfleet.starfleetId}`,
        count: starfleet.usersCount,
        starfleetId: starfleet.starfleetId,
        flags: { users: true },
      });

      getNodeWithCount({
        id: `${data.networkId}_${tenant.avatarId}_${starfleet.starfleetId}_${anchors}`,
        title: capitalize(anchors),
        parent: `${data.networkId}_${tenant.avatarId}_${starfleet.starfleetId}`,
        count: starfleet.anchorsCount,
        starfleetId: starfleet.starfleetId,
        flags: { anchors: true },
      });
    });
  });

  const allNodes = [...masterNode, ...parentMetricNodes, ...allChildNodes];

  //finding child nodes and grouping child nodes w.r.t parent for rendering
  const nodesGroupedByParentID = mapValues(groupBy(allNodes, "parent"));
  return { nodes: nodesGroupedByParentID, nodeDescr: nodeDescription };
};
