import React, { useState } from "react";

import DateComponent from "./DateComponent";
import TimeComponent from "./TimeComponent";
import { componentWrapper } from "./styles";

import type { DateTimeState } from "./types";

type DateComponentProps = React.ComponentProps<typeof DateComponent>;

interface Props {
  onChange: (date: Date | null) => void;
  /** Epochミリ秒 */
  initialValue?: number;
  wrapperClassName?: string;
  wrapperStyles?: React.CSSProperties;
}

const initialDateTime: DateTimeState = {
  date: "",
  time: "",
};

const createInitialProps = (initialValue?: number): DateTimeState => {
  if (!initialValue) return initialDateTime;
  const date = new Date(initialValue);
  // yyyy-mm-dd 形式の日付
  const dateStr = date.toISOString().split("T")[0];
  // hh:mm 形式の時間（秒カット）
  const timeStr = date.toTimeString().split(":").slice(0, 2).join(":");
  return {
    date: dateStr,
    time: timeStr,
  };
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
  initialValue,
  wrapperClassName = "date-time-input",
  wrapperStyles = {},
}: Props) {
  const [dateTime, setDateTime] = useState<DateTimeState>(() =>
    createInitialProps(initialValue),
  );

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
