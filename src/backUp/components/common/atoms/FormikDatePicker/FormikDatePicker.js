import React from "react";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const FormikDatePicker = ({
  form: { setFieldValue },
  field: { name, value },
  label,
  ...rest
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        name={name}
        clearable
        autoOk
        label={label}
        format="MM/dd/yyyy"
        placeholder="MM/dd/yyyy"
        // handle clearing outside => pass plain array if you are not controlling value outside
        // mask={(value) =>
        //   value
        //     ? [/[0-3]/, /\d/, "/", /0|1/, /\d/, "/", /1|2/, /\d/, /\d/, /\d/]
        //     : []
        // }
        onChange={(value) => {
          setFieldValue(name, value);
        }}
        value={value}
        animateYearScrolling={false}
      />
    </MuiPickersUtilsProvider>
  );
};
export default FormikDatePicker;
