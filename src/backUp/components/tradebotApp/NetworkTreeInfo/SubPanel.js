import React from "react";
import Table from "../../common/atoms/Table/Table";
import LabelAndValue from "../../common/LabelAndValue";
import { Grid, Typography, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getResourceValueByKey } from "../../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  subPanelBox: {
    width: "100%",
    height: "100%",
    paddingTop: 15,
    overflow: "scroll",
  },
  subtitle: {
    padding: "15px 10px 0px 6px",
  },
}));

const userWhiteList = [
  { key: "id", label: "ID" },
  { key: "emailId", label: "Email ID" },
  { key: "fullName", label: "Full Name" },
];

const anchorWhiteList = [
  { key: "id", label: "ID" },
  { key: "emailId", label: "Email ID" },
  { key: "tokenDisplayName", label: "Name" },
];

const renderWhiteListedData = (selectedNode) => {
  return selectedNode.nodeType === "users" ? (
    <Grid container justify="flex-start">
      {userWhiteList.map((item, index) => {
        if (selectedNode.hasOwnProperty(item.key)) {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <LabelAndValue
                label={item.label}
                value={selectedNode[item.key]}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  ) : (
    <Grid container justify="flex-start">
      {anchorWhiteList.map((item, index) => {
        if (selectedNode.hasOwnProperty(item.key)) {
          return (
            <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
              <LabelAndValue
                label={item.label}
                value={selectedNode[item.key]}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

const renderTable = (columnHeadings, tableData) => {
  return (
    <Table width="100%">
      <thead>
        <tr>
          {columnHeadings.map((th, index) => {
            return (
              <th key={index} style={{ padding: "0px" }}>
                <Typography variant="subtitle2" align="left">
                  {th}
                </Typography>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((rowData, index) => {
          return (
            <tr key={index}>
              {Object.keys(rowData).map((key, i) => {
                return (
                  <td key={i} style={{ padding: "0px 2px", width: "33.3%" }}>
                    <LabelAndValue
                      key={index}
                      label={null}
                      value={rowData[key]}
                    />
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const SubPanel = (props) => {
  const { resource, data, selectedNode } = props;
  const classes = useStyles();
  let columnHeading1;
  let columnHeading2;

  let tableData1;
  let tableData2;

  const renderAnchorAssociations = (columnHeading1, tableData1) => {
    return (
      <>
        <Typography
          variant="subtitle1"
          align="left"
          className={classes.subtitle}
        >
          {getResourceValueByKey(
            resource,
            "AVATAR_ASSOCIATIONS",
            "Avatar Associations"
          )}
        </Typography>
        {tableData1.length > 0 ? (
          renderTable(columnHeading1, tableData1)
        ) : (
          <Typography variant="body2" color="error">
            {getResourceValueByKey(
              resource,
              "NO_AVATAR_ASSOCIATIONS",
              "No Avatar Associations!"
            )}
          </Typography>
        )}
      </>
    );
  };

  const renderUserAssociations = (
    columnHeading1,
    tableData1,
    columnHeading2,
    tableData2
  ) => {
    return (
      <>
        <Typography
          variant="subtitle1"
          align="left"
          className={classes.subtitle}
        >
          {getResourceValueByKey(
            resource,
            "AVATAR_ASSOCIATIONS",
            "Avatar Associations"
          )}
        </Typography>
        {tableData1.length > 0 ? (
          renderTable(columnHeading1, tableData1)
        ) : (
          <Typography variant="body2" color="error">
            {getResourceValueByKey(
              resource,
              "NO_AVATAR_ASSOCIATIONS",
              "No Avatar Associations!"
            )}
          </Typography>
        )}
        <Typography
          variant="subtitle1"
          align="left"
          className={classes.subtitle}
        >
          {getResourceValueByKey(
            resource,
            "STARFLEET_ASSOCIATIONS",
            "Starfleet Associations"
          )}
        </Typography>
        {tableData2.length > 0 ? (
          renderTable(columnHeading2, tableData2)
        ) : (
          <Typography variant="body2" color="error">
            {getResourceValueByKey(
              resource,
              "NO_STARFLEET_ASSOCIATIONS",
              "No Starfleet Associations!"
            )}
          </Typography>
        )}
      </>
    );
  };

  const getUserAssociationsTable = () => {
    columnHeading1 = ["Sl.No.", "Avatars"];
    columnHeading2 = ["Sl.No.", "Starfleets"];

    tableData1 = [];
    tableData2 = [];

    if (data.userAvatar && data.userAvatar.length > 0) {
      data.userAvatar.map((item, index) => {
        let tempObj = {
          slNo: index + 1,
          avatar: item.tokenDisplayName ? item.tokenDisplayName : item.name,
        };
        tableData1.push(tempObj);
      });
    }

    if (data.userStarfleet && data.userStarfleet.length > 0) {
      data.userStarfleet.map((item, index) => {
        let tempObj = {
          slNo: index + 1,
          avatar: item.starfleetId,
        };
        tableData2.push(tempObj);
      });
    }
  };

  const getAnchorAssociationsTable = () => {
    columnHeading1 = ["Sl.No.", "Avatars"];
    tableData1 = [];
    if (data.anchorAvatar && data.anchorAvatar.length > 0) {
      data.anchorAvatar.map((item, index) => {
        let tempObj = {
          slNo: index + 1,
          avatar: item.tokenDisplayName ? item.tokenDisplayName : item.name,
        };
        tableData1.push(tempObj);
      });
    }
  };

  if (selectedNode.nodeType === "users") {
    getUserAssociationsTable();
  } else if (selectedNode.nodeType === "anchors") {
    getAnchorAssociationsTable();
  }

  return (
    (selectedNode.nodeType === "users" ||
      selectedNode.nodeType === "anchors") && (
      <Box className={classes.subPanelBox}>
        <Typography
          variant="subtitle1"
          align="left"
          className={classes.subtitle}
        >
          {selectedNode.tokenDisplayName
            ? selectedNode.tokenDisplayName
            : selectedNode.displayName}
        </Typography>

        {renderWhiteListedData(selectedNode)}

        {selectedNode.nodeType === "users"
          ? renderUserAssociations(
              columnHeading1,
              tableData1,
              columnHeading2,
              tableData2
            )
          : selectedNode.nodeType === "anchors"
          ? renderAnchorAssociations(columnHeading1, tableData1)
          : null}
      </Box>
    )
  );
};

export default SubPanel;
