import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/investigateApp.json";

const TopverseLogsContainer = lazy(() => import("./TopverseLogsContainer"));
const TopverseTracesContainer = lazy(() => import("./TopverseTracesContainer"));

const InvestigateApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<TopverseLogsContainer resource={resource} />}
          />
          <Route
            path="traces"
            element={<TopverseTracesContainer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default InvestigateApp;
