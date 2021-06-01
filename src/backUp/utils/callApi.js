import axios from "axios";
import auth from "./auth";
import React, { useState, useEffect } from "react";
import { useErrorHandler } from "react-error-boundary";

const clientappid = "YOGIWEBB";

export const createApiHeaders = () => {
  const userInfo = JSON.parse(localStorage.getItem("yogiUserInfo"));
  const usertoken = userInfo?.usertoken;
  return {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    usertoken: usertoken,
    clientappid,
  };
};

export const usePostApiCall = (url, body) => {
  const handleError = useErrorHandler();

  const post = async (url, body) => {
    const authenticated = auth.isAuthenticated();

    if (authenticated) {
      let res;
      async function callApi() {
        await axios
          .post(url, body, {
            headers: createApiHeaders(),
          })
          .then((response) => {
            res = response.data;
          })
          .catch((e) => {
            handleError(e);
            res = e?.response?.data;
          });
      }
      await callApi();
      return res;
    } else {
      window.location.replace("/session-expired");
    }
  };

  return post;
};

export const post = async (url, body, handleError) => {
  const authenticated = auth.isAuthenticated();

  if (authenticated) {
    let res;
    async function callApi() {
      await axios
        .post(url, body, {
          headers: createApiHeaders(),
        })
        .then((response) => {
          res = response.data;
        })
        .catch((e) => {
          handleError(e);
          res = e?.response?.data;
        });
    }
    await callApi();
    return res;
  } else {
    window.location.replace("/session-expired");
  }
};

export const postWithoutAuth = async (url, body) => {
  let res;
  async function callApi() {
    await axios
      .post(url, body, {
        headers: createApiHeaders(),
      })
      .then((response) => {
        res = response.data;
        if (!res.status) {
          console.log("failed post url- no authentication", url);
          console.log("failed post response- no authentication", res);
          // window.location.replace("/error");
        }
      })
      .catch((error) => {
        res = error?.response?.data;
        console.log(error);
        // window.location.replace("/error");
      });
  }
  await callApi();
  return res;
};

export const get = async (url) => {
  const authenticated = auth.isAuthenticated();
  if (authenticated) {
    let res;
    async function callApi() {
      await axios
        .get(url, {
          headers: createApiHeaders(),
        })
        .then((response) => {
          res = response.data;
          if (!res.status?.success) {
            console.log("failed authenticated get url", url);
            console.log("failed authenticated get response", res);
            // window.location.replace("/error");
          }
        })
        .catch((error) => {
          res = error?.response?.data;
          console.log(error);
          // window.location.replace("/error");
        });
    }
    await callApi();
    return res;
  } else {
    window.location.replace("/session-expired");
  }
};

export const put = async (url, body) => {
  const authenticated = auth.isAuthenticated();
  if (authenticated) {
    let res;
    async function callApi() {
      await axios
        .put(url, body, {
          headers: createApiHeaders(),
        })
        .then((response) => {
          res = response.data;
          if (!res.status?.success) {
            console.log("failed authenticated put url", url);
            console.log("failed authenticated put response", res);
            // window.location.replace("/error");
          }
        })
        .catch((error) => {
          console.log("put error", error);
          res = error?.response?.data;
          // window.location.replace("/error");
        });
    }
    await callApi();
    return res;
  } else {
    window.location.replace("/session-expired");
  }
};

export const del = async (url, body) => {
  const authenticated = auth.isAuthenticated();
  if (authenticated) {
    let res;
    async function callApi() {
      await axios
        .delete(url, {
          headers: createApiHeaders(),
          data: body,
        })
        .then((response) => {
          res = response.data;
          if (!res.status?.success) {
            console.log("failed authenticated del url", url);
            console.log("failed authenticated del response", res);
            // window.location.replace("/error");
          }
        })
        .catch((error) => {
          console.log(error.response);
          res = error?.response?.data;
          // window.location.replace("/error");
        });
    }
    await callApi();
    return res;
  } else {
    window.location.replace("/session-expired");
  }
};
