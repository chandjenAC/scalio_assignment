import React from "react";
import UserProfilePopUp from "./UserProfilePopUp";
import { AppBar, Toolbar, Typography, Input, Divider } from "@material-ui/core";
import { ClickAwayListener, Button, Grid, Tooltip } from "@material-ui/core";
import { Grow } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles, fade } from "@material-ui/core/styles";
import { getResourceValueByKey } from "../utils/resourceHelper";
import { isDashboard } from "../utils";
import { useLocation } from "react-router-dom";

const Header = React.memo((props) => {
  const {
    resource,
    user,
    searchKey,
    setSearchKey,
    getHeaderTitle,
    networkName,
    viewNetworkInfoTree,
    viewSearchResults,
    onClickHeaderTitle,
    handleCloseUserSettings,
    handleOpenUserSettings,
    openUserSettings,
    onClickLogout,
  } = props;
  const location = useLocation();
  const pathname = location.pathname.split("/");

  const useStyles = makeStyles((theme) => ({
    appBarRoot: {
      margin: "0",
      boxShadow: "0px 1px 10px -7px rgba(0,0,0,0.36)",
      padding: "0px 16px 0px 0px",
    },
    toolBarRoot: {
      minHeight: "0px !important",
      padding: 0,
      [theme.breakpoints.down("sm")]: {
        padding: 0,
      },
    },
    headerTitleCont: { marginRight: "auto", padding: "3px 0px" },
    divider: {
      height: 39,
      background: isDashboard(pathname)
        ? theme.palette.grey[500]
        : theme.palette.grey[300],
    },
    marginLeftAuto: { marginLeft: "auto" },
    searchAndUserCont: { flexWrap: "noWrap" },
    titleButton: {
      borderRadius: "10px",
      padding: "4px 0px",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    titleButtonRoot: { margin: "0px 12px" },
    titleButtonText: {
      fontWeight: 400,
    },
    titleFontColor: {
      color: isDashboard(pathname)
        ? theme.palette.common.white
        : theme.palette.grey[800],
    },
    networkTextFontColor: {
      color: theme.palette.common.white,
    },
    headerAppIcon: {
      verticalAlign: "middle",
      width: "45px",
      height: "auto",
      borderRadius: "15px",
      margin: "0px 7px",
    },
    search: {
      position: "relative",
      // border: "1px solid",
      borderColor: isDashboard(pathname)
        ? theme.palette.primary.main
        : theme.palette.primary.light,
      borderRadius: 15,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIconCont: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    searchIcon: {
      color: theme.palette.common.white,
      fontSize: 20,
    },
    inputRoot: {
      // color: isDashboard(pathname) ? theme.palette.common.white : "inherit",
      color: theme.palette.common.white,
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "30ch",
        },
      },
    },
    accountCircleButton: {
      padding: "0px",
      marginLeft: 6,
      minWidth: 32,
      "&:hover": {
        backgroundColor: theme.palette.common.white,
      },
    },
    accountCircleIcon: {
      fontSize: "32px",
      color: theme.palette.primary.light,
    },
    clickAwayRoot: {
      position: "relative",
    },
  }));

  const classes = useStyles();
  const headerTitle = getHeaderTitle();

  return (
    <AppBar
      classes={{ root: classes.appBarRoot }}
      position="static"
      color="transparent"
    >
      <Toolbar classes={{ root: classes.toolBarRoot }}>
        <Grid container alignItems="center">
          <Grow in={true} timeout={500}>
            <Grid item className={classes.headerTitleCont}>
              <Grid container alignItems="center">
                <Grid item>
                  <img
                    src={headerTitle.icon}
                    className={classes.headerAppIcon}
                  />
                </Grid>

                <Grid item>
                  <Divider orientation="vertical" className={classes.divider} />
                </Grid>

                <Grid item>
                  <Button
                    // className={classes.titleButton}
                    classes={{
                      label: classes.titleButtonText,
                      root: classes.titleButtonRoot,
                    }}
                    onClick={onClickHeaderTitle}
                    variant="contained"
                    color="primary"
                  >
                    {`${headerTitle.title} ${headerTitle.subtitle}`}
                  </Button>
                </Grid>

                <Grid item>
                  <Divider
                    orientation="vertical"
                    flexItem
                    className={classes.divider}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grow>
          <Grid item className={classes.marginLeftAuto}>
            <Grid container alignItems="center">
              <Grid item className={classes.marginLeftAuto}>
                <Tooltip
                  title={getResourceValueByKey(
                    resource,
                    "GET_NETWORK_INFO",
                    "Get Network Info"
                  )}
                >
                  <Button onClick={() => viewNetworkInfoTree()}>
                    <Typography
                      variant="caption"
                      className={classes.networkTextFontColor}
                    >
                      {networkName}
                    </Typography>
                  </Button>
                </Tooltip>
              </Grid>
              <Grid item className={classes.marginLeftAuto}>
                <Grid
                  container
                  alignItems="center"
                  className={classes.searchAndUserCont}
                >
                  <Grid item>
                    <div className={classes.search}>
                      <div className={classes.searchIconCont}>
                        <SearchIcon className={classes.searchIcon} />
                      </div>
                      <form
                        className="App"
                        onSubmit={(e) => viewSearchResults(e)}
                      >
                        <Input
                          disableUnderline={true}
                          placeholder={getResourceValueByKey(
                            resource,
                            "SEARCH...",
                            "Search..."
                          )}
                          value={searchKey}
                          classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                          }}
                          onChange={(e) => setSearchKey(e.target.value)}
                        />
                      </form>
                    </div>
                  </Grid>
                  <Grid item>
                    <ClickAwayListener onClickAway={handleCloseUserSettings}>
                      <div className={classes.clickAwayRoot}>
                        <Button
                          classes={{ root: classes.accountCircleButton }}
                          onClick={() => handleOpenUserSettings()}
                        >
                          <AccountCircle
                            className={classes.accountCircleIcon}
                          />
                        </Button>
                        {openUserSettings ? (
                          <UserProfilePopUp
                            resource={resource}
                            onClickLogout={onClickLogout}
                            user={user}
                          />
                        ) : null}
                      </div>
                    </ClickAwayListener>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
