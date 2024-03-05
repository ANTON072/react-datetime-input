import { useState } from "react";
import DateTimeInput from "./DateTimeInput";

function App() {
  const [testTime, setTestTime] = useState<number>(() => Date.now());

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
      }}
    >
      {/* <DateTimeInput
        onChange={(date) => {
          console.log("date", date);
        }}
      /> */}

      <DateTimeInput
        initialValue={Date.now()}
        onChange={(date) => {
          console.log("date", date);
        }}
      />

      {/* <DateTimeInput
        key={testTime}
        initialValue={testTime}
        onChange={(date) => {
          console.log("date", date);
          if (date) {
            setTestTime(date.getTime());
          }
        }}
      /> */}
    </div>
  );
}

export default App;
