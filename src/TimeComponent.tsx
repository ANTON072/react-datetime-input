import { useId } from "react";

import { srOnly } from "./styles";

import type { DateTimeState } from "./types";

interface Props {
  dateTime: DateTimeState;
  onChange: (key: string, value: string) => void;
}

function TimeComponent({ dateTime, onChange }: Props) {
  const labelId = useId();

  const timeValue = dateTime.time;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange("time", value);
  };

  return (
    <div className="time">
      <label htmlFor={labelId} style={srOnly}>
        時間
      </label>
      <input
        id={labelId}
        type="time"
        value={timeValue}
        onChange={handleChange}
      />
    </div>
  );
}

export default TimeComponent;
