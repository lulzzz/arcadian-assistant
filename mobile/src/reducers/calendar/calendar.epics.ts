import { LoadUserEmployeeFinished } from '../user/user.action';
import { ActionsObservable, ofType } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { deserializeArray } from 'santee-dcts';
import { 
    loadCalendarEventsFinished, CalendarEventCreated, SelectIntervalsBySingleDaySelection, selectIntervalsBySingleDaySelection, SelectCalendarDay, LoadCalendarEventsFinished, LoadCalendarEvents, loadCalendarEvents, 
    CalendarSelectionMode, disableCalendarSelection, DisableCalendarSelection, CalendarSelectionModeType
} from './calendar.action';
import { loadFailedError } from '../errors/errors.action';
import { CalendarEvent, CalendarEventStatus, CalendarEventType } from './calendar-event.model';
import { closeEventDialog, CloseEventDialog } from './event-dialog/event-dialog.action';
import { AppState } from 'react-native';
import { DependenciesContainer } from '../app.reducer';
import { CalendarEvents } from './calendar-events.model';

export const loadUserEmployeeFinishedEpic$ = (action$: ActionsObservable<LoadUserEmployeeFinished>, state: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-USER-EMPLOYEE-FINISHED')
        .map(x => loadCalendarEvents(x.employee.employeeId))
        .catch((e: Error) => Observable.of(loadFailedError(e.message)));

export const loadCalendarEventsFinishedEpic$ = (action$: ActionsObservable<LoadCalendarEventsFinished>, state: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-CALENDAR-EVENTS-FINISHED')
        .map(x => closeEventDialog());

export const loadCalendarEventsEpic$ = (action$: ActionsObservable<LoadCalendarEvents>, state: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-CALENDAR-EVENTS')
        .switchMap(x => deps.apiClient
            .getJSON(`/employees/${x.employeeId}/events`)
            .map((obj: Object[]) => deserializeArray(obj, CalendarEvent))
            .map(calendarEvents => new CalendarEvents(calendarEvents))
        )
        .map(x => loadCalendarEventsFinished(x))
        .catch((e: Error) => Observable.of(loadFailedError(e.message)));

export const calendarEventCreatedEpic$ = (action$: ActionsObservable<CalendarEventCreated>) =>
    action$.ofType('CALENDAR-EVENT-CREATED')
        .map(x => closeEventDialog());

export const intervalsBySingleDaySelectionEpic$ = (action$: ActionsObservable<SelectCalendarDay | LoadCalendarEventsFinished | CalendarEventCreated>) =>
    action$.ofType(
            'SELECT-CALENDAR-DAY',
            'LOAD-CALENDAR-EVENTS-FINISHED',
            'CALENDAR-EVENT-CREATED'
        ).map(x => selectIntervalsBySingleDaySelection());

export const calendarSelectionModeEpic$ = (action$: ActionsObservable<CalendarSelectionMode>) =>
    action$.ofType('CALENDAR-SELECTION-MODE')
        .map(x => disableCalendarSelection(false));