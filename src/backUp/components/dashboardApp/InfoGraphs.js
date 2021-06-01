import React, { useMemo } from "react";
import InfographFilters from "./InfographFilters";
import { Card, CardContent, Grid } from "@material-ui/core";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import MaterialTable from "material-table";
import { tableIcons } from "../../utils/materialTable/materialTableIcons";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import CustomMTablePagination from "../common/molecules/CustomMTablePagination";

const useStyles = makeStyles((theme) => ({
  infographFilters: {
    padding: "0px 0px",
  },
  infographicPanel: {
    // height: 470,
    // [theme.breakpoints.down("sm")]: {
    //   height: "auto",
    // },
  },

  panelCard: {
    height: "100%",
    background: "transparent",
    padding: "6px 6px 6px 6px",
    borderRadius: "10px",
    backgroundColor: "rgba(74, 76, 81, 0.43)",
  },
  cardContent: {
    position: "relative",
    height: "100%",
    padding: 0,
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  mainGridContainer: {
    height: "100%",
  },
  tableWithFiltersCont: {
    flexWrap: "noWrap",
  },
  fullscreenIconButton: {
    position: "absolute",
    top: 6,
    right: 0,
    padding: 0,
    maxHeight: 50,
  },
  fullscreenIcon: {
    color: theme.palette.grey[400],
    fontSize: 26,
  },
  center: {
    display: "grid",
    placeItems: "center",
  },
}));

const InfoGraphs = (props) => {
  const {
    resource,
    infographFilters,
    ideaOptions,
    recommendationOptions,
    handleChangeIdea,
    handleChangeRecommendation,
    handleClearIdea,
    handleClearRecommendation,
    tableData,
    viewPanelContent,
  } = props;
  const classes = useStyles();

  const tableStyles = {
    boxShadow: "none",
    padding: "0px 16px 0px 16px",
    margin: "auto",
    width: "95%",
    background: "transparent",
    color: "white",
    // overflow: "hidden",
    // zIndex: 80,
  };

  const headerStyles = {
    padding: "6px",
    fontWeight: "500",
    color: "#c2c9d9",
    background: "#000",
    borderRadius: "2px",
    outline: "none",
    border: "none",
    // zIndex: 99,
  };

  const memoizedTable = useMemo(
    () => (
      <div className={classes.center}>
        <MaterialTable
          style={tableStyles}
          icons={tableIcons}
          columns={tableData.columns}
          data={tableData.tableData}
          // onRowClick={(evt, selectedRow) => {
          //   handleSelectTableRow(selectedRow);
          // }}
          components={{
            Pagination: (props) => {
              return <CustomMTablePagination {...props} />;
            },
          }}
          options={{
            rowStyle: (rowData) => ({
              backgroundColor: "transparent",
              padding: "0px",
            }),

            headerStyle: headerStyles,
            padding: "dense",
            initialPage: 0,
            toolbar: false,
            search: false,
            sorting: false,
            draggable: false,
            // pageSizeOptions: [4, 8, 12],
            pageSize: 10,
            maxBodyHeight: 323,
          }}
        />
      </div>
    ),
    [tableData]
  );

  return (
    <Card className={classes.panelCard}>
      <CardContent className={classes.cardContent}>
        <Tooltip title={getResourceValueByKey(resource, "EXPAND", "Expand")}>
          <IconButton className={classes.fullscreenIconButton}>
            <FullscreenIcon className={classes.fullscreenIcon} />
          </IconButton>
        </Tooltip>
        <Grid
          container
          alignItems="center"
          justify="center"
          className={classes.mainGridContainer}
        >
          <Grid item xs={12} sm={12} md={6} lg={5}>
            <Grid
              container
              direction="column"
              className={classes.tableWithFiltersCont}
            >
              <Grid item className={classes.infographFilters}>
                <InfographFilters
                  resource={resource}
                  infographFilters={infographFilters}
                  ideaOptions={ideaOptions}
                  recommendationOptions={recommendationOptions}
                  handleChangeIdea={handleChangeIdea}
                  handleChangeRecommendation={handleChangeRecommendation}
                  handleClearIdea={handleClearIdea}
                  handleClearRecommendation={handleClearRecommendation}
                />
              </Grid>
              <Grid item>{memoizedTable}</Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={7}
            className={classes.infographicPanel}
          >
            {viewPanelContent()}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default InfoGraphs;
