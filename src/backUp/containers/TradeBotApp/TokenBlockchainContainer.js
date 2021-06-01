import React, { useState } from "react";
import TokenBlockchainInfo from "../../components/tradebotApp/TokenBlockchainInfo";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { getDltInfoBody } from "../../utils/getPayloads/tokenPayloads";
import { getDltInfo } from "../../utils/getData";
import { useQuery } from "react-query";

const TokenBlockchainContainer = (props) => {
  const { resource, token, tokenType } = props;
  const [dltInfo, setDltInfo] = useState(null);
  const [error, setError] = useState(false);
  let networkInfo;
  let dltTxnInfo;

  const { isLoading } = useQuery(
    ["alphaproc_dltDetails", getDltInfoBody(token[tokenType].id, tokenType)],
    getDltInfo,
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data.status.success) {
          setDltInfo(data.data);
        } else {
          setError(true);
        }
      },
    }
  );

  let labels = {
    dltNetworkId: getResourceValueByKey(
      resource,
      "DLT_NETWORK_ID",
      "DLT Network ID"
    ),
    dltConsortium: getResourceValueByKey(
      resource,
      "DLT_CONSORTIUM",
      "DLT Consortium"
    ),
    dltNetwrkName: getResourceValueByKey(
      resource,
      "DLT_NETWORK_NAME",
      "DLT Network Name"
    ),
    dltNetwrkType: getResourceValueByKey(
      resource,
      "DLT_NETWORK_TYPE",
      "DLT Network Type"
    ),
    dltProtocol: getResourceValueByKey(
      resource,
      "DLT_PROTOCOL",
      "DLT Protocol"
    ),
    contractName: getResourceValueByKey(
      resource,
      "CONTRACT_NAME",
      "Contract Name"
    ),
    blockNo: getResourceValueByKey(resource, "BLOCK_NO.", "Block No."),
    blockAddress: getResourceValueByKey(
      resource,
      "BLOCK_ADDRESS",
      "Block Address"
    ),
    txnAddress: getResourceValueByKey(resource, "TXN_ADDRESS", "Txn. Address"),
  };

  if (dltInfo) {
    networkInfo = {
      [labels.dltNetworkId]: dltInfo.tokenDLTNetworkInfo.dltNetworkId,
      [labels.dltConsortium]: dltInfo.tokenDLTNetworkInfo.dltConsortiumName,
      [labels.dltNetwrkName]: dltInfo.tokenDLTNetworkInfo.dltNetworkName,
      [labels.dltNetwrkType]: dltInfo.tokenDLTNetworkInfo.dltNetworkType,
    };

    dltTxnInfo = {
      [labels.dltProtocol]: dltInfo.tokenDLTTxnInfo.protocol,
      [labels.contractName]: dltInfo.tokenDLTTxnInfo.contractName,
      [labels.dltNetworkId]: dltInfo.tokenDLTTxnInfo.dltNetworkId,
      [labels.blockNo]: dltInfo.tokenDLTTxnInfo.blockNumber,
      [labels.blockAddress]: dltInfo.tokenDLTTxnInfo.blockHash,
      [labels.txnAddress]: dltInfo.tokenDLTTxnInfo.transactionHash,
    };
  }

  // useEffect(() => {
  //   let response;
  //   async function getDltInfo() {
  //     let body = getDltInfoBody(token[tokenType].id, tokenType);
  //     response = await post(env.TOKEN_DLT_INFO_URL, body);
  //     setLoading(false);
  //     setDltInfo(response && response.data);
  //   }
  //   getDltInfo();
  // }, []);

  return (
    <TokenBlockchainInfo
      resource={resource}
      error={error}
      loading={isLoading}
      dltInfo={dltInfo}
      networkInfo={networkInfo}
      dltTxnInfo={dltTxnInfo}
    />
  );
};

export default TokenBlockchainContainer;
