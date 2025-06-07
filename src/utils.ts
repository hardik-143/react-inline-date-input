export const pad = (n: any) => n.toString().padStart(2, "0");

export const getFocusable = () => {
  return [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]:not([disabled])',
  ];
};
export const getFocusableElement = (
  current: HTMLElement,
  direction: "next" | "previous" = "next"
): HTMLElement | null => {
  const allFocusable = Array.from(
    document.querySelectorAll<HTMLElement>(getFocusable().join(","))
  ).filter((el) => !el.hasAttribute("disabled") && el.offsetParent !== null);

  const index = allFocusable.indexOf(current);
  if (index === -1) return null;

  let nextIndex = direction === "next" ? index + 1 : index - 1;

  // Wrap around logic
  if (nextIndex >= allFocusable.length) {
    nextIndex = 0; // wrap to first element
  } else if (nextIndex < 0) {
    nextIndex = allFocusable.length - 1; // wrap to last element
  }

  return allFocusable[nextIndex] ?? null;
};

export const selectAllContent = (element: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  const selection = window.getSelection();
  if (selection) {
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const moveCursorToEnd = (element: HTMLElement) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false); // collapse to end
  const sel = window.getSelection();
  if (sel) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
};


export const checkTextSelectionLength = () => {
  const selection = window.getSelection();
  if (selection) {
    const range = selection.getRangeAt(0);
    const text = range.toString();
    return text.length;
  }
  return 0;
};