import DateTimeInput from "./DateTimeInput";

function App() {
  return (
    <>
      <DateTimeInput
        onChange={(date) => {
          console.log("date", date);
        }}
      />
    </>
  );
}

export default App;
