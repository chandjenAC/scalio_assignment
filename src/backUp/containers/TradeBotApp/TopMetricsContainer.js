import React, { useState, useEffect, useContext } from "react";
import GraphPathAndTopMetrics from "../../components/tradebotApp/GraphPathAndTopMetrics";
import GraphAndInfoContainer from "./GraphAndInfoContainer";
import ChatBotContainer from "../Chatbot/ChatBotContainer";
import { getTopMetrics } from "../../utils/getData";
import { getNodesFromTOPmetrics } from "../../utils/getNodesFromResponse/getNodesFromTOPmetrics";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getResourceValues } from "../../utils/resourceHelper";
import { useQuery } from "react-query";
import { getErrorNode } from "../../utils/digraph/graphUtils";
import { create_UUID } from "../../utils";
import { uploadFile } from "../../utils/uploadFile";
import { getAttachLogoBody } from "../../utils/getPayloads/tokenPayloads";
import { searchTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { topMetricsBody } from "../../utils/getPayloads/tokenPayloads";
import { retrieveTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { getAVsearchPayload } from "../../utils/getPayloads/avPayloads";
import { getNodesAfterFileUpload } from "../../utils/getNodesFromResponse/getNodesAfterFileUpload";
import { addDimensionToParentNodes } from "../../utils/digraph/addDimensionToParentNodes";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";

const TopMetricsContainer = (props) => {
  const { resource, typesMeta } = props;

  const [nodesGroupedByID, setNodesGroupedByID] = useState({});
  const [viewTokenInfoPanel, setViewTokenInfoPanel] = useState(false);
  const [selectedNodeTrail, setSelectedNodeTrail] = useState([[]]);
  const [lastSelectedNode, setLastSelectedNode] = useState(null);
  const [pagination, setPagination] = useState({}); //used for pagination inside data-graph
  const [openBot, setOpenBot] = useState(false);
  const [state, setState] = useState({
    mainSelect: {
      response: null, // can be null, waitingUser, error, successAndConinueOnBoarding,completed ..these will be the 4 status flags
    },
    greeting2: {
      response: null,
    },
    managePolicy: {
      response: null,
    },
    identity: {
      response: null, // response status can be "fromSearchCorporate" and "fromOnboarding"
    },
  });
  const [graphLoading, setGraphLoading] = useState(false);

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "TRADE-BOT", "Trade-Bot"),
        path: "/yogi-webb/trade-bot",
      },
    ]);
    initializeNodeTrail(
      getResourceValueByKey(resource, "TOP_METRICS", "TOP Metrics")
    );
    initializePagination();
    if (!window["pdfjs-dist/build/pdf"]) {
      let script = document.createElement("script");
      let head = document.querySelector("head");
      script.src = "https://mozilla.github.io/pdf.js/build/pdf.js";
      head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    let lastNodeInTrail = selectedNodeTrail[selectedNodeTrail.length - 1];
    if (
      !selectedNodeTrail?.[0]?.displayName?.includes("Search Results") &&
      selectedNodeTrail.length <= 4 &&
      viewTokenInfoPanel
    ) {
      setViewTokenInfoPanel(false);
    }
    if (!lastNodeInTrail?.paginate) {
      initializePagination();
    }
  }, [selectedNodeTrail]);

  const {
    isLoading: loadingTopMetrics,
    error: errorTopMetrics,
    data: topMetricsData,
    refetch: refetchTopMetrics,
    isFetching: fetchingTopMetrics,
  } = useQuery(["tokenService_topMetrics", topMetricsBody()], getTopMetrics, {
    onSuccess: (data) => {
      if (selectedNodeTrail.length > 1) {
        initializeNodeTrail(
          getResourceValueByKey(resource, "TOP_METRICS", "TOP Metrics")
        );
      }
      if (pagination?.totalRecords) {
        initializePagination();
      }
      if (data?.data?.length > 0) {
        let groupedNodes = getNodesFromTOPmetrics(data.data);
        setNodesGroupedByID(groupedNodes);
      } else if (data?.data?.length === 0) {
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

  const initializeNodeTrail = (rootText) => {
    setSelectedNodeTrail([
      {
        id: "",
        displayName: rootText,
        parent: "",
        root: true,
        metric: true,
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

  //chatbot helpers
  const clearState = () => {
    for (let key in state) {
      setState((prevState) => ({
        ...prevState,
        [key]: { response: null },
      }));
    }
  };

  const resetHooks = () => {
    setViewTokenInfoPanel(false);
    setNodesGroupedByID(null);
    initializeNodeTrail(
      getResourceValueByKey(resource, "TOP_METRICS", "TOP Metrics")
    );
    setLastSelectedNode(null);
  };

  const setParentNodeState = (value, targetNode) => {
    setState((prevState) => ({
      ...prevState,
      [targetNode.id]: {
        ...prevState[targetNode.id],
        response: value,
      },
    }));
  };

  //chatbot main menu selector
  const mainSelect = (value) => {
    switch (value) {
      case "View and Manage an OnBoarding Policy":
        setState((prevState) => ({
          ...prevState,
          ["mainSelect"]: { response: "View and Manage an OnBoarding Policy" },
        }));
        return "managePolicies";
      case "OnBoard a Corporate":
        setState((prevState) => ({
          ...prevState,
          ["mainSelect"]: { response: "OnBoard a Corporate" },
        }));
        return "haveCIN";
      case "Search for a Corporate":
        setState((prevState) => ({
          ...prevState,
          ["mainSelect"]: { response: "Search for a Corporate" },
        }));
        return "haveCIN";
    }
    //code written here won't be executed as switch results in returning from this execution context
  };

  const onFileUpload = async (
    file,
    triggerNextStep,
    setDocumentState,
    setDisableButton,
    docRef,
    onSuccessTrigger,
    onErrorTrigger
  ) => {
    const docId = create_UUID();
    setViewTokenInfoPanel(false);
    setGraphLoading(true);
    let response = await uploadFile(
      file,
      docId,
      setDocumentState,
      setDisableButton,
      docRef
    );
    // check the status of response and if status.success===false, then trigger OnErrorTrigger
    if (docRef === "logo") {
      const token = JSON.parse(localStorage.getItem("nodeDescriptions"));
      const body1 = getAttachLogoBody(token.avatar.id, docId);
      await post(env.TOKEN_ATTACH_LOGO_URL, body1);
      localStorage.removeItem("nodeDescriptions");
    } else {
      setTimeout(() => {
        setOpenBot(false);
      }, 500);
      let paging = {};
      let body = searchTokenBody({
        type: "DocToken",
        fieldName: "docId",
        value: docId,
        paging: paging,
      });
      let token = await post(env.TOKEN_SEARCH_URL, body);
      if (token.data.length > 0) {
        let body2 = retrieveTokenBody({
          id: token.data[0].id,
          type: token.data[0].type,
        });
        let tokenData = await post(env.TOKEN_RETRIEVE_URL, body2);
        const nodesGroupedByParentID = getNodesAfterFileUpload(tokenData.data);
        initializeNodeTrail(
          getResourceValueByKey(resource, "UPLOADED_DOC", "Uploaded Doc")
        );
        setNodesGroupedByID(nodesGroupedByParentID);
      }
    }
    triggerNextStep({ trigger: onSuccessTrigger });
    setGraphLoading(false);
  };

  //gets fired on selecting node..(1)=>gets the paginated tokens based on subType Status... (2)token or subtoken node =>gets token or subtoken details...(3)dimension node=> specific dimension nodes calls retrieve api(these specific nodes are contained in array: dimensionsCallingApi)

  const onSubmitSearch = async (queryText) => {
    const noResultsText = getResourceValueByKey(
      resource,
      "NO_RESULTS_FOUND_FOR_{queryText}!",
      "No results found for {queryText}!"
    );
    const onResultsText = getResourceValueByKey(
      resource,
      "{queryText}-SEARCH_RESULTS",
      "{queryText}-Search Results"
    );
    if (queryText) {
      initializeNodeTrail(
        getResourceValues(onResultsText, { queryText: queryText })
      );
      let body = getAVsearchPayload(queryText);
      setGraphLoading(true);
      setViewTokenInfoPanel(false);
      let response = await post(env.SEARCH_AV_URL, body);
      setGraphLoading(false);
      if (response.status.success & (response.data.length > 0)) {
        let nodesGroupedByParentID = addDimensionToParentNodes(response.data);
        setNodesGroupedByID(nodesGroupedByParentID);
        return true;
      } else {
        renderErrorNode(
          getResourceValues(noResultsText, { queryText: queryText })
        );
        return false;
      }
    }
  };

  //graphPath reload and also to reinitialize hooks when greeting2 is triggered in chatbot
  const reloadGraphNodes = async () => {
    clearState();
    resetHooks();
    setGraphLoading(true);
    refetchTopMetrics();
    setTimeout(() => {
      setOpenBot(false);
    }, 5500);
    setGraphLoading(false);
  };

  const renderNodesFromResponse = (response) => {
    let nodesGroupedByParentID = addDimensionToParentNodes(response);
    setNodesGroupedByID(nodesGroupedByParentID);
  };

  const getHeader = () => {
    return (
      <GraphPathAndTopMetrics
        resource={resource}
        reloadGraphNodes={refetchTopMetrics}
        metricsData={topMetricsData?.data}
        selectedNodeTrail={selectedNodeTrail}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
        setViewTokenInfoPanel={setViewTokenInfoPanel}
      />
    );
  };

  const getMainSection = () => {
    return (
      <>
        <GraphAndInfoContainer
          resource={resource}
          state={state}
          // typesMeta={typesMeta}
          // tokenType={tokenType}
          typesMeta={typesMeta}
          nodesGroupedByID={nodesGroupedByID}
          setNodesGroupedByID={setNodesGroupedByID}
          selectedNodeTrail={selectedNodeTrail}
          setSelectedNodeTrail={setSelectedNodeTrail}
          setLastSelectedNode={setLastSelectedNode}
          pagination={pagination}
          setPagination={setPagination}
          hidePagination={hidePagination}
          graphLoading={graphLoading || loadingTopMetrics || fetchingTopMetrics}
          // viewNetworkInfoPanel={location.state?.networkInfo}
          viewTokenInfoPanel={viewTokenInfoPanel}
          setViewTokenInfoPanel={setViewTokenInfoPanel}
          // dimensionsCallingApi={dimensionsCallingApi}
          // nodeDescriptions={nodeDescriptions}
          lastSelectedNode={lastSelectedNode}
          // cachedDocs={cachedDocs}
          // setNodeDescriptions={setNodeDescriptions}
          // networkTree={networkTree}
          // subPanelData={subPanelData}
        />
        <ChatBotContainer
          setState={setState} // for authorize ID function
          renderNodesFromResponse={renderNodesFromResponse}
          mainSelect={mainSelect}
          getTopMetrics={refetchTopMetrics}
          setParentNodeState={setParentNodeState}
          reloadGraphNodes={reloadGraphNodes}
          setOpenBot={setOpenBot}
          opened={openBot}
          clearState={clearState}
          resetHooks={resetHooks}
          setGraphLoading={setGraphLoading}
          onFileUpload={onFileUpload}
          setSelectedNodeTrail={setSelectedNodeTrail}
          onSubmitSearch={onSubmitSearch}
        />
      </>
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default TopMetricsContainer;
