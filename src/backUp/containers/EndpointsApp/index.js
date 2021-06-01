import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/end-pointsApp.json";
import auditAppResource from "../../resources/auditApp.json";

const EndpointRegistryContainer = lazy(() =>
  import("./EndpointRegistryContainer")
);
const EntityDefsContianer = lazy(() => import("./EntityDefsContainer"));
const FolderContentsContainer = lazy(() => import("./FolderContentsContainer"));
const DocDefContainer = lazy(() => import("./DocDefContainer"));
const TradeBotApp = lazy(() => import("../TradeBotApp"));
const AuditLogsContainer = lazy(() => import("../AuditApp/AuditLogsContainer"));

const EndpointsApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={<EndpointRegistryContainer resource={resource} />}
          />

          <Route
            path=":endPoint/:avatarId"
            element={<FolderContentsContainer resource={resource} />}
          />
          <Route
            path=":endPoint/:avatarId/:docId"
            element={<TradeBotApp hideCloseIcon={true} />}
          />
          <Route
            path=":endPoint/:avatarId/:docName/logs/:processInstanceId"
            element={
              <AuditLogsContainer
                hideCloseIcon={true}
                resource={auditAppResource}
                fromEndPointsApp={true}
              />
            }
          />
          <Route
            path=":endPoint/dayt/:folderId"
            element={<DocDefContainer resource={resource} />}
          />
          {/* <Route
            path="definitions/:folderId"
            element={<DocDefContainer resource={resource} />}
          /> */}
          <Route
            path=":endPoint/dayt/:folderId/:formatId"
            element={<TradeBotApp hideCloseIcon={true} />}
          />
          {/* <Route
            path="definitions/:folderId/view-dayt"
            element={<TradeBotApp hideCloseIcon={true} />}
          /> */}
          <Route
            path=":endPoint/dayt/:folderId/entity-defs"
            element={<EntityDefsContianer resource={resource} />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default EndpointsApp;
