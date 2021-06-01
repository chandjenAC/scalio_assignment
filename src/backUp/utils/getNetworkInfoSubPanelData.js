const getTenant = (tenants, key) => {
  let selectedTenant;
  tenants.map((tenant) => {
    if (tenant.avatarId === key) {
      selectedTenant = tenant;
    }
  });
  return selectedTenant;
};

const getStarfleet = (starfleets, key) => {
  let selectedStarfleet;
  starfleets.map((starfleet) => {
    if (starfleet.starfleetId === key) {
      selectedStarfleet = starfleet;
    }
  });
  return selectedStarfleet;
};

export const getNetworkInfoSubPanelData = (tree, selectedNodeTrail) => {
  let tenantKey = selectedNodeTrail[2].displayName;
  let starfleetKey = selectedNodeTrail[3].displayName;
  let finalKey = selectedNodeTrail[4].displayName;

  let tenant = getTenant(tree.tenants, tenantKey);
  let starfleet = getStarfleet(tenant.starfleets, starfleetKey);

  let dataForPanel = starfleet[finalKey.toLowerCase()];
  return dataForPanel;
};
