import { FC, useState } from "react";

interface GenericNumberInputControl {
  value: number;
  setValue: (input: number) => void;
}

export const useGenericNumberInput = (input: number): GenericNumberInputControl => {
  const [value, setValue] = useState<number>(input);

  return {
    value,
    setValue,
  };
};

const GenericNumberInput: FC<{
  controller: GenericNumberInputControl;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
}> = ({ controller, label, min, max, step }) => {
  return (
    <>
      {label && <label className="form-label">{label}</label>}

      <input
        type="number"
        className="form-control"
        value={controller.value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => controller.setValue(parseFloat(e.target.value))}
        style={{width: "100px"}}
      />
    </>
  );
};

export default GenericNumberInput;
