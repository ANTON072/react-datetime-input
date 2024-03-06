import { useId } from "react";

import { srOnly } from "./styles";

import type { DateTimeState } from "./types";

export interface FieldValue {
  value: string;
  error: string | null;
}

interface InputComponentProps {
  fieldType: "date" | "time";
  dateTimeState: DateTimeState;
  onChange: (field: "date" | "time", fieldValue: FieldValue) => void;
}

function InputComponent({
  fieldType,
  dateTimeState,
  onChange,
}: InputComponentProps) {
  const inputId = useId();

  const fieldLabel = fieldType === "date" ? "日付" : "時間";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const errorMessage =
      fieldType === "date" ? "無効な日付が入力されました" : null;

    onChange(fieldType, {
      value,
      error: value === "" ? errorMessage : null,
    });
  };

  return (
    <div className={fieldType}>
      <label htmlFor={inputId} style={srOnly}>
        {fieldLabel}
      </label>
      <input
        id={inputId}
        type={fieldType}
        value={dateTimeState[fieldType]}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputComponent;
