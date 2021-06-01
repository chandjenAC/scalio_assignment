import React from "react";
import Address from "../components/common/Address";
import Amount from "../components/common/Amount";
import FormatDate from "../components/common/FormatDate";
import UpdateInfo from "../components/common/UpdateInfo";
import AccountInfo from "../components/common/AccountInfo";
import DLTinfo from "../components/common/DLTinfo";
import LabelAndValue from "../components/common/LabelAndValue";
import TempAmount from "../components/common/TempAmount";
import PrimaryContact from "../components/common/PrimaryContact";
import RecursiveRenderAttributes from "./RecursiveRenderAttributes";

const labelAndValue = (label, value, index, valueFontSize) => {
  return (
    <LabelAndValue
      key={index}
      padding={"0px"}
      labelPadding={"2px 0px"}
      valueFontSize={valueFontSize}
      label={label}
      value={value}
      index={index}
    />
  );
};

const RenderAttributes = ({
  data,
  keyObj,
  disableLabel,
  tokenData,
  valueFontSize,
}) => {
  let attr = keyObj.name;
  let label = keyObj.displayName;

  return keyObj.amount ? (
    <Amount amount={data[attr]} label={disableLabel ? null : label} />
  ) : keyObj.address ? (
    <Address address={data[attr]} label={disableLabel ? null : label} />
  ) : keyObj.date ? (
    <FormatDate date={data[attr]} label={disableLabel ? null : label} />
  ) : keyObj.updateInfo ? (
    <UpdateInfo updateInfo={data[attr]} keyObj={keyObj} />
  ) : keyObj.dlt ? (
    <DLTinfo dltInfo={data[attr]} keyObj={keyObj} />
  ) : keyObj.accountInfo ? (
    <AccountInfo accountInfo={data[attr]} keyObj={keyObj} />
  ) : keyObj.primaryContact ? (
    <PrimaryContact contactInfo={data[attr]} keyObj={keyObj} />
  ) : keyObj.tempAmount ? (
    <TempAmount
      amount={data[attr]}
      label={disableLabel ? null : label}
      data={data}
      baseCcy={tokenData && tokenData.baseCcy}
    />
  ) : keyObj.result ? (
    <RecursiveRenderAttributes data={data[attr]} keyObj={keyObj} />
  ) : (
    labelAndValue(
      (label = disableLabel ? null : label),
      data[attr],
      attr,
      valueFontSize
    )
  );
};

export default RenderAttributes;
