import React, { lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";
import YogiLoader from "./components/common/atoms/Loaders/YogiLoader";
import { ReactQueryDevtools } from "react-query-devtools";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { SnackbarProvider } from "notistack";
import MainLayout from "./layouts/MainLayout";

const LoginContainer = lazy(() => import("./containers/LoginContainer"));
const PageNotFoundContainer = lazy(() =>
  import("./containers/PageNotFoundContainer")
);
const SessExpContainer = lazy(() => import("./containers/SessExpContainer"));
const DashboardApp = lazy(() => import("./containers/DashboardApp"));
const TradeBotApp = lazy(() => import("./containers/TradeBotApp"));
const PolicyApp = lazy(() => import("./containers/PolicyApp"));
const EndpointsApp = lazy(() => import("./containers/EndpointsApp"));
const ProcessBotApp = lazy(() => import("./containers/ProcessBotApp"));
const InvestigateApp = lazy(() => import("./containers/InvestigateApp"));
const YogiTrainingApp = lazy(() => import("./containers/YogiTrainingApp"));
const TaskQueueApp = lazy(() => import("./containers/TaskQueueApp"));
const SearchApp = lazy(() => import("./containers/SearchApp"));
const YogiWebbContainer = lazy(() => import("./containers/YogiWebb"));
const AuditApp = lazy(() => import("./containers/AuditApp"));
const FaasRegistryApp = lazy(() => import("./containers/FaasRegistryApp"));
const TopiqApp = lazy(() => import("./containers/TopiqApp"));
const AssetVaultApp = lazy(() => import("./containers/AssetVaultApp"));
const BillingApp = lazy(() => import("./containers/BillingApp"));
const BanksApp = lazy(() => import("./containers/BanksApp"));
const DataGeneratorApp = lazy(() => import("./containers/DataGeneratorApp"));

// import { pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

localStorage.setItem("locale", "en-US");
const queryCache = new QueryCache();

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ReactQueryCacheProvider queryCache={queryCache}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <div className="App">
              <Router>
                <Suspense fallback={<YogiLoader />}>
                  <Routes>
                    <Route path="login" element={<LoginContainer />} />
                    <Route
                      path="session-expired"
                      element={<SessExpContainer />}
                    />
                    <Route path="*" element={<PageNotFoundContainer />} />
                    <Route path="/">
                      <Navigate to="/yogi-webb" />
                    </Route>
                    <PrivateRoute path="yogi-webb" element={MainLayout}>
                      <Route path="/" element={<YogiWebbContainer />} />
                      <Route path="dashboard/*" element={<DashboardApp />} />
                      <Route path="audit/*" element={<AuditApp />} />
                      <Route path="trade-bot/*" element={<TradeBotApp />} />
                      <Route path="policy/*" element={<PolicyApp />} />
                      <Route path="end-points/*" element={<EndpointsApp />} />
                      <Route path="process-bot/*" element={<ProcessBotApp />} />
                      <Route
                        path="investigate/*"
                        element={<InvestigateApp />}
                      />
                      <Route
                        path="yogi-training/*"
                        element={<YogiTrainingApp />}
                      />
                      <Route path="task-queue/*" element={<TaskQueueApp />} />
                      <Route path="search/*" element={<SearchApp />} />
                      <Route
                        path="faas-registry/*"
                        element={<FaasRegistryApp />}
                      />
                      <Route path="topiq/*" element={<TopiqApp />} />
                      <Route path="asset-vault/*" element={<AssetVaultApp />} />
                      <Route path="billing/*" element={<BillingApp />} />
                      <Route path="banks/*" element={<BanksApp />} />
                      <Route
                        path="dataGenerator/*"
                        element={<DataGeneratorApp />}
                      />
                    </PrivateRoute>
                  </Routes>
                </Suspense>
              </Router>
            </div>
            <ReactQueryDevtools initialIsOpen={false} />
          </SnackbarProvider>
        </ReactQueryCacheProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
