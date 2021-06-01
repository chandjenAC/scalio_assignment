import React, { useEffect, useState } from "react";
import { get } from "../../utils/callApi";
import { getResourceValueByKey } from "../../utils/resourceHelper";
import { env } from "../../ENV";
import SelectMolecule from "../../components/common/molecules/SelectMolecule";

const EndpointTypeSelect = (props) => {
  const { resource, value, onChange } = props;
  const [endpointTypes, setEndpointTypes] = useState([]);

  useEffect(() => {
    let options = [];
    get(env.GET_ENDPOINT_TYPES_SUBTYPES_LIST).then((result) => {
      Object.keys(result?.data).map((key) => {
        options.push({ label: key, value: key });
      });
      setEndpointTypes(options);
    });
  }, []);

  return (
    <SelectMolecule
      label={getResourceValueByKey(resource, "ENDPOINT_TYPE", "Endpoint Type")}
      defaultValue={value}
      onChange={onChange}
      options={endpointTypes}
    />
  );
};

export default EndpointTypeSelect;
