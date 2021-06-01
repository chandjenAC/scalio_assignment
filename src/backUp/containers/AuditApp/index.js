import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/auditApp.json";
import investigateAppResource from "../../resources/investigateApp.json";

// const AuditDashboardContainer = lazy(() => import("./AuditDashboardContainer"));
const AuditLogsContainer = lazy(() => import("./AuditLogsContainer"));
const UserSessionsContainer = lazy(() => import("./UserSessionsContainer"));

const KibanaDashboardContainer = lazy(() =>
  import("./KibanaDashboardContainer")
);
const SummaryContainer = lazy(() => import("./SummaryContainer"));

const TopverseTracesContainer = lazy(() =>
  import("../InvestigateApp/TopverseTracesContainer")
);

const AuditApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<SummaryContainer resource={resource} />}
          />
          <Route
            path="details"
            element={<AuditLogsContainer resource={resource} />}
          />
          <Route
            path="user-sessions"
            element={<UserSessionsContainer resource={resource} />}
          />
          <Route
            path="details/:requestId"
            element={
              <TopverseTracesContainer resource={investigateAppResource} />
            }
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default AuditApp;
