import React, { useState, useEffect, useContext } from "react";
import GraphPathAndTopMetrics from "../../components/tradebotApp/GraphPathAndTopMetrics";
import GraphAndInfoContainer from "./GraphAndInfoContainer";
import { searchToken } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { useQuery } from "react-query";
import { getErrorNode } from "../../utils/digraph/graphUtils";
import { addDimensionToParentNodes } from "../../utils/digraph/addDimensionToParentNodes";
import { searchTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { useLocation } from "react-router-dom";
import InAppLayout from "../../layouts/InAppLayout";

const SelectedDaytContainer = (props) => {
  const { resource, typesMeta, params } = props;

  const location = useLocation();

  const endPoint = params.endPoint;
  const docId = params.docId;
  const avatarId = params.avatarId;

  const queryString = new URLSearchParams(location.search);
  const folderName = queryString.get("folderName");
  const isOutgoing = queryString.get("isOutgoing");

  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [nodesGroupedByID, setNodesGroupedByID] = useState({});
  const [viewTokenInfoPanel, setViewTokenInfoPanel] = useState(false);
  const [selectedNodeTrail, setSelectedNodeTrail] = useState([[]]);
  const [lastSelectedNode, setLastSelectedNode] = useState(null);

  useEffect(() => {
    initializeNodeTrail();
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
        path: "/yogi-webb/end-points",
      },
      {
        title: getResourceValueByKey(
          resource,
          "FOLDER_CONTENTS",
          "Folder Contents"
        ),
        path: `/yogi-webb/end-points/${encodeURIComponent(
          endPoint
        )}/${avatarId}?folderName=${folderName}&isOutgoing=${isOutgoing}`,
      },
      {
        title: getResourceValueByKey(resource, "FILE", "File"),
        path: "",
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedNodeTrail.length === 1 && viewTokenInfoPanel) {
      setViewTokenInfoPanel(false);
    }
  }, [selectedNodeTrail]);

  const {
    isLoading: loadingDayt,
    refetch: refetchDayt,
    isFetching: fetchingDayt,
  } = useQuery(
    [
      "tokenService_daytSearch",
      searchTokenBody({
        type: "DocToken",
        fieldName: "id",
        value: docId,
      }),
    ],
    searchToken,
    {
      onSuccess: (data) => {
        if (selectedNodeTrail.length > 1) {
          initializeNodeTrail();
        }
        if (viewTokenInfoPanel) {
          setViewTokenInfoPanel(false);
        }
        if (data.data.length > 0) {
          let groupedNodes = addDimensionToParentNodes(data.data);
          setNodesGroupedByID(groupedNodes);
        } else if (data.data.length === 0) {
          renderErrorNode();
        }
      },
      onError: () => {
        renderErrorNode();
      },
      refetchOnWindowFocus: false,
    }
  );

  const initializeNodeTrail = () => {
    setSelectedNodeTrail([
      {
        id: "",
        displayName: getResourceValueByKey(resource, "DAYT", "DAYT"),
        parent: "",
        root: true,
        token: true,
      },
    ]);
  };

  const renderErrorNode = () => {
    let errorNode = getErrorNode(
      getResourceValueByKey(
        resource,
        "SOMETHING_WENT_WRONG!",
        "Something went wrong!"
      )
    );
    setNodesGroupedByID({ [null]: errorNode });
  };

  const getHeader = () => {
    return (
      <GraphPathAndTopMetrics
        resource={resource}
        reloadGraphNodes={refetchDayt}
        selectedNodeTrail={selectedNodeTrail}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
        setViewTokenInfoPanel={setViewTokenInfoPanel}
      />
    );
  };

  const getMainSection = () => {
    return (
      <GraphAndInfoContainer
        resource={resource}
        typesMeta={typesMeta}
        nodesGroupedByID={nodesGroupedByID}
        setNodesGroupedByID={setNodesGroupedByID}
        selectedNodeTrail={selectedNodeTrail}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
        graphLoading={loadingDayt || fetchingDayt}
        viewTokenInfoPanel={viewTokenInfoPanel}
        setViewTokenInfoPanel={setViewTokenInfoPanel}
        lastSelectedNode={lastSelectedNode}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default SelectedDaytContainer;
