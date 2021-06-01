import React, { useEffect } from "react";
import AsyncFilter from "../../components/common/molecules/Filters/AsyncFilter";
import { post } from "../../utils/callApi";
import { env } from "../../ENV";
import { getAggregatePayload } from "../../utils/getPayloads/elasticSearch";

const AggregateAndFilterContainer = (props) => {
  const {
    placeholder,
    field,
    tableDataId,
    onMtableFilterChange,
    onChange,
    serverName,
    indexName,
    defaultValue,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const getOptions = async () => {
    let options = [];
    let body = getAggregatePayload(
      serverName,
      indexName,
      10000,
      `${field}.keyword`
    );
    let response = await post(env.ELASTIC_SEARCH, body);
    response.data.my_buckets.buckets.map((item) => {
      options.push({
        name: item.key.uniqueValue,
        id: item.key.uniqueValue,
      });
    });
    return options;
  };

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      let options = await getOptions();
      if (active) {
        setOptions(options);
      }
    })();
    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleChange = (value) => {
    let id = value ? value.id : "";
    onMtableFilterChange && onMtableFilterChange(tableDataId, id);
    onChange && onChange(value);
  };

  return (
    <AsyncFilter
      loading={loading}
      options={options}
      placeholder={placeholder}
      defaultValue={defaultValue}
      handleChange={handleChange}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default AggregateAndFilterContainer;
