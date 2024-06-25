/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import type {Dayjs} from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween.js';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js';
import type {FC} from 'react';
import {memo, useCallback, useEffect, useState} from 'react';

import Loader from '@/components/loader/Loader';
import {MonthRow} from '@/components/monthRow/MonthRow';
import WeekDayCell from '@/components/weekDayCell/WeekDayCell';
import YearSwitcher from '@/components/yearSwitcher/YearSwitcher';
import {CalendarContext} from '@/lib/context/context';
import type {TDay} from '@/lib/utils/types';
import type {IReactFullYearScheduler} from '@/lib/utils/interfaces';

import {dayNamesStartingWithMonday, dayNamesStartingWithSunday, defaultVariables, locales} from '../../utils/helpers';
import '../../tailwind/theme.css';

// enable dayjs plugins
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

export const ReactFullYearScheduler: FC<IReactFullYearScheduler> = memo(function Calendar({
    locale,
    dateTooltipTheme,
    weekSeparatorWidth,
    weekSeparatorColor,
    weekendCellBackgroundColor,
    weekendCellTextColor,
    weekDayCellBackgroundColor,
    weekDayCellTextColor,
    monthNameBackgroundColor,
    monthNameTextColor,
    readonlyCalendar,
    enableYearToYearSelection,
    enableWeekendSelection,
    selectionColor,
    selectionTextColor,
    maxRangeSelection,
    minRangeSelection,
    firstDayOfWeek,
    customWeekend,
    events,
    maxYear,
    minYear,
    defaultYearToLoad,
    showWeekSeparator,
    showTodayButton,
    minCellWidth,
    showSeparatorInHeader,
    headerWeekDayBgColor,
    headerWeekendBgColor,
    headerTextColor,
    enableEventOverwriting,
    onDatePick,
    onEventSinglePickInterception,
    onRangePick,
    onEventRangePickInterception,
    onRangeSelectionError,
}) {
    const [showCal, setShowCal] = useState(false);
    // each array represents a month with all its corresponding days
    const [monthsWithDates, setMonthsWithDates] = useState<TDay[][]>([]);
    // current year the calendar is displaying
    const [selectedYear, setSelectedYear] = useState<number>(
        (defaultYearToLoad && defaultYearToLoad <= maxYear && defaultYearToLoad >= minYear && defaultYearToLoad) ??
            dayjs().year()
    );

    const [firstSelectedCell, setFirstSelectedCell] = useState<Dayjs | undefined>();
    const [secondSelectedCell, setSecondSelectedCell] = useState<Dayjs | undefined>();

    // virtual cell to track event hovering and color cells when user is picking through hover
    const [virtualSecondSelectedCell, setVirtualSecondSelectedCell] = useState<Dayjs | undefined>();

    // destruct default values
    const {
        defaultWeekSeparatorWidth,
        defaultminCellWidth,
        defaultHeaderWeekendBgColor,
        defaultHeaderWeekDayBgColor,
        defaultHeaderTextColor,
        defaultWeekSeparatorColor,
        defaultWeekendCellBackgroundColor,
        defaultWeekendCellTextColor,
        defaultWeekDayCellBackgroundColor,
        defaultWeekDayCellTextColor,
        defaultSelectionColor,
        defaultSelectionTextColor,
        defaultMonthNameBackgroundColor,
        defaultMonthNameTextColor,
    } = defaultVariables;

    const clearSelection = {
        clearFirstCell() {
            setFirstSelectedCell(undefined);
        },
        clearSecondCell() {
            setSecondSelectedCell(undefined);
        },
        clearSelection() {
            setFirstSelectedCell(undefined);
            setSecondSelectedCell(undefined);
        },
    };

    // get all days in a month
    const getAllDaysOfSpeficicMonth = useCallback(
        (year: number, month: number) => {
            const monthDate = dayjs(`${year}-${month}`, 'YYYY-MM');
            let daysInMonth = monthDate.daysInMonth();

            const arrDays = [];

            while (daysInMonth) {
                const tempDate = dayjs(`${year}-${month}`, 'YYYYY-MM').date(daysInMonth);
                let tempCorrespondentEventIndex: number | undefined = undefined;

                // loop over events array and see if the current date is between the event start/end date
                const dateIsPartOfEvent = events.some((el, index) => {
                    const res = tempDate.isBetween(el.startDate, el.endDate, null, '[]');
                    if (res) tempCorrespondentEventIndex = index;
                    return res;
                });
                const current: TDay = {
                    date: tempDate,
                    eventIndex: tempCorrespondentEventIndex,
                    eventName: dateIsPartOfEvent ? events[tempCorrespondentEventIndex!].eventName : undefined,
                    eventBgColor: dateIsPartOfEvent ? events[tempCorrespondentEventIndex!].eventBgColor : undefined,
                    eventTextColor: dateIsPartOfEvent ? events[tempCorrespondentEventIndex!].eventTextColor : undefined,
                };
                arrDays.push(current);

                daysInMonth--;
            }

            return arrDays;
        },
        [events]
    );

    // go to today method
    const goToToday = () => {
        setSelectedYear(dayjs().year());
    };

    useEffect(() => {
        setShowCal(false);
        locales[(locale ?? 'en') as keyof typeof locales]().then(module => {
            dayjs.locale({
                ...module,
                weekStart: firstDayOfWeek === 'Monday' ? 1 : 0,
            });
            setShowCal(true);
        });
    }, [locale, firstDayOfWeek]);

    // generate the whole year dates
    useEffect(() => {
        const months: TDay[][] = [];
        for (let i = 1; i <= 12; i++) {
            months.push(getAllDaysOfSpeficicMonth(selectedYear, i));
        }
        setMonthsWithDates(months);

        // only reset cells when second selected cell is not undefined or when year to year selection is disabled
        !enableYearToYearSelection && setFirstSelectedCell(undefined);
        !enableYearToYearSelection && setSecondSelectedCell(undefined);
        setVirtualSecondSelectedCell(undefined);
    }, [selectedYear, events, enableYearToYearSelection, getAllDaysOfSpeficicMonth]);

    // import styles conditionally when changing date tooltip theme
    useEffect(() => {
        if (dateTooltipTheme === 'light') import('tippy.js/themes/light.css');
        if (dateTooltipTheme === 'light-border') import('tippy.js/themes/light-border.css');
        if (dateTooltipTheme === 'material') import('tippy.js/themes/material.css');
        if (dateTooltipTheme === 'translucent') import('tippy.js/themes/translucent.css');
    }, [dateTooltipTheme]);

    return showCal ? (
        <CalendarContext.Provider
            value={{
                events: events ?? [],
                firstDayOfWeek: firstDayOfWeek ?? 'Monday', // setting default values
                customWeekend: customWeekend ?? [5, 6],
                firstSelectedCell,
                secondSelectedCell,
                virtualSecondSelectedCell,
                selectedYear,
                setFirstSelectedCell,
                setSecondSelectedCell,
                setVirtualSecondSelectedCell,
                monthNameBackgroundColor: monthNameBackgroundColor ?? defaultMonthNameBackgroundColor,
                monthNameTextColor: monthNameTextColor ?? defaultMonthNameTextColor,
                dateTooltipTheme,
                weekSeparatorWidth: weekSeparatorWidth ?? defaultWeekSeparatorWidth,
                weekSeparatorColor: weekSeparatorColor ?? defaultWeekSeparatorColor,
                weekendCellBackgroundColor: weekendCellBackgroundColor ?? defaultWeekendCellBackgroundColor,
                weekendCellTextColor: weekendCellTextColor ?? defaultWeekendCellTextColor,
                weekDayCellBackgroundColor: weekDayCellBackgroundColor ?? defaultWeekDayCellBackgroundColor,
                weekDayCellTextColor: weekDayCellTextColor ?? defaultWeekDayCellTextColor,
                readonlyCalendar: readonlyCalendar ?? false,
                enableYearToYearSelection: enableYearToYearSelection ?? false,
                enableWeekendSelection: enableWeekendSelection ?? true,
                selectionColor: selectionColor ?? defaultSelectionColor,
                selectionTextColor: selectionTextColor ?? defaultSelectionTextColor,
                maxRangeSelection,
                minRangeSelection,
                minYear,
                maxYear,
                showWeekSeparator: showWeekSeparator ?? false,
                showTodayButton: showTodayButton ?? true,
                minCellWidth: minCellWidth ?? defaultminCellWidth,
                showSeparatorInHeader: showSeparatorInHeader ?? true,
                headerWeekendBgColor: headerWeekendBgColor ?? defaultHeaderWeekendBgColor,
                headerWeekDayBgColor: headerWeekDayBgColor ?? defaultHeaderWeekDayBgColor,
                headerTextColor: headerTextColor ?? defaultHeaderTextColor,
                enableEventOverwriting: enableEventOverwriting ?? true,
                clearSelection,
                onDatePick,
                onEventSinglePickInterception,
                onRangePick,
                onEventRangePickInterception,
                onRangeSelectionError,
            }}>
            <YearSwitcher
                min={minYear ?? dayjs().year() - 20}
                max={maxYear ?? dayjs().year()}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
            />
            <div
                onWheel={e => {
                    e.currentTarget.scrollLeft += e.deltaY;
                }}
                className="overflow-x-auto">
                <table id="ryc-table" className="min-w-full border-spacing-[0_4px] border-separate pb-1">
                    <thead>
                        <tr>
                            {/* empty cell for representing months column */}
                            <th className="sticky left-0 bg-gray-200">
                                {showTodayButton && (
                                    <button
                                        onClick={goToToday}
                                        className="px-2 py-1 text-gray-500 hover:text-gray-800 ">
                                        Today
                                    </button>
                                )}
                            </th>
                            {/* displaying week days 5 times repeatedly  */}
                            {firstDayOfWeek === 'Sunday'
                                ? new Array(7 * 5 + 2).fill(null).map((_arr, index) => (
                                      <WeekDayCell
                                          key={index}
                                          index={index}
                                          englishDayName={dayNamesStartingWithSunday[index % 7]}
                                          dayName={dayjs()
                                              .day(index % 7)
                                              .format('ddd')}
                                      />
                                  ))
                                : new Array(7 * 6 - 5).fill(null).map((_arr, index) => (
                                      <WeekDayCell
                                          key={index}
                                          index={index}
                                          englishDayName={dayNamesStartingWithMonday[index % 7]}
                                          dayName={dayjs()
                                              .day((index % 7) + 1)
                                              .format('ddd')}
                                      />
                                  ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* looping 12 times and display each time a month (row) with its days */}
                        {monthsWithDates.length &&
                            new Array(12)
                                .fill(null)
                                .map((_el, index) => (
                                    <MonthRow
                                        key={index}
                                        customWeekend={customWeekend ?? [5, 6]}
                                        year={selectedYear}
                                        monthDays={monthsWithDates[index].sort(
                                            (a, b) => a.date.valueOf() - b.date.valueOf()
                                        )}
                                        monthIndex={index}
                                        firstDayOfWeek={firstDayOfWeek ?? 'Monday'}
                                    />
                                ))}
                    </tbody>
                </table>
            </div>
        </CalendarContext.Provider>
    ) : (
        <Loader />
    );
});
