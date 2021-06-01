import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/dataGeneratorApp.json";

// const AuditDashboardContainer = lazy(() => import("./AuditDashboardContainer"));
const OnboardAvatarContainer = lazy(() => import("./OnboardAvatarContainer"));
const GenerateAssetsContainer = lazy(() =>
  import("./GenerateAssetsContainer")
);
const CreateTokiContainer = lazy(() => import("./CreateTokiContainer"));

const DataGeneratorApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<GenerateAssetsContainer resource={resource} />}
          />
          <Route
            path="toki"
            element={<CreateTokiContainer resource={resource} />}
          />
          <Route
            path="onboard"
            element={<OnboardAvatarContainer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default DataGeneratorApp;
