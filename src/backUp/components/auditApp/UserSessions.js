import React from "react";
import Mtable from "../common/organisms/Mtable";

const UserSessions = (props) => {
  const { columns, handleRemoteData } = props;

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={columns}
      data={handleRemoteData}
      options={{
        search: false,
        sorting: true,
        filtering: true,
        draggable: false,
        pageSize: 15,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
};

export default UserSessions;
