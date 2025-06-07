import React, { useRef, useEffect } from "react";
import moment from "moment";
import "./index.css";

const TheInlineDateInput = ({
  defaultValue = "",
  onChange,
  minValidYear = 1900,
  maxValidYear = moment().year(),
  useEmptyToReset = true,
}) => {
  const dateMoment = moment(defaultValue, "DD/MM/YYYY", true);
  const validDate = dateMoment.isValid() ? dateMoment : null;

  const currentDay = validDate ? validDate.date() : "";
  const currentMonth = validDate ? validDate.month() + 1 : "";
  const currentYear = validDate ? validDate.year() : "";

  const onInvalid = {
    date: useEmptyToReset ? "" : moment().date(),
    month: useEmptyToReset ? "" : moment().month() + 1,
    year: useEmptyToReset ? "" : moment().year(),
  };

  const pad = (n) => n.toString().padStart(2, "0");

  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const selectAllContent = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const getCaretPosition = (el) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;
    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(el);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
  };
  const moveCursorToEnd = (element) => {
    const range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false); // collapse to end
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };
  const handleKeyDown = (e, currentRef) => {
    const isShiftTab = e.key === "Tab" && e.shiftKey;
    const isTab = e.key === "Tab" && !e.shiftKey;

    // Allow max 4 characters in year
    if (currentRef === yearRef) {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
      ];

      const isAllowedKey = allowedKeys.includes(e.key);
      const textLength = e.target.textContent.length;

      if (textLength >= 4 && !isAllowedKey && !e.shiftKey) {
        e.preventDefault();
      }
    }

    // ArrowRight and Tab → move forward
    if (isTab || e.key === "ArrowRight") {
      const selection = window.getSelection();
      const selected = selection && !selection.isCollapsed;
      const caretPosition = getCaretPosition(currentRef.current);
      const isAtEnd =
        caretPosition === currentRef.current.textContent.length ||
        currentRef.current.textContent.length === 0;

      if (selected) {
        e.preventDefault();
        moveCursorToEnd(currentRef.current);
        return;
      }

      if (isAtEnd) {
        e.preventDefault();
        if (currentRef === dayRef && monthRef.current) {
          monthRef.current.focus();
          selectAllContent(monthRef.current);
        } else if (currentRef === monthRef && yearRef.current) {
          yearRef.current.focus();
          selectAllContent(yearRef.current);
        }
      }
    }

    // ArrowLeft and Shift+Tab → move backward
    else if (isShiftTab || e.key === "ArrowLeft") {
      const selection = window.getSelection();
      const selected = selection && !selection.isCollapsed;
      const caretPosition = getCaretPosition(currentRef.current);
      const isAtStart =
        caretPosition === 0 || currentRef.current.textContent.length === 0;

      if (selected) {
        e.preventDefault();
        moveCursorToEnd(currentRef.current);
        return;
      }

      if (isAtStart) {
        e.preventDefault();
        if (currentRef === yearRef && monthRef.current) {
          monthRef.current.focus();
          selectAllContent(monthRef.current);
        } else if (currentRef === monthRef && dayRef.current) {
          dayRef.current.focus();
          selectAllContent(dayRef.current);
        }
      }
    }

    // Backspace navigation to previous field if current is empty
    if (e.key === "Backspace" && e.target.textContent.length === 0) {
      e.target.textContent = "";
      if (currentRef === yearRef && monthRef.current) {
        monthRef.current.focus();
        setTimeout(() => {
          selectAllContent(monthRef.current);
        }, 0);
      } else if (currentRef === monthRef && dayRef.current) {
        dayRef.current.focus();
        setTimeout(() => {
          selectAllContent(dayRef.current);
        }, 0);
      }
    }
  };

  useEffect(() => {
    dayRef.current.textContent = currentDay ? pad(currentDay) : "";
    monthRef.current.textContent = currentMonth ? pad(currentMonth) : "";
    yearRef.current.textContent = currentYear || "";
  }, [currentDay, currentMonth, currentYear]);

  const handleBlur = (ref, min, max, defaultVal, padZero = true) => {
    let val = parseInt(ref.current.textContent, 10);
    if (isNaN(val) || val < min || val > max) {
      // Reset to default if invalid, else blank if defaultVal is empty
      ref.current.textContent =
        defaultVal === "" ? "" : padZero ? pad(defaultVal) : defaultVal;
    } else {
      ref.current.textContent = padZero ? pad(val) : val;
    }
  };

  const handleAutoFocus = (ref, nextRef, maxLength) => {
    ref.current.addEventListener("input", () => {
      const text = ref.current.textContent.replace(/\D/g, "");
      ref.current.textContent = text;
      moveCursorToEnd(ref.current);
      if (text.length >= maxLength) {
        nextRef?.current?.focus();
        selectAllContent(nextRef.current);
      }
    });
  };

  useEffect(() => {
    if (dayRef.current && monthRef.current && yearRef.current) {
      handleAutoFocus(dayRef, monthRef, 2);
      handleAutoFocus(monthRef, yearRef, 2);
    }
  }, []);

  const handleYearKeyUp = (e) => {
    const allowed = ["Backspace", "Tab", "ArrowLeft", "ArrowRight"];
    if (allowed.includes(e.key)) return;

    // Filter only digits and limit to 4 characters
    let val = yearRef.current.textContent.replace(/\D/g, "");
    yearRef.current.textContent = val;
    moveCursorToEnd(yearRef.current);

    // Validate only if length is 4
    if (val.length === 4) {
      const num = parseInt(val, 10);
      const nowYear = moment().year();
      if (isNaN(num) || num < minValidYear || num > nowYear) {
        yearRef.current.textContent = nowYear.toString();
        moveCursorToEnd(yearRef.current);
      }
      returnHandleOnChange();
    }
  };

  const returnHandleOnChange = () => {
    let dateString = `${dayRef.current.textContent}`;
    if (monthRef.current.textContent) {
      dateString += `/${monthRef.current.textContent}`;
      if (yearRef.current.textContent) {
        dateString += `/${yearRef.current.textContent}`;
      }
    }
    onChange(dateString);
  };

  return (
    <div className="date-input">
      <span
        className="date-span"
        ref={dayRef}
        contentEditable
        data-placeholder="DD"
        onBlur={() => handleBlur(dayRef, 1, 31, onInvalid.date)}
        onKeyDown={(e) => handleKeyDown(e, dayRef)}
        onKeyUp={(e) => {
          returnHandleOnChange();
        }}
        // onInput={returnHandleOnChange}
      ></span>
      <span className="separator">-</span>
      <span
        className="date-span"
        ref={monthRef}
        contentEditable
        data-placeholder="MM"
        onBlur={() => handleBlur(monthRef, 1, 12, onInvalid.month)}
        onKeyDown={(e) => handleKeyDown(e, monthRef)}
        onKeyUp={(e) => {
          returnHandleOnChange();
        }}
        // onInput={returnHandleOnChange}
      ></span>
      <span className="separator">-</span>
      <span
        className="date-span"
        ref={yearRef}
        contentEditable
        data-placeholder="YYYY"
        onBlur={() =>
          handleBlur(yearRef, minValidYear, maxValidYear, onInvalid.year, false)
        }
        onKeyUp={handleYearKeyUp}
        onKeyDown={(e) => handleKeyDown(e, yearRef)}
        // onInput={returnHandleOnChange}
      ></span>
    </div>
  );
};

export default TheInlineDateInput;
