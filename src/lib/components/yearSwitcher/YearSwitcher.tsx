/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useContext, useEffect } from 'react'

import { CalendarContext } from '../../context/context'
import { IYearSwitcher } from '../../utils/interfaces'

const YearSwitcher: FC<IYearSwitcher> = ({ min, max, selectedYear, setSelectedYear }) => {
  const { headerWeekendBgColor } = useContext(CalendarContext)!

  useEffect(() => {
    const currentYear = document.getElementById(`year-${selectedYear}`)

    // when year changes make current selected year at the middle of the screen
    currentYear?.scrollIntoView({
      block: 'center',
      inline: 'center',
      behavior: 'smooth',
    })
  }, [selectedYear])
  return (
    <div
      onWheel={(e) => {
        e.currentTarget.scrollLeft += e.deltaY
      }}
      className="year-switcher w-full h-14 flex gap-[4%] overflow-x-auto bg-gray-200 pr-[40%] pl-[40%]"
    >
      <button
        disabled={selectedYear === min}
        onClick={() => selectedYear !== min && setSelectedYear(selectedYear - 1)}
        className="left-button"
        style={{
          backgroundColor: headerWeekendBgColor,
        }}
      >
        &lt;&lt;
      </button>
      {new Array(max > min ? max - min + 1 : min - max + 1).fill(null).map((el, index) => (
        <button
          key={index}
          className={`flex items-center  h-full text-gray-500 transition-all ease-in duration-500 ${
            selectedYear === min + index
              ? 'font-[700] text-4xl '
              : min + index === selectedYear + 1 || min + index === selectedYear - 1
              ? 'text-2xl font-[600]'
              : 'text-xl font-[500]'
          }`}
          id={`year-${min + index}`}
          onClick={(e) => setSelectedYear(Number(e.currentTarget.innerText))}
        >
          {min + index}
        </button>
      ))}
      <button
        disabled={selectedYear === max}
        onClick={() => selectedYear !== max && setSelectedYear(selectedYear + 1)}
        className="right-button"
        style={{
          backgroundColor: headerWeekendBgColor,
        }}
      >
        &gt;&gt;
      </button>
    </div>
  )
}

export default YearSwitcher
