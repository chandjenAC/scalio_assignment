import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/taskQueueApp.json";

const TaskQueueContainer = lazy(() => import("./TaskQueueContainer"));

const TaskQueueApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<TaskQueueContainer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default TaskQueueApp;
