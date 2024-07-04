import {useContext} from 'react';

import {CalendarContext} from '@/lib/context/context';

type IWeekDayCellProps = {
    index: number;
    dayName: string;
    englishDayName: string;
};

const DaysEnum = {
    0: 'MONDAY ',
    1: 'TUESDAY ',
    2: 'WEDNESDAY ',
    3: 'THURSDAY ',
    4: 'FRIDAY ',
    5: 'SATURDAY ',
    6: 'SUNDAY ',
};

// week day cell
const WeekDayCell = ({index, dayName, englishDayName}: IWeekDayCellProps) => {
    const {
        firstDayOfWeek,
        customWeekend,
        showWeekSeparator,
        weekSeparatorColor,
        weekSeparatorWidth,
        showSeparatorInHeader,
        minCellWidth,
        headerWeekDayBgColor,
        headerWeekendBgColor,
        headerTextColor,
    } = useContext(CalendarContext)!;

    const firstWeekendDay = DaysEnum[customWeekend![0]];
    const secondWeekendDay = DaysEnum[customWeekend![1]];

    let isWeekend;
    if (firstDayOfWeek === 'Sunday') {
        isWeekend = index % 7 === customWeekend![0] + 1 || index % 7 === customWeekend![1] + 1 ? true : false;
    } else {
        isWeekend = index % 7 === customWeekend![0] || index % 7 === customWeekend![1] ? true : false;
    }

    const isStartOfWeek =
        firstDayOfWeek &&
        index !== 0 &&
        ((firstDayOfWeek === firstWeekendDay && englishDayName === firstWeekendDay) ||
            (firstDayOfWeek === secondWeekendDay && englishDayName === secondWeekendDay));

    return (
        <th
            style={{
                minWidth: minCellWidth! + (showWeekSeparator && isStartOfWeek ? weekSeparatorWidth! : 0),
                ...(showWeekSeparator &&
                    isStartOfWeek && {
                        borderLeftWidth: weekSeparatorWidth,
                        borderLeftColor: showSeparatorInHeader ? weekSeparatorColor : headerWeekendBgColor,
                    }),
                ...(isWeekend
                    ? {
                          backgroundColor: headerWeekendBgColor,
                      }
                    : {
                          backgroundColor: headerWeekDayBgColor,
                      }),
                ...(englishDayName === firstWeekendDay || englishDayName === secondWeekendDay
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
