import React, { useEffect, useState } from "react";
import {
  AsyncPaginate,
  reduceGroupedOptions,
} from "react-select-async-paginate";
import debounce from "debounce-async";

const wrapperStyles = {
  control: (provided) => ({
    ...provided,
    background: "#fff",
    border: "none",
    borderRadius: 0,
    borderBottom: "1px solid #9e9e9e",
    boxShadow: "none",
    marginBottom: 8,
    minHeight: "30px",
    // height: "30px",
    "&:hover": {
      border: "none",
      borderRadius: 0,
      borderBottom: "1px solid #2574fb",
      boxShadow: "none",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    // height: "30px",
    padding: "0px",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    // height: "12px",
    padding: 0,
    "& div": {
      padding: 0,
    },
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      padding: "4px",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};

const AsyncPaginatedSelect = (props) => {
  const {
    columnDef,
    onMtableFilterChange,
    placeholder,
    disabled,
    onChange,
    defaultValue,
    initialOptions,
    loadOptions,
    isMulti,
    formatOptionLabel,
    cacheUniqs,
  } = props;

  //formikProps
  const { setFieldValue } = props.form || {};
  const { name: formikName } = props.field || {};

  // const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState(
    (defaultValue?.label && defaultValue) || null
  );
  // const [currentPageState, setCurrentPageState] = useState(1);

  useEffect(() => {
    if (disabled && setFieldValue) {
      setFieldValue(formikName, "");
      setValue(null);
    }
  }, [disabled]);

  useEffect(() => {
    //on resetting formik form values after form submit, clear the value
    if (props.field?.value === "") {
      setValue(null);
    }
  }, [props?.field?.value]);

  const handleChange = (value) => {
    setValue(value);
    let name = value ? value.label : "";
    onMtableFilterChange && onMtableFilterChange(columnDef.tableData.id, name);
    if (setFieldValue) {
      if (!isMulti) {
        setFieldValue(formikName, value?.value);
      } else {
        setFieldValue(formikName, value);
      }
    }
    onChange && onChange(value);
  };

  return (
    <AsyncPaginate
      isDisabled={disabled}
      options={initialOptions}
      formatOptionLabel={formatOptionLabel}
      cacheUniqs={cacheUniqs}
      reduceOptions={reduceGroupedOptions}
      placeholder={placeholder}
      value={value}
      isClearable={true}
      isMulti={isMulti}
      loadOptions={loadOptions && debounce(loadOptions, 1000)}
      onChange={handleChange}
      styles={wrapperStyles}
    />
  );
};

export default AsyncPaginatedSelect;
