import { FC, useState } from "react";

interface GenericInputControl {
  value: string;
  setValue: (input: string) => void;
}

export const useGenericInput = (input: string): GenericInputControl => {
  const [value, setValue] = useState<string>(input);

  return {
    value,
    setValue,
  };
};

export const GenericInput: FC<{
  controller: GenericInputControl;
  label?: string;
}> = ({ controller, label }) => {
  return (
    <>
      {label && <label className="form-label">{label}</label>}

      <input
        className="form-control"
        value={controller.value}
        onChange={(e) => controller.setValue(e.target.value)}
      />
    </>
  );
};

export default GenericInput;
