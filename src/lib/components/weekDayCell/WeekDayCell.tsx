import {useContext} from 'react';

import {CalendarContext} from '../../context/context';

type IWeekDayCellProps = {
    index: number;
    dayName: string;
    englishDayName: string;
};

// week day cell
const WeekDayCell = ({index, dayName, englishDayName}: IWeekDayCellProps) => {
    const {
        firstDayOfWeek,
        showWeekSeparator,
        weekSeparatorColor,
        weekSeparatorWidth,
        showSeparatorInHeader,
        minCellWidth,
        headerWeekDayBgColor,
        headerWeekendBgColor,
        headerTextColor,
    } = useContext(CalendarContext)!;

    const isStartOfWeek =
        firstDayOfWeek &&
        index !== 0 &&
        ((firstDayOfWeek === 'Sunday' && englishDayName === 'Sunday') ||
            (firstDayOfWeek === 'Monday' && englishDayName === 'Monday'));

    return (
        <th
            style={{
                minWidth: minCellWidth! + (showWeekSeparator && isStartOfWeek ? weekSeparatorWidth! : 0),
                ...(showWeekSeparator &&
                    isStartOfWeek && {
                        borderLeftWidth: weekSeparatorWidth,
                        borderLeftColor: showSeparatorInHeader ? weekSeparatorColor : headerWeekendBgColor,
                    }),
                ...(englishDayName === 'Sunday' || englishDayName === 'Saturday'
                    ? {
                          backgroundColor: headerWeekendBgColor,
                      }
                    : {
                          backgroundColor: headerWeekDayBgColor,
                      }),
                ...(englishDayName === 'Saturday' || englishDayName === 'Sunday'
                    ? {borderBottom: '1px solid white'}
                    : null),
                color: headerTextColor,
            }}
            className={`py-2 font-semibold text-white text-[15px] text-center ${
                index % 7 === 6 || index % 7 === 7 ? 'weekend-header' : 'week-day-header'
            }`}>
            {dayName.charAt(0).toUpperCase() + dayName.substring(1, 3)}
        </th>
    );
};

export default WeekDayCell;
