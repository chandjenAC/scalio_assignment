import React from "react";
import NetworkSettings from "./NetworkSettingsContainer";
import TenantSettings from "./TenantSettingsContainer";
import StarfleetSettings from "./StarfleetSettingsContainer";
import UserSettings from "./UserSettingsContainer";
import AnchorSettings from "./AnchorSettingsContainer";

const SettingsContainer = (props) => {
  const { resource, lastSelectedNode } = props;
  return lastSelectedNode?.flags?.network ? (
    <NetworkSettings resource={resource} lastSelectedNode={lastSelectedNode} />
  ) : lastSelectedNode?.flags?.starfleet ? (
    <StarfleetSettings
      resource={resource}
      lastSelectedNode={lastSelectedNode}
    />
  ) : null;
};

export default SettingsContainer;

// return lastSelectedNode?.flags?.network ? (
//   <NetworkSettings resource={resource} lastSelectedNode={lastSelectedNode} />
// ) : lastSelectedNode?.flags?.tenant ? (
//   <TenantSettings resource={resource} lastSelectedNode={lastSelectedNode} />
// ) : lastSelectedNode?.flags?.starfleet ? (
//   <StarfleetSettings
//     resource={resource}
//     lastSelectedNode={lastSelectedNode}
//   />
// ) : lastSelectedNode?.flags?.users || lastSelectedNode?.flags?.user ? (
//   <UserSettings resource={resource} lastSelectedNode={lastSelectedNode} />
// ) : lastSelectedNode?.flags?.anchors || lastSelectedNode?.flags?.anchor ? (
//   <AnchorSettings resource={resource} lastSelectedNode={lastSelectedNode} />
// ) : null;
