import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/topiqApp.json";

const TopiqSourcesAndEventsContainer = lazy(() =>
  import("./TopiqSourcesAndEventsContainer")
);
const TopiqTableContainer = lazy(() => import("./TopiqTableContainer"));
const TopiqLogsContainer = lazy(() => import("./TopiqLogsContainer"));

const TopiqApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<TopiqSourcesAndEventsContainer resource={resource} />}
          />
          <Route
            path=":triggerId/topiqs"
            element={<TopiqTableContainer resource={resource} />}
          />
          <Route
            path=":triggerId/logs"
            element={<TopiqLogsContainer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default TopiqApp;
