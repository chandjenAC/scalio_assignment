import React, { useState, useEffect } from "react";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import { post } from "../../utils/callApi";
import { getDMSpayload } from "../../utils/getPayloads/dms";
import { Typography } from "@material-ui/core";

const AvatarLookUp = (props) => {
  const { resource, rowData } = props;
  const [avatarName, setAvatarName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const getAvatar = async () => {
      if (rowData.avatarId) {
        let body = getDMSpayload("id", [rowData.avatarId]);
        let response = await post(env.DMS_SEARCH_TOP_TOKEN, body);
        let name = response?.data?.[0]?.tokenDisplayName;
        if (isMounted) {
          setAvatarName(name);
          setLoading(false);
        }
      }
    };
    getAvatar();
    return () => {
      isMounted = false;
    };
  }, [rowData.avatarId]);

  return !rowData.avatarId ? (
    ""
  ) : loading ? (
    <Typography variant="caption">
      {getResourceValueByKey(resource, "LOADING...", "Loading...")}
    </Typography>
  ) : avatarName ? (
    <Typography variant="body2">{avatarName}</Typography>
  ) : (
    ""
  );
};

export default AvatarLookUp;
