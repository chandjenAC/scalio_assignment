import React from "react";
import { Grid } from "@material-ui/core";
// import SelectMolecule from "../common/molecules/SelectMolecule";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FilterButton from "../common/molecules/Filters/FilterButton";

const InfographFilters = (props) => {
  const {
    resource,
    infographFilters,
    ideaOptions,
    recommendationOptions,
    handleChangeIdea,
    handleChangeRecommendation,
    handleClearIdea,
    handleClearRecommendation,
  } = props;
  return (
    <Grid
      container
      alignItems="flex-end"
      style={{ padding: "0px 16px", margin: "0px 0px 6px 6px" }}
    >
      <Grid item style={{ padding: 6 }}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(resource, "CRITERIA", "Criteria")}
          popoverTitle={getResourceValueByKey(
            resource,
            "FILTER_BY_CRITERIA",
            "Filter by Criteria"
          )}
          filterValue={infographFilters.idea}
          selectLabel={getResourceValueByKey(
            resource,
            "SELECT_CRITERIA",
            "Select Criteria"
          )}
          defaultValue={infographFilters.idea}
          selectOptions={ideaOptions}
          handleApplyFilter={handleChangeIdea}
          clearFilter={handleClearIdea}
        />
      </Grid>
      <Grid item style={{ padding: 6 }}>
        <FilterButton
          filterType="select"
          displayName={getResourceValueByKey(
            resource,
            "SEARCH_BY",
            "Search by"
          )}
          popoverTitle={getResourceValueByKey(
            resource,
            "SEARCH_BY",
            "Search by"
          )}
          filterValue={infographFilters.recommendation}
          selectLabel={getResourceValueByKey(
            resource,
            "SEARCH_BY",
            "Search by"
          )}
          defaultValue={infographFilters.recommendation}
          selectOptions={recommendationOptions}
          handleApplyFilter={handleChangeRecommendation}
          clearFilter={handleClearRecommendation}
        />
      </Grid>
    </Grid>
  );
};

export default InfographFilters;
