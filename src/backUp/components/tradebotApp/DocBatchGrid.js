import React from "react";
import Mtable from "../common/organisms/Mtable";

const DocBatchGrid = (props) => {
  const { columns, title, data } = props;
  return (
    <Mtable
      style={{ boxShadow: "none", padding: "0px 12px" }}
      title={title}
      columns={columns}
      data={data}
      options={{
        search: false,
        sorting: false,
        paging: true,
        draggable: false,
      }}
    />
  );
};

export default DocBatchGrid;
