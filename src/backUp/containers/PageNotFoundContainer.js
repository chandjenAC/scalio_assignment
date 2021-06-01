import React from "react";
import PageNotFound from "../components/PageNotFound";
import resource from "../resources/common.json";
import ErrorBoundary from "./ErrorBoundary";

const PageNotFoundContainer = () => {
  return (
    <ErrorBoundary>
      <PageNotFound resource={resource} />
    </ErrorBoundary>
  );
};

export default PageNotFoundContainer;
