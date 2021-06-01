import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const AssetKeywords = (props) => {
  const { resource, getKeywords } = props;

  const columns = [
    // {
    //   field: "id",
    //   title: getResourceValueByKey(resource, "ID", "ID"),
    //   copy: true,
    // },
    // {
    //   field: "starBaseId",
    //   title: getResourceValueByKey(resource, "STARBASE_ID", "Starbase ID"),
    //   copy: true,
    // },
    // {
    //   field: "startfleetId",
    //   title: getResourceValueByKey(resource, "STARFLEET_ID", "Starfleet ID"),
    //   copy: true,
    // },
    {
      field: "name",
      title: getResourceValueByKey(resource, "NAME", "Name"),
      dontTruncate: true,
    },
    {
      field: "environment",
      title: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
    },

    {
      field: "type",
      title: getResourceValueByKey(resource, "TYPE", "Type"),
    },
  ];

  return (
    <Mtable
      style={{ boxShadow: "none", padding: "16px" }}
      columns={columns}
      data={getKeywords}
      options={{
        search: false,
        sorting: false,
        draggable: false,
        pageSize: 15,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
};

export default AssetKeywords;
