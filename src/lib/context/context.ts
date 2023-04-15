import { createContext } from 'react'

import { IReactFullYearSchedulerContext } from './../utils/interfaces'

export const CalendarContext = createContext<IReactFullYearSchedulerContext | null>(null)
