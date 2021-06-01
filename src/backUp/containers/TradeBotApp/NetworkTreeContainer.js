import React, { useState, useEffect, useContext } from "react";
import GraphPathAndTopMetrics from "../../components/tradebotApp/GraphPathAndTopMetrics";
import GraphAndInfoContainer from "./GraphAndInfoContainer";
import { getNetworkTree, getUsersForStarfleet } from "../../utils/getData";
import { getAnchorsForStarfleet } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { useQuery } from "react-query";
import { getErrorNode } from "../../utils/digraph/graphUtils";
import { getNodesFromNetworkTree } from "../../utils/getNodesFromResponse/getNodesFromNetworkTree";
import isEmpty from "lodash/isEmpty";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";

const NetworkTreeContainer = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  let viewNetworkInfoPanel = true;

  const [nodesGroupedByID, setNodesGroupedByID] = useState({});
  const [selectedNodeTrail, setSelectedNodeTrail] = useState([[]]);
  const [lastSelectedNode, setLastSelectedNode] = useState(null);
  const [pagination, setPagination] = useState({}); //used for pagination inside data-graph
  const [users, setUsers] = useState([]);
  const [anchors, setAnchors] = useState([]);

  useEffect(() => {
    initializeNodeTrail();
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "NETWORK_TREE", "Network Tree"),
        path: "",
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedNodeTrail.length <= 4) {
      initializePagination();
    }
  }, [selectedNodeTrail]);

  const {
    isLoading: loadingNetworkTree,
    data: networkTreeData,
    refetch: refetchNetworkTree,
    isFetching: fetchingNetworkTree,
  } = useQuery(["neonService_networkTree"], getNetworkTree, {
    onSuccess: (data) => {
      if (selectedNodeTrail.length > 1) {
        initializeNodeTrail();
      }
      if (pagination?.totalRecords) {
        initializePagination();
      }
      if (!isEmpty(data.data)) {
        const getNodes = async () => {
          let nodesObj = await getNodesFromNetworkTree(data.data);
          setNodesGroupedByID(nodesObj.nodes);
        };
        getNodes();
      } else {
        renderErrorNode(
          getResourceValueByKey(
            resource,
            "SOMETHING_WENT_WRONG!",
            "Something went wrong!"
          )
        );
      }
    },
    onError: () => {
      renderErrorNode(
        getResourceValueByKey(
          resource,
          "SOMETHING_WENT_WRONG!",
          "Something went wrong!"
        )
      );
    },
    refetchOnWindowFocus: false,
  });

  const { isLoading: loadingUsers, data: usersData } = useQuery(
    ["neonService_usersForStarfleet", lastSelectedNode?.starfleetId],
    getUsersForStarfleet,
    {
      enabled: lastSelectedNode?.getUsers,
      onSuccess: (data) => {
        if (data.data.length > 0) {
          setPagination({
            ...pagination,
            showNavButton: true,
            totalRecords: data.data.length,
          });
          data.data.map((node) => {
            node.id = node.userId;
            node.networkTree = true;
            node.nodeType = "users";
            node.displayName = node.userName;
            node.paginatedNodes = true;
            node.flags = {
              user: true,
            };
          });
          setUsers(data.data);
          setNodesGroupedByID((prevState) => ({
            ...prevState,
            [lastSelectedNode?.id]: data.data.slice(0, 10),
          }));
        } else if (data.data?.length === 0) {
          renderErrorNode(
            getResourceValueByKey(
              resource,
              "NO_USERS_FOUND!",
              "No users found!"
            )
          );
        }
      },
      onError: () => {
        renderErrorNode(
          getResourceValueByKey(
            resource,
            "SOMETHING_WENT_WRONG!",
            "Something went wrong!"
          )
        );
      },
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: loadingAnchors, data: anchorsData } = useQuery(
    ["neonService_anchorsForStarfleet", lastSelectedNode?.starfleetId],
    getAnchorsForStarfleet,
    {
      enabled: lastSelectedNode?.getAnchors,
      onSuccess: (data) => {
        if (data.data.length > 0) {
          setPagination({
            ...pagination,
            showNavButton: true,
            totalRecords: data.data.length,
          });
          data.data.map((node) => {
            node.id = node.avatarId;
            node.networkTree = true;
            node.nodeType = "anchors";
            node.displayName = node.avatarName;
            node.paginatedNodes = true;
            node.flags = {
              user: true,
            };
          });
          setAnchors(data.data);
          setNodesGroupedByID((prevState) => ({
            ...prevState,
            [lastSelectedNode?.id]: data.data.slice(0, 10),
          }));
        } else if (data.data?.length === 0) {
          renderErrorNode(
            getResourceValueByKey(
              resource,
              "NO_ANCHORS_FOUND!",
              "No anchors found!"
            )
          );
        }
      },
      onError: () => {
        renderErrorNode(
          getResourceValueByKey(
            resource,
            "SOMETHING_WENT_WRONG!",
            "Something went wrong!"
          )
        );
      },
      refetchOnWindowFocus: false,
    }
  );

  const initializeNodeTrail = () => {
    setSelectedNodeTrail([
      {
        id: "",
        displayName: getResourceValueByKey(
          resource,
          "NETWORK_TREE",
          "Network Tree"
        ),
        parent: "",
        root: true,
        network: true,
      },
    ]);
  };

  const initializePagination = () => {
    setPagination({
      currentPage: 1,
      showNavButton: false,
      totalRecords: null,
    });
  };

  const hidePagination = () => {
    setPagination({
      ...pagination,
      showNavButton: false,
    });
  };

  const renderErrorNode = (errorText) => {
    let errorNode = getErrorNode(errorText);
    setNodesGroupedByID({ [null]: errorNode });
  };

  const reloadGraphNodes = () => {
    initializeNodeTrail();
    initializePagination();
    refetchNetworkTree();
  };

  const handleFrontEndPagination = (currentPage) => {
    let lastNodeInTrail = selectedNodeTrail[selectedNodeTrail.length - 1];
    let pageSize = 10;
    let sliceStart = currentPage * pageSize - 10;
    let sliceEnd = currentPage * pageSize;
    if (lastNodeInTrail.getUsers) {
      let newNodes = users.slice(sliceStart, sliceEnd);
      setNodesGroupedByID((prevState) => ({
        ...prevState,
        [lastNodeInTrail?.id]: newNodes,
      }));
    } else if (lastNodeInTrail.getAnchors) {
      let newNodes = anchors.slice(sliceStart, sliceEnd);
      setNodesGroupedByID((prevState) => ({
        ...prevState,
        [lastNodeInTrail?.id]: newNodes,
      }));
    }
  };

  const getHeader = () => {
    return (
      <GraphPathAndTopMetrics
        resource={resource}
        reloadGraphNodes={reloadGraphNodes}
        selectedNodeTrail={selectedNodeTrail}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
      />
    );
  };

  const getMainSection = () => {
    return (
      <GraphAndInfoContainer
        resource={resource}
        nodesGroupedByID={nodesGroupedByID}
        selectedNodeTrail={selectedNodeTrail}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
        pagination={pagination}
        setPagination={setPagination}
        graphLoading={
          loadingNetworkTree ||
          fetchingNetworkTree ||
          loadingUsers ||
          loadingAnchors
        }
        viewNetworkInfoPanel={viewNetworkInfoPanel}
        lastSelectedNode={lastSelectedNode}
        networkTree={networkTreeData?.data}
        handleFrontEndPagination={handleFrontEndPagination}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default NetworkTreeContainer;
