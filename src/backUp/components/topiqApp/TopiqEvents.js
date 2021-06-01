import React from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { Fade, Paper } from "@material-ui/core";
import { useNavigate } from "react-router";
import Mtable from "../common/organisms/Mtable";

const TopiqEvents = (props) => {
  const { resource, sourceRowData, getTopEvents } = props;
  const navigate = useNavigate();
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
      field: "category",
      title: getResourceValueByKey(resource, "CATEGORY", "Category"),
      dontTruncate: true,
    },
    {
      field: "priority",
      title: getResourceValueByKey(resource, "PRIORITY", "Priority"),
      dontTruncate: true,
    },

    {
      field: "description",
      title: getResourceValueByKey(resource, "DESCRIPTION", "Description"),
      dontTruncate: true,
    },
  ];

  return (
    <>
      <Fade in={true} timeout={500}>
        <Paper elevation={0}>
          <Mtable
            style={{ boxShadow: "none", padding: "0px 16px 16px 16px" }}
            columns={columns}
            data={(query) => getTopEvents(query, sourceRowData)}
            title={getResourceValueByKey(resource, "EVENTS", "Events")}
            actions={[
              {
                icon: tableIcons.Logs,
                tooltip: getResourceValueByKey(
                  resource,
                  "VIEW_LOGS",
                  "View logs"
                ),
                onClick: (e, rowData) => {
                  let triggerId = rowData.id;
                  navigate(`${triggerId}/logs`, {
                    state: { goBack: true },
                  });
                },
              },
              {
                icon: tableIcons.View,
                tooltip: getResourceValueByKey(
                  resource,
                  "VIEW_TOPIQ",
                  "View topiq"
                ),
                onClick: (e, rowData) => {
                  let triggerId = rowData.id;
                  navigate(`${triggerId}/topiqs`, {
                    state: { goBack: true },
                  });
                },
              },
            ]}
            options={{
              search: false,
              sorting: false,
              paging: true,
              draggable: false,
              pageSize: 5,
            }}
          />
        </Paper>
      </Fade>
    </>
  );
};

export default TopiqEvents;
