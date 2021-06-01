import { ReactComponent as Canvas } from "../images/sidebar/dashboardApp/canvas.svg";
import { ReactComponent as Dashboard } from "../images/sidebar/common/dashboard.svg";
import { ReactComponent as Details } from "../images/sidebar/auditApp/details.svg";
import { ReactComponent as Sessions } from "../images/sidebar/auditApp/userSessions.svg";
import { ReactComponent as Logs } from "../images/sidebar/logViewerApp/logs.svg";
import { ReactComponent as Traces } from "../images/sidebar/logViewerApp/traces.svg";
import { ReactComponent as Registry } from "../images/sidebar/assetVaultApp/registry.svg";
import { ReactComponent as Keywords } from "../images/sidebar/assetVaultApp/keyword.svg";
import { ReactComponent as Search } from "../images/sidebar/assetVaultApp/searchAV.svg";
import { ReactComponent as Admin } from "../images/sidebar/billingApp/admin.svg";
import { ReactComponent as Toki } from "../images/sidebar/dataGeneratorApp/toki.svg";
import { ReactComponent as Observatory } from "../images/sidebar/yogiWebb/binoculars.svg";
import { ReactComponent as Settings } from "../images/common/settings.svg";
import { ReactComponent as Home } from "../images/common/home.svg";
import { ReactComponent as Activity } from "../images/common/activity.svg";
import { ReactComponent as Invoice } from "../images/common/invoice.svg";
import { ReactComponent as Onboard } from "../images/sidebar/dataGeneratorApp/onboard.svg";
import resource from "../resources/common.json";
import { getResourceValueByKey } from "./resourceHelper";

export const getSideNavBarMenus = (pathname) => {
  pathname = pathname.split("/");
  let appName = pathname[2];
  switch (appName) {
    case "banks":
      return [
        {
          to: "/yogi-webb/banks",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "end-points":
      return [
        {
          to: "/yogi-webb/end-points",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "process-bot":
      return [
        {
          to: "/yogi-webb/process-bot",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "trade-bot":
      return [
        {
          to: "/yogi-webb/trade-bot",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "policy":
      return [
        {
          to: "/yogi-webb/policy",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "yogi-training":
      return [
        {
          to: "/yogi-webb/yogi-training",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "task-queue":
      return [
        {
          to: "/yogi-webb/task-queue",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "search":
      return [
        {
          to: "/yogi-webb/search",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "faas-registry":
      return [
        {
          to: "/yogi-webb/faas-registry",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "topiq":
      return [
        {
          to: "/yogi-webb/topiq",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
        },
      ];
    case "dashboard":
      return [
        {
          to: "/yogi-webb/dashboard",
          icon: Dashboard,
          text: getResourceValueByKey(resource, "EP", "EP"),
          home: true,
          remainingMenuPaths: ["canvas"],
        },
        {
          to: "/yogi-webb/dashboard/canvas",
          icon: Canvas,
          text: getResourceValueByKey(resource, "CANVAS", "Canvas"),
        },
      ];
    case "audit":
      return [
        {
          to: "/yogi-webb/audit",
          icon: Dashboard,
          text: getResourceValueByKey(resource, "SUMMARY", "Summary"),
          home: true,
          remainingMenuPaths: ["user-sessions", "details"],
        },
        {
          to: "/yogi-webb/audit/user-sessions",
          icon: Sessions,
          text: getResourceValueByKey(resource, "SESSIONS", "Sessions"),
        },
        {
          to: "/yogi-webb/audit/details",
          icon: Details,
          text: getResourceValueByKey(resource, "DETAILS", "Details"),
        },
      ];
    case "investigate":
      return [
        {
          to: "/yogi-webb/investigate",
          icon: Logs,
          text: getResourceValueByKey(resource, "LOGS", "Logs"),
          home: true,
          remainingMenuPaths: ["traces"],
        },
        {
          to: "/yogi-webb/investigate/traces",
          icon: Traces,
          text: getResourceValueByKey(resource, "TRACES", "Traces"),
        },
      ];
    case "asset-vault":
      return [
        {
          to: "/yogi-webb/asset-vault",
          icon: Registry,
          text: getResourceValueByKey(resource, "DEFINITIONS", "Definitions"),
          home: true,
          remainingMenuPaths: ["keywords", "documents"],
        },
        {
          to: "/yogi-webb/asset-vault/keywords",
          icon: Keywords,
          text: getResourceValueByKey(resource, "KEYWORDS", "Keywords"),
        },
        {
          to: "/yogi-webb/asset-vault/documents",
          icon: Search,
          text: getResourceValueByKey(resource, "SEARCH_AV", "Search AV"),
        },
      ];
    case "billing":
      return [
        {
          to: "/yogi-webb/billing",
          icon: Home,
          text: getResourceValueByKey(resource, "HOME", "Home"),
          home: true,
          remainingMenuPaths: ["admin", "activity", "statements", "settings"],
        },
        {
          to: "/yogi-webb/billing/admin",
          icon: Admin,
          text: getResourceValueByKey(resource, "ADMIN", "Admin"),
        },
        {
          to: "/yogi-webb/billing/activity",
          icon: Activity,
          text: getResourceValueByKey(resource, "ACTIVITY", "Activity"),
        },
        {
          to: "/yogi-webb/billing/statements",
          icon: Invoice,
          text: getResourceValueByKey(resource, "STATEMENTS", "Statements"),
        },
        {
          to: "/yogi-webb/billing/settings",
          icon: Settings,
          text: getResourceValueByKey(resource, "SETTINGS", "Settings"),
        },
      ];
    case "dataGenerator":
      return [
        {
          to: "/yogi-webb/dataGenerator",
          icon: Invoice,
          text: getResourceValueByKey(resource, "ASSETS", "Assets"),
          home: true,
          remainingMenuPaths: ["toki", "onboard"],
        },
        {
          to: "/yogi-webb/dataGenerator/toki",
          icon: Toki,
          text: getResourceValueByKey(resource, "TOKI", "Toki"),
        },
        {
          to: "/yogi-webb/dataGenerator/onboard",
          icon: Onboard,
          text: getResourceValueByKey(resource, "ONBOARD", "Onboard"),
        },
      ];

    default:
      return [
        {
          to: "/yogi-webb",
          icon: Observatory,
          text: getResourceValueByKey(resource, "OBSERVE", "Observe"),
        },
      ];
      break;
  }
};
