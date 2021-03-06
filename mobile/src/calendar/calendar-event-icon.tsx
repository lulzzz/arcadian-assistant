import React, { Component } from 'react';
import { CalendarEventType } from '../reducers/calendar/calendar-event.model';
import { ApplicationIcon } from '../override/application-icon';
import { ViewStyle } from 'react-native';

interface CalednarEventIconProps {
    type: string;
    style: ViewStyle;
}

export class CalendarEventIcon extends Component<CalednarEventIconProps> {
    private readonly eventTypeToGlyphIcon = {
        [CalendarEventType.Dayoff]: 'dayoff',
        [CalendarEventType.Vacation]: 'vacation',
        [CalendarEventType.Sickleave]: 'sick_leave',
        [CalendarEventType.Workout]: 'dayoff'
    };

    public render() {
        return <ApplicationIcon name={this.eventTypeToGlyphIcon[this.props.type]} style={this.props.style} />;
    }
}