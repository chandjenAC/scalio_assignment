import { IconButton, Tooltip } from "@material-ui/core";
import React, { useState } from "react";
import DateTimeFilter from "./DateTimeFilter";
import FilterIcon from "@material-ui/icons/FilterList";
import { getResourceValueByKey } from "../../../../utils/resourceHelper";
import resource from "../../../../resources/common.json";

const DateTimeFilterParent = (props) => {
  const [viewFilter, setViewFilter] = useState(false);

  return !viewFilter ? (
    <Tooltip
      title={getResourceValueByKey(
        resource,
        "VIEW_DATE/TIME_FILTER",
        "View Date/Time filter"
      )}
    >
      <IconButton onClick={() => setViewFilter(true)}>
        <FilterIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  ) : (
    <DateTimeFilter
      resource={resource}
      setViewFilter={setViewFilter}
      {...props}
    />
  );
};

export default DateTimeFilterParent;
