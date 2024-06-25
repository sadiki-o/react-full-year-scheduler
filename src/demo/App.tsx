/* eslint-disable import/no-extraneous-dependencies */
import dayjs from "dayjs";
import { useState } from "react";

import { ReactFullYearScheduler } from "@/lib";
import type { TEvent } from "@/lib/utils/types";

const App = () => {
    const [events, setEvents] = useState<TEvent[]>([
        {
            eventName: "event 1",
            startDate: dayjs("2023-01-10"),
            endDate: dayjs("2023-02-01"),
            eventBgColor: "#ff5f4c",
            eventTextColor: "white",
        },
        {
            eventName: "event 2",
            startDate: dayjs("2023-04-01"),
            endDate: dayjs("2023-04-30"),
            eventBgColor: "purple",
            eventTextColor: "white",
        },
        {
            eventName: "event 3",
            startDate: dayjs("2023-05-01"),
            endDate: dayjs("2023-05-29"),
            eventBgColor: "green",
            eventTextColor: "white",
        },
    ]);
    return (
        <div className="w-[1400px] mx-auto mt-10">
            <ReactFullYearScheduler
                events={events}
                locale="fr"
                dateTooltipTheme="material"
                weekSeparatorWidth={10}
                weekSeparatorColor="white"
                headerWeekDayBgColor="#b39cd0"
                headerWeekendBgColor="rgba(75, 68, 83, 0.69)"
                weekendCellBackgroundColor="rgba(75, 68, 83, 0.69)"
                weekendCellTextColor="white"
                weekDayCellBackgroundColor="rgba(75, 68, 83, 0.69)"
                weekDayCellTextColor="white"
                selectionColor="black"
                selectionTextColor="white"
                maxRangeSelection={50}
                minRangeSelection={5}
                firstDayOfWeek="Monday"
                customWeekend={[4, 5]}
                maxYear={2030}
                minYear={1970}
                defaultYearToLoad={2023}
                readonlyCalendar={false}
                showWeekSeparator={false}
                showTodayButton={true}
                enableYearToYearSelection={true}
                enableWeekendSelection={false}
                minCellWidth={30}
                showSeparatorInHeader={false}
                enableEventOverwriting={true}
                onDatePick={(eventDate, clearSelectedCell) => {
                    console.log(eventDate.toDate());
                }}
                onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {
                    console.table([eventName, date.toDate()]);
                }}
                onRangePick={(eventStartDate, eventEndDate, clearSecondSelectedCell, clearSelection) => {
                    console.log("duck");
                }}
                onEventRangePickInterception={(
                    eventFirstDate,
                    eventLastDate,
                    eventsToBeDeleted,
                    eventsToBeUpdated,
                    clearSecondSelectedCell,
                    clearSelection,
                ) => {}}
                onRangeSelectionError={(high, low) => {
                    console.log(high, low)
                }}
            />
        </div>
    );
};

export default App;
