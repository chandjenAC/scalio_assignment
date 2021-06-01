import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/processBotApp.json";

const MetasAndFlowsContainer = lazy(() => import("./MetasAndFlowsContainer"));
const InstancesAndFlowsContainer = lazy(() =>
  import("./InstancesAndFlowsContainer")
);
const AuditLogsContainer = lazy(() => import("../AuditApp/AuditLogsContainer"));

const ProcessBotApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<MetasAndFlowsContainer resource={resource} />}
          />
          <Route
            path=":processId/instances"
            element={<InstancesAndFlowsContainer resource={resource} />}
          />
          <Route
            path=":processId/instances/:processInstanceId"
            element={
              <AuditLogsContainer
                resource={resource}
                fromProcessBotApp={true}
              />
            }
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default ProcessBotApp;
