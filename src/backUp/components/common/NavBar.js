import React from "react";
import { MenuList, MenuItem, ListItemIcon } from "@material-ui/core";
import { useTheme, Grow } from "@material-ui/core";
import { ListItemText, makeStyles, Typography } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import isEqual from "lodash/isEqual";

const useStyles = makeStyles((theme) => ({
  button: {
    "&.active": {
      background: "black",
    },
  },
  menuItemRoot: {
    display: "block",
    padding: "6px 3px",
    "& h6": {
      opacity: "0",
      transition: "opacity 0.3s ease",
    },
    "& svg": {
      fill: theme.palette.grey[700],
      width: 28,
      height: "auto",
      margin: "auto",
      transition: "fill 0.3s ease",
    },
    "&:hover": {
      backgroundColor: "transparent !important",
      "& h6": {
        opacity: "1",
      },
      "& svg": {
        fill: theme.palette.primary.main,
      },
    },
  },
  menuItemSelected: {
    backgroundColor: "transparent !important",
    "& svg": {
      fill: `${theme.palette.secondary.main} !important`,
    },
  },
  listItemRoot: {
    width: "100%",
  },
  listItemText: {
    margin: 0,
    textAlign: "center",
  },
}));

const NavBar = (props) => {
  const { menus } = props;
  const location = useLocation();
  const classes = useStyles();
  const theme = useTheme();

  let currentPath = location.pathname;
  currentPath =
    currentPath[currentPath.length - 1] === "/"
      ? currentPath.substring(0, currentPath.length - 1)
      : currentPath;

  const isMenuSelected = (menu) => {
    const { to, home, remainingMenuPaths } = menu;
    let toSplitted = to.split("/");
    let toLength = toSplitted.length;
    let currentPathSplitted = currentPath.split("/");

    if (home) {
      if (remainingMenuPaths) {
        return remainingMenuPaths.includes(currentPathSplitted[3])
          ? false
          : true;
      }
      return true;
    } else if (toLength > 3) {
      let slicedPathArray = currentPathSplitted.slice(0, toLength);
      return isEqual(slicedPathArray, toSplitted) ? true : false;
    } else {
      return to === currentPath ? true : false;
    }
  };

  return (
    <Grow in={true} timeout={500}>
      <MenuList>
        {menus.map((menu, index) => {
          const Icon = menu.icon;
          const to = menu.to;
          return (
            <MenuItem
              key={index}
              component={Link}
              to={to}
              selected={isMenuSelected(menu)}
              classes={{
                root: classes.menuItemRoot,
                selected: classes.menuItemSelected,
              }}
            >
              <ListItemIcon classes={{ root: classes.listItemRoot }}>
                <Icon
                  style={{
                    fill: isMenuSelected(menu) && theme.palette.action.active,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                primary={
                  <Typography
                    variant="subtitle2"
                    style={{
                      opacity: isMenuSelected(menu) && "1",
                      fontWeight: 600,
                      fontSize: "0.725rem",
                      letterSpacing: "0.01071em",
                    }}
                  >
                    {menu.text}
                  </Typography>
                }
              />
            </MenuItem>
          );
        })}
      </MenuList>
    </Grow>
  );
};

export default NavBar;
