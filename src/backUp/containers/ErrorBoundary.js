import React from "react";
import Fallback from "../components/Fallback";
import { errorHandler } from "../utils";
import { ErrorBoundary as Boundary } from "react-error-boundary";
import { useNavigate } from "react-router";

const ErrorBoundary = ({ children }) => {
  const navigate = useNavigate();

  return (
    <Boundary
      FallbackComponent={Fallback}
      onError={errorHandler}
      onReset={() => navigate("/")}
    >
      {children}
    </Boundary>
  );
};

export default ErrorBoundary;
