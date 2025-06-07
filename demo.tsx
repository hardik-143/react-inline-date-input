import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import ReactInlineDateInput from "./index";
import moment from "moment";
const Demo = () => {
  const [date, setDate] = useState("");
  const [triggerReset, setTriggerReset] = useState(false);
  return (
    <>
      <ReactInlineDateInput
        defaultValue={""}
        onChange={(_date: string) => {
          setDate(_date);
        }}
        minValidYear={1950}
        maxValidYear={2020}
        triggerReset={triggerReset}
      />
      {date && (
        <>
          <p>Date: {date}</p>
          {date.length == 10 ? (
            <p>
              Moment:{" "}
              {moment(date, "DD/MM/YYYY").isValid() ? "Valid" : "Invalid"}
            </p>
          ) : null}
        </>
      )}
      <button
        onClick={() => {
          setTriggerReset(!triggerReset);
          setDate("");
        }}
      >
        Reset
      </button>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Demo />);
