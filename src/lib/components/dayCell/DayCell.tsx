/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'tippy.js/dist/tippy.css' // optional

import Tippy from '@tippyjs/react'
import { Dayjs } from 'dayjs'
import { FC, useContext, useState } from 'react'

import { CalendarContext } from '../../context/context'
import { TDayCell } from '../../utils/types'

const DayCell: FC<TDayCell> = ({
  isEmpty,
  date,
  rowCellIndex,
  weekDayIndex,
  dayNumber,
  dayName,
  isWeekend,
  eventIndex,
  eventName,
  eventBgColor,
  eventTextColor,
}) => {
  const [hovered, setHovered] = useState<boolean>(false)

  const {
    enableWeekendSelection,
    firstDayOfWeek,
    firstSelectedCell,
    secondSelectedCell,
    virtualSecondSelectedCell,
    setFirstSelectedCell,
    setSecondSelectedCell,
    setVirtualSecondSelectedCell,
    dateTooltipTheme,
    showWeekSeparator,
    weekSeparatorColor,
    weekSeparatorWidth,
    weekendCellBackgroundColor,
    weekendCellTextColor,
    weekDayCellBackgroundColor,
    weekDayCellTextColor,
    readonlyCalendar,
    selectionColor,
    selectionTextColor,
    minRangeSelection,
    maxRangeSelection,
    enableEventOverwriting,
    events,
    clearSelection,
    onDatePick,
    onEventSinglePickInterception,
    onRangePick,
    onEventRangePickInterception,
  } = useContext(CalendarContext)!

  // cell date is within first and second selected cell
  const isWithinRangeSelection =
    date?.isSame(firstSelectedCell) ||
    date?.isSame(secondSelectedCell) ||
    date?.isSame(virtualSecondSelectedCell) ||
    (secondSelectedCell
      ? date?.isBetween(firstSelectedCell?.toDate(), secondSelectedCell?.toDate(), null, '[]')
      : null) ||
    (virtualSecondSelectedCell
      ? date?.isBetween(firstSelectedCell?.toDate(), virtualSecondSelectedCell?.toDate(), null, '[]')
      : null)

  // should render week separator
  const shouldRenderWeekSeparatorToTheLeft =
    rowCellIndex !== 0 &&
    ((firstDayOfWeek === 'Sunday' && dayName === 'Sunday') || (firstDayOfWeek === 'Monday' && dayName === 'Monday'))

  const isFirstSelectedCell =
    secondSelectedCell && firstSelectedCell?.isSame(date) && firstSelectedCell.isBefore(secondSelectedCell)

  const isSecondSelectedCell =
    secondSelectedCell &&
    (secondSelectedCell?.isSame(date) || virtualSecondSelectedCell?.isSame(date)) &&
    firstSelectedCell?.isBefore(secondSelectedCell)
  const isBetweenMaxAndMinSelectionRange = (range: number) => {
    // decide wether range(first/second selected cells) is between max and min range selection
    return (
      (maxRangeSelection && minRangeSelection && range! <= maxRangeSelection && range! >= minRangeSelection) ||
      (maxRangeSelection && !minRangeSelection && range! <= maxRangeSelection) ||
      (minRangeSelection && !maxRangeSelection && range! >= minRangeSelection) ||
      (!minRangeSelection && !maxRangeSelection)
    )
  }

  // decide wether the selection range is overwiting any event
  const isThereEventsBetweenRange = (
    date1: Dayjs,
    date2: Dayjs,
  ): {
    eventsToBeDeleted: number[]
    eventsToBeUpdated: number[]
    isThereEventsBetweenRange: boolean
  } => {
    const eventsToBeDeleted: number[] = []
    const eventsToBeUpdated: number[] = []

    let searchResult = false

    // check if current cell between event
    events.forEach((el, index) => {
      // if true add current event to the toBeDeletedEvents
      const toBeDeletedCondition = date1.isSameOrBefore(el.startDate) && date2.isSameOrAfter(el.endDate)
      // if true add current event to the toBeUpdatedEvents
      const toBeUpdatedCondition =
        (date1.isAfter(el.startDate) && date2.isBefore(el.endDate)) ||
        (el.startDate.isSameOrBefore(date2) && date1.isSameOrBefore(el.startDate) && date2.isBefore(el.endDate)) ||
        (date1.isSameOrBefore(el.endDate) && date1.isAfter(el.startDate) && date2.isSameOrAfter(el.endDate))

      if (toBeDeletedCondition) {
        eventsToBeDeleted.push(index)
      } else if (toBeUpdatedCondition) {
        eventsToBeUpdated.push(index)
      }

      if (toBeDeletedCondition || toBeUpdatedCondition) {
        searchResult = true
      }
    })

    return {
      eventsToBeDeleted: eventsToBeDeleted,
      eventsToBeUpdated: eventsToBeUpdated,
      isThereEventsBetweenRange: searchResult,
    }
  }

  // handle cell click
  const handleCellClick = () => {
    // prevent selection when readonly calendar is true
    if (!readonlyCalendar && ((isWeekend && enableWeekendSelection) || !isWeekend)) {
      if (!enableEventOverwriting && eventName) return // if enableEventOverwriting == false and you try to select a date that belongs to an event it will prevent you from doing so

      if (!firstSelectedCell) {
        setFirstSelectedCell(date)
        // call onEventSinglePickInterception when it the even callback is defined and the current date is intercepting another event
        if (eventIndex !== undefined && onEventSinglePickInterception) {
          onEventSinglePickInterception(date!, eventIndex!, clearSelection?.clearFirstCell!)
        } else {
          onDatePick && onDatePick(date!, clearSelection?.clearFirstCell!)
        }
      } else if (!secondSelectedCell) {
        // if second cell is before first one switch them
        if (firstSelectedCell!.isAfter(date)) {
          // keep selection within range
          const diffBetweenNowAndFirstCell = firstSelectedCell!.diff(date, 'day')!
          if (isBetweenMaxAndMinSelectionRange(diffBetweenNowAndFirstCell)) {
            const _ = isThereEventsBetweenRange(date!, firstSelectedCell)

            if ((!enableEventOverwriting && !_.isThereEventsBetweenRange) || enableEventOverwriting) {
              setSecondSelectedCell(firstSelectedCell)
              setFirstSelectedCell(date)
              setVirtualSecondSelectedCell(undefined)

              if (_.isThereEventsBetweenRange && onEventRangePickInterception) {
                onEventRangePickInterception(
                  date!,
                  firstSelectedCell!,
                  _.eventsToBeDeleted,
                  _.eventsToBeUpdated,
                  clearSelection?.clearSecondCell!,
                  clearSelection?.clearSelection!,
                )
              } else {
                // trigger on range pick event
                onRangePick &&
                  onRangePick(
                    date!,
                    firstSelectedCell!,
                    clearSelection?.clearSecondCell!,
                    clearSelection?.clearSelection!,
                  )
              }
            }
          }
          // if first cell is before second cell
        } else {
          // keep selection within range
          const diffBetweenNowAndFirstCell = date?.diff(firstSelectedCell, 'day')
          if (isBetweenMaxAndMinSelectionRange(diffBetweenNowAndFirstCell!)) {
            const _ = isThereEventsBetweenRange(firstSelectedCell, date!)

            if ((!enableEventOverwriting && !_.isThereEventsBetweenRange) || enableEventOverwriting) {
              setSecondSelectedCell(date)
              setVirtualSecondSelectedCell(undefined)

              if (_.isThereEventsBetweenRange && onEventRangePickInterception) {
                onEventRangePickInterception(
                  firstSelectedCell!,
                  date!,
                  _.eventsToBeDeleted,
                  _.eventsToBeUpdated,
                  clearSelection?.clearSecondCell!,
                  clearSelection?.clearSelection!,
                )
              } else {
                // trigger on range pick event
                onRangePick &&
                  onRangePick(
                    firstSelectedCell,
                    date!,
                    clearSelection?.clearSecondCell!,
                    clearSelection?.clearSelection!,
                  )
              }
            }
          }
        }
      } else {
        setSecondSelectedCell(undefined)
        setVirtualSecondSelectedCell(undefined)
        setFirstSelectedCell(date)
        // call onEventSinglePickInterception when it the even callback is defined and the current date is intercepting another event
        if (eventName && onEventSinglePickInterception) {
          onEventSinglePickInterception(date!, eventIndex!, clearSelection?.clearFirstCell!)
        } else {
          // trigger on date pick event
          onDatePick && onDatePick(date!, clearSelection?.clearFirstCell!)
        }
      }
    }
  }
  // handle event mouse enter (hover)
  const handleEventHover = () => {
    if (!readonlyCalendar) {
      if (!enableEventOverwriting && eventName) return // if enableEventOverwriting == false and you try to hover a date that belongs to an event it will not show the hover color

      setHovered(true)

      if (enableEventOverwriting && firstSelectedCell && !secondSelectedCell) {
        setVirtualSecondSelectedCell(date)
      } else if (
        firstSelectedCell &&
        !secondSelectedCell &&
        //if enableEventOverwriting == false and there is an event between first and second selected range it will prevent the hovering
        (firstSelectedCell.isBefore(date)
          ? !isThereEventsBetweenRange(firstSelectedCell, date!).isThereEventsBetweenRange
          : !isThereEventsBetweenRange(date!, firstSelectedCell!).isThereEventsBetweenRange)
      ) {
        setVirtualSecondSelectedCell(date)
      }
    }
  }
  // handle event mouse leave (blur)
  const handleEventBlur = () => {
    if (!readonlyCalendar) {
      if (!enableEventOverwriting && eventName) return

      firstSelectedCell && !secondSelectedCell && setVirtualSecondSelectedCell(undefined)
      setHovered(false)
    }
  }

  return !isEmpty ? (
    <Tippy
      theme={dateTooltipTheme}
      zIndex={99999000}
      delay={0}
      duration={0}
      arrow
      placement="bottom"
      content={
        <>
          <span>{date?.format('dddd D MMMM YYYY')}</span> <br />
          {eventName && (
            <div className="flex items-center gap-1">
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: eventBgColor,
                  border: '1px solid black',
                }}
              />
              <span className={`${dateTooltipTheme?.includes('light') ? 'text-black' : 'text-white'} font-[600]`}>
                {eventName && eventName[0].toUpperCase() + eventName.slice(1)}
              </span>
            </div>
          )}
        </>
      }
      className="w-full h-full"
    >
      <td
        id="my-element"
        day-name={dayName}
        style={{
          height: '100%',
          ...(!isWeekend && //display the bg/text color of the corresponding event
          !hovered &&
          !isWithinRangeSelection
            ? {
                backgroundColor: eventBgColor,
                color: eventTextColor,
              }
            : {
                backgroundColor: weekDayCellBackgroundColor,
                color: weekDayCellTextColor,
              }),
          ...(showWeekSeparator && // display separator condition
            shouldRenderWeekSeparatorToTheLeft && {
              borderLeftWidth: weekSeparatorWidth,
              borderLeftColor: (!(isFirstSelectedCell || isSecondSelectedCell) && weekSeparatorColor) as string,
            }),
          ...(isWeekend && // display the bg/text color for normal cells weekend
            !isWithinRangeSelection && {
              color: weekendCellTextColor,
              backgroundColor: weekendCellBackgroundColor,
            }),
          ...(isWithinRangeSelection && {
            // condition for displaying bg color when selecting cell
            backgroundColor: selectionColor,
            color: selectionTextColor,
          }),
        }}
        className={`relative text-center text-sm font-normal hover:cursor-pointer transition-[background] duration-150 ease-in 
        ${
          //lower opacity of first and second selected cells
          isFirstSelectedCell
            ? 'after:contents-[""] after:w-full after:h-full after:absolute after:bg-white after:top-0 after:left-0 after:opacity-30'
            : isSecondSelectedCell
            ? 'after:contents-[""] after:w-full after:h-full after:absolute after:bg-white after:top-0 after:left-0 after:opacity-30'
            : ''
        }
         ${
           // color weekend days differently when no color is chosen
           isWeekend && !isWithinRangeSelection
             ? 'weekend-cell text-[#f39200] bg-yellow-100 font-semibold'
             : 'week-day-cell'
         } ${
          isWithinRangeSelection
            ? 'text-white font-semibold'
            : `${'border-b-[0.1px]'} border-gray-200 ${(eventName && isWeekend) || (!eventName && 'border-l-[0.1px]')}`
        }`}
        onClick={handleCellClick}
        onMouseEnter={handleEventHover}
        onMouseLeave={handleEventBlur}
      >
        {/* show little colored circle on weekend when that weekend day is included in an event */}
        {isWeekend && eventBgColor && !isWithinRangeSelection && (
          <span
            style={{
              backgroundColor: eventBgColor,
            }}
            className="w-[5px] h-[5px] absolute top-[2px] right-[2px] rounded-full"
          />
        )}

        {/* handle bottom border color intercepting left border color when separator is active */}
        {showWeekSeparator && shouldRenderWeekSeparatorToTheLeft && (
          <div
            style={{
              width: weekSeparatorWidth,
              background: weekSeparatorColor,
              left: -weekSeparatorWidth!,
            }}
            className={`absolute top-0 ${
              // remove extra 4px from height when we are in the last month
              date?.month() === 11 ? 'h-[calc(100%)]' : 'h-[calc(100%+4px)]'
            }`}
          />
        )}

        {date?.format('DD')}
      </td>
    </Tippy>
  ) : (
    <td
      style={{
        height: '100%',
        ...(showWeekSeparator &&
          shouldRenderWeekSeparatorToTheLeft && {
            borderLeftWidth: weekSeparatorWidth,
            borderLeftColor: weekSeparatorColor,
          }),
      }}
      className="bg-[auto_auto] bg-white bg-[repeating-linear-gradient(_135deg,transparent_5px,rgb(189,189,189)_10px,rgba(208,204,204,1)_12px_)]"
    />
  )
}

export default DayCell
