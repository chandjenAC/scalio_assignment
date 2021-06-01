import React from "react";
import PolicyAppIcon from "../../images/appIcons/Policy.png";
import SearchAppIcon from "../../images/appIcons/searchApp.png";
import TaskQueueIcon from "../../images/appIcons/taskQueue.png";
import YogiTrainingIcon from "../../images/appIcons/YogiTraining.png";
import TradeBotIcon from "../../images/appIcons/TradebotIcon.png";
import ProcessBotIcon from "../../images/appIcons/processBot.png";
import FileManagerAppIcon from "../../images/appIcons/folderRegistry.png";
import AuditAppIcon from "../../images/appIcons/Audit.png";
import DashboardIcon from "../../images/appIcons/dashboard.png";
import InvestigateAppIcon from "../../images/appIcons/logViewer.png";
import FassRegistryAppICon from "../../images/appIcons/faasRegistry.png";
import TopiqAppICon from "../../images/appIcons/topiq.png";
import AssetVaultAppIcon from "../../images/appIcons/assetVault.png";
import BillingAppIcon from "../../images/appIcons/billing.png";
import BanksAppIcon from "../../images/appIcons/bank.png";
import TestDataGeneratorAppIcon from "../../images/appIcons/generator.png";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import resource from "../../resources/yogiWebb.json";
import YogiWebb from "../../components/yogiWebb/YogiWebb";

const YogiWebbContainer = () => {
  const appsData = [
    {
      icon: DashboardIcon,
      appName: getResourceValueByKey(resource, "DASHBOARD", "Dashboard"),
      path: "/yogi-webb/dashboard",
    },
    {
      icon: TradeBotIcon,
      appName: getResourceValueByKey(resource, "TRADEBOT", "Trade-Bot"),
      path: "/yogi-webb/trade-bot",
    },
    {
      icon: ProcessBotIcon,
      appName: getResourceValueByKey(resource, "PROCESS_BOT", "Process-Bot"),
      path: "/yogi-webb/process-bot",
    },
    {
      icon: YogiTrainingIcon,
      appName: getResourceValueByKey(
        resource,
        "YOGI_TRAINING",
        "Yogi Training"
      ),
      path: "/yogi-webb/yogi-training",
    },
    {
      icon: FileManagerAppIcon,
      appName: getResourceValueByKey(resource, "END_POINTS", "End-Points"),
      path: "/yogi-webb/end-points",
    },
    {
      icon: TaskQueueIcon,
      appName: getResourceValueByKey(resource, "TASK_QUEUE", "Task Queue"),
      path: "/yogi-webb/task-queue",
    },
    {
      icon: PolicyAppIcon,
      appName: getResourceValueByKey(resource, "POLICY", "Policy"),
      path: "/yogi-webb/policy",
    },
    {
      icon: AuditAppIcon,
      appName: getResourceValueByKey(resource, "AUDIT", "Audit"),
      path: "/yogi-webb/audit",
    },
    {
      icon: InvestigateAppIcon,
      appName: getResourceValueByKey(resource, "INVESTIGATE", "Investigate"),
      path: "/yogi-webb/investigate",
    },
    {
      icon: SearchAppIcon,
      appName: getResourceValueByKey(resource, "SEARCH", "Search"),
      path: "/yogi-webb/search",
    },
    {
      icon: FassRegistryAppICon,
      appName: getResourceValueByKey(
        resource,
        "FAAS_REGISTRY",
        "FaaS Registry"
      ),
      path: "/yogi-webb/faas-registry",
    },
    {
      icon: TopiqAppICon,
      appName: getResourceValueByKey(resource, "TOPIQ", "Topiq"),
      path: "/yogi-webb/topiq",
    },
    {
      icon: AssetVaultAppIcon,
      appName: getResourceValueByKey(resource, "ASSET_VAULT", "Asset Vault"),
      path: "/yogi-webb/asset-vault",
    },
    {
      icon: BillingAppIcon,
      appName: getResourceValueByKey(resource, "BILLING", "Billing"),
      path: "/yogi-webb/billing",
    },
    {
      icon: BanksAppIcon,
      appName: getResourceValueByKey(resource, "BANKS", "Banks"),
      path: "/yogi-webb/banks",
    },
    {
      icon: TestDataGeneratorAppIcon,
      appName: getResourceValueByKey(
        resource,
        "DATA_GENERATOR",
        "Data Generator"
      ),
      path: "/yogi-webb/dataGenerator",
    },
  ];

  return <YogiWebb resource={resource} appsData={appsData} />;
};

export default YogiWebbContainer;
