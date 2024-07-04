import type {Dayjs} from 'dayjs';
import type {Dispatch, SetStateAction} from 'react';

import type {ConsecutiveDays, TDay, TEvent} from './types';

// Calendar component Interface
export type IReactFullYearScheduler = {
    /**
     * The events to be displayed on the calendar.
     */
    events: TEvent[];
    /**
     * The theme to be used for the date tooltip when you hover over a cell.
     * @default - material
     */
    dateTooltipTheme?: 'material' | 'light' | 'light-border' | 'translucent';
    /**
     * The locale to be used for the calendar.
     * @default - en
     */
    locale?: string;

    /**
     * The width of the week separator.
     * @default - 40
     */
    weekSeparatorWidth?: number;
    /**
     * The color of the week separator.
     *
     */
    weekSeparatorColor?: string;

    /**
     * The background color of the header week day name.
     */
    headerWeekDayBgColor?: string;
    /**
     * The background color of the header weekend day name.
     */
    headerWeekendBgColor?: string;
    /**
     * The text color of the header day names.
     */
    headerTextColor?: string;

    /**
     * The background color of the cells for weekend days (inside the callendar).
     */
    weekendCellBackgroundColor?: string;
    /**
     * The text color of the cells for weekend days (inside the callendar).
     */
    weekendCellTextColor?: string;

    /**
     * The background color of the cells for week days (inside the callendar).
     */
    weekDayCellBackgroundColor?: string;
    /**
     * The text color of the cells for week days (inside the callendar).
     */
    weekDayCellTextColor?: string;

    /**
     * The background color of the month names.
     */
    monthNameBackgroundColor?: string;
    /**
     * The text color of the cells for month days.
     */
    monthNameTextColor?: string;

    /**
     * The year switcher arrow bg colors.
     */
    yearSwitcherArrowBgColor?: string;

    /**
     * Determines whether the calendar is readonly or not.
     */
    readonlyCalendar?: boolean;
    /**
     * Determines whether year-to-year selection is enabled or not.
     * @example - selecting a range between 2020 and 2024
     */
    enableYearToYearSelection?: boolean;
    /**
     * Determines whether weekend days can be selected or not.
     * @description
     * Enabling this option allows you to select weekend days (Saturday, Sunday) for single selection, or a range selection. If you disable it you won't be able to start a selection (single date pick) or end the selection (range selection) picking a weekend day.
     */
    enableWeekendSelection?: boolean;
    /**
     * The color of the selection.
     */
    selectionColor?: string;
    /**
     * The color of the text for the selection.
     */
    selectionTextColor?: string;
    /**
     * The maximum range for the selection.
     */
    maxRangeSelection?: number;
    /**
     * The minimum range for the selection.
     */
    minRangeSelection?: number;
    /**
     * The first day of the week.
     */

    firstDayOfWeek?: 'Sunday' | 'Monday';

    /**
     * Custom weekend days instead of Saturday/Sunday
     *
     * @default
     * [5, 6]
     *
     * @example
     *  Valid values:
     * - 0: Monday
     * - 1: Tuesday
     * - 2: Wednesday
     * - 3: Thursday
     * - 4: Friday
     * - 5: Saturday
     * - 6: Sunday
     */
    customWeekend?: ConsecutiveDays;

    /**
     * The maximum year for the calendar.
     */
    maxYear?: number;
    /**
     * The minimum year for the calendar.
     */
    minYear?: number;

    /**
     * The default year to load
     * @default undefined.
     */
    defaultYearToLoad?: number;

    /**
     * Determines whether the week separator is displayed or not.
     */
    showWeekSeparator?: boolean;
    /**
     * Determines whether the today button is displayed or not.
     */
    showTodayButton?: boolean;
    /**
     * The minimum width of the cells.
     */
    minCellWidth?: number;
    /**
     * Determines whether the separator is displayed in the header or not.
     */
    showSeparatorInHeader?: boolean;

    /**
     * Determines whether event overwriting is enabled or not.
     */
    enableEventOverwriting: boolean;
    // events handlers
    /**
    triggered when picking only one single date

    * @param eventDate - Dayjs date object representing the selected date cell
    * @param clearSelectedCell - clear the selected date cell
  **/
    onDatePick?: (eventDate: Dayjs, clearSelectedCell: () => void) => void;
    /**
    triggered when chosing only one single date while intercepting an existing event

    * @param eventDate - Dayjs date object representing the selected date cell
    * @param InterceptedEventIndex - the index of the intercepted event (from the {@link events} array)
    * @param clearSelectedCell - clear the selected date cell
  **/
    onEventSinglePickInterception?: (
        eventDate: Dayjs,
        InterceptedEventIndex: number,
        clearSelectedCell: () => void
    ) => void;
    /**
    triggered when picking a range of dates (start date / end date)
    
    * @param eventStartDate - Dayjs date object representing the first selected date cell
    * @param eventEndDate - Dayjs date object representing the second selected date cell
    * @param clearSecondSelectedCell - clear the second selected date cell
    * @param clearSelection - clear the selected date cells (start / end date)
  **/
    onRangePick?: (
        eventStartDate: Dayjs,
        eventEndDate: Dayjs,
        clearSecondSelectedCell: () => void,
        clearSelection: () => void
    ) => void;
    /**
    Triggered when picking a range of dates (start date / end date) while intercepting another event.
    This function is triggered when either the start date or end date is in the range of an existing event.

    * @param eventStartDate - Dayjs date object representing the first selected date cell
    * @param eventEndDate - Dayjs date object representing the second selected date cell
    * @param eventsToBeDeleted - list of event indexes to be deleted (from the {@link events} array)
    * @param eventsToBeUpdated - list of event indexes to be updated (from the {@link events} array)
    * @param clearSecondSelectedCell - clear the second selected date cell
    * @param clearSelection - clear the selected date cells (start / end date)
    */
    onEventRangePickInterception?: (
        eventStartDate: Dayjs,
        eventEndDate: Dayjs,
        eventsToBeDeleted: number[],
        eventsToBeUpdated: number[],
        clearSecondSelectedCell: () => void,
        clearSelection: () => void
    ) => void;
    /**
     * Triggered when a date range selection exceeds or falls below specified limits.
     *
     * @param isRangeHigherThanMaxSelection - Indicates if the selected range exceeds the maximum allowed range.
     * @param isRangeLowerThanMinSelection - Indicates if the selected range falls below the minimum allowed range.
     */
    onRangeSelectionError?: (isRangeHigherThanMaxSelection: boolean, isRangeLowerThanMinSelection: boolean) => void;
};

export type IMonthRowProps = {
    customWeekend: ConsecutiveDays;
    year: number;
    monthDays: TDay[];
    monthIndex: number;
    firstDayOfWeek: 'Sunday' | 'Monday';
};

export type IYearSwitcher = {
    //properties
    max: number;
    min: number;
    selectedYear: number;
    setSelectedYear: Dispatch<SetStateAction<number>> | ((newYear: number) => void);

    // events handlers
    onPreviousYearSwitch?: () => void;
    oneNextYearSwitch?: () => void;
};

// Calendar context interface
export type IReactFullYearSchedulerContext = {
    firstSelectedCell: Dayjs | undefined;
    secondSelectedCell: Dayjs | undefined;
    virtualSecondSelectedCell: Dayjs | undefined;
    selectedYear: number;
    setFirstSelectedCell: Dispatch<SetStateAction<Dayjs | undefined>>;
    setSecondSelectedCell: Dispatch<SetStateAction<Dayjs | undefined>>;
    setVirtualSecondSelectedCell: Dispatch<SetStateAction<Dayjs | undefined>>;
    dateTooltipTheme?: 'material' | 'light' | 'light-border' | 'translucent';

    weekSeparatorWidth?: number;
    weekSeparatorColor?: string;

    headerWeekDayBgColor?: string;
    headerWeekendBgColor?: string;
    headerTextColor?: string;

    weekendCellBackgroundColor?: string;
    weekendCellTextColor?: string;

    weekDayCellBackgroundColor?: string;
    weekDayCellTextColor?: string;

    monthNameBackgroundColor?: string;
    monthNameTextColor?: string;

    readonlyCalendar?: boolean;
    enableYearToYearSelection?: boolean;
    enableWeekendSelection?: boolean;
    selectionColor?: string;
    selectionTextColor?: string;
    maxRangeSelection?: number;
    minRangeSelection?: number;

    firstDayOfWeek?: 'Sunday' | 'Monday';
    customWeekend?: ConsecutiveDays;
    events: TEvent[];
    yearSwitcherArrowBgColor?: string;
    maxYear?: number;
    minYear?: number;
    showWeekSeparator?: boolean;
    showTodayButton?: boolean;
    minCellWidth?: number;
    showSeparatorInHeader?: boolean;

    enableEventOverwriting: boolean;

    clearSelection?: {
        clearFirstCell: () => void;
        clearSecondCell: () => void;
        clearSelection: () => void;
    };

    onDatePick?: (eventDate: Dayjs, clearSelectedCell: () => void) => void;
    onEventSinglePickInterception?: (
        eventDate: Dayjs,
        InterceptedEventIndex: number,
        clearSelectedCell: () => void
    ) => void;
    onRangePick?: (
        eventStartDate: Dayjs,
        eventEndDate: Dayjs,
        clearSecondSelectedCell: () => void,
        clearSelection: () => void
    ) => void;
    onEventRangePickInterception?: (
        eventStartDate: Dayjs,
        eventEndDate: Dayjs,
        eventsToBeDeleted: number[],
        eventsToBeUpdated: number[],
        clearSecondSelectedCell: () => void,
        clearSelection: () => void
    ) => void;
    onRangeSelectionError?: (isRangeHigherThanMaxSelection: boolean, isRangeLowerThanMinSelection: boolean) => void;
};
