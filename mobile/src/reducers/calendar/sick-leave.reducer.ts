import { SelectCalendarDay } from './calendar.action';
import { CalendarEventsState } from './calendar-events.reducer';
import { CalendarEvents, DatesInterval, CalendarEventsType } from './calendar-events.model';
import { CalendarIntervalsBuilder } from './calendar-intervals-builder';
import { ClaimSickLeaveDialogModel } from './event-dialog/event-dialog.model';
import { ClaimSickLeave, ConfirmClaimSickLeave } from './sick-leave.action';
import { IntervalsModel } from './calendar.model';

export const claimSickLeaveReducer = (state: CalendarEventsState, action: ClaimSickLeave): CalendarEventsState => {
    const claimSickLeaveDialog = new ClaimSickLeaveDialogModel();

    claimSickLeaveDialog.startDate = state.selectedCalendarDay.date;

    const editedIntervals = state.intervals
        ? state.intervals.copy()
        : null;

    return {
        ...state,
        intervals: editedIntervals,
        dialog: {
            active: true,
            model: claimSickLeaveDialog
        },
        editingOfIntervals: {
            ...state.editingOfIntervals,
            active: true,
            startDay: state.selectedCalendarDay,
            unchangedIntervals: state.intervals,
            eventType: CalendarEventsType.SickLeave
        },
        disableCalendarDaysBefore: state.selectedCalendarDay
    };
};

export const selectSickLeaveEndDateReducer = (state: CalendarEventsState, action: SelectCalendarDay): CalendarEventsState => {

    if (state.editingOfIntervals.active && state.editingOfIntervals.eventType === CalendarEventsType.SickLeave) {
        const newCalendarEvents = new CalendarEvents();

        newCalendarEvents.type = CalendarEventsType.SickLeave;
        newCalendarEvents.dates = new DatesInterval();
        newCalendarEvents.dates.startDate = state.editingOfIntervals.startDay.date;
        newCalendarEvents.dates.endDate = action.day.date;

        const changedIntervals = state.editingOfIntervals.unchangedIntervals
            ? state.editingOfIntervals.unchangedIntervals.copy()
            : null;

        if (changedIntervals) {
            const builder = new CalendarIntervalsBuilder();
            builder.appendCalendarEvents(changedIntervals, [newCalendarEvents], { draft: true });
        }

        const dialogModel: ClaimSickLeaveDialogModel = state.dialog.model.copy();
        dialogModel.endDate = newCalendarEvents.dates.endDate;

        return {
            ...state,
            intervals: changedIntervals,
            dialog: {
                ...state.dialog,
                model: dialogModel
            },
            editingOfIntervals: {
                ...state.editingOfIntervals,
                endDay: action.day
            }
        };
    }

    return state;
};

export const confirmClaimSickLeaveReducer = (state: CalendarEventsState, action: ConfirmClaimSickLeave): CalendarEventsState => {
    const intervalsToSave = state.editingOfIntervals.unchangedIntervals
        ? state.editingOfIntervals.unchangedIntervals.copy()
        : null;

    // TODO: temp: reload again all calendar events. Will be removed next PR. Just for demo
    if (intervalsToSave) {
        const newCalendarEvents = new CalendarEvents();
        newCalendarEvents.type = CalendarEventsType.SickLeave;
        newCalendarEvents.dates = new DatesInterval();
        newCalendarEvents.dates.startDate = state.editingOfIntervals.startDay.date;
        newCalendarEvents.dates.endDate = state.editingOfIntervals.endDay.date;

        const builder = new CalendarIntervalsBuilder();

        builder.appendCalendarEvents(intervalsToSave, [newCalendarEvents], { draft: false });
    }

    return {
        ...state,
        intervals: intervalsToSave,
        dialog: {
            active: false,
            model: null
        },
        editingOfIntervals: {
            active: false,
            unchangedIntervals: null,
            startDay: null,
            endDay: null,
            eventType: null
        },
         disableCalendarDaysBefore: null
    };
};