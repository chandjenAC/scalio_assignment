import React, { useState, useMemo, memo, useEffect } from "react";
import { makeStyles, Grid } from "@material-ui/core";
import Graph from "../../images/sidebar/tradeBot/Graph.js";
import Topverse from "../../images/sidebar/tradeBot/Topverse.js";
// import Users from "../../images/sidebar/tradeBot/Users.js";
import Reputation from "../../images/sidebar/tradeBot/Reputation.js";
// import Audit from "../../images/sidebar/tradeBot/Audit.js";
import Billing from "../../images/sidebar/tradeBot/Billing.js";
import Alert from "../../images/sidebar/tradeBot/Alert.js";
import Blockchain from "../../images/sidebar/tradeBot/Blockchain.js";
import Activities from "../../images/sidebar/tradeBot/Activities.js";
import SideNavbar from "../../components/common/SideNavbar";
import ViewPanel from "../../components/tradebotApp/ViewPanel";
import TokenUserInfo from "../../components/tradebotApp/TokenUserInfo";
import TokenReputation from "../../components/tradebotApp/TokenReputation";
import TokenEventsContainer from "./TokenEventsContainer";
import TokenAssociationsContainer from "./TokenAssociationsContainer";
import TokenAlertsContainer from "./TokenAlertsContainer";
import DefaultInfoPanelContainer from "./DefaultInfoPanelContainer";
import TokenBlockchainContainer from "./TokenBlockchainContainer";
import isEmpty from "lodash/isEmpty";

const tokiSideMenuState = {
  graph: {
    status: "active",
    disabled: false,
    icon: Graph,
    color: "#6e19ce",
  },
  blockchain: {
    status: null,
    disabled: false,
    icon: Blockchain,
    color: "#9ba2b3",
  },
  billing: { status: null, disabled: true, icon: Billing, color: "#9ba2b3" },
  alert: { status: null, disabled: false, icon: Alert, color: "#9ba2b3" },
  activities: {
    status: null,
    disabled: false,
    icon: Activities,
    color: "#9ba2b3",
  },
};

const avatarSideMenuState = {
  graph: {
    status: "active",
    disabled: false,
    icon: Graph,
    color: "#6e19ce",
  },
  topverse: { status: null, disabled: false, icon: Topverse, color: "#9ba2b3" },
  blockchain: {
    status: null,
    disabled: false,
    icon: Blockchain,
    color: "#9ba2b3",
  },
  reputation: {
    status: null,
    disabled: false,
    icon: Reputation,
    color: "#9ba2b3",
  },
  alert: { status: null, disabled: false, icon: Alert, color: "#9ba2b3" },
  activities: {
    status: null,
    disabled: false,
    icon: Activities,
    color: "#9ba2b3",
  },
};

const docTokenSideMenuState = {
  graph: { status: "active", disabled: false, icon: Graph, color: "#6e19ce" },
  alert: { status: null, disabled: false, icon: Alert, color: "#9ba2b3" },
  activities: {
    status: null,
    disabled: false,
    icon: Activities,
    color: "#9ba2b3",
  },
};

const useStyles = makeStyles((theme) => ({
  panelMenuFlexContainer: {
    height: "100%",
    flexWrap: "noWrap",
  },
  memoisedPanelDiv: {
    position: "relative",
    height: "100%",
    flexGrow: 1,
    maxWidth: 1150,
  },
  navBarGrid: {
    marginLeft: 6,
  },
}));

const ViewPanelContainer = (props) => {
  const {
    resource,
    lastSelectedNode,
    selectedNodeTrail,
    nodeDescriptions,
    tokenType,
    typesMeta,
    cachedDocs,
    setNodeDescriptions,
  } = props;
  const classes = useStyles();

  //set token info panel side bar menu items[show or hide menu icons based on Token type]

  const [sidebarState, setSidebarState] = useState({});

  const [componentRenderKey, setComponentRenderKey] = useState("graph"); //viewPanel component key

  useEffect(() => {
    let initialState;

    if (!isEmpty(nodeDescriptions)) {
      if (nodeDescriptions.toki) {
        initialState = tokiSideMenuState;
      } else if (nodeDescriptions.avatar) {
        initialState = avatarSideMenuState;
      } else {
        initialState = docTokenSideMenuState;
      }
    }

    setSidebarState(initialState);
  }, [nodeDescriptions]);

  // console.log("this is the sidebar state", sidebarState);

  const clearSideBarState = () => {
    for (let key in sidebarState) {
      if (sidebarState[key].status) {
        setSidebarState((prevState) => ({
          ...prevState,
          [key]: {
            ...prevState[key],
            status: null,
            disabled: false,
            color: "#9ba2b3",
          },
        }));
      }
    }
  };

  const handleMenuClick = (target) => {
    clearSideBarState();
    setSidebarState((prevState) => ({
      ...prevState,
      [target]: { ...prevState[target], status: "active", color: "#6e19ce" },
    }));
    setComponentRenderKey(target);
  };

  const Audit = () => (
    <Grid
      container
      style={{ height: "100%" }}
      alignItems="center"
      justify="center"
    >
      Work In Progress
    </Grid>
  );
  const Billing = () => (
    <Grid
      container
      style={{ height: "100%" }}
      alignItems="center"
      justify="center"
      height="100%"
    >
      Work In Progress
    </Grid>
  );

  const Default = memo(() => {
    return (
      <DefaultInfoPanelContainer
        resource={resource}
        lastSelectedNode={lastSelectedNode}
        selectedNodeTrail={selectedNodeTrail}
        nodeDescriptions={nodeDescriptions}
        setNodeDescriptions={setNodeDescriptions}
        typesMeta={typesMeta}
        tokenType={tokenType}
        cachedDocs={cachedDocs}
      />
    );
  });

  const components = {
    graph: Default,
    topverse: TokenAssociationsContainer,
    blockchain: TokenBlockchainContainer,
    users: TokenUserInfo,
    reputation: TokenReputation,
    audit: Audit,
    billing: Billing,
    alert: TokenAlertsContainer,
    activities: TokenEventsContainer,
  };

  const TagName = components[componentRenderKey];

  const memoisedViewPanel = useMemo(() => {
    return (
      <ViewPanel
        resource={resource}
        nodeDescriptions={nodeDescriptions}
        tokenType={tokenType}
        lastSelectedNode={lastSelectedNode}
        TagName={TagName}
      />
    );
  }, [nodeDescriptions, componentRenderKey, cachedDocs, lastSelectedNode]);

  return (
    <Grid
      container
      alignItems="flex-start"
      justify="space-between"
      className={classes.panelMenuFlexContainer}
    >
      <Grid
        item
        // xs={12}
        // sm={10}
        // md={10}
        // lg={10}
        className={classes.memoisedPanelDiv}
      >
        {memoisedViewPanel}
      </Grid>
      <Grid item className={classes.navBarGrid}>
        <SideNavbar
          sidebarState={sidebarState}
          handleMenuClick={handleMenuClick}
          setSidebarState={setSidebarState}
        />
      </Grid>
    </Grid>
  );
};

export default ViewPanelContainer;
