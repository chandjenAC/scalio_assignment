import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import resource from "../../resources/tradeBotApp.json";
import TradeBotLoader from "../../components/common/atoms/Loaders/TradeBotLoader";

const SwitchData = lazy(() => import("./SwitchData"));

const TradeBotApp = (props) => {
  const { hideCloseIcon } = props;

  return (
    <AppLayout hideCloseIcon={hideCloseIcon}>
      <Suspense fallback={<TradeBotLoader />}>
        <Routes>
          <Route path="/" element={<SwitchData resource={resource} />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
};

export default TradeBotApp;
