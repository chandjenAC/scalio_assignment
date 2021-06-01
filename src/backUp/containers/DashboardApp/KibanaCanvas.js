import { Grid } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "../../contextProviders/BreadcrumbContextProvider";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const KibanaCanvas = (props) => {
  const { resource } = props;
  const [loaded, setLoaded] = useState(false);
  const { setBreadcrumbs } = useContext(BreadcrumbContext);

  useEffect(() => {
    setBreadcrumbs([
      {
        title: getResourceValueByKey(resource, "DASHBOARD", "Dashboard"),
        path: "/yogi-webb/dashboard",
      },
      {
        title: getResourceValueByKey(
          resource,
          "KIBANA_CANVAS",
          "Kibana Canvas"
        ),
        path: "/yogi-webb/dashboard/canvas",
      },
    ]);
    if (!window.KbnCanvas) {
      let script = document.createElement("script");
      let head = document.querySelector("head");
      script.src = "/kbn_canvas.js";
      head.appendChild(script);
      script.onload = () => setLoaded(true);
    } else {
      setLoaded(true);
    }
  }, []);

  if (loaded) {
    window.KbnCanvas.share();
  }

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: "95%" }}
    >
      <Grid item>
        <div
          kbn-canvas-shareable="canvas"
          kbn-canvas-url={"../../workpad.json"}
        ></div>
      </Grid>
    </Grid>
  );
};

export default KibanaCanvas;
