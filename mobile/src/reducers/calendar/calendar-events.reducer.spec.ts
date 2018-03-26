import { calendarEventsReducer, CalendarEventsState } from './calendar-events.reducer';
import { loadCalendarEventsFinished, calendarEventCreated, selectCalendarDay, calendarSelectionMode, CalendarSelectionModeType, disableCalendarSelection } from './calendar.action';
import { CalendarEvent, DatesInterval, CalendarEventStatus, CalendarEventType } from './calendar-event.model';
import moment from 'moment';
import { DayModel } from './calendar.model';
import { CalendarEvents } from './calendar-events.model';

describe('calendar events reducer', () => {
    describe('when load calendar events finished', () => {
        let state: CalendarEventsState;
        let calendarEvent: CalendarEvent;

        beforeEach(() => {
            calendarEvent = new CalendarEvent();

            calendarEvent.calendarEventId = '1';
            calendarEvent.dates = new DatesInterval();
            calendarEvent.dates.startDate = moment();
            calendarEvent.dates.endDate = moment(calendarEvent.dates.startDate);
            calendarEvent.status = CalendarEventStatus.Requested;
            calendarEvent.type = CalendarEventType.Sickleave;

            const action = loadCalendarEventsFinished(new CalendarEvents([calendarEvent]));
            state = calendarEventsReducer(undefined, action);
        });

        it('should have intervals', () => {
            expect(state.intervals).toBeDefined();

            let intervals = state.intervals.get(calendarEvent.dates.startDate);

            expect(intervals.length).toBe(1);
            expect(intervals[0].calendarEvent.type).toBe(calendarEvent.type);

            intervals = state.intervals.get(calendarEvent.dates.endDate);

            expect(intervals.length).toBe(1);
            expect(intervals[0].calendarEvent.type).toBe(calendarEvent.type);
        });

        it('should enable calendar actions group', () => {
            expect(state.disableCalendarActionsButtonGroup).toBeFalsy();
        });
    });

    describe('when calendar event created', () => {
        let state: CalendarEventsState;
        let calendarEvent: CalendarEvent;

        beforeEach(() => {
            calendarEvent = new CalendarEvent();

            calendarEvent.calendarEventId = '1';
            calendarEvent.dates = new DatesInterval();
            calendarEvent.dates.startDate = moment();
            calendarEvent.dates.endDate = moment(calendarEvent.dates.startDate);
            calendarEvent.status = CalendarEventStatus.Requested;
            calendarEvent.type = CalendarEventType.Sickleave;

            const action = calendarEventCreated(calendarEvent);
            state = calendarEventsReducer(undefined, action);
        });

        it('should append event to intervals', () => {
            expect(state.intervals).toBeDefined();

            let intervals = state.intervals.get(calendarEvent.dates.startDate);

            expect(intervals.length).toBe(1);
            expect(intervals[0].calendarEvent.type).toBe(calendarEvent.type);

            intervals = state.intervals.get(calendarEvent.dates.endDate);

            expect(intervals.length).toBe(1);
            expect(intervals[0].calendarEvent.type).toBe(calendarEvent.type);
        });
    });

    describe('when calendar day selected', () => {
        let state: CalendarEventsState;
        let day: DayModel;

        beforeEach(() => {
            day = {
                date: moment(),
                today: true,
                belongsToCurrentMonth: true
            };
            const action = selectCalendarDay(day);
            state = calendarEventsReducer(undefined, action);
        });

        it('should set single selection', () => {
            expect(state.selection.single.day).toBe(day);
        });
    });

    describe('when calendar selection mode is single day', () => {
        let state: CalendarEventsState;

        beforeEach(() => {
            const action = calendarSelectionMode(CalendarSelectionModeType.SingleDay);
            state = calendarEventsReducer(undefined, action);
        });

        it('should remove interval selection', () => {
            expect(state.selection.interval).toBeNull();
        });

        it('should enable calendar days before single selection day', () => {
            expect(state.disableCalendarDaysBefore).toBeNull();
        });
    });

    describe('when calendar selection mode is interval', () => {
        let state: CalendarEventsState;
        let color: string;

        beforeEach(() => {
            color = '#abc';
            const action = calendarSelectionMode(CalendarSelectionModeType.Interval, color);
            state = calendarEventsReducer(undefined, action);
        });

        it('should have start day which is single selection day', () => {
            expect(state.selection.interval.startDay).toBe(state.selection.single.day);
        });

        it('should have end day which is null', () => {
            expect(state.selection.interval.endDay).toBeNull();
        });

        it('should have color', () => {
            expect(state.selection.interval.color).toBe(color);
        });

        it('should disable days before start day', () => {
            expect(state.disableCalendarDaysBefore).toBe(state.selection.single.day);
        });

        describe('when calendar day selected', () => {
            let day: DayModel;

            beforeEach(() => {
                day = {
                    date: moment(),
                    today: true,
                    belongsToCurrentMonth: true
                };
                const action = selectCalendarDay(day);
                state = calendarEventsReducer(state, action);
            });

            it('should set single selection', () => {
                expect(state.selection.single.day).toBe(day);
            });

            it('should set end day of interval selection', () => {
                expect(state.selection.interval.endDay).toBe(day);
            });
        });
    });

    describe('when calendar selection is disabled', () => {
        let state: CalendarEventsState;
        let day: DayModel;

        beforeEach(() => {
            const action = disableCalendarSelection(true);
            state = calendarEventsReducer(undefined, action);
        });

        beforeEach(() => {
            const date = moment();
            const dateMonth = date.month();

            date.add(2, 'days');

            day = {
                date: moment(),
                today: false,
                belongsToCurrentMonth: dateMonth === date.month()
            };
        });

        it('should disable calendar selection', () => {
            expect(state.disableSelection).toBeTruthy();
        });

        describe('when calendar selection mode is single day', () => {
            beforeEach(() => {
                const action = calendarSelectionMode(CalendarSelectionModeType.SingleDay);
                state = calendarEventsReducer(state, action);
            });

            describe('when calendar day selected', () => {
                beforeEach(() => {
                    const action = selectCalendarDay(day);
                    state = calendarEventsReducer(state, action);
                });

                it('should not change single selection', () => {
                    expect(state.selection.single.day).not.toBe(day);
                });
            });
        });

        describe('when calendar selection mode is interval', () => {
            let color: string;

            beforeEach(() => {
                color = '#abc';
                const action = calendarSelectionMode(CalendarSelectionModeType.Interval, color);
                state = calendarEventsReducer(state, action);
            });

            describe('when calendar day selected', () => {
                beforeEach(() => {
                    const action = selectCalendarDay(day);
                    state = calendarEventsReducer(state, action);
                });

                it('should not change end day of interval selection', () => {
                    expect(state.selection.interval.endDay).not.toBe(day);
                });
            });
        });
    });
});