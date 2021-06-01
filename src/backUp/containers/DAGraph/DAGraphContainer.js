import * as React from "react";
import { useState, useEffect } from "react";
import { GraphView } from "react-digraph";
import GraphConfig, { NODE_KEY } from "../../config/graph-config"; // Configures node/edge types
import Loader from "../../components/common/atoms/Loaders/Loader";
import "./graph.scss";
import { getChildNodesWithDimensions } from "../../utils/digraph/getChildNodesWithDimensions";
import PolicyEditOptions from "../../components/policyApp/PolicyEditOptions";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import some from "lodash/some";
import isEmpty from "lodash/isEmpty";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: "6px 0px 0px 0px",
    margin: 0,
    width: "100%",
    height: "100%",
  },
  nodeText: {
    fontFamily: "Lato",
    fontSize: "22px",
    fontWeight: 400,
    marginTop: "6px",
  },
  centerDiv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  viewGraphAttrButtonDiv: {
    position: "absolute",
    width: "100%",
    top: "10px",
  },
  graphPagination: {
    position: "absolute",
    bottom: 4,
  },
}));

const DAGraphContainer = (props) => {
  const {
    state,
    nodesGroupedByID,
    graphNodes,
    graphEdges,
    selectedNodeTrail,
    setSelectedNodeTrail,
    setLastSelectedNode,
    pagination,
    setPagination,
    graphLoading,
    viewTokenInfoPanel,
    dimensionsCallingApi,
    viewPolicyEditOptions,
    viewCriteriaEditOptions,
    addNodeFn,
    addGraphNodes,
    handleCollapseGraph,
    queryText,
    handleFrontEndPagination,
  } = props;

  const classes = useStyles();

  const graphView = React.createRef(GraphView);

  const [tokenChildNodePagination, setTokenChildNodePagination] = useState({
    currentPage: 1,
    showNavButton: false,
    totalRecords: null,
  }); //used for pagination inside data-graph

  const [graphState, setGraphState] = useState({
    graph: {
      nodes: [],
      edges: [],
    },
    layoutEngineType: graphNodes ? "VerticalTree" : "None", // used to be "SnapToGrid"
    selected: null,
    // totalNodes: data.nodes.length,
    completed: false,
  });

  const [selectValue, setSelectValue] = useState(null);

  let policyOptions = [];
  let criteriaOptions = [];

  //Initial rendering of nodes, also monitors the breadcrumbs to modify render
  useEffect(() => {
    if (graphNodes) {
      setGraphState((prevValues) => ({
        ...prevValues,
        graph: {
          nodes: graphNodes,
          edges: graphEdges,
        },
      }));
    } else if (isEmpty(nodesGroupedByID)) {
      setGraphState((prevValues) => ({
        ...prevValues,
        graph: {
          nodes: [],
          edges: [],
        },
      }));
    } else if (nodesGroupedByID) {
      let childNodes = [];
      let selectedNode = selectedNodeTrail[selectedNodeTrail.length - 1];
      if (selectedNodeTrail.length === 1) {
        setGraphState((prevValues) => ({
          ...prevValues,
          graph: {
            nodes: nodesGroupedByID[null],
            edges: [],
          },
        }));
      } else {
        childNodes = getChildNodesWithDimensions(
          nodesGroupedByID,
          tokenChildNodePagination,
          setTokenChildNodePagination,
          selectedNode
        );
        setGraphState((prevValues) => ({
          ...prevValues,
          graph: {
            nodes: childNodes,
            edges: [],
          },
        }));
      }
    }
  }, [
    selectedNodeTrail,
    nodesGroupedByID,
    tokenChildNodePagination.currentPage,
    queryText,
  ]);

  //layoutEngine is changed to a random value on State change to render updated nodes(eg:on color change).
  useEffect(() => {
    if (graphState.layoutEngineType === "None") {
      //used to be "None"
      setGraphState((prevValues) => ({
        ...prevValues,
        layoutEngineType: 2, // used to be a random number
      }));
    } else {
      setGraphState((prevValues) => ({
        ...prevValues,
        layoutEngineType: "VerticalTree", //used to be "None"
      }));
    }
  }, [state, tokenChildNodePagination.currentPage]);

  //renders the text related to each node
  const renderNodeText = (data) => {
    //nodeType is for nodes created by utility function...type is for the nodes from paginated response..which when clicked makes an api call from an useEffect in ParentContainer
    if (data.nodeType || data.type) {
      return (
        <text
          className="node-text"
          textAnchor={graphNodes ? "middle" : "start"}
        >
          <tspan x={0} dy={8} fontSize="20px">
            {data.tokenDisplayName
              ? data.tokenDisplayName
              : data.displayName
              ? data.displayName
              : null}
          </tspan>
        </text>
      );
    } else {
      return (
        <text className="node-text" textAnchor="middle">
          <tspan x={75} y={-55} fontSize="20px">
            {data.displayName}
          </tspan>
          {data.count ? (
            <tspan x={75} y={10} fontSize="24px" fill="white">
              {data.count}
            </tspan>
          ) : (
            <tspan x={75} y={18} fontSize="16px">
              {data.subTitle}
            </tspan>
          )}
        </text>
      );
    }
  };

  //renders nodes which are present in graphState
  const renderNode = (ref, data, id, selected, hover, nodeProps) => {
    //when metrics is set as the data(ie;state) in parent container, then
    if (data.nodeType || data.type) {
      return (
        <g style={{ cursor: graphNodes ? "auto" : "pointer" }}>
          <use
            className="node"
            height={100}
            width={100}
            x={graphNodes ? -50 : -100}
            y={-50}
            xlinkHref={
              data.type
                ? selected
                  ? `#${data.type}-selected`
                  : `#${data.type}`
                : selected
                ? `#${data.nodeType}-selected`
                : `#${data.nodeType}`
            }
          />
        </g>
      );
    }
    return (
      <g style={{ cursor: graphNodes ? "auto" : "pointer" }}>
        <use
          className="node"
          height={100}
          width={100}
          x={data.name || data.enterpriseName ? -100 : 26}
          y={-50}
          xlinkHref={"#nodeWithCount"}
        />
      </g>
    );
  };

  // const onBackgroundClick = () => {
  //   setGraphState((prevValues) => ({
  //     ...prevValues,
  //     selected: null,
  //   }));
  // };

  // Helper to find the index of a given node
  const getNodeIndex = (searchNode) => {
    return graphState.graph.nodes.findIndex((node) => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  };

  const onUpdateNode = (viewNode) => {
    const graph = graphState.graph;
    const i = getNodeIndex(viewNode);
    graph.nodes[i] = viewNode;
    setGraphState((prevValues) => ({
      ...prevValues,
      ["graph"]: graph,
    }));
  };

  const handleNodeSelect = (viewNode) => {
    //if condition below in detail : nodesGroupedByID.hasOwnProperty(viewNode.id)=> checks if the selected node is a parent node..then add it to breadcrumb
    // viewNode.type && !viewNode.networkTree=> checks if the selected node is any of the token type..eg: avatar, doctoken etc..then add it to breadcrumb which then triggers an api call...but donot add it to breadcrumb if the node is part of a network tree nodes(handling paginated Anchors click)
    // viewNode.count > 0=> detects the TOP metrics nodes which are the ones having count attached to node attributes..detects click (eg: Avatar>>Corporate>>Active)..if true, then add it to breadcrumb then triggering an api call...only triggers api call if the count is >0
    // viewNode.subtoken=> detects the node is a subtoken node...adds it to breadcrumb which then triggers an api call in parent container
    // viewNode.dimension && dimensionsCallingApi.includes(viewNode.nodeType)=> check for specific dimension nodes for which retrieve api is to be called
    if (
      nodesGroupedByID.hasOwnProperty(viewNode.id) ||
      (viewNode.type && !viewNode.networkTree) ||
      viewNode.count > 0 ||
      viewNode.subtoken ||
      (viewNode.dimension &&
        dimensionsCallingApi.includes(viewNode.dimension)) ||
      viewNode.getCriterias
    ) {
      setSelectedNodeTrail((prevValues) => [...prevValues, viewNode]);
    }
  };

  //get the corresponding child nodes by setting selectedNodeTrail which is a dependency of useEffect defined above
  const onSelectNode = (viewNode) => {
    if (viewNode && !graphNodes) {
      let nodeRepeatingInTrail = false;
      setGraphState((prevValues) => ({
        ...prevValues,
        selected: viewNode,
      }));
      some(selectedNodeTrail, (o) => {
        if (o.id === viewNode.id) {
          nodeRepeatingInTrail = true;
        }
      });
      if (!nodeRepeatingInTrail) {
        handleNodeSelect(viewNode);
      }
      setLastSelectedNode(viewNode);
    }
  };

  const renderBackground = (gridSize) => {
    return (
      <rect
        className="background"
        x={-(gridSize || 0) / 4}
        y={-(gridSize || 0) / 4}
        width={gridSize}
        height={gridSize}
        style={{ opacity: "0.9" }}
        fill={"#f8f8f8"}
      />
    );
  };

  const { nodes, edges } = graphState.graph;
  const selected = graphState.selected;
  const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

  const getSelectPolicyOptions = () => {
    nodes.map((node) => {
      policyOptions.push({ label: node.displayName, value: node.id });
    });
  };

  const getSelectPolicyCriteriaOptions = () => {
    nodes.map((node) => {
      if (node.criteria) {
        criteriaOptions.push({ label: node.displayName, value: node.id });
      }
    });
  };

  if (viewPolicyEditOptions) {
    getSelectPolicyOptions();
  } else if (viewCriteriaEditOptions) {
    getSelectPolicyCriteriaOptions();
  }
  const onSelect = (event) => {
    setSelectValue(event.target.value);
  };

  const handlePagination = (e, value) => {
    if (handleFrontEndPagination) {
      handleFrontEndPagination(value);
    } else {
      setPagination((prevState) => ({
        ...prevState,
        currentPage: value,
      }));
    }
  };

  const handleTokenChildPagination = (e, value) => {
    setTokenChildNodePagination((prevState) => ({
      ...prevState,
      currentPage: value,
    }));
  };

  return (
    <Box className={classes.root}>
      {(viewPolicyEditOptions || viewCriteriaEditOptions) && (
        <PolicyEditOptions
          onSelect={onSelect}
          selectValue={selectValue}
          viewPolicyEditOptions={viewPolicyEditOptions}
          policyOptions={policyOptions}
          criteriaOptions={criteriaOptions}
          addNodeFn={addNodeFn}
          addGraphNodes={addGraphNodes}
          handleCollapseGraph={handleCollapseGraph}
        />
      )}
      <GraphView
        className="view-wrapper"
        ref={graphView}
        readOnly={true}
        initialBBox={
          graphNodes ? undefined : { x: 0, y: 55, width: 150, height: 1000 }
        }
        nodeKey={NODE_KEY}
        nodes={nodes}
        edges={edges}
        nodeSize={100}
        selected={selected}
        nodeTypes={NodeTypes}
        nodeSubtypes={NodeSubtypes}
        edgeTypes={EdgeTypes}
        onUpdateNode={(e) => onUpdateNode(e)}
        onSelectNode={(e) => onSelectNode(e)}
        renderNode={renderNode}
        // onBackgroundClick={onBackgroundClick}
        // nodeWidth={50}
        // nodeHeight={50}
        renderNodeText={(e) => renderNodeText(e)}
        renderBackground={renderBackground}
        layoutEngineType={graphState.layoutEngineType}
      />
      {graphLoading && (
        <div className={classes.centerDiv}>
          <Loader />
        </div>
      )}
      {/* {viewTokenInfoPanel && (
        <div className={classes.viewGraphAttrButtonDiv}>
          <Button
            color="primary"
            size="small"
            variant="outlined"
            disabled={viewOnlyGraphAttr}
            onClick={() => handleViewOnlyGraphAttrClick()}
          >
            {getResourceValueByKey(resource, "VIEW_GRAPH_ATTR")}
          </Button>
        </div>
      )} */}
      {viewTokenInfoPanel && tokenChildNodePagination.totalRecords && (
        <Grid
          container
          className={classes.graphPagination}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Pagination
              count={Math.ceil(tokenChildNodePagination.totalRecords / 5)}
              onChange={handleTokenChildPagination}
              disabled={graphLoading}
              showFirstButton
              showLastButton
              shape="rounded"
            />
          </Grid>
        </Grid>
      )}
      {pagination?.showNavButton && (
        <Grid
          container
          className={classes.graphPagination}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <Pagination
              count={Math.ceil(pagination.totalRecords / 20)}
              onChange={handlePagination}
              disabled={graphLoading}
              showFirstButton
              showLastButton
              shape="rounded"
            />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default DAGraphContainer;
