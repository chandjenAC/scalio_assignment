import React, { useEffect, useState } from "react";
import { get } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import SelectMolecule from "../../components/common/molecules/SelectMolecule";

const SubTypeSelect = (props) => {
  const { resource, value, onChange } = props;
  const [endpointTypes, setEndpointTypes] = useState([]);
  let subtypeOptions = [];

  useEffect(() => {
    get(env.GET_ENDPOINT_TYPES_SUBTYPES_LIST).then((result) => {
      setEndpointTypes(result.data);
    });
  }, [props.rowData.endPointType]);

  let subtype = endpointTypes[props.rowData.endPointType] || [];

  if (subtype.length > 0) {
    subtype.map((item) => {
      return subtypeOptions.push({ label: item, value: item });
    });
  }

  return (
    <SelectMolecule
      label={getResourceValueByKey(resource, "SUB_TYPE", "Sub-type")}
      defaultValue={value}
      onChange={onChange}
      options={subtypeOptions}
      disabled={subtypeOptions.length === 0}
    />
  );
};

export default SubTypeSelect;
