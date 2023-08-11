import { FC, useRef } from "react";
import { FormFieldProps } from "../../../types";

type FormFiledType = FormFieldProps & { name: string };

const FormField: FC<FormFiledType> = ({ name, inputProps, label }) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleValidate = () => {
    const el = ref.current;
    if (el?.value) {
      el?.setCustomValidity("");
    } else if (el?.validity.valueMissing) {
      el?.setCustomValidity(`Please enter ${name}`);
    }
    if (el?.validity.typeMismatch) {
      ref.current?.setCustomValidity(`Please enter the right ${name} patten`);
    }
  };
  return (
    <div className={"field-wrapper"}>
      <label htmlFor={name}>{label}</label>
      <input
        ref={ref}
        type="text"
        id={name}
        name={name}
        {...inputProps}
        onInvalid={handleValidate}
      />
    </div>
  );
};

export default FormField;
