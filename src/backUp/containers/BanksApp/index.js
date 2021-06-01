import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/banksApp.json";

const AllBanksContainer = lazy(() => import("./AllBanksContainer"));

const BanksApp = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<AllBanksContainer resource={resource} />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default BanksApp;
