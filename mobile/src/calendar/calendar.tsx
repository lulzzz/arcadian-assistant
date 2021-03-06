import React, { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../reducers/app.reducer';
import { OnSelectedDayCallback } from './calendar-page';
import { CalendarPager } from './calendar-pager';
import { CalendarActions, selectCalendarDay, nextCalendarPage, prevCalendarPage } from '../reducers/calendar/calendar.action';
import { WeekModel, DayModel, CalendarSelection, ReadOnlyIntervalsModel, CalendarPageModel } from '../reducers/calendar/calendar.model';

interface CalendarProps {
    pages: CalendarPageModel[];
    intervals: ReadOnlyIntervalsModel;
    selection: CalendarSelection;
    disableCalendarDaysBefore: DayModel;
}

interface CalendarDispatchProps {
    selectCalendarDay: OnSelectedDayCallback;
    nextCalendarPage: () => void;
    prevCalendarPage: () => void;
}

export class CalendarImpl extends Component<CalendarProps & CalendarDispatchProps> {
    public render() {
        return <CalendarPager
                    onSelectedDay={this.onSelectedDay}
                    pages={this.props.pages}
                    intervals={this.props.intervals}
                    selection={this.props.selection}
                    onNextPage={this.onNextPage}
                    onPrevPage={this.onPrevPage}
                    disableBefore={this.props.disableCalendarDaysBefore} />;
    }

    private onSelectedDay: OnSelectedDayCallback = (day) => {
        this.props.selectCalendarDay(day);
    };

    private onNextPage = () => {
        this.props.nextCalendarPage();
    };

    private onPrevPage = () => {
        this.props.prevCalendarPage();
    };
}

const mapStateToProps = (state: AppState): CalendarProps => ({
    pages: state.calendar.calendarEvents.pages,
    intervals: state.calendar.calendarEvents.intervals,
    selection: state.calendar.calendarEvents.selection,
    disableCalendarDaysBefore: state.calendar.calendarEvents.disableCalendarDaysBefore
});

const mapDispatchToProps = (dispatch: Dispatch<CalendarActions>): CalendarDispatchProps => ({
    selectCalendarDay: (day: DayModel) => { dispatch(selectCalendarDay(day)); },
    nextCalendarPage: () => { dispatch(nextCalendarPage()); },
    prevCalendarPage: () => { dispatch(prevCalendarPage()); }
});

export const Calendar = connect(mapStateToProps, mapDispatchToProps)(CalendarImpl);
