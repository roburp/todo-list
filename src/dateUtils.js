/**
 * Formats a Date object to "YYYY-MM-DD" for <input type="date">
 * @param {Date} date
 * @returns {string} - Formatted date or "" if invalid
 */
export function formatDateForInput(date) {
  if (!(date instanceof Date) || isNaN(date)) return "";
  return date.toISOString().split("T")[0];
}

/**
 * Parses an "YYYY-MM-DD" string from <input type="date"> into a Date object
 * @param {string} value
 * @returns {Date|null}
 */
export function parseDateFromInput(value) {
  return value ? new Date(value) : null;
}

/**
 * Formats a Date object into a human-readable string (e.g. "Aug 12, 2025")
 * @param {Date} date
 * @param {object} options - Intl.DateTimeFormat options
 * @returns {string}
 */
export function formatDateForDisplay(date, options = { year: "numeric", month: "short", day: "numeric" }) {
  if (!(date instanceof Date) || isNaN(date)) return "";
  return date.toLocaleDateString(undefined, options);
}

/**
 * Checks if a date is overdue compared to today
 * @param {Date} date
 * @returns {boolean}
 */
export function isOverdue(date) {
  if (!(date instanceof Date) || isNaN(date)) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0); // compare only the date part
  return date < today;
}
