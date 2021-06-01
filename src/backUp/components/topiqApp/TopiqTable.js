import React from "react";

import Mtable from "../common/organisms/Mtable";

const TopiqTable = (props) => {
  const {
    columns,
    getTopiqs,
    addTopiqRow,
    updateTopiqRow,
    deleteTopiqRow,
  } = props;

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={columns}
      data={getTopiqs}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addTopiqRow(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateTopiqRow(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteTopiqRow(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        filtering: false,
        draggable: false,
        pageSize: 15,
      }}
    />
  );
};

export default TopiqTable;
