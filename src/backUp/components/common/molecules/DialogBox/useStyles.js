import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: "10px 12px",
  },
  divider: {
    height: 2,
    background: theme.palette.common.black,
    width: 150,
  },
  closeButton: {
    padding: 0,
    marginLeft: 12,
    color: theme.palette.primary.main,
  },
  dialogContent: {
    // padding: theme.spacing(2),
    minWidth: 400,
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1),
  },
}));
