import { format } from "date-fns";

/**
 * Converts an ISO date string into a formatted string following
 * the following convention: Month year (e.g., September 2022).
 *
 * @param date An ISO-compliant date string.
 * @returns The month and year of the date string.
 * @see https://date-fns.org/v2.30.0/docs/format#description
 */
function getFormattedMonth(date: string): string {
  return format(new Date(date), "MMMM yyyy");
}

/**
 * Given a start and end date, creates a nicely formatted string
 * showing the starting & ending month and year.
 *
 * @param startDate The starting date of a project or work period, in an
 * ISO-compliant format.
 * @param endDate The ending date of a project or work period, in an
 * ISO-compliant format. If omittied, the work period is assumed to be
 * still ongoing.
 * @returns A formatted string describing the duration of a project or
 * work period.
 *
 * @example```
 * getWorkPeriod("2020-02-01T00:00:00Z", "2022-12-01T00:00:00Z")
 * // "February 2020 - December 2022"
 *
 * getWorkPeriod("2020-02-01T00:00:00Z", "2020-02-28T00:00:00Z")
 * // "February 2020"
 *
 * getWorkPeriod("2020-02-01T00:00:00Z")
 * // "February 2020 - present"
 * ```
 */
export function getWorkPeriod(startDate: string, endDate?: string): string {
  const start = getFormattedMonth(startDate);
  const end = endDate ? getFormattedMonth(endDate) : "present";

  // Don't show same date twice (e.g., June 17 - June 17)
  // because it doesn't read great.
  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
}
