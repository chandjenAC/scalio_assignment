import React, { useContext, useEffect, useState } from "react";
import { env } from "../../ENV";
import { getTokenPoliciesBody } from "../../utils/getPayloads/tokenPayloads";
import { getTokenPolicyCriteriasBody } from "../../utils/getPayloads/tokenPayloads";
import Loader from "../../components/common/atoms/Loaders/Loader";
import { getPolicyCriteriaNodes } from "../../utils/getNodesFromResponse/getNodesFromPolicyResponse";
import { getPolicyNodes } from "../../utils/getNodesFromResponse/getNodesFromPolicyResponse";
import GraphPath from "../../components/common/GraphPath";
import DAGraphContainer from "../DAGraph/DAGraphContainer";
import PolicyInfoParentContainer from "./PolicyInfoParentContainer";
import AddNodes from "../../components/policyApp/AddNodes";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, Paper, Fade } from "@material-ui/core";
import { post } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";

const PolicyAppParent = (props) => {
  const { resource } = props;
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  const [policies, setPolicies] = useState(null);
  const [policyCriterias, setPolicyCriterias] = useState(null);
  const [reloadGraph, setReloadGraph] = useState(false);
  const [nodeDescriptions, setNodeDescriptions] = useState({}); // object with dimension id as key and value contains dimension attributes[attributes are the key value pairs of that dimension]
  const [nodesGroupedByID, setNodesGroupedByID] = useState(null); //contains parent and child nodes grouped accordingly which is used to render graph
  const [graphLoading, setGraphLoading] = useState(false);
  const [selectedNodeTrail, setSelectedNodeTrail] = useState([
    {
      id: "",
      displayName: "Policies",
      parent: "",
      root: true,
      policyRoot: true,
      expandGraph: true,
    },
  ]);
  const [lastSelectedNode, setLastSelectedNode] = useState(
    selectedNodeTrail[0]
  );
  const [pagination, setPagination] = useState({
    currentPage: 1,
    showNavButton: false,
    totalRecords: null,
  });
  const [viewPolicyEditOptions, setViewPolicyEditOptions] = useState(true);
  const [viewCriteriaEditOptions, setViewCriteriaEditOptions] = useState(false);
  const [collapseGraph, setCollapseGraph] = useState(false);
  const [viewInfo, setViewInfo] = useState(false);
  const [addGraphNodes, setAddGraphNodes] = useState(false);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "POLICY", "Policy"),
        path: "/yogi-webb/policy",
      },
    ]);
  }, []);

  const useStyles = makeStyles((theme) => ({
    fadePaper: {
      height: "100%",
      borderRadius: "25px 0px 0px 0px",
    },
    policyApproot: {
      height: "100%",
    },
    centerDiv: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    appHeader: {
      padding: "0px 20px 0px 24px",
      borderRadius: "25px 0px 0px 0px",
      width: "100%",
      flex: "0 1 auto",
    },
    divider: { width: "100%" },
    appContainer: {
      flexWrap: "nowrap",
      flex: "1 1 auto",
      width: "100%",
      padding: "12px 20px",
    },
    flexContainer: {
      height: "100%",
    },
    graphContainer: {
      width: collapseGraph ? "65%" : "100%",
      height: "100%",
      padding: 0,
      transition: "width 0.4s linear",
    },
    infoContainer: {
      width: collapseGraph ? "35%" : 0,
      padding: 0,
      transition: "width 0.6s ease-in",
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    const getPolicies = async () => {
      let policies;
      let policyResponse;
      let body = getTokenPoliciesBody();
      setGraphLoading(true);
      policyResponse = await post(env.TOKEN_POLICY_SEARCH, body);
      policies = policyResponse.data;
      setPolicies(policies);
      let nodesAndDesc = getPolicyNodes(policies);
      setNodesGroupedByID(nodesAndDesc.nodes);
      setNodeDescriptions(nodesAndDesc.nodeDescr);
      setGraphLoading(false);
    };
    getPolicies();
  }, [reloadGraph]);

  useEffect(() => {
    const getCriterias = async () => {
      let tempDescr = {};
      let body = getTokenPolicyCriteriasBody(lastSelectedNode.id);
      setGraphLoading(true);
      let response = await post(env.TOKEN_POLICY_CRITERIA_SEARCH, body);
      setPolicyCriterias(response.data);
      let nodesAndDesc = getPolicyCriteriaNodes(
        response.data,
        lastSelectedNode
      );
      let temp = nodesAndDesc.nodeDescr;
      tempDescr = { ...temp, ...tempDescr };
      setNodeDescriptions((prevState) => ({
        ...prevState,
        ...tempDescr,
      }));
      //render retrieved nodes
      setNodesGroupedByID({
        ...nodesGroupedByID,
        ...nodesAndDesc.nodes,
      });
      setGraphLoading(false);
    };
    if (lastSelectedNode && lastSelectedNode.getCriterias) {
      getCriterias();
    }
    handleCollapseGraph(lastSelectedNode);
  }, [lastSelectedNode]);

  const reloadGraphNodes = () => {
    setReloadGraph(!reloadGraph);
  };

  const handleCollapseGraph = (selectedNode = lastSelectedNode) => {
    if (selectedNode && selectedNode.policy) {
      setCollapseGraph(true);
      setViewInfo(true);
      setAddGraphNodes(false);
      setViewPolicyEditOptions(false);
      setViewCriteriaEditOptions(true);
    } else if (selectedNode && selectedNode.root) {
      setCollapseGraph(false);
      setViewInfo(false);
      setAddGraphNodes(false);
      setViewPolicyEditOptions(true);
      setViewCriteriaEditOptions(false);
    } else {
      setAddGraphNodes(false);
      setViewInfo(true);
      setViewPolicyEditOptions(false);
      setViewCriteriaEditOptions(false);
    }
  };

  const addNodeFn = () => {
    setCollapseGraph(true);
    setViewInfo(false);
    setAddGraphNodes(true);
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper elevation={0} className={classes.fadePaper}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.policyApproot}
        >
          {!policies && (
            <div className={classes.centerDiv}>
              <Loader />
            </div>
          )}
          <Grid item className={classes.appHeader}>
            <GraphPath
              resource={resource}
              reloadGraphNodes={reloadGraphNodes}
              selectedNodeTrail={selectedNodeTrail}
              setSelectedNodeTrail={setSelectedNodeTrail}
              setLastSelectedNode={setLastSelectedNode}
              setNodeDescriptions={setNodeDescriptions}
            />
          </Grid>
          <Grid item className={classes.divider}>
            <Divider variant="middle" />
          </Grid>
          <Grid item className={classes.appContainer}>
            <Grid
              container
              className={classes.flexContainer}
              justify="flex-start"
            >
              <Grid item className={classes.graphContainer}>
                <DAGraphContainer
                  // state={state}
                  resource={resource}
                  nodesGroupedByID={nodesGroupedByID}
                  selectedNodeTrail={selectedNodeTrail}
                  setSelectedNodeTrail={setSelectedNodeTrail}
                  setLastSelectedNode={setLastSelectedNode}
                  pagination={pagination}
                  setPagination={setPagination}
                  graphLoading={graphLoading}
                  // viewTokenInfoPanel={viewTokenInfoPanel}
                  // viewOnlyGraphAttr={viewOnlyGraphAttr}
                  // handleViewOnlyGraphAttrClick={handleViewOnlyGraphAttrClick}
                  // dimensionsCallingApi={dimensionsCallingApi}
                  viewPolicyEditOptions={viewPolicyEditOptions}
                  viewCriteriaEditOptions={viewCriteriaEditOptions}
                  addNodeFn={addNodeFn}
                  addGraphNodes={addGraphNodes}
                  handleCollapseGraph={handleCollapseGraph}
                />
              </Grid>
              <Grid item className={classes.infoContainer}>
                {viewInfo && (
                  <PolicyInfoParentContainer
                    resource={resource}
                    policies={policies}
                    policyCriterias={policyCriterias}
                    lastSelectedNode={lastSelectedNode}
                    nodeDescriptions={nodeDescriptions}
                  />
                )}
                {addGraphNodes && (
                  <AddNodes
                    resource={resource}
                    policies={policies}
                    policyCriterias={policyCriterias}
                    lastSelectedNode={lastSelectedNode}
                    nodeDescriptions={nodeDescriptions}
                    viewPolicyEditOptions={viewPolicyEditOptions}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>{" "}
      </Paper>
    </Fade>
  );
};

export default PolicyAppParent;
