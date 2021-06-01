import React from "react";
import styled from "styled-components";
import capitalize from "lodash/capitalize";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

const Label = styled.p`
  display: block;
  opacity: ${(props) => (props.selected ? "1" : "0")};
  font-weight: 600;
  font-size: 0.8rem;
  letter-spacing: 0.01071em;
  font-family: Lato;
  margin: 0;
  padding: 6px 0px;
  transition: opacity 0.3s ease-in;
`;

const ListItem = styled.li`
  width: 100%;
  &: hover ${Label}{
      opacity:1;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  @media (max-width: 500px) {
    flex-direction: row;
    width: 320px;
    overflow: scroll;
  }
`;

const Link = styled.a`
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const StyledContainer = styled.div`
  border-radius: 10px;
  box-shadow: -2px 2px 8px -1px rgba(0, 0, 0, 0.18);
  padding: 16px 4px 0px 4px;
  @media (max-width: 500px) {
    flex-direction: row;
    width: 300px;
    overflow: scroll;
  }
`;

const useStyles = makeStyles((theme) => ({
  navBarPaper: {
    padding: "8px 4px 0px 4px",
    borderRadius: "10px",
  },
}));

const SideNavbar = (props) => {
  const { sidebarState, setSidebarState, handleMenuClick } = props;
  const classes = useStyles();

  const onMouseEnter = (target) => {
    if (!sidebarState[target].status) {
      setSidebarState((prevState) => ({
        ...prevState,
        [target]: { ...prevState[target], color: "#ff9900" },
      }));
    }
  };

  const onMouseLeave = (target) => {
    if (!sidebarState[target].status) {
      setSidebarState((prevState) => ({
        ...prevState,
        [target]: { ...prevState[target], color: "#9ba2b3" },
      }));
    }
  };

  const onClick = (target) => {
    handleMenuClick(target);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        background: "transparent",
        margin: "0px 6px",
      }}
    >
      <Paper elevation={5} className={classes.navBarPaper}>
        <List>
          {sidebarState &&
            Object.keys(sidebarState).map((key, index) => {
              const Icon = sidebarState[key].icon;
              return (
                <ListItem key={index}>
                  <Link
                    onMouseEnter={() => onMouseEnter(key)}
                    onMouseLeave={() => onMouseLeave(key)}
                    onClick={() => onClick(key)}
                  >
                    <Icon color={sidebarState[key].color} />
                    <Label selected={sidebarState[key].status ? true : false}>
                      {capitalize(key)}
                    </Label>
                  </Link>
                </ListItem>
              );
            })}
        </List>
      </Paper>
    </nav>
  );
};

export default SideNavbar;
