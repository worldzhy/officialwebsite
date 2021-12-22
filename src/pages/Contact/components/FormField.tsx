import React from "react";
import { FormFieldProps } from "../../../types";

type FormFiledType = FormFieldProps & { name: string };

const FormField: React.FC<FormFiledType> = ({ name, inputProps, label }) => {
  return (
    <div className={"field-wrapper"}>
      <label htmlFor={name}>{label}</label>
      <input type="text" id={name} name={name} {...inputProps} />
    </div>
  );
};

export default FormField;
