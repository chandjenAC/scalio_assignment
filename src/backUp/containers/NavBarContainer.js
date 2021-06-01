import React, { useState, useEffect } from "react";
import NavBar from "../components/common/NavBar";
import { getSideNavBarMenus } from "../utils/getSideNavBarMenus";
import { useLocation } from "react-router-dom";

const NavBarContainer = () => {
  const [menus, setMenus] = useState([]);
  const location = useLocation();

  useEffect(() => {
    let temp = [];
    temp = getSideNavBarMenus(location.pathname);
    setMenus(temp);
  }, [location]);

  return menus && <NavBar menus={menus} />;
};

export default NavBarContainer;
