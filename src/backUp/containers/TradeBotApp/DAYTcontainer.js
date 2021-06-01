import React, { useState, useEffect, useContext } from "react";
import GraphPathAndTopMetrics from "../../components/tradebotApp/GraphPathAndTopMetrics";
import GraphAndInfoContainer from "./GraphAndInfoContainer";
import { searchToken } from "../../utils/getData";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { usePaginatedQuery } from "react-query";
import { getErrorNode } from "../../utils/digraph/graphUtils";
import { addDimensionToParentNodes } from "../../utils/digraph/addDimensionToParentNodes";
import { searchTokenBody } from "../../utils/getPayloads/tokenPayloads";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import InAppLayout from "../../layouts/InAppLayout";

const DAYTcontainer = (props) => {
  const { resource, params, typesMeta, formatName } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const formatId = params.formatId;
  const endPoint = params.endPoint;
  const folderId = params.folderId;

  const [nodesGroupedByID, setNodesGroupedByID] = useState({});
  const [viewTokenInfoPanel, setViewTokenInfoPanel] = useState(false);
  const [selectedNodeTrail, setSelectedNodeTrail] = useState([[]]);
  const [lastSelectedNode, setLastSelectedNode] = useState(null);
  const [pagination, setPagination] = useState({}); //used for pagination inside data-graph

  useEffect(() => {
    initializeNodeTrail();
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "END-POINTS", "End-Points"),
        path: "/yogi-webb/end-points",
      },
      {
        title: getResourceValueByKey(resource, "DEFINITIONS", "Definitions"),
        path: `/yogi-webb/end-points/${encodeURIComponent(
          endPoint
        )}/dayt/${folderId}`,
      },
      {
        title: getResourceValueByKey(resource, "FILES", "Files"),
        path: `/yogi-webb/end-points/${encodeURIComponent(
          endPoint
        )}/dayt/${folderId}/${formatId}`,
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedNodeTrail.length === 1 && viewTokenInfoPanel) {
      setViewTokenInfoPanel(false);
    }
    if (selectedNodeTrail.length === 1) {
      initializePagination();
      refetchPaginatedDayts();
    }
  }, [selectedNodeTrail]);

  const {
    isLoading: loadingPaginatedDayts,
    refetch: refetchPaginatedDayts,
    isFetching: fetchingPaginatedDayts,
  } = usePaginatedQuery(
    [
      "tokenService_paginatedDaytSearch",
      searchTokenBody({
        type: "DocToken",
        fieldName: "formatId",
        value: formatId,
        paging: {
          pageSize: pagination.pageSize,
          currentPage: pagination.currentPage,
        },
      }),
    ],
    searchToken,
    {
      onSuccess: (data) => {
        setPagination({
          ...pagination,
          showNavButton: true,
          totalRecords: data?.recordCount,
        });

        if (data.data.length > 0) {
          let groupedNodes = addDimensionToParentNodes(data.data);
          setNodesGroupedByID(groupedNodes);
        } else if (data.data.length === 0) {
          renderErrorNode(
            getResourceValueByKey(
              resource,
              "NO_DOCUMENTS_IN_SELECTED_FORMAT!",
              "No documents in selected format!"
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
        displayName: getResourceValueByKey(resource, "DAYT", "DAYT"),
        parent: "",
        root: true,
        token: true,
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
    refetchPaginatedDayts();
  };

  const getHeader = () => {
    return (
      <GraphPathAndTopMetrics
        resource={resource}
        reloadGraphNodes={reloadGraphNodes}
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
        pagination={pagination}
        setPagination={setPagination}
        hidePagination={hidePagination}
        graphLoading={loadingPaginatedDayts || fetchingPaginatedDayts}
        viewTokenInfoPanel={viewTokenInfoPanel}
        setViewTokenInfoPanel={setViewTokenInfoPanel}
        lastSelectedNode={lastSelectedNode}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default DAYTcontainer;
