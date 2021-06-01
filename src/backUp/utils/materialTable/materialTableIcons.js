import React, { forwardRef } from "react";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/EditOutlined";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import LineStyle from "@material-ui/icons/LineStyle";
import AccountTree from "@material-ui/icons/AccountTreeOutlined";
import View from "@material-ui/icons/VisibilityOutlined";
import Refresh from "@material-ui/icons/Refresh";
import Context from "@material-ui/icons/LaptopMac";
import Logs from "@material-ui/icons/Notes";
import Details from "@material-ui/icons/MoreVert";
import ReqRes from "@material-ui/icons/Repeat";
import Expand from "@material-ui/icons/MenuOpen";
import Folder from "@material-ui/icons/FolderOutlined";
import Definitions from "@material-ui/icons/FeaturedPlayListOutlined";
import Reload from "@material-ui/icons/Replay";
import Request from "@material-ui/icons/ArrowUpward";
import Response from "@material-ui/icons/ArrowDownward";
import Index from "@material-ui/icons/List";
import Model from "@material-ui/icons/DeveloperBoard";
import Relationships from "@material-ui/icons/Group";
import BugReport from "@material-ui/icons/BugReportOutlined";
import BankCode from "@material-ui/icons/BlurOn";
import AccountSpec from "@material-ui/icons/AccountBalanceOutlined";
import { ReactComponent as Calculator } from "../../images/common/calculator.svg";
import { ReactComponent as Clone } from "../../images/common/clone-regular.svg";
import Upload from "@material-ui/icons/PublishRounded";

const fontStyle = { fontSize: "1.3rem" };

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => (
    <DeleteOutline {...props} ref={ref} style={fontStyle} />
  )),
  Upload: forwardRef((props, ref) => (
    <Upload {...props} ref={ref} color="primary" />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit {...props} ref={ref} style={fontStyle} color="primary" />
  )),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => (
    <FilterList {...props} style={fontStyle} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  DocumentSegments: forwardRef((props, ref) => (
    <LineStyle color="primary" {...props} ref={ref} />
  )),
  Steps: forwardRef((props, ref) => (
    <AccountTree color="primary" {...props} ref={ref} />
  )),
  View: forwardRef((props, ref) => (
    <View color="primary" style={fontStyle} {...props} ref={ref} />
  )),
  Refresh: forwardRef((props, ref) => (
    <Refresh color="primary" style={fontStyle} />
  )),
  Context: forwardRef((props, ref) => (
    <Context color="primary" style={fontStyle} />
  )),
  Logs: forwardRef((props, ref) => <Logs color="primary" style={fontStyle} />),
  Details: forwardRef((props, ref) => <Details color="action" />),
  ReqRes: forwardRef((props, ref) => (
    <ReqRes color="primary" style={fontStyle} />
  )),
  Expand: forwardRef((props, ref) => (
    <Expand style={{ transform: "rotate(180deg)" }} />
  )),
  Folder: forwardRef((props, ref) => (
    <Folder color="primary" style={fontStyle} />
  )),
  Definitions: forwardRef((props, ref) => (
    <Definitions color="primary" style={fontStyle} />
  )),
  Reload: forwardRef((props, ref) => (
    <Reload color="primary" style={fontStyle} />
  )),
  Request: forwardRef((props, ref) => (
    <Request color="primary" style={fontStyle} />
  )),
  Response: forwardRef((props, ref) => (
    <Response color="primary" style={fontStyle} />
  )),
  Index: forwardRef((props, ref) => (
    <Index color="primary" style={fontStyle} />
  )),
  Model: forwardRef((props, ref) => (
    <Model color="primary" style={fontStyle} />
  )),
  Relationships: forwardRef((props, ref) => (
    <Relationships color="primary" style={fontStyle} />
  )),
  Calculator: forwardRef((props, ref) => (
    <Calculator color="primary" style={fontStyle} />
  )),
  BugReport: forwardRef((props, ref) => (
    <BugReport color="primary" style={fontStyle} />
  )),
  BankCode: forwardRef((props, ref) => (
    <BankCode color="primary" style={fontStyle} />
  )),
  Clone: forwardRef((props, ref) => (
    <Clone color="primary" style={fontStyle} />
  )),
  AccountSpec: forwardRef((props, ref) => (
    <AccountSpec color="primary" style={fontStyle} />
  )),
};
