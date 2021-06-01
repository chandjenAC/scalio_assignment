import React, { createContext, useState } from "react";
import { getResourceValueByKey } from "../utils/resourceHelper";
import resource from "../resources/common.json";

const defaultContext = {
  breadcrumbs: [
    {
      title: getResourceValueByKey(resource, "OBSERVATORY", "Observatory"),
      path: "/yogi-webb",
    },
  ],
  setBreadcrumbs: () => {},
};

export const BreadcrumbContext = createContext(defaultContext);

const BreadcrumbContextProvider = (props) => {
  const setBreadcrumbs = (breadcrumbs) => {
    setState({ ...state, breadcrumbs: breadcrumbs });
  };

  const initState = { ...defaultContext, setBreadcrumbs: setBreadcrumbs };

  const [state, setState] = useState(initState);

  return (
    <BreadcrumbContext.Provider value={state}>
      {props.children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbContextProvider;
