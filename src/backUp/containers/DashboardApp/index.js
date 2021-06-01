import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/dashboardApp.json";

// const KibanaDashboard = lazy(() => import("./KibanaDashboard"));
const EpDashboardContainer = lazy(() => import("./EpDashboardContainer"));
const KibanaCanvas = lazy(() => import("./KibanaCanvas"));

const DashboardApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div style={{ color: "#fff" }}>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<EpDashboardContainer resource={resource} />}
          />
          {/* <Route path="/" element={<KibanaDashboard />} /> */}
          <Route path="canvas" element={<KibanaCanvas resource={resource} />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default DashboardApp;
