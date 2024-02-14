import type {FC} from 'react';
import {useContext, useEffect} from 'react';

import {CalendarContext} from '../../context/context';
import type {IYearSwitcher} from '../../utils/interfaces';

const YearSwitcher: FC<IYearSwitcher> = ({min, max, selectedYear, setSelectedYear}) => {
    const {headerWeekendBgColor} = useContext(CalendarContext)!;

    useEffect(() => {
        const currentYear = document.getElementById(`year-${selectedYear}`);

        // when year changes make current selected year at the middle of the screen
        currentYear?.scrollIntoView({
            block: 'center',
            inline: 'center',
            behavior: 'smooth',
        });
    }, [selectedYear]);
    return (
        <div className="relative">
            <button
                disabled={selectedYear === min}
                onClick={() => selectedYear !== min && setSelectedYear(selectedYear - 1)}
                className="switch-left-button"
                style={{
                    backgroundColor: headerWeekendBgColor,
                }}>
                &lt;&lt;
            </button>
            <div
                onWheel={e => {
                    e.currentTarget.scrollLeft += e.deltaY;
                }}
                className="year-switcher w-full h-14 flex gap-[20px] overflow-x-auto bg-gray-200 pr-[40%] pl-[40%]">
                {new Array(max > min ? max - min + 1 : min - max + 1).fill(null).map((_el, index) => (
                    <button
                        key={index}
                        className={`flex items-center h-full text-gray-500 transition-all ease-in duration-500 ${
                            selectedYear === min + index
                                ? 'font-[700] text-4xl '
                                : min + index === selectedYear + 1 || min + index === selectedYear - 1
                                  ? 'text-2xl font-[600]'
                                  : 'text-xl font-[500]'
                        }`}
                        id={`year-${min + index}`}
                        onClick={e => setSelectedYear(Number(e.currentTarget.innerText))}>
                        {min + index}
                    </button>
                ))}
            </div>
            <button
                disabled={selectedYear === max}
                onClick={() => selectedYear !== max && setSelectedYear(selectedYear + 1)}
                className="switch-right-button"
                style={{
                    backgroundColor: headerWeekendBgColor,
                }}>
                &gt;&gt;
            </button>
        </div>
    );
};

export default YearSwitcher;
