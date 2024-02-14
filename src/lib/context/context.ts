import {createContext} from 'react';

import type {IReactFullYearSchedulerContext} from './../utils/interfaces';

export const CalendarContext = createContext<IReactFullYearSchedulerContext | null>(null);
