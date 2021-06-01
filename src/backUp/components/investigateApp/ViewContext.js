import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import LabelAndValue from "../common/LabelAndValue";
import DialogBox from "../common/molecules/DialogBox/DialogBox";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    maxWidth: 850,
  },
  gridItem: {
    minWidth: 250,
  },
}));

const ViewContext = (props) => {
  const { resource, rowData, setViewContext } = props;

  const classes = useStyles();

  const handleClose = (e) => {
    e.stopPropagation();
    setViewContext(false);
  };

  const dialogActions = [
    { text: getResourceValueByKey(resource, "OK", "Ok"), handler: handleClose },
  ];

  return (
    <>
      <DialogBox
        open={true}
        handleClose={handleClose}
        dialogActions={dialogActions}
        title={getResourceValueByKey(resource, "CONTEXT", "Context")}
      >
        <Grid container className={classes.gridContainer}>
          {rowData.networkId && (
            <Grid item className={classes.gridItem}>
              <LabelAndValue
                label={getResourceValueByKey(
                  resource,
                  "NETWORK_ID",
                  "Network ID"
                )}
                value={rowData.networkId}
              />
            </Grid>
          )}
          {rowData.starfleetId && (
            <Grid item className={classes.gridItem}>
              <LabelAndValue
                label={getResourceValueByKey(
                  resource,
                  "STARFLEET_ID",
                  "Starfleet ID"
                )}
                value={rowData.starfleetId}
              />
            </Grid>
          )}
          {rowData.tenantId && (
            <Grid item className={classes.gridItem}>
              <LabelAndValue
                label={getResourceValueByKey(
                  resource,
                  "TENANT_ID",
                  "Tenant ID"
                )}
                value={rowData.tenantId}
              />
            </Grid>
          )}
          {rowData.avatarId && (
            <Grid item className={classes.gridItem}>
              <LabelAndValue
                label={getResourceValueByKey(
                  resource,
                  "AVATAR_ID",
                  "Avatar ID"
                )}
                value={rowData.avatarId}
              />
            </Grid>
          )}
          {rowData.anchorId && (
            <Grid item className={classes.gridItem}>
              <LabelAndValue
                label={getResourceValueByKey(
                  resource,
                  "ANCHOR_ID",
                  "Anchor ID"
                )}
                value={rowData.anchorId}
              />
            </Grid>
          )}
          {rowData.ipaddress && (
            <Grid item className={classes.gridItem}>
              <LabelAndValue
                label={getResourceValueByKey(
                  resource,
                  "IP_ADDRESS",
                  "IP Address"
                )}
                value={rowData.ipaddress}
              />
            </Grid>
          )}
        </Grid>
      </DialogBox>
    </>
  );
};

export default ViewContext;

// import React from "react";
// import { Typography, Button, Grid } from "@material-ui/core";
// import { getResourceValueByKey } from "../../utils/resourceHelper";
// import LabelAndValue from "../common/LabelAndValue";
// import { withStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import MuiDialogTitle from "@material-ui/core/DialogTitle";
// import MuiDialogContent from "@material-ui/core/DialogContent";
// import MuiDialogActions from "@material-ui/core/DialogActions";
// import IconButton from "@material-ui/core/IconButton";
// import CloseIcon from "@material-ui/icons/Close";

// const styles = (theme) => ({
//   root: {
//     margin: 0,
//     padding: "10px 12px",
//   },
//   button: {
//     color: theme.palette.primary.main,
//     padding: 0,
//     minWidth: "auto",
//     maxWidth: "40px",
//   },
//   closeButton: {
//     position: "absolute",
//     right: 0,
//     top: 0,
//     color: theme.palette.primary.main,
//   },
// });

// const DialogTitle = withStyles(styles)((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography className={classes.root} {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton
//           aria-label="close"
//           className={classes.closeButton}
//           onClick={onClose}
//         >
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });

// const DialogContent = withStyles((theme) => ({
//   root: {
//     padding: theme.spacing(2),
//   },
// }))(MuiDialogContent);

// const DialogActions = withStyles((theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1),
//   },
// }))(MuiDialogActions);

// const ViewContext = (props) => {
//   const { resource, rowData } = props;

//   // const classes = useStyles();

//   const [open, setOpen] = React.useState(false);

//   const onButtonClick = (e) => {
//     e.stopPropagation();
//     handleOpen(e);
//   };

//   const handleOpen = (e) => {
//     e.stopPropagation();
//     setOpen(true);
//   };

//   const handleClose = (e) => {
//     e.stopPropagation();
//     setOpen(false);
//   };

//   return (
//     <>
//       <Button onClick={(e) => onButtonClick(e)}>
//         {getResourceValueByKey(resource, "VIEW", "View")}
//       </Button>

//       <Dialog onClose={handleClose} open={open}>
//         <DialogTitle disableTypography onClose={handleClose}>
//           <Typography variant="subtitle1">
//             {getResourceValueByKey(resource, "CONTEXT", "Context")}
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container style={{ minWidth: 300 }}>
//             {rowData.networkId && (
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <LabelAndValue
//                   label={getResourceValueByKey(
//                     resource,
//                     "NETWORK_ID",
//                     "Network ID"
//                   )}
//                   value={rowData.networkId}
//                 />
//               </Grid>
//             )}
//             {rowData.starfleetId && (
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <LabelAndValue
//                   label={getResourceValueByKey(
//                     resource,
//                     "STARFLEET_ID",
//                     "Starfleet ID"
//                   )}
//                   value={rowData.starfleetId}
//                 />
//               </Grid>
//             )}
//             {rowData.tenantId && (
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <LabelAndValue
//                   label={getResourceValueByKey(
//                     resource,
//                     "TENANT_ID",
//                     "Tenant ID"
//                   )}
//                   value={rowData.tenantId}
//                 />
//               </Grid>
//             )}
//             {rowData.avatarId && (
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <LabelAndValue
//                   label={getResourceValueByKey(
//                     resource,
//                     "AVATAR_ID",
//                     "Avatar ID"
//                   )}
//                   value={rowData.avatarId}
//                 />
//               </Grid>
//             )}
//             {rowData.anchorId && (
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <LabelAndValue
//                   label={getResourceValueByKey(
//                     resource,
//                     "ANCHOR_ID",
//                     "Anchor ID"
//                   )}
//                   value={rowData.anchorId}
//                 />
//               </Grid>
//             )}
//             {rowData.ipaddress && (
//               <Grid item xs={12} sm={6} md={4} lg={4}>
//                 <LabelAndValue
//                   label={getResourceValueByKey(
//                     resource,
//                     "IP_ADDRESS",
//                     "IP Address"
//                   )}
//                   value={rowData.ipaddress}
//                 />
//               </Grid>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button autoFocus onClick={handleClose} color="primary">
//             Ok
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default ViewContext;
