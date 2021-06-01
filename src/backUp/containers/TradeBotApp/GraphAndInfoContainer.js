import React, { useState } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import DAGraphContainer from "../DAGraph/DAGraphContainer";
import TokenInfoContainer from "./TokenInfoContainer";
import { useQuery, usePaginatedQuery } from "react-query";
import { retrieveSubtoken, retrieveSubtokenData } from "../../utils/getData";
import { searchTopToken } from "../../utils/getData";
import { getUserAvatarAssociations } from "../../utils/getData";
import { getAnchorAvatarAssociations } from "../../utils/getData";
import { getUserStarfleetAssociations } from "../../utils/getData";
import { retrieveToken, getPaginatedTokens } from "../../utils/getData";
import { getNodesFromTokenResponse } from "../../utils/getNodesFromResponse/getNodesFromTokenResponse";
import NetworkInfoContainer from "./NetworkInfoContainer";
import {
  dmsSearchBody,
  retrieveTokenBody,
} from "../../utils/getPayloads/tokenPayloads";
import { searchTokenBySubtypeBody } from "../../utils/getPayloads/tokenPayloads";
import { subtokenDataRetrieveBody } from "../../utils/getPayloads/tokenPayloads";
import { retrieveSubtokenBody } from "../../utils/getPayloads/tokenPayloads";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    height: "100%",
  },
  graphContainer: (props) => ({
    width: props.viewTokenInfoPanel
      ? "30%"
      : props.viewNetworkInfoPanel
      ? "40%"
      : "100%",
    height: "100%",
    padding: 0,
    transition: "width 0.4s linear",
  }),

  tokenInfoContainer: (props) => ({
    width: props.viewTokenInfoPanel ? "70%" : 0,
    padding: 0,
    transition: "width 0.6s ease-in",
  }),
  networkInfoContainer: (props) => ({
    width: props.viewNetworkInfoPanel ? "60%" : 0,
    padding: 0,
    transition: "width 0.6s ease-in",
  }),
}));

const dimensionsCallingApi = ["avatar-credit-rating", "avatar-compliance-info"];

const GraphAndInfoContainer = (props) => {
  const {
    resource,
    state,
    typesMeta,
    nodesGroupedByID,
    setNodesGroupedByID,
    selectedNodeTrail,
    setSelectedNodeTrail,
    setLastSelectedNode,
    pagination,
    setPagination,
    hidePagination,
    graphLoading,
    viewTokenInfoPanel,
    setViewTokenInfoPanel,
    networkTree,
    viewNetworkInfoPanel,
    lastSelectedNode,
    queryText,
    handleFrontEndPagination,
  } = props;
  const classes = useStyles(props);

  const [nodeDescriptions, setNodeDescriptions] = useState({});
  const [tokenType, setTokenType] = useState("");
  // const [subtokenType, setSubtokenType] = useState("");
  const [cachedDocs, setCachedDocs] = useState({});
  const [networkTreeTableData, setNetworkTreeTableData] = useState({
    tenant: "",
    starfleet: "",
    anchor: "",
    starbase: "",
  });
  const [subPanelData, setSubPanelData] = useState(null); // contains associations data rendered on network tree info sub panel

  const { isLoading: loadingToken } = useQuery(
    [
      "tokenService_tokenRetrieve",
      retrieveTokenBody({
        id: lastSelectedNode?.id,
        type: lastSelectedNode?.type,
      }),
    ],
    retrieveToken,
    {
      enabled: setViewTokenInfoPanel && lastSelectedNode?.type, //call this only on token info panel..not on network info panel
      onSuccess: (data) => {
        setTokenType(data.data.type);
        setViewTokenInfoPanel && setViewTokenInfoPanel(true);
        if (pagination?.totalRecords) {
          hidePagination && hidePagination();
        }
        const getNodes = async () => {
          const nodesData = await getNodesFromTokenResponse(
            data,
            lastSelectedNode,
            typesMeta.dataTypes,
            cachedDocs,
            setCachedDocs
          );
          let tempDescr = nodesData.nodeDescr;
          setNodeDescriptions((prevState) => ({
            ...prevState,
            ...tempDescr,
          }));
          localStorage.setItem("nodeDescriptions", JSON.stringify(tempDescr)); // retrieved from local storage and used by chatbot during logo upload search Avatar.
          setNodesGroupedByID({
            ...nodesGroupedByID,
            ...nodesData.newNodes,
          });
        };
        getNodes();
      },
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: loadingSubtoken } = useQuery(
    [
      "tokenService_subtokenRetrieve",
      retrieveSubtokenBody({
        id: lastSelectedNode?.id,
        subtokenType: lastSelectedNode?.subtokenType,
        tokenId: lastSelectedNode?.tokenId,
      }),
    ],
    retrieveSubtoken,
    {
      enabled: lastSelectedNode?.subtoken,
      onSuccess: (data) => {
        // setSubtokenType(data.data.type);
        const getNodes = async () => {
          const nodesData = await getNodesFromTokenResponse(
            data,
            lastSelectedNode,
            typesMeta.dataTypes,
            cachedDocs,
            setCachedDocs
          );
          let tempDescr = nodesData.nodeDescr;
          setNodeDescriptions((prevState) => ({
            ...prevState,
            ...tempDescr,
          }));
          localStorage.setItem("nodeDescriptions", JSON.stringify(tempDescr)); // retrieved from local storage and used by chatbot during logo upload search Avatar.
          setNodesGroupedByID({
            ...nodesGroupedByID,
            ...nodesData.newNodes,
          });
        };
        getNodes();
      },
    }
  );

  const { isLoading: loadingDimension } = useQuery(
    [
      "tokenService_subtokenDataRetrieve",
      subtokenDataRetrieveBody({
        id: lastSelectedNode?.id,
        dimension: lastSelectedNode?.dimension,
        tokenId: lastSelectedNode?.tokenId,
        tokenType: lastSelectedNode?.tokenType,
      }),
    ],
    retrieveSubtokenData,
    {
      enabled:
        lastSelectedNode?.dimension &&
        dimensionsCallingApi.includes(lastSelectedNode.dimension),
      onSuccess: (data) => {
        const getNodes = async () => {
          const nodesData = await getNodesFromTokenResponse(
            data,
            lastSelectedNode,
            typesMeta.dataTypes,
            cachedDocs,
            setCachedDocs
          );
          let tempDescr = nodesData.nodeDescr;
          setNodeDescriptions((prevState) => ({
            ...prevState,
            ...tempDescr,
          }));
          localStorage.setItem("nodeDescriptions", JSON.stringify(tempDescr)); // retrieved from local storage and used by chatbot during logo upload search Avatar.
          setNodesGroupedByID({
            ...nodesGroupedByID,
            ...nodesData.newNodes,
          });
        };
        getNodes();
      },
    }
  );

  const {
    isLoading: loadingPaginatedTokens,
    isFetching: fetchingPaginatedTokens,
  } = usePaginatedQuery(
    [
      "tokenService_tokenSearch",
      searchTokenBySubtypeBody({
        id: lastSelectedNode?.id,
        currentPage: pagination?.currentPage,
      }),
    ],
    getPaginatedTokens,
    {
      enabled: lastSelectedNode?.paginate,
      onSuccess: (data) => {
        if (!pagination.totalRecords) {
          setPagination({
            ...pagination,
            showNavButton: true,
            totalRecords: data?.recordCount,
          });
        }
        setNodesGroupedByID((prevState) => ({
          ...prevState,
          [lastSelectedNode?.id]: data.data,
        }));
      },
      refetchOnWindowFocus: false,
    }
  );

  const {
    isLoading: loadingUserStarfleetAssociations,
    data: userStarfleetAssociationsData,
  } = useQuery(
    ["dms_userStarfleetAssociations", lastSelectedNode?.id],
    getUserStarfleetAssociations,
    {
      enabled: lastSelectedNode?.nodeType === "users",
      onSuccess: (data) => {
        setSubPanelData({
          ...subPanelData,
          userStarfleet: data.data,
        });
      },
      refetchOnWindowFocus: false,
    }
  );

  const {
    isLoading: loadingUserAvatarAssociations,
    data: userAvatarAssociationsData,
  } = useQuery(
    ["dms_userAvatarAssociations", lastSelectedNode?.id],
    getUserAvatarAssociations,
    {
      enabled: lastSelectedNode?.nodeType === "users",
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: loadingUserAssociatedAvatars } = useQuery(
    [
      "dms_userAssociatedAvatars",
      dmsSearchBody({
        fieldName: "id",
        values: userAvatarAssociationsData?.data.map((avatar) => {
          return avatar.avatarId;
        }),
      }),
    ],
    searchTopToken,
    {
      enabled:
        userAvatarAssociationsData?.data.length > 0 &&
        userStarfleetAssociationsData,
      onSuccess: (data) => {
        setSubPanelData({
          userAvatar: data?.data,
          userStarfleet: userStarfleetAssociationsData.data,
        });
      },
      refetchOnWindowFocus: false,
    }
  );

  const {
    isLoading: loadingAnchorAvatarAssociations,
    data: anchorAvatarAssociationsData,
  } = useQuery(
    ["dms_anchorAvatarAssociations", lastSelectedNode?.id],
    getAnchorAvatarAssociations,
    {
      enabled: lastSelectedNode?.nodeType === "anchors",
      onSuccess: (data) => {
        if (data?.data.length === 0) {
          setSubPanelData({
            anchorAvatar: [],
          });
        }
      },
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: loadingAnchorAssociatedAvatars } = useQuery(
    [
      "dms_anchorAssociatedAvatars",
      dmsSearchBody({
        fieldName: "id",
        values: anchorAvatarAssociationsData?.data.map((anchor) => {
          return anchor.avatarId;
        }),
      }),
    ],
    searchTopToken,
    {
      enabled: anchorAvatarAssociationsData?.data.length > 0,
      onSuccess: (data) => {
        setSubPanelData({
          anchorAvatar: data?.data,
        });
      },
      refetchOnWindowFocus: false,
    }
  );

  return nodesGroupedByID ? (
    <Grid container className={classes.flexContainer} justify="flex-start">
      <Grid item className={classes.graphContainer}>
        <DAGraphContainer
          state={state}
          nodesGroupedByID={nodesGroupedByID}
          selectedNodeTrail={selectedNodeTrail}
          setSelectedNodeTrail={setSelectedNodeTrail}
          setLastSelectedNode={setLastSelectedNode}
          pagination={pagination}
          setPagination={setPagination}
          graphLoading={
            graphLoading ||
            loadingToken ||
            loadingSubtoken ||
            loadingDimension ||
            loadingPaginatedTokens ||
            fetchingPaginatedTokens ||
            loadingUserStarfleetAssociations ||
            loadingUserAvatarAssociations ||
            loadingUserAssociatedAvatars ||
            loadingAnchorAvatarAssociations ||
            loadingAnchorAssociatedAvatars
          }
          viewTokenInfoPanel={viewTokenInfoPanel}
          dimensionsCallingApi={dimensionsCallingApi}
          queryText={queryText}
          handleFrontEndPagination={handleFrontEndPagination}
        />
      </Grid>
      <Grid item className={classes.tokenInfoContainer}>
        {viewTokenInfoPanel && (
          <TokenInfoContainer
            resource={resource}
            nodeDescriptions={nodeDescriptions}
            tokenType={tokenType}
            typesMeta={typesMeta}
            lastSelectedNode={lastSelectedNode}
            selectedNodeTrail={selectedNodeTrail}
            cachedDocs={cachedDocs}
            setNodeDescriptions={setNodeDescriptions}
          />
        )}
      </Grid>
      <Grid item className={classes.networkInfoContainer}>
        {viewNetworkInfoPanel && (
          <NetworkInfoContainer
            resource={resource}
            networkTree={networkTree}
            selectedNodeTrail={selectedNodeTrail}
            setNetworkTreeTableData={setNetworkTreeTableData}
            networkTreeTableData={networkTreeTableData}
            lastSelectedNode={lastSelectedNode}
            subPanelData={subPanelData}
          />
        )}
      </Grid>
    </Grid>
  ) : null;
};

export default GraphAndInfoContainer;
