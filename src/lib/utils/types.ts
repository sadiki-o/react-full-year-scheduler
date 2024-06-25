import type {Dayjs} from 'dayjs';

export type TEvent = {
    startDate: Dayjs;
    endDate: Dayjs;
    eventName: string;
    eventBgColor?: string;
    eventTextColor?: string;
};

export type TDay = {
    date: Dayjs;
    eventIndex?: number | undefined;
    eventName?: string | undefined;
    eventBgColor?: string | undefined;
    eventTextColor?: string;
};

// conditional props rendering
export type TDayCell =
    | {
          isEmpty?: never;
          date?: Dayjs;
          dayNumber: number;
          weekDayIndex: number;
          rowCellIndex: number;
          dayName: string;
          isWeekend?: boolean;
          eventIndex?: number;
          eventName?: string;
          eventBgColor?: string;
          eventTextColor?: string;
      }
    | {
          isEmpty: boolean;
          date?: never;
          dayNumber: number;
          weekDayIndex?: number;
          rowCellIndex: number;
          dayName?: string;
          isWeekend?: never;
          eventIndex?: never;
          eventName?: never;
          eventBgColor?: never;
          eventTextColor?: never;
      };

export type ConsecutiveDays = [6, 0] | [0, 1] | [1, 2] | [2, 3] | [3, 4] | [4, 5] | [5, 6];
