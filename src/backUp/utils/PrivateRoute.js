import React from "react";
import { Route, Navigate } from "react-router-dom";
import auth from "../utils/auth";

const PrivateRoute = ({ element: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      element={
        auth.isAuthenticated() ? (
          <Component />
        ) : (
          <Navigate
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
