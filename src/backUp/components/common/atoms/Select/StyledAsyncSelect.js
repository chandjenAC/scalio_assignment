import React from "react";
import AsyncSelect from "react-select/async";

const StyledAsyncSelect = (props) => {
  const { selectedValue, loadOptions, onInputChange, onChange } = props;

  let defaultValue = { value: selectedValue, label: selectedValue };

  const colourStyles = {
    control: (provided) => ({
      ...provided,
      background: "#fff",
      borderColor: "#9e9e9e",
      minHeight: "30px",
      height: "30px",
    }),

    valueContainer: (provided) => ({
      ...provided,
      height: "30px",
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
      height: "30px",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        padding: "4px",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

  return (
    <AsyncSelect
      defaultValue={defaultValue}
      //   cacheOptions
      loadOptions={loadOptions}
      defaultOptions
      onChange={onChange}
      onInputChange={onInputChange}
      styles={colourStyles}
    />
  );
};

export default StyledAsyncSelect;
