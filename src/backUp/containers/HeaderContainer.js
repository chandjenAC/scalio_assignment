import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { getResourceValueByKey } from "../utils/resourceHelper";
import { useNavigate } from "react-router-dom";
// import DashboardIcon from "../images/appIcons/dashboard.png";
// import TradeBotIcon from "../images/appIcons/TradebotIcon.png";
// import PolicyAppIcon from "../images/appIcons/Policy.png";
import YogiWebbIcon from "../images/appIcons/yogiWebb.png";
// import YogiTrainingIcon from "../images/appIcons/YogiTraining.png";
// import AuditAppIcon from "../images/appIcons/Audit.png";
// import TaskQueueIcon from "../images/appIcons/taskQueue.png";
// import ProcessBotIcon from "../images/appIcons/processBot.png";
// import FileManagerAppIcon from "../images/appIcons/folderRegistry.png";
// import SearchAppIcon from "../images/appIcons/searchApp.png";
// import LogViewerAppIcon from "../images/appIcons/logViewer.png";
// import FaasRegistryAppIcon from "../images/appIcons/faasRegistry.png";
// import TopiqAppIcon from "../images/appIcons/topiq.png";
// import AssetVaultAppIcon from "../images/appIcons/assetVault.png";
// import BillingAppIcon from "../images/appIcons/billing.png";
import resource from "../resources/common.json";
import auth from "../utils/auth";
import { get, post } from "../utils/callApi";
import { env } from "../ENV";
import { getLogoutBody } from "../utils/getPayloads/authn";
import { useMutation } from "react-query";
import { logout } from "../utils/getData";

const HeaderContainer = () => {
  const [searchKey, setSearchKey] = useState("");
  const [openUserSettings, setOpenUserSettings] = useState(false);
  const [networkName, setNetworkName] = useState("");

  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
  const user =
    userInfo?.loginProfile?.userProfile?.name ||
    userInfo?.loginProfile?.userProfile?.email ||
    getResourceValueByKey(resource, "NO_NAME_AND_EMAIL", "No Name and Email");

  const [logoutMutation, mutationStatus] = useMutation(logout, {
    onSuccess: (response) => {
      localStorage.clear();
      navigate("/login");
    },
  });

  useEffect(() => {
    let response;
    let isMounted = true;
    async function getNetworkName() {
      response = await get(env.NETWORK_INFO);
      if (isMounted) {
        setNetworkName(response?.data?.networkName);
      }
    }
    getNetworkName();
    return () => {
      isMounted = false;
    };
  }, []);

  const viewNetworkInfoTree = () => {
    navigate("/yogi-webb/trade-bot", { state: { networkInfo: true } });
  };

  const viewSearchResults = (e) => {
    e.preventDefault();
    navigate("/yogi-webb/trade-bot", {
      state: { searchKey: searchKey },
    });
  };

  const getHeaderTitle = () => {
    return {
      title: getResourceValueByKey(resource, "YOGI", "Yogi"),
      subtitle: getResourceValueByKey(resource, "WEBB", "Webb"),
      icon: YogiWebbIcon,
    };
  };

  const handleOpenUserSettings = () => {
    setOpenUserSettings((prevState) => !prevState);
  };

  const handleCloseUserSettings = () => {
    setOpenUserSettings(false);
  };

  const onLogout = async () => {
    let yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
    let sessionId = yogiUserInfo.sessionId;
    let body = getLogoutBody(sessionId);
    await logoutMutation(body);
  };

  const onClickLogout = () => {
    auth.logout(onLogout);
  };

  const onClickHeaderTitle = () => {
    navigate("/");
  };

  return (
    <Header
      resource={resource}
      user={user}
      networkName={networkName}
      searchKey={searchKey}
      openUserSettings={openUserSettings}
      setSearchKey={setSearchKey}
      getHeaderTitle={getHeaderTitle}
      onClickHeaderTitle={onClickHeaderTitle}
      viewSearchResults={viewSearchResults}
      viewNetworkInfoTree={viewNetworkInfoTree}
      handleCloseUserSettings={handleCloseUserSettings}
      handleOpenUserSettings={handleOpenUserSettings}
      onClickLogout={onClickLogout}
    />
  );
};

export default HeaderContainer;

// import React, { useState, useEffect } from "react";
// import Header from "../components/Header";
// import { getResourceValueByKey } from "../utils/resourceHelper";
// import { useNavigate, useLocation } from "react-router-dom";
// import DashboardIcon from "../images/appIcons/dashboard.png";
// import TradeBotIcon from "../images/appIcons/TradebotIcon.png";
// import PolicyAppIcon from "../images/appIcons/Policy.png";
// import YogiWebbIcon from "../images/appIcons/yogiWebb.png";
// import YogiTrainingIcon from "../images/appIcons/YogiTraining.png";
// import AuditAppIcon from "../images/appIcons/Audit.png";
// import TaskQueueIcon from "../images/appIcons/taskQueue.png";
// import ProcessBotIcon from "../images/appIcons/processBot.png";
// import FileManagerAppIcon from "../images/appIcons/folderRegistry.png";
// import SearchAppIcon from "../images/appIcons/searchApp.png";
// import LogViewerAppIcon from "../images/appIcons/logViewer.png";
// import FaasRegistryAppIcon from "../images/appIcons/faasRegistry.png";
// import TopiqAppIcon from "../images/appIcons/topiq.png";
// import AssetVaultAppIcon from "../images/appIcons/assetVault.png";
// import BillingAppIcon from "../images/appIcons/billing.png";
// import commonResource from "../resources/common.json";
// import auth from "../utils/auth";
// import { get, post } from "../utils/callApi";
// import { env } from "../ENV";
// import { getLogoutBody } from "../utils/getPayloads/authn";

// const HeaderContainer = () => {
//   const [searchKey, setSearchKey] = useState("");
//   const [openUserSettings, setOpenUserSettings] = useState(false);
//   const [networkName, setNetworkName] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const userInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
//   const resource = commonResource.header;
//   const user =
//     userInfo?.loginProfile?.userProfile?.name ||
//     userInfo?.loginProfile?.userProfile?.email ||
//     getResourceValueByKey(resource, "NO_NAME_AND_EMAIL", "No Name and Email");

//   useEffect(() => {
//     let response;
//     let isMounted = true;
//     async function getNetworkName() {
//       response = await get(env.NETWORK_INFO);
//       if (isMounted) {
//         setNetworkName(response?.data?.networkName);
//       }
//     }
//     getNetworkName();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const viewNetworkInfoTree = () => {
//     navigate("/yogi-webb/trade-bot", { state: { networkInfo: true } });
//   };

//   const viewSearchResults = (e) => {
//     e.preventDefault();
//     navigate("/yogi-webb/trade-bot", {
//       state: { searchKey: searchKey },
//     });
//   };

//   const getHeaderTitle = () => {
//     let pathname;
//     let pathArray = location.pathname.split("/");
//     pathname =
//       pathArray.length > 2 && pathArray[2] !== "" ? pathArray[2] : pathArray[1];
//     switch (pathname) {
//       case "yogi-webb":
//         return {
//           title: getResourceValueByKey(resource, "YOGI", "Yogi"),
//           subtitle: getResourceValueByKey(resource, "WEBB", "Webb"),
//           icon: YogiWebbIcon,
//         };
//       case "dashboard":
//         return {
//           title: getResourceValueByKey(resource, "DASHBOARD", "Dashboard"),
//           subtitle: "",
//           icon: DashboardIcon,
//         };
//       case "trade-bot":
//         return {
//           title: getResourceValueByKey(resource, "TRADE", "Trade"),
//           subtitle: getResourceValueByKey(resource, "BOT", "Bot"),
//           icon: TradeBotIcon,
//         };
//       case "policy":
//         return {
//           title: getResourceValueByKey(resource, "POLICY", "Policy"),
//           subtitle: "",
//           icon: PolicyAppIcon,
//         };
//       case "yogi-training":
//         return {
//           title: getResourceValueByKey(resource, "YOGI", "Yogi"),
//           subtitle: getResourceValueByKey(resource, "TRAINING", "Training"),
//           icon: YogiTrainingIcon,
//         };
//       case "task-queue":
//         return {
//           title: getResourceValueByKey(resource, "TASK", "Task"),
//           subtitle: getResourceValueByKey(resource, "QUEUE", "Queue"),
//           icon: TaskQueueIcon,
//         };
//       case "search":
//         return {
//           title: getResourceValueByKey(resource, "SEARCH", "Search"),
//           subtitle: "",
//           icon: SearchAppIcon,
//         };
//       case "audit":
//         return {
//           title: getResourceValueByKey(resource, "AUDIT", "Audit"),
//           subtitle: "",
//           icon: AuditAppIcon,
//         };
//       case "end-points":
//         return {
//           title: getResourceValueByKey(resource, "END", "End"),
//           subtitle: getResourceValueByKey(resource, "POINTS", "Points"),
//           icon: FileManagerAppIcon,
//         };
//       case "entity-defs":
//         return {
//           title: getResourceValueByKey(resource, "END", "End"),
//           subtitle: getResourceValueByKey(resource, "POINTS", "Points"),
//           icon: FileManagerAppIcon,
//         };
//       case "process-bot":
//         return {
//           title: getResourceValueByKey(resource, "PROCESS", "Process"),
//           subtitle: getResourceValueByKey(resource, "BOT", "Bot"),
//           icon: ProcessBotIcon,
//         };
//       case "investigate":
//         return {
//           title: getResourceValueByKey(resource, "INVESTIGATE", "Investigate"),
//           subtitle: "",
//           icon: LogViewerAppIcon,
//         };
//       case "faas-registry":
//         return {
//           title: getResourceValueByKey(resource, "FAAS", "FaaS"),
//           subtitle: getResourceValueByKey(resource, "REGISTRY", "Registry"),
//           icon: FaasRegistryAppIcon,
//         };
//       case "topiq":
//         return {
//           title: getResourceValueByKey(resource, "TOPIQ", "Topiq"),
//           subtitle: "",
//           icon: TopiqAppIcon,
//         };
//       case "asset-vault":
//         return {
//           title: getResourceValueByKey(resource, "ASSET", "Asset"),
//           subtitle: getResourceValueByKey(resource, "VAULT", "Vault"),
//           icon: AssetVaultAppIcon,
//         };
//       case "billing":
//         return {
//           title: getResourceValueByKey(resource, "BILLING", "Billing"),
//           subtitle: "",
//           icon: BillingAppIcon,
//         };
//     }
//   };

//   const handleOpenUserSettings = () => {
//     setOpenUserSettings((prevState) => !prevState);
//   };

//   const handleCloseUserSettings = () => {
//     setOpenUserSettings(false);
//   };

//   const onLogout = async () => {
//     let yogiUserInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
//     let sessionId = yogiUserInfo.sessionId;
//     let body = getLogoutBody(sessionId);
//     await post(env.AUTHN_LOGOUT_URL, body);
//     localStorage.clear();
//     navigate("/login");
//   };

//   const logout = () => {
//     auth.logout(onLogout);
//   };

//   return (
//     <Header
//       resource={resource}
//       user={user}
//       networkName={networkName}
//       searchKey={searchKey}
//       openUserSettings={openUserSettings}
//       setSearchKey={setSearchKey}
//       getHeaderTitle={getHeaderTitle}
//       viewSearchResults={viewSearchResults}
//       viewNetworkInfoTree={viewNetworkInfoTree}
//       handleCloseUserSettings={handleCloseUserSettings}
//       handleOpenUserSettings={handleOpenUserSettings}
//       logout={logout}
//     />
//   );
// };

// export default HeaderContainer;
