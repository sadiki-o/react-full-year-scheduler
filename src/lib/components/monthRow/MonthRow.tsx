import dayjs from 'dayjs';
import type {FC} from 'react';
import {useContext} from 'react';

import {CalendarContext} from '../../context/context';
import {dayNamesStartingWithMonday, dayNamesStartingWithSunday} from '../../utils/helpers';
import type {IMonthRowProps} from '../../utils/interfaces';
import DayCell from '../dayCell/DayCell';

// cell containing month name
export const MonthNameCell = ({monthName}: {monthName: string}) => {
    const {monthNameBackgroundColor, monthNameTextColor} = useContext(CalendarContext)!;

    return (
        <td
            style={{
                backgroundColor: monthNameBackgroundColor,
                color: monthNameTextColor,
            }}
            className="sticky z-[10000] left-0 month-name-cell text-sm px-2 py-2 border-b-[1px] font-semibold border-white hover:cursor-pointer">
            {monthName}
        </td>
    );
};

// display a row containing the days of a specific month
export const MonthRow: FC<IMonthRowProps> = ({year, monthDays, monthIndex, firstDayOfWeek}) => {
    return (
        <tr>
            {/* display month name as first cell in the row */}
            <MonthNameCell monthName={dayjs().month(monthIndex).format('MMMM')} />
            {/* if week starts with Sunday display 5 weeks on the calendar else display 6 weeks */}
            {firstDayOfWeek === 'Sunday'
                ? new Array(5 * 7 + 2).fill(null).map((_el, index) => {
                      const dayIndex = index - monthDays[0].date.day(); // avoid repetition

                      return index >= monthDays[0].date.day() &&
                          index <= monthDays[0].date.day() + monthDays.length - 1 ? (
                          <DayCell
                              key={index}
                              dayNumber={index + 1 - monthDays[0].date.day()}
                              date={dayjs(new Date(year, monthIndex, index + 1 - monthDays[0].date.day()))}
                              rowCellIndex={index}
                              weekDayIndex={index % 7}
                              dayName={dayNamesStartingWithSunday[index % 7]}
                              isWeekend={index % 7 === 0 || index % 7 === 6 ? true : false}
                              eventIndex={monthDays[dayIndex]?.eventIndex}
                              eventName={monthDays[dayIndex]?.eventName}
                              eventBgColor={monthDays[dayIndex]?.eventBgColor}
                              eventTextColor={monthDays[dayIndex]?.eventTextColor}
                          />
                      ) : (
                          <DayCell
                              key={index}
                              dayNumber={index + 1 - monthDays[0].date.day()}
                              dayName={dayNamesStartingWithSunday[index % 7]}
                              rowCellIndex={index}
                              isEmpty
                              weekDayIndex={index % 7}
                          />
                      );
                  })
                : new Array(7 * 6 - 5).fill(null).map((_el, index) => {
                      const preventOutOfRangeWeekIndex =
                          monthDays[0].date.day() === 0 ? 6 : monthDays[0].date.day() - 1; // avoid repetition

                      return index >= preventOutOfRangeWeekIndex &&
                          index <= preventOutOfRangeWeekIndex + monthDays.length - 1 ? (
                          <DayCell
                              key={index}
                              dayNumber={index + 1 - preventOutOfRangeWeekIndex}
                              date={dayjs(new Date(year, monthIndex, index + 1 - preventOutOfRangeWeekIndex))}
                              rowCellIndex={index}
                              weekDayIndex={index % 7}
                              dayName={dayNamesStartingWithMonday[index % 7]}
                              isWeekend={index % 7 === 5 || index % 7 === 6 ? true : false}
                              eventName={monthDays[index - preventOutOfRangeWeekIndex]?.eventName}
                              eventBgColor={monthDays[index - preventOutOfRangeWeekIndex]?.eventBgColor}
                              eventTextColor={monthDays[index - preventOutOfRangeWeekIndex]?.eventTextColor}
                          />
                      ) : (
                          <DayCell
                              key={index}
                              dayNumber={index + 1 - monthDays[0].date.day()}
                              dayName={dayNamesStartingWithMonday[index % 7]}
                              rowCellIndex={index}
                              isEmpty
                              weekDayIndex={index % 7}
                          />
                      );
                  })}
        </tr>
    );
};
