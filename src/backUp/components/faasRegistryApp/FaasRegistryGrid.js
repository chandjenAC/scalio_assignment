import React from "react";
import Mtable from "../common/organisms/Mtable";

const FaasRegistryGrid = (props) => {
  const {
    columns,
    handleRemoteData,
    addFaasRegistryRow,
    updateFaasRegistryRow,
    deleteFaasRegistryRow,
  } = props;

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={columns}
      data={handleRemoteData}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              addFaasRegistryRow(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              updateFaasRegistryRow(newData);
              resolve();
            }, 1000);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              deleteFaasRegistryRow(oldData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        filtering: false,
        draggable: false,
        pageSize: 5,
        maxBodyHeight: 700,
      }}
    />
  );
};

export default FaasRegistryGrid;
