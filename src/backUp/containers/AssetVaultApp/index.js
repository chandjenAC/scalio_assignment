import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/assetVaultApp.json";

const AssetDefsContainer = lazy(() => import("./AssetDefsContainer"));
const AssetKeywordsContainer = lazy(() => import("./AssetKeywordsContainer"));
const AssetDocsContainer = lazy(() => import("./AssetDocsContainer"));

const AssetVaultApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<AssetDefsContainer resource={resource} />}
          />
          <Route
            path="keywords"
            element={<AssetKeywordsContainer resource={resource} />}
          />
          <Route
            path="documents"
            element={<AssetDocsContainer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default AssetVaultApp;
