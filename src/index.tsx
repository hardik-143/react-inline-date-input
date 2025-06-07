"use client";
import React, { useRef, useEffect } from "react";
import moment from "moment";

interface DateInputProps {
  className?: string;
  defaultValue?: string;
  onChange?: (dateString: string) => void;
  minValidYear?: number;
  maxValidYear?: number;
  useEmptyToReset?: boolean;
  separator?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  triggerReset?: boolean;
  placeholder?: {
    day?: string;
    month?: string;
    year?: string;
  };
  disabled?: boolean;
  ariaLabel?: string;
}

const ReactInlineDateInput = ({
  className = "",
  defaultValue = "",
  onChange = () => {},
  minValidYear = 1900,
  maxValidYear = moment().year(),
  useEmptyToReset = true,
  separator = "-",
  onKeyDown = () => {},
  triggerReset = false,
  placeholder = {
    day: "DD",
    month: "MM",
    year: "YYYY",
  },
  disabled = false,
  ariaLabel = "Date input",
}: DateInputProps) => {
  const dateMoment = moment(defaultValue, "DD/MM/YYYY");
  const validDate = dateMoment.isValid() ? dateMoment : null;

  const currentDay = validDate ? defaultValue.split("/")[0] : "";
  const currentMonth = validDate ? defaultValue.split("/")[1] : "";
  const currentYear = validDate ? defaultValue.split("/")[2] : "";

  const onInvalid: { date: string; month: string; year: string } = {
    date: useEmptyToReset ? "" : moment().date().toString(),
    month: useEmptyToReset ? "" : (moment().month() + 1).toString(),
    year: useEmptyToReset ? "" : moment().year().toString(),
  };

  const pad = (n: any) => n.toString().padStart(2, "0");

  const dayRef = useRef<any>(null);
  const monthRef = useRef<any>(null);
  const yearRef = useRef<any>(null);

  const selectAllContent = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };
  useEffect(() => {
    dayRef.current.textContent = "";
    monthRef.current.textContent = "";
    yearRef.current.textContent = "";
  }, [triggerReset]);

  const moveCursorToEnd = (element: HTMLElement) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false); // collapse to end
    const sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
  const checkTextSelectionLength = () => {
    const selection = window.getSelection();
    if (selection) {
      const range = selection.getRangeAt(0);
      const text = range.toString();
      return text.length;
    }
    return 0;
  };
  const handleKeyDown = (e: any, currentRef: any) => {
    onKeyDown(e);
    const isShiftTab = e.key === "Tab" && e.shiftKey;
    const isTab = e.key === "Tab" && !e.shiftKey;

    if (currentRef == yearRef && currentRef.current?.textContent?.length == 4) {
      let selectionEnabled = checkTextSelectionLength() > 0;
      let pressedKeyisDigit = /^\d$/.test(e?.key || "");
      if (pressedKeyisDigit && !selectionEnabled) {
        e.preventDefault();
        return;
      }
    }

    if (isTab || e.key === "ArrowRight") {
      e.preventDefault();
      if (currentRef === dayRef && monthRef.current) {
        monthRef.current.focus();
        selectAllContent(monthRef.current);
      } else if (currentRef === monthRef && yearRef.current) {
        yearRef.current.focus();
        selectAllContent(yearRef.current);
      }
    } else if (isShiftTab || e.key === "ArrowLeft") {
      e.preventDefault();
      if (currentRef === yearRef && monthRef.current) {
        monthRef.current.focus();
        selectAllContent(monthRef.current);
      } else if (currentRef === monthRef && dayRef.current) {
        dayRef.current.focus();
        selectAllContent(dayRef.current);
      }
    }

    if (e.key == "Backspace" && e.target?.textContent?.length == 0) {
      e.target.textContent = "";
      if (currentRef === yearRef && monthRef.current) {
        monthRef.current.focus();
        setTimeout(() => {
          if (monthRef.current) {
            selectAllContent(monthRef.current);
          }
        }, 0);
      } else if (currentRef === monthRef && dayRef.current) {
        dayRef.current.focus();
        setTimeout(() => {
          if (dayRef.current) {
            selectAllContent(dayRef.current);
          }
        }, 0);
      }
    }
  };

  useEffect(() => {
    if (dayRef.current) {
      dayRef.current.textContent = currentDay ? pad(currentDay) : "";
    }
    if (monthRef.current) {
      monthRef.current.textContent = currentMonth ? pad(currentMonth) : "";
    }
    if (yearRef.current) {
      yearRef.current.textContent = currentYear || "";
    }
  }, [currentDay, currentMonth, currentYear]);

  const handleBlur = (
    ref: any,
    min: number,
    max: number,
    defaultVal: string,
    padZero = true
  ) => {
    let val = parseInt(ref.current.textContent, 10);
    console.log("val", val, min, max);
    if (isNaN(val) || val < min || val > max) {
      ref.current.textContent =
        defaultVal == "" ? "" : padZero ? pad(defaultVal) : defaultVal;
    } else {
      if (ref == monthRef) {
        let monthVal = padZero ? pad(val) : val;
        let dateSTR = monthVal;
        let format = "DD/MM";
        if (dayRef.current.textContent) {
          dateSTR = `${dayRef.current.textContent}/${monthVal}`;
          let dayVal = parseInt(dayRef.current.textContent, 10);
          if (monthVal == "02" && dayVal > 28) {
            dateSTR = `${dayVal}/${monthVal}/2024`;
            format = "DD/MM/YYYY";
          }
        }
        let dateMoment = moment(dateSTR, format);
        if (dateMoment.isValid() || dateSTR == monthVal) {
          ref.current.textContent = padZero ? pad(val) : val;
        } else {
          ref.current.textContent = onInvalid.month;
        }
      } else if (ref == dayRef) {
        let dayVal = padZero ? pad(val) : val;
        let dateSTR = dayVal;
        let format = "DD/MM";
        if (monthRef.current.textContent) {
          dateSTR = `${dayVal}/${monthRef.current.textContent}`;
          let monthVal = monthRef.current.textContent;
          if (monthVal == "02" && dayVal > 28) {
            dateSTR = `${dayVal}/${monthVal}/2024`;
            format = "DD/MM/YYYY";
          }
        }
        let dateMoment = moment(dateSTR, format);
        if (dateSTR == dayVal || dateMoment.isValid()) {
          ref.current.textContent = padZero ? pad(val) : val;
        } else {
          ref.current.textContent = onInvalid.date;
        }
      } else {
        ref.current.textContent = padZero ? pad(val) : val;
      }
    }
  };

  const handleAutoFocus = (ref: any, nextRef: any, maxLength: number) => {
    ref.current.addEventListener("input", () => {
      const text = ref.current.textContent.replace(/\D/g, "");
      ref.current.textContent = text;
      moveCursorToEnd(ref.current);
      if (text.length >= maxLength) {
        nextRef?.current?.focus();
        selectAllContent(nextRef.current);
      }
      returnHandleOnChange();
    });
    return () => {
      ref.current.removeEventListener("input", () => {});
    };
  };

  useEffect(() => {
    if (dayRef.current && monthRef.current && yearRef.current) {
      handleAutoFocus(dayRef, monthRef, 2);
      handleAutoFocus(monthRef, yearRef, 2);
      handleAutoFocus(yearRef, null, 4);
    }
  }, [onChange]);

  const handleYearKeyUp = (e: any) => {
    const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
    if (allowed.includes(e.key)) return;

    // Filter only digits and limit to 4 characters
    let val = yearRef.current.textContent.replace(/\D/g, "");
    yearRef.current.textContent = val;
    moveCursorToEnd(yearRef.current);

    // Validate only if length is 4
    if (val.length === 4) {
      const num = parseInt(val, 10);
      if (isNaN(num) || num < minValidYear || num > maxValidYear) {
        yearRef.current.textContent = onInvalid.year;
        moveCursorToEnd(yearRef.current);
      }
      setTimeout(() => {
        returnHandleOnChange();
      }, 0);
    }

    if (val.length > 4) {
      yearRef.current.textContent = val.slice(0, 4);
      moveCursorToEnd(yearRef.current);
      setTimeout(() => {
        returnHandleOnChange();
      }, 0);
    }
  };

  const returnHandleOnChange = () => {
    let dateString = `${dayRef.current.textContent}`;
    if (monthRef.current.textContent) {
      dateString += `${separator}${monthRef.current.textContent}`;
      if (yearRef.current.textContent) {
        dateString += `${separator}${yearRef.current.textContent}`;
      }
    }
    onChange(dateString);
  };

  return (
    <div
      className={`date-input ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      <span
        className="date-span"
        ref={dayRef}
        contentEditable={!disabled}
        data-placeholder={placeholder.day}
        onBlur={() => handleBlur(dayRef, 1, 31, onInvalid.date)}
        onKeyDown={(e) => handleKeyDown(e, dayRef)}
        onKeyUp={() => {
          returnHandleOnChange();
        }}
        role="spinbutton"
        aria-label="Day"
        aria-valuemin={1}
        aria-valuemax={31}
        tabIndex={disabled ? -1 : 0}
      ></span>
      <span className="separator" aria-hidden="true">
        {separator}
      </span>
      <span
        className="date-span"
        ref={monthRef}
        contentEditable={!disabled}
        data-placeholder={placeholder.month}
        onBlur={() => handleBlur(monthRef, 1, 12, onInvalid.month)}
        onKeyDown={(e) => handleKeyDown(e, monthRef)}
        onKeyUp={() => {
          returnHandleOnChange();
        }}
        role="spinbutton"
        aria-label="Month"
        aria-valuemin={1}
        aria-valuemax={12}
        tabIndex={disabled ? -1 : 0}
      ></span>
      <span className="separator" aria-hidden="true">
        {separator}
      </span>
      <span
        className="date-span"
        ref={yearRef}
        contentEditable={!disabled}
        data-placeholder={placeholder.year}
        onBlur={() =>
          handleBlur(yearRef, minValidYear, maxValidYear, onInvalid.year, false)
        }
        onKeyUp={handleYearKeyUp}
        onKeyDown={(e) => handleKeyDown(e, yearRef)}
        role="spinbutton"
        aria-label="Year"
        aria-valuemin={minValidYear}
        aria-valuemax={maxValidYear}
        tabIndex={disabled ? -1 : 0}
      ></span>
    </div>
  );
};

export default ReactInlineDateInput;
