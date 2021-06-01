import React, { useState } from "react";
import { ReactComponent as CalcIcon } from "../../images/common/calculator.svg";
import { ReactComponent as CommentsIcon } from "../../images/common/comments.svg";
import { ReactComponent as EmptyCommentsIcon } from "../../images/common/emptyComments.svg";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles, Tooltip } from "@material-ui/core";
import ViewCalculationInfo from "../../components/billingApp/ViewCalculationInfo";
import AddFeeNotesContainer from "./AddFeeNotesContainer";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    margin: "0px 8px",
  },
  iconButton: {
    padding: 0,
  },
  icon: {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));

const ActivityActionsContainer = (props) => {
  const { resource, rowData, handleReloadTable } = props;
  const classes = useStyles();

  const [viewCalculationInfo, setViewCalculationInfo] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewNotes = Boolean(anchorEl);

  return (
    <>
      <Grid container alignItems="center">
        <Grid item className={classes.gridItem}>
          <Tooltip
            title={getResourceValueByKey(
              resource,
              "VIEW/ADD_NOTES",
              "View/Add notes"
            )}
          >
            <IconButton
              className={classes.iconButton}
              //   disabled={rowData.notes}
              onClick={handleClick}
            >
              {rowData.notes?.length > 0 ? (
                <CommentsIcon className={classes.icon} />
              ) : (
                <EmptyCommentsIcon className={classes.icon} />
              )}
            </IconButton>
          </Tooltip>
        </Grid>
        {rowData.calculationInfo && (
          <Grid item className={classes.gridItem}>
            <Tooltip
              title={getResourceValueByKey(
                resource,
                "VIEW_CALCULATION_INFO",
                "View calculation info"
              )}
            >
              <IconButton
                className={classes.iconButton}
                disabled={!rowData.calculationInfo}
                onClick={() => setViewCalculationInfo(true)}
              >
                <CalcIcon className={classes.icon} />
              </IconButton>
            </Tooltip>
          </Grid>
        )}
      </Grid>
      {viewCalculationInfo && (
        <ViewCalculationInfo
          resource={resource}
          selectedRow={rowData}
          setViewCalculationInfo={setViewCalculationInfo}
        />
      )}

      {viewNotes && (
        <AddFeeNotesContainer
          resource={resource}
          handleReloadTable={handleReloadTable}
          rowData={rowData}
          viewNotes={viewNotes}
          anchorEl={anchorEl}
          notes={rowData.notes}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default ActivityActionsContainer;
