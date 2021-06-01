import React, { useState, useEffect } from "react";
import GraphAndInfoContainer from "./GraphAndInfoContainer";
import GraphPathAndTopMetrics from "../../components/tradebotApp/GraphPathAndTopMetrics";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getResourceValues } from "../../utils/resourceHelper";
import { getErrorNode } from "../../utils/digraph/graphUtils";
import { useQuery } from "react-query";
import { addDimensionToParentNodes } from "../../utils/digraph/addDimensionToParentNodes";
import { searchAV } from "../../utils/getData";
import { searchAvBody } from "../../utils/getPayloads/tokenPayloads";
import InAppLayout from "../../layouts/InAppLayout";

const SearchResultsContainer = (props) => {
  const { resource, typesMeta, queryText } = props;

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

  const [nodesGroupedByID, setNodesGroupedByID] = useState({});
  const [viewTokenInfoPanel, setViewTokenInfoPanel] = useState(false);

  const [selectedNodeTrail, setSelectedNodeTrail] = useState([]);
  const [lastSelectedNode, setLastSelectedNode] = useState(null);

  const initializeNodeTrail = () => {
    setSelectedNodeTrail([
      {
        id: "",
        displayName: getResourceValues(onResultsText, { queryText: queryText }),
        parent: "",
        root: true,
        token: true,
      },
    ]);
  };

  useEffect(() => {
    refetchSearchResult();
    initializeNodeTrail();
  }, [queryText]);

  useEffect(() => {
    if (selectedNodeTrail.length === 1 && viewTokenInfoPanel) {
      setViewTokenInfoPanel(false);
    }
  }, [selectedNodeTrail]);

  const {
    isLoading: loadingSearchResult,
    refetch: refetchSearchResult,
    isFetching: fetchingSearchResult,
  } = useQuery(
    ["yogiAlphaProcessor_topverseSearch", searchAvBody(queryText)],
    searchAV,
    {
      onSuccess: (data) => {
        if (selectedNodeTrail.length > 1) {
          initializeNodeTrail();
        }
        if (data.data.length > 0) {
          let groupedNodes = addDimensionToParentNodes(data.data);
          setNodesGroupedByID(groupedNodes);
        } else if (data.data.length === 0) {
          let errorNode = getErrorNode(
            getResourceValues(noResultsText, { queryText: queryText })
          );
          setNodesGroupedByID({ [null]: errorNode });
        }
      },
      onError: () => {
        let errorNode = getErrorNode(
          getResourceValueByKey(
            resource,
            "SOMETHING_WENT_WRONG!",
            "Something went wrong!"
          )
        );
        setNodesGroupedByID({ [null]: errorNode });
      },
      refetchOnWindowFocus: false,
    }
  );

  const getHeader = () => {
    return (
      <GraphPathAndTopMetrics
        resource={resource}
        reloadGraphNodes={refetchSearchResult}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
        setViewTokenInfoPanel={setViewTokenInfoPanel}
        selectedNodeTrail={selectedNodeTrail}
      />
    );
  };

  const getMainSection = () => {
    return (
      <GraphAndInfoContainer
        resource={resource}
        typesMeta={typesMeta}
        viewTokenInfoPanel={viewTokenInfoPanel}
        setViewTokenInfoPanel={setViewTokenInfoPanel}
        lastSelectedNode={lastSelectedNode}
        queryText={queryText}
        nodesGroupedByID={nodesGroupedByID}
        setNodesGroupedByID={setNodesGroupedByID}
        selectedNodeTrail={selectedNodeTrail}
        setSelectedNodeTrail={setSelectedNodeTrail}
        setLastSelectedNode={setLastSelectedNode}
        graphLoading={fetchingSearchResult || loadingSearchResult}
      />
    );
  };

  return <InAppLayout header={getHeader()} mainSection={getMainSection()} />;
};

export default SearchResultsContainer;
