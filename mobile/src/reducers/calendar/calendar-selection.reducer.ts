import { CalendarEventsState, IntervalsSubState, SelectionSubState } from './calendar-events.reducer';
import { SelectCalendarDay, CalendarSelectionModeType } from './calendar.action';
import { CalendarEvents, CalendarEventsType, DatesInterval, CalendarEventStatus } from './calendar-events.model';
import { CalendarIntervalsBuilder } from './calendar-intervals-builder';

export const singleDaySelectionReducer = (state: CalendarEventsState, action: SelectCalendarDay): SelectionSubState | null => {
    return {
        selection: {
            ...state.selection,
            single: {
                day: action.day
            }
        }
    };
};

export const intervalSelectionReducer = (state: CalendarEventsState, action: SelectCalendarDay): SelectionSubState | null => {
    if (state.selection.interval) {
        return {
            selection: {
                single: {
                    day: action.day
                },
                interval: {
                    ...state.selection.interval,
                    endDay: action.day
                }
            }
        };
    }

    return null;
};