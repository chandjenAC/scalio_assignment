import React, { useState } from "react";
import { getLoginBody } from "../utils/getPayloads/authn";
import { useNavigate } from "react-router-dom";
import resource from "../resources/common.json";
import Login from "../components/Login";
import auth from "../utils/auth";
import { useMutation } from "react-query";
import { login } from "../utils/getData";
import ErrorBoundary from "./ErrorBoundary";

const LoginContainer = (props) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const [loginMutation, mutationStatus] = useMutation(login, {
    onSuccess: (response) => {
      if (response.result) {
        localStorage.setItem("yogiUserInfo", JSON.stringify(response.result));
        navigate("/yogi-webb");
      } else {
        setError(response.message);
      }
    },
  });

  const onFormSubmit = (values) => {
    const onLogin = async () => {
      let body = getLoginBody(values.email, values.password);
      loginMutation(body);
    };
    auth.login(onLogin);
  };

  const clearErrorMsg = () => {
    setTimeout(() => {
      setError("");
    }, 4000);
  };

  if (auth.isAuthenticated()) {
    navigate("/yogi-webb");
  }

  return (
    <ErrorBoundary>
      <Login
        resource={resource}
        isLoading={mutationStatus.isLoading}
        onFormSubmit={onFormSubmit}
        clearErrorMsg={clearErrorMsg}
        error={error}
      />
    </ErrorBoundary>
  );
};

export default LoginContainer;
