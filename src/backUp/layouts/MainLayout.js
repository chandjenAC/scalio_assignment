import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Paper, makeStyles } from "@material-ui/core";
import HeaderContainer from "../containers/HeaderContainer";
import NavBarContainer from "../containers/NavBarContainer";
// import pagesWithNavBar from "../meta/pagesWithNavBar.json";
import { isAuditDashboard, isDashboard, isEpDashboard } from "../utils";
import Breadcrumbs from "../components/common/molecules/Breadcrumbs";
import BreadcrumbContextProvider from "../contextProviders/BreadcrumbContextProvider";
import ErrorBoundary from "../containers/ErrorBoundary";

const MainLayout = () => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  // const appName = pathname[2];

  // const renderNavBar = () => {
  //   if (pagesWithNavBar.includes(appName)) {
  //     return true;
  //   }
  //   return false;
  // };

  // const showNavBar = useMemo(() => renderNavBar(), [pathname]);

  const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: "100vh",
      display: "grid",
      // display:"flex",
      flexDirection: "column",
      backgroundColor: "#fafbfc",
      gridTemplateRows: "auto auto 1fr",
      gridTemplateAreas: "'header' 'breadcrumb' 'appContainer'",
      flexWrap: "noWrap",
      backgroundImage: isEpDashboard(pathname)
        ? "url('/bg-image.jpg')"
        : isAuditDashboard(pathname)
        ? "url('/auditDashboardBg.jpg')"
        : "none",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    header: {
      gridArea: "header",
      background:
        isEpDashboard(pathname) || isAuditDashboard(pathname)
          ? "transparent"
          : "linear-gradient(93deg, #00DDC0, #2574FB)",
      display: "grid",
      placeItems: "center",
    },
    breadcrumbs: {
      gridArea: "breadcrumb",
      display: "grid",
      margin: "12px 0px",
    },
    sideBar: {
      position: "absolute",
      borderRadius: 60,
      top: "18vh",
      boxShadow: "0px 0px 9px 0px rgba(50, 50, 50, 0.34)",
      zIndex: 10,
      paddingTop: 16,
      marginLeft: 16,
      paddingBottom: 8,
      height: "fit-content",
      [theme.breakpoints.down("sm")]: {
        top: "22vh",
      },
    },
    appContainer: {
      gridArea: "appContainer",
      // flex: "1 1 auto",
      marginLeft: "3.2rem",
      backgroundColor:
        isEpDashboard(pathname) || isAuditDashboard(pathname)
          ? "transparent"
          : theme.palette.common.white,
      padding: "0px 0px 0px 52px",
      height: "100%",
      background: "transparent",
      borderRadius: "60px 0px 0px 0px",
      boxShadow: isDashboard(pathname)
        ? "none"
        : "-8px -2px 8px 1px rgba(0,0,0,0.06)",
      [theme.breakpoints.down("sm")]: {
        padding: "0px 0px 0px 30px",
        marginLeft: "1rem",
      },
    },
  }));

  const classes = useStyles();

  return (
    <ErrorBoundary>
      <BreadcrumbContextProvider>
        <div className={classes.root}>
          <div className={classes.header}>
            <HeaderContainer />
          </div>
          <div className={classes.breadcrumbs}>
            <Breadcrumbs />
          </div>
          {/* {showNavBar && ( */}
          <Paper className={classes.sideBar}>
            <NavBarContainer />
          </Paper>
          {/* )} */}
          <Paper className={classes.appContainer}>
            <Outlet />
          </Paper>
        </div>
      </BreadcrumbContextProvider>
    </ErrorBoundary>
  );
};

export default MainLayout;

// import React, { useMemo } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { Paper, makeStyles } from "@material-ui/core";
// import HeaderContainer from "../containers/HeaderContainer";
// import NavBarContainer from "../containers/NavBarContainer";
// import pagesWithNavBar from "../meta/pagesWithNavBar.json";
// import { isAuditDashboard, isDashboard, isEpDashboard } from "../utils";
// import Breadcrumbs from "../components/common/molecules/Breadcrumbs";

// const MainLayout = () => {
//   const location = useLocation();
//   const pathname = location.pathname.split("/");
//   const appName = pathname[2];

//   const renderNavBar = () => {
//     if (pagesWithNavBar.includes(appName)) {
//       return true;
//     }
//     return false;
//   };

//   const showNavBar = useMemo(() => renderNavBar(), [pathname]);

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       minHeight: "100vh",
//       display: "grid",
//       gridTemplateRows: "6vh 6vh 88vh",
//       gridTemplateColumns: showNavBar ? "6em auto" : "4em auto",
//       gridTemplateAreas:
//         "'header header' 'breadcrumb breadcrumb' 'sideBar appContainer'",
//       backgroundColor: theme.palette.common.white,
//       flexWrap: "noWrap",
//       backgroundImage: isEpDashboard(pathname)
//         ? "url('/bg-image.jpg')"
//         : isAuditDashboard(pathname)
//         ? "url('/auditDashboardBg.jpg')"
//         : "none",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       backgroundSize: "cover",
//     },
//     header: {
//       gridArea: "header",
//     },
//     breadcrumbs: {
//       gridArea: "breadcrumb",
//       display: "grid",
//       placeItems: "center",
//     },
//     sideBar: {
//       gridArea: "sideBar",
//       zIndex: 2,
//       paddingTop: 16,
//       marginLeft: 10,
//       boxShadow: "-8px -2px 8px 1px rgba(0,0,0,0.06)",
//       borderRadius: isDashboard(pathname) ? "30px" : "30px 0px 0px 30px",
//       paddingBottom: 8,
//       height: "fit-content",
//     },
//     appContainer: {
//       gridArea: "appContainer",
//       // maxHeight: "88vh",
//       overflowY: "scroll",
//       background: "transparent",
//       borderRadius: showNavBar ? "none" : "60px 0px 0px 0px",
//       boxShadow: isDashboard(pathname)
//         ? "none"
//         : "-8px -2px 8px 1px rgba(0,0,0,0.06)",
//     },
//   }));

//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <div className={classes.header}>
//         <HeaderContainer />
//       </div>
//       <div className={classes.breadcrumbs}>
//         <Breadcrumbs />
//       </div>
//       {showNavBar && (
//         <Paper className={classes.sideBar}>
//           <NavBarContainer />
//         </Paper>
//       )}
//       <Paper className={classes.appContainer}>
//         <Outlet />
//       </Paper>
//     </div>
//   );
// };

// export default MainLayout;

// import React, { useMemo } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { Paper, makeStyles } from "@material-ui/core";
// import HeaderContainer from "../containers/HeaderContainer";
// import NavBarContainer from "../containers/NavBarContainer";
// import pagesWithNavBar from "../meta/pagesWithNavBar.json";
// import { isAuditDashboard, isDashboard, isEpDashboard } from "../utils";

// const MainLayout = () => {
//   const location = useLocation();
//   const pathname = location.pathname.split("/");
//   const appName = pathname[2];

//   const renderNavBar = () => {
//     if (pagesWithNavBar.includes(appName)) {
//       return true;
//     }
//     return false;
//   };

//   const showNavBar = useMemo(() => renderNavBar(), [pathname]);

//   const useStyles = makeStyles((theme) => ({
//     root: {
//       minHeight: "100vh",
//       display: "grid",
//       gridTemplateRows: "8vh 92vh",
//       gridTemplateColumns: "6em auto",
//       gridTemplateAreas: "'header header' 'sideBar appContainer'",
//       backgroundColor: theme.palette.common.white,
//       flexWrap: "noWrap",
//       backgroundImage: isEpDashboard(pathname)
//         ? "url('/bg-image.jpg')"
//         : isAuditDashboard(pathname)
//         ? "url('/auditDashboardBg.jpg')"
//         : "none",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       backgroundSize: "cover",
//     },
//     header: {
//       gridArea: "header",
//     },
//     sideBar: {
//       gridArea: "sideBar",
//       zIndex: 2,
//       paddingTop: 16,
//       marginLeft: 10,
//       boxShadow: "-8px -2px 8px 1px rgba(0,0,0,0.06)",
//       borderRadius: isDashboard(pathname) ? "30px" : "30px 0px 0px 30px",
//       paddingBottom: 8,
//       height: "fit-content",
//     },
//     appContainer: {
//       gridArea: "appContainer",
//       maxHeight: "93vh",
//       overflowY: "scroll",
//       background: "transparent",
//       borderRadius: showNavBar ? "none" : "25px 0px 0px 0px",
//       boxShadow: isDashboard(pathname)
//         ? "none"
//         : "-8px -2px 8px 1px rgba(0,0,0,0.06)",
//     },
//   }));

//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <div className={classes.header}>
//         <HeaderContainer />
//       </div>
//       {showNavBar && (
//         <Paper className={classes.sideBar}>
//           <NavBarContainer />
//         </Paper>
//       )}
//       <Paper className={classes.appContainer}>
//         <Outlet />
//       </Paper>
//     </div>
//   );
// };

// export default MainLayout;
