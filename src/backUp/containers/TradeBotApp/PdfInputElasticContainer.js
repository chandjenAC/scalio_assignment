import { Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { post } from "../../utils/callApi";
import RecursiveRenderAttributes from "../../utils/RecursiveRenderAttributes";
import { getResourceValueByKey } from "../../utils/resourceHelper";

const PdfInputElasticContainer = (props) => {
  const { resource, tokenId, url } = props;

  const [docEntities, setDocEntities] = useState(null);

  useEffect(() => {
    const getEntities = async () => {
      let body = {
        context: {},
        payload: {
          id: tokenId,
          paging: {
            pageSize: 20,
            currentPage: 1,
          },
        },
      };
      let response = await post(url, body);
      setDocEntities(response.data);
    };
    getEntities();
  }, []);

  return docEntities && docEntities.length > 0 ? (
    <div style={{ maxHeight: 670, overflow: "scroll" }}>
      <RecursiveRenderAttributes data={docEntities[0]} />
    </div>
  ) : (
    <div style={{ display: "grid", height: "100%", placeItems: "center" }}>
      <Typography color="error">
        {getResourceValueByKey(resource, "NO_DATA!", "No Data!")}
      </Typography>
    </div>
  );
};

export default PdfInputElasticContainer;
