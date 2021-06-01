import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/policyApp.json";

const PolicyAppParent = lazy(() => import("./PolicyAppParent"));

const PolicyApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<PolicyAppParent resource={resource} />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default PolicyApp;
