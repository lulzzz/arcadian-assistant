import { CalendarEvent } from './calendar-event.model';
import { DayModel, CalendarSelection } from './calendar.model';
import { SickLeaveActions } from './sick-leave.action';
import { CalendarEvents } from './calendar-events.model';

export interface LoadCalendarEvents {
    type: 'LOAD-CALENDAR-EVENTS';
    employeeId: string;
}

export const loadCalendarEvents = (employeeId: string): LoadCalendarEvents => ({ type: 'LOAD-CALENDAR-EVENTS', employeeId });

export interface LoadCalendarEventsFinished {
    type: 'LOAD-CALENDAR-EVENTS-FINISHED';
    calendarEvents: CalendarEvents;
    employeeId: string;
}

export const loadCalendarEventsFinished = (calendarEvents: CalendarEvents, employeeId: string): LoadCalendarEventsFinished => ({ type: 'LOAD-CALENDAR-EVENTS-FINISHED', calendarEvents, employeeId });

export interface CalendarEventCreated {
    type: 'CALENDAR-EVENT-CREATED';
    calendarEvent: CalendarEvent;
}

export const calendarEventCreated = (calendarEvent: CalendarEvent): CalendarEventCreated => ({ type: 'CALENDAR-EVENT-CREATED', calendarEvent });

export interface CalendarEventApprove {
    type: 'CALENDAR-EVENT-APPROVE';
    employeeId: string;
    calendarEvent: CalendarEvent;
}

export const calendarEventApprove = (employeeId: string, calendarEvent: CalendarEvent): CalendarEventApprove => ({ type: 'CALENDAR-EVENT-APPROVE', calendarEvent, employeeId });

export interface CalendarEventReject {
    type: 'CALENDAR-EVENT-REJECT';
    employeeId: string;
    calendarEvent: CalendarEvent;
}

export const calendarEventReject = (employeeId: string, calendarEvent: CalendarEvent): CalendarEventReject => ({ type: 'CALENDAR-EVENT-REJECT', calendarEvent, employeeId });

export interface SelectCalendarDay {
    type: 'SELECT-CALENDAR-DAY';
    day: DayModel;
}

export const selectCalendarDay = (day: DayModel): SelectCalendarDay => ({ type: 'SELECT-CALENDAR-DAY', day });

export interface SelectCalendarMonth {
    type: 'SELECT-CALENDAR-MONTH';
    month: number;
    year: number;
}

export const selectCalendarMonth = (month: number, year: number): SelectCalendarMonth => ({ type: 'SELECT-CALENDAR-MONTH', month, year });

export enum CalendarSelectionModeType {
    SingleDay = 'SingleDay',
    Interval = 'Interval'
}

export interface CalendarSelectionMode {
    type: 'CALENDAR-SELECTION-MODE';
    selectionMode: CalendarSelectionModeType;
    color: string;
}

export const calendarSelectionMode = (selectionMode: CalendarSelectionModeType, color: string = null): CalendarSelectionMode => ({ type: 'CALENDAR-SELECTION-MODE', selectionMode, color });

export interface SelectIntervalsBySingleDaySelection {
    type: 'SELECT-INTERVALS-BY-SINGLE-DAY-SELECTION';
}

export const selectIntervalsBySingleDaySelection = (): SelectIntervalsBySingleDaySelection => ({ type: 'SELECT-INTERVALS-BY-SINGLE-DAY-SELECTION' });

export interface DisableCalendarSelection {
    type: 'DISABLE-CALENDAR-SELECTION';
    disable: boolean;
}

export const disableCalendarSelection = (disable: boolean): DisableCalendarSelection => 
    ({ type: 'DISABLE-CALENDAR-SELECTION', disable });

export interface DisableSelectIntervalsBySingleDaySelection {
    type: 'DISABLE-SELECT-INTERVALS-BY-SINGLE-DAY-SELECTION';
    disable: boolean;
}

export const disableSelectIntervalsBySingleDaySelection = (disable: boolean): DisableSelectIntervalsBySingleDaySelection => ({ type: 'DISABLE-SELECT-INTERVALS-BY-SINGLE-DAY-SELECTION', disable });

export type CalendarActions = LoadCalendarEventsFinished | CalendarEventCreated |
    SelectCalendarDay | SelectCalendarMonth |
    CalendarSelectionMode | SelectIntervalsBySingleDaySelection | DisableCalendarSelection | DisableSelectIntervalsBySingleDaySelection | CalendarEventApprove | CalendarEventReject;
