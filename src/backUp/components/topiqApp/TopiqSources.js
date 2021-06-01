import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import Mtable from "../common/organisms/Mtable";

const TopiqSources = (props) => {
  const { resource, getTopSources, renderEventDetails } = props;
  const columns = [
    {
      field: "id",
      title: getResourceValueByKey(resource, "ID", "ID"),
      copy: true,
    },
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },

    {
      field: "description",
      title: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
      dontTruncate: true,
    },
  ];

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={columns}
      data={getTopSources}
      detailPanel={[
        {
          icon: tableIcons.Expand,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_EMITTED_EVENTS",
            "View emitted events"
          ),
          render: (rowData) => {
            return renderEventDetails(rowData);
          },
        },
      ]}
      options={{
        search: false,
        sorting: false,
        paging: true,
        draggable: false,
        pageSize: 15,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
};

export default TopiqSources;
