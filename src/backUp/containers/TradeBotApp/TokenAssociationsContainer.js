import React, { useState, useEffect } from "react";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { retrieveTokenBody } from "../../utils/getPayloads/tokenPayloads";
import TokenAssociations from "../../components/tradebotApp/TokenAssociations";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import isEmpty from "lodash/isEmpty";

const TokenAssociationsContainer = (props) => {
  const { resource, token, tokenType } = props;
  const [associations, setAssociations] = useState({});
  const [loading, setLoading] = useState(true);
  let anchors = [];
  let userDetails = [];
  let starfleets = [];
  let networkDetails = [];

  useEffect(() => {
    const getAssociations = async () => {
      let body = retrieveTokenBody({
        id: token[tokenType]?.id,
        type: token[tokenType]?.type,
      });
      let tokenAssociations = await post(env.TOKEN_ASSOCIATIONS_URL, body);
      setAssociations(tokenAssociations.data);
      setLoading(false);
    };
    getAssociations();
  }, []);

  if (!isEmpty(associations)) {
    let labels = {
      name: getResourceValueByKey(resource, "NAME", "Name"),
      id: getResourceValueByKey(resource, "ID", "ID"),
      emailId: getResourceValueByKey(resource, "EMAIL_ID", "Email ID"),
      starfleetId: getResourceValueByKey(
        resource,
        "STARFLEET_ID",
        "Starfleet ID"
      ),
      networkId: getResourceValueByKey(resource, "NETWORK_ID", "Network ID"),
      networkName: getResourceValueByKey(
        resource,
        "NETWORK_NAME",
        "Network Name"
      ),
      networkRef: getResourceValueByKey(
        resource,
        "NETWORK_REF",
        "Network Ref."
      ),
      networkScope: getResourceValueByKey(
        resource,
        "NETWORK_SCOPE",
        "Network Scope"
      ),
      dltNetworkId: getResourceValueByKey(
        resource,
        "DLT_NETWORK_ID",
        "DLT Network ID"
      ),
      walletSrvcUrl: getResourceValueByKey(
        resource,
        "WALLET_SRVC_URL",
        "Wallet Srvc. URL"
      ),
    };

    associations.anchors.map((anchor) => {
      anchors.push({
        [labels.name]: anchor.name,
      });
    });

    associations.users.map((user) => {
      userDetails.push({
        [labels.id]: user.id,
        [labels.name]: user.fullName,
        [labels.emailId]: user.emailId,
      });
    });

    associations.starfleets.map((starfleet) => {
      starfleets.push({
        [labels.starfleetId]: starfleet.starfleetId,
      });
    });

    associations.networks.map((network) => {
      networkDetails.push({
        [labels.networkId]: network.networkId,
        [labels.networkName]: network.networkName,
        [labels.networkRef]: network.networkReference,
        [labels.networkScope]: network.networkScope,
        [labels.dltNetworkId]: network.dltNetworkId,
        [labels.walletSrvcUrl]: network.walletSvcUrl,
      });
    });
  }

  return (
    <TokenAssociations
      resource={resource}
      loading={loading}
      anchors={anchors}
      userDetails={userDetails}
      starfleets={starfleets}
      networkDetails={networkDetails}
    />
  );
};

export default TokenAssociationsContainer;
