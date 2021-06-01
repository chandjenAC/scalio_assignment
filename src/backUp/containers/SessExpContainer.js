import React from "react";
import resource from "../resources/common.json";
import SessionExpired from "../components/SessionExpired";
import ErrorBoundary from "./ErrorBoundary";

const SessExpContainer = () => {
  return (
    <ErrorBoundary>
      <SessionExpired resource={resource} />
    </ErrorBoundary>
  );
};

export default SessExpContainer;
