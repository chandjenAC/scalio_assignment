import React, { createContext, useState } from "react";

const defaultContext = {
  clientOptions: [],
  setClientOptions: () => {},
  selectedClient: {},
  setSelectedClient: () => {},
  selectedStatement: {},
  setSelectedStatement: () => {},
};

export const BillingAppContext = createContext(defaultContext);

const BillingAppContextProvider = (props) => {
  const setClientOptions = (options) => {
    setState((prevState) => ({
      ...prevState,
      clientOptions: options,
    }));
  };

  const setSelectedClient = (client) => {
    setState((prevState) => ({
      ...prevState,
      selectedClient: client,
    }));
  };

  const setSelectedStatement = (selectedStatement) => {
    setState((prevState) => ({
      ...prevState,
      selectedStatement: selectedStatement,
    }));
  };

  const initState = {
    ...defaultContext,
    setClientOptions: setClientOptions,
    setSelectedClient: setSelectedClient,
    setSelectedStatement: setSelectedStatement,
  };

  const [state, setState] = useState(initState);

  return (
    <BillingAppContext.Provider value={state}>
      {props.children}
    </BillingAppContext.Provider>
  );
};

export default BillingAppContextProvider;
