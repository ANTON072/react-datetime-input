import React, { useRef, useState } from "react";

import InputComponent from "./InputComponent";
import { componentWrapper } from "./styles";

import type { DateTimeState } from "./types";

type DateComponentProps = React.ComponentProps<typeof InputComponent>;

interface DateTimeValue {
  date: Date | null;
  error: string | null;
}

interface DateTimeInputProps {
  onChange: (value: DateTimeValue) => void;
  /** Epochミリ秒 */
  initialValue?: number;
  wrapperClassName?: string;
  wrapperStyles?: React.CSSProperties;
}

const defaultDateTimeState: DateTimeState = {
  date: "",
  time: "",
};

const initializeDateTimeState = (initialValue?: number): DateTimeState => {
  if (!initialValue) return defaultDateTimeState;
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
}: DateTimeInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [dateTime, setDateTime] = useState<DateTimeState>(() =>
    initializeDateTimeState(initialValue),
  );

  const errorRef = useRef<string | null>(null);

  const handleChange: DateComponentProps["onChange"] = (key, inputValue) => {
    const { value, error } = inputValue;
    const newState = { ...dateTime, [key]: value };
    if (key === "date") {
      errorRef.current = error;
    }
    setDateTime(newState);
    const date = convertToDate(newState);
    onChange({
      date,
      error: errorRef.current,
    });
  };

  const handleReset = () => {
    setDateTime(defaultDateTimeState);
    errorRef.current = null;
    onChange({
      date: null,
      error: errorRef.current,
    });
    /**
     * 2/31など無効な日付を入力した場合、DOMのinput要素には値が残るための処理
     */
    const wrapperEl = wrapperRef.current;
    if (wrapperEl) {
      const inputEls = wrapperEl.querySelectorAll("input");
      inputEls.forEach((inputEl) => {
        inputEl.value = "";
      });
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={wrapperClassName}
      style={{ ...componentWrapper, ...wrapperStyles }}
    >
      <InputComponent
        fieldType="date"
        dateTimeState={dateTime}
        onChange={handleChange}
      />
      <InputComponent
        fieldType="time"
        dateTimeState={dateTime}
        onChange={handleChange}
      />
      <button type="button" className="reset-button" onClick={handleReset}>
        リセット
      </button>
    </div>
  );
}

export default DateTimeInput;
