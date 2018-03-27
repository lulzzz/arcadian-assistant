import { Reducer } from 'redux';
import { CalendarActions, CalendarSelectionModeType, CalendarSelectionMode } from './calendar.action';
import { DayModel, WeekModel, IntervalsModel, CalendarSelection, IntervalModel, ExtractedIntervals, ReadOnlyIntervalsModel } from './calendar.model';
import moment from 'moment';
import { CalendarWeeksBuilder } from './calendar-weeks-builder';
import { CalendarEvents } from './calendar-events.model';
import { singleDaySelectionReducer, intervalSelectionReducer } from './calendar-selection.reducer';
import { calendarSelectionModeReducer } from './calendar-selection-mode.reducer';

export interface IntervalsSubState {
    intervals: ReadOnlyIntervalsModel;
}

export interface DisableDaysCalendarDaysBeforeSubState {
    disableCalendarDaysBefore: DayModel;
}

export interface SelectionSubState {
    selection: CalendarSelection;
}

export interface CalendarEventsState extends
    IntervalsSubState,
    DisableDaysCalendarDaysBeforeSubState,
    SelectionSubState {
        weeks: WeekModel[];
        disableCalendarActionsButtonGroup: boolean;
        intervalsBySingleDaySelection: ExtractedIntervals;
        allowSelectIntervalsBySingleDaySelection: boolean;
        disableSelection: boolean;
}

const createInitState = (): CalendarEventsState => {
    const builder = new CalendarWeeksBuilder();
    const today = moment();
    const weeks = builder.buildWeeks(today.month(), today.year());

    let todayModel: DayModel = null;
    for (let week of weeks) {
        todayModel = week.days.find(day => day.today);

        if (todayModel) {
            break;
        }
    }

    const defaultSelection: CalendarSelection = {
        single: {
            day: todayModel
        },
        interval: null
    };

    const defaultExtractedIntervals = new ExtractedIntervals(null);

    return {
        weeks: weeks,
        intervals: null,
        disableCalendarDaysBefore: null,
        disableCalendarActionsButtonGroup: true,
        selection: defaultSelection,
        intervalsBySingleDaySelection: defaultExtractedIntervals,
        allowSelectIntervalsBySingleDaySelection: false,
        disableSelection: false
    };
};

const initState = createInitState();

export const calendarEventsReducer: Reducer<CalendarEventsState> = (state = initState, action: CalendarActions) => {
    switch (action.type) {
        case 'LOAD-CALENDAR-EVENTS-FINISHED':
            const intervals = action.calendarEvents.buildIntervalsModel();

            return {
                ...state,
                intervals: intervals,
                disableCalendarActionsButtonGroup: false
            };
        case 'CALENDAR-EVENT-CREATED':
            let intervalsWithNewEvent = state.intervals
                ? state.intervals.copy()
                : null;

            const calendarEvents = new CalendarEvents([action.calendarEvent]);

            if (intervalsWithNewEvent) {
                calendarEvents.appendToIntervalsModel(intervalsWithNewEvent);
            } else {
                intervalsWithNewEvent = calendarEvents.buildIntervalsModel();
            }

            return {
                ...state,
                intervals: intervalsWithNewEvent
            };
        case 'SELECT-CALENDAR-DAY':
            const singleDayState = singleDaySelectionReducer(state, action);
            const intervalState = intervalSelectionReducer(state, action);

            return {
                ...state,
                ...singleDayState,
                ...intervalState
            };
        case 'SELECT-CALENDAR-MONTH':
            const builder = new CalendarWeeksBuilder();
            const weeks = builder.buildWeeks(action.month, action.year);

            return {
                ...state,
                weeks: weeks
            };
        case 'CALENDAR-SELECTION-MODE':
            const selectionState = calendarSelectionModeReducer(state, action);

            return {
                ...state,
                ...selectionState
            };
        case 'INTERVALS-BY-SINGLE-DAY-SELECTION':
            if (state.allowSelectIntervalsBySingleDaySelection) {
                return state;
            }

            const intervalsBySingleDay = state.intervals
                ? state.intervals.get(state.selection.single.day.date)
                : null;

            const extractedIntervals = new ExtractedIntervals(intervalsBySingleDay);

            return {
                ...state,
                intervalsBySingleDaySelection: extractedIntervals
            };
        case 'DISABLE-CALENDAR-SELECTION':
            return {
                ...state,
                disableSelection: action.disable
            };
        case 'ALLOW-SELECT-INTERVALS-BY-SINGLE-DAY-SELECTION': 
            return {
                ...state,
                allowSelectIntervalsBySingleDaySelection: action.disable
            };
        default:
            return state;
    }
};