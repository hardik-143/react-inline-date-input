import { useState } from "react";
import ReactInlineDateInput from "../src/index";
import { memo } from "react";

const Demo = () => {
  const [date, setDate] = useState("");
  const [triggerReset, setTriggerReset] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            React Inline Date Input
          </h1>
          <p className="text-lg text-gray-600">
            A contenteditable DD-MM-YYYY date input component for React
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[18px] font-medium text-gray-700 mb-2">
                Date Input Demo
              </label>
              <div className="flex items-stretch gap-2 justify-between">
                <ReactInlineDateInput
                  defaultValue={"12/12/2020"}
                  onChange={(_date: string) => {
                    setDate(_date);
                  }}
                  minValidYear={1950}
                  maxValidYear={2020}
                  triggerReset={triggerReset}
                />
                <button
                  onClick={() => {
                    setTriggerReset(!triggerReset);
                    setDate("");
                  }}
                  className="inline-flex items-center px-5 py-2 border border-transparent text-[18px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 "
                >
                  Reset Input
                </button>
              </div>
            </div>

            {date && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-sm font-medium text-gray-700">
                    Selected Date: <span className="text-blue-600">{date}</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Contenteditable date input
            </li>
            <li className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              DD-MM-YYYY format
            </li>
            <li className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Customizable year range
            </li>
            <li className="flex items-center text-gray-600">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Built-in validation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default memo(Demo, (prevProps: any, nextProps: any) => {
  return (
    prevProps.onChange === nextProps.onChange &&
    prevProps.triggerReset === nextProps.triggerReset
  );
});
