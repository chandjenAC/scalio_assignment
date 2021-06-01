import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/yogiTrainingApp.json";

const YogiTrainingContainer = lazy(() => import("./YogiTrainingContainer"));

const YogiTrainingApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<YogiTrainingContainer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default YogiTrainingApp;
