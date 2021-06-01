import React from "react";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import GetandEditProcessSteps from "./GetandEditProcessSteps";
import { useNavigate } from "react-router-dom";
import Mtable from "../common/organisms/Mtable";

const MetasAndFlows = React.memo((props) => {
  const { resource, processMetaColumns, getProcessMeta } = props;

  const navigate = useNavigate();

  return (
    <Mtable
      style={{
        boxShadow: "none",
        padding: "16px",
        borderRadius: "25px 0px 0px 0px",
      }}
      columns={processMetaColumns}
      data={getProcessMeta}
      detailPanel={[
        {
          icon: tableIcons.Expand,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_PROCESS_FLOWS",
            "View process flows"
          ),
          render: (rowData) => {
            return (
              <GetandEditProcessSteps resource={resource} rowData={rowData} />
            );
          },
        },
      ]}
      actions={[
        {
          icon: tableIcons.View,
          tooltip: getResourceValueByKey(
            resource,
            "VIEW_PROCESS_INSTANCES",
            "View process instances"
          ),
          onClick: (e, rowData) =>
            navigate(`${rowData.id}/instances`, {
              state: { goBack: true },
            }),
        },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log("adding data", newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              // updateEntityDefs(newData);
              resolve();
            }, 1000);
          }),
      }}
      options={{
        search: false,
        sorting: false,
        paging: true,
        detailPanelColumnAlignment: "left",
        draggable: false,
        pageSize: 15,
        pageSizeOptions: [5, 10, 15],
      }}
    />
  );
});

export default MetasAndFlows;
