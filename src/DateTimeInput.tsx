import React, { useState } from "react";

import DateComponent from "./DateComponent";
import TimeComponent from "./TimeComponent";
import { componentWrapper } from "./styles";

import type { DateTimeState } from "./types";

type DateComponentProps = React.ComponentProps<typeof DateComponent>;

interface Props {
  onChange: (date: Date | null) => void;
  wrapperClassName?: string;
  wrapperStyles?: React.CSSProperties;
}

const initialDateTime: DateTimeState = {
  date: "",
  time: "",
};

const convertToDate = (dateTimeState: DateTimeState) => {
  const { date, time } = dateTimeState;
  if (!date) return null;
  let dateStr = date;
  if (time) dateStr += `T${time}`;
  return new Date(dateStr);
};

function DateTimeInput({
  onChange,
  wrapperClassName = "date-time-input",
  wrapperStyles = {},
}: Props) {
  const [dateTime, setDateTime] = useState<DateTimeState>(initialDateTime);

  const handleChange: DateComponentProps["onChange"] = (key, value) => {
    const newState = { ...dateTime, [key]: value };
    setDateTime(newState);
    const date = convertToDate(newState);
    onChange(date);
  };

  const handleReset = () => {
    setDateTime(initialDateTime);
    onChange(null);
  };

  return (
    <div
      className={wrapperClassName}
      style={{ ...componentWrapper, ...wrapperStyles }}
    >
      <DateComponent dateTime={dateTime} onChange={handleChange} />
      <TimeComponent dateTime={dateTime} onChange={handleChange} />
      <button type="button" className="reset-button" onClick={handleReset}>
        リセット
      </button>
    </div>
  );
}

export default DateTimeInput;
