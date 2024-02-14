# React Full Year Scheduler

React full year scheduler is an open source project aimed at providing a simple, customizable, and easy-to-use full year calendar solution for individuals and organizations. The project was created out of a need for a more flexible and accessible calendar tool that can be used for various purposes, such as planning events, tracking deadlines, and scheduling appointments.

![image description](/rfys.png)

## Motivation

As a developer, I faced the challenge of finding calendar components that could easily integrate into my personal or company's projects. Despite my efforts, I couldn't find a suitable solution, leading me to recognize the need for a more versatile and customizable calendar tool. This inspired me to undertake this project.

The primary goal of this project is to create a comprehensive full-year calendar that can be easily customized and seamlessly integrated into any website or web application. I strongly believe that an outstanding calendar should be user-friendly and highly adaptable, enabling users to personalize it to their unique requirements.

## Features

-   :ok_hand: Year-at-a-glance view

-   :clock930: Ability to set holidays and working days for employees (example usage)

-   :sparkles: Highlight and customize events with different colors and styles

-   :eyes: Customizable styling and layout

-   :grey_exclamation: Show tooltip with event details on hover

-   :zap: Lightweight and performant with no external dependencies except Datejs and TailwindCSS

-   :open_hands: Open source and free to use

## Installation

To install the React Full Year Scheduler , run the following command:

```bash

yarn add react-full-year-scheduler

```

_Note_: this package relies heavily on 'dayjs', you need to have it installed and use it when passing and dealing with events.

## Usage

To use this component in your React application, import the `ReactFullYearScheduler` component from the appropriate file, and pass it the required `events` prop as an array of `TEvent` objects, along with any desired options. Here is an example of how you can use this component:

```jsx

import { useState } from "react";
import { ReactFullYearScheduler, TEvent } from "react-full-year-scheduler";
import dayjs from "dayjs";

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
        locale="en"
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
        maxYear={2030}
        minYear={1970}
        readonlyCalendar={false}
        showWeekSeparator={false}
        showTodayButton={true}
        enableYearToYearSelection={true}
        enableWeekendSelection={true}
        minCellWidth={30}
        showSeparatorInHeader={false}
        enableEventOverwriting={true}
        onDatePick={(eventDate, clearSelectedCell) => {
          console.log(eventDate.toDate());
        }}
        onEventSinglePickInterception={(date, eventName, clearSelectedCell) => {
          console.table([eventName, date.toDate()]);
        }}
        onRangePick={(
          eventStartDate,
          eventEndDate,
          clearSecondSelectedCell,
          clearSelection
        ) => {
          console.log("duck");
        }}
        onEventRangePickInterception={(
          eventFirstDate,
          eventLastDate,
          eventsToBeDeleted,
          eventsToBeUpdated,
          clearSecondSelectedCell,
          clearSelection
        ) => {}}
      />
    </div>
  );
};

export default App;

```

## Options

| Property Name                | Type       | Default      | Options                                                    |
| ---------------------------- | ---------- | ------------ | ---------------------------------------------------------- |
| `events`                     | `TEvent[]` | -            | -                                                          |
| `dateTooltipTheme`           | `string`   | `"material"` | `"material"`, `"light"`, `"light-border"`, `"translucent"` |
| `locale`                     | `string`   | `"en"`       | -                                                          |
| `weekSeparatorWidth`         | `number`   | `10`         | -                                                          |
| `weekSeparatorColor`         | `string`   | "#fefedf"    | -                                                          |
| `headerWeekDayBgColor`       | `string`   | "#c3b5d5"    | -                                                          |
| `headerWeekendBgColor`       | `string`   | "#b39cd0"    | -                                                          |
| `headerTextColor`            | `string`   | "white"      | -                                                          |
| `weekendCellBackgroundColor` | `string`   | "#b39cd0"    | -                                                          |
| `weekendCellTextColor`       | `string`   | "white"      | -                                                          |
| `weekDayCellBackgroundColor` | `string`   | "white"      | -                                                          |
| `weekDayCellTextColor`       | `string`   | "black"      | -                                                          |
| `monthNameBackgroundColor`   | `string`   | "#f2fedc"    | -                                                          |
| `monthNameTextColor`         | `string`   | "black"      | -                                                          |
| `readonlyCalendar`           | `boolean`  | false        | -                                                          |
| `enableYearToYearSelection`  | `boolean`  | false        | -                                                          |
| `enableWeekendSelection`     | `boolean`  | true         | -                                                          |
| `selectionColor`             | `string`   | "#32214c"    | -                                                          |
| `selectionTextColor`         | `string`   | "white"      | -                                                          |
| `maxRangeSelection`          | `number`   | -            | -                                                          |
| `minRangeSelection`          | `number`   | -            | -                                                          |
| `firstDayOfWeek`             | `string`   | `"Sunday"`   | `"Sunday"`, `"Monday"`                                     |
| `maxYear`                    | `number`   | "Monday"     | -                                                          |
| `minYear`                    | `number`   | -            | -                                                          |
| `showWeekSeparator`          | `boolean`  | false        | -                                                          |
| `showTodayButton`            | `boolean`  | true         | -                                                          |
| `minCellWidth`               | `number`   | 40           | -                                                          |
| `showSeparatorInHeader`      | `boolean`  | true         | -                                                          |
| `enableEventOverwriting`     | `boolean`  | true         | -                                                          |

## Events

| Event                           | Arguments                                                                                                                                                               | Description                                                                                                 |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `onDatePick`                    | `eventDate: Dayjs, clearSelectedCell: () => void`                                                                                                                       | Triggered when a single date is picked.                                                                     |
| `onEventSinglePickInterception` | `eventDate: Dayjs, InterceptedEventIndex: number, clearSelectedCell: () => void`                                                                                        | Triggered when a single date is picked while intercepting an existing event.                                |
| `onRangePick`                   | `eventStartDate: Dayjs, eventEndDate: Dayjs, clearSecondSelectedCell: () => void, clearSelection: () => void`                                                           | Triggered when picking a range of dates (start date / end date)                                             |
| `onEventRangePickInterception`  | `eventStartDate: Dayjs, eventEndDate: Dayjs, eventsToBeDeleted: number[], eventsToBeUpdated: number[], clearSecondSelectedCell: () => void, clearSelection: () => void` | Triggered when picking a range of dates (start date / end date) while intercepting another event or events. |

## How to Contribute

We welcome contributions from anyone who is interested in helping to improve this project. Whether you're an experienced developer or just getting started with open source, there are many ways to contribute:

-   **Submit issues and bug reports.** If you encounter a problem with the calendar or have a suggestion for improvement, please let us know by submitting an issue on GitHub.

-   **Propose new ideas and features.** We're always looking for new ideas and ways to improve the calendar. If you have an idea for a new feature or improvement, please let us know by submitting an issue on GitHub.

-   **Contribute code.** If you're a developer and would like to contribute code to the project, please fork the repository, make your changes, and submit a pull request.

-   **Spread the word.** Help us spread the word about the project by sharing it with your friends and colleagues or writing about it on your blog or social media.

We appreciate all contributions and look forward to working with you to make this project the best it can be!

## Testing the app

Inside ```src/``` there is a folder called demo which you can use to test the component and play arround with it. all you have to do is run ```npm run dev``` to launch the dev server after running ```npm install``` .

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/licenses/MIT) for details.

<a href="https://www.buymeacoffee.com/sadikio" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>
