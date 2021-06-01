import React, { useState, useEffect } from "react";
import { env } from "../../ENV";
import { get, post } from "../../utils/callApi";
import AuthnSettings from "../../components/investigateApp/AuthnSettings";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const AuthnSettingsContainer = (props) => {
  const { resource } = props;
  const loglevelOptions = [
    getResourceValueByKey(resource, "DEBUG", "Debug"),
    getResourceValueByKey(resource, "INFO", "Info"),
    getResourceValueByKey(resource, "WARNING", "Warning"),
    getResourceValueByKey(resource, "ERROR", "Error"),
  ];

  const [authSettings, setAuthnSettings] = useState({
    trace: false,
    loglevel: "",
  });
  const [newSettings, setNewSettings] = useState({
    trace: false,
    loglevel: "",
  });

  useEffect(() => {
    const getAuthSettings = async () => {
      let response = await get(env.AUTHN_SETTINGS);
      setAuthnSettings({
        trace: response.data?.trace,
        loglevel: response.data?.loglevel,
      });
      setNewSettings({
        trace: response?.data?.trace,
        loglevel: response?.data?.loglevel,
      });
    };
    getAuthSettings();
  }, []);

  const handleChangeTrace = (e) => {
    setNewSettings({ ...newSettings, trace: e.target.checked });
  };

  const handleChangeLogLevel = (e) => {
    setNewSettings((prevState) => ({
      ...prevState,
      loglevel: e.target.value,
    }));
  };

  const updateAuthSettings = async () => {
    await post(env.AUTHN_SETTINGS, newSettings);
  };

  const cancelEdit = () => {
    setNewSettings(authSettings);
  };

  return (
    <AuthnSettings
      resource={resource}
      trace={newSettings.trace}
      handleChangeTrace={handleChangeTrace}
      loglevel={newSettings.loglevel}
      handleChangeLogLevel={handleChangeLogLevel}
      loglevelOptions={loglevelOptions}
      cancelEdit={cancelEdit}
      updateAuthSettings={updateAuthSettings}
    />
  );
};

export default AuthnSettingsContainer;
