import { FC, useState } from "react";

interface GenericSelectControl {
  value: string;
  setValue: (input: string) => void;
}

export const useGenericSelect = (): GenericSelectControl => {
  const [value, setValue] = useState<string>("");

  return {
    value,
    setValue,
  };
};

const GenericSelect: FC<{
  controller: GenericSelectControl;
  label?: string;
  options: { value: string; label: string }[];
}> = ({ controller, label, options }) => {
  return (
    <>
      {label && <label>{label}</label>}

      <select
        className="form-select"
        value={controller.value}
        onChange={(e) => {
          e.preventDefault();
          controller.setValue(e.target.value);
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default GenericSelect;
