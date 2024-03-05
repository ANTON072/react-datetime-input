import { useId } from "react";

import { srOnly } from "./styles";

import type { DateTimeState } from "./types";

interface Props {
  dateTime: DateTimeState;
  onChange: (key: string, value: string) => void;
}

function DateComponent({ dateTime, onChange }: Props) {
  const labelId = useId();

  const dateValue = dateTime.date;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange("date", value);
  };

  return (
    <div className="date">
      <label htmlFor={labelId} style={srOnly}>
        日付
      </label>
      <input
        id={labelId}
        type="date"
        value={dateValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default DateComponent;
