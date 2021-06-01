import React from "react";
import Mtable from "../common/organisms/Mtable";

const TopverseLogs = (props) => {
  const { padding, columns, handleRemoteData, pageSize } = props;

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: padding ? padding : "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={columns}
      data={handleRemoteData}
      options={{
        sorting: true,
        filtering: true,
        draggable: false,
        pageSize: pageSize ? pageSize : 10,
      }}
    />
  );
};

export default TopverseLogs;
