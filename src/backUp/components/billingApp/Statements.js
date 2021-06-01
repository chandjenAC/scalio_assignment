import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import Mtable from "../common/organisms/Mtable";

const mTableStyle = {
  boxShadow: "none",
  padding: 0,
};

const Statements = (props) => {
  const { resource, data, columns, reloadTable } = props;

  return (
    <Mtable
      style={mTableStyle}
      reload={reloadTable}
      title={getResourceValueByKey(resource, "STATEMENTS", "Statements")}
      columns={columns}
      data={data}
      options={{
        toolbar: false,
        search: false,
        sorting: false,
        paging: true,
        detailPanelColumnAlignment: "left",
        draggable: false,
        pageSize: 10,
      }}
    />
  );
};

export default React.memo(Statements);
