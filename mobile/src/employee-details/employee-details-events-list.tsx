import React, { Component } from 'react';
import moment from 'moment';
import { Map } from 'immutable';
import { View, StyleSheet, FlatList, ListRenderItemInfo, Dimensions } from 'react-native';

import { StyledText } from '../override/styled-text';
import { ApplicationIcon } from '../override/application-icon';
import { Avatar } from '../people/avatar';
import { layoutStylesForEmployeeDetailsScreen } from './styles';
import { CalendarEvent, CalendarEventStatus, CalendarEventType } from '../reducers/calendar/calendar-event.model';
import { EventManagementToolset } from './event-management-toolset';
import { Employee } from '../reducers/organization/employee.model';

export const eventTypeToGlyphIcon: Map<string, string> = Map([
    [CalendarEventType.Dayoff, 'dayoff'],
    [CalendarEventType.Vacation, 'vacation'],
    [CalendarEventType.Sickleave, 'sick_leave'],
    [CalendarEventType.Workout, 'dayoff']
]);

interface EmployeeDetailsEventsListProps {
    events: CalendarEvent[];
    employee: Employee;
    eventSetNewStatusAction: (employeeId: string, calendarEvent: CalendarEvent, status: CalendarEventStatus) => void;
    hoursToIntervalTitle: (startWorkingHour: number, finishWorkingHour: number) => string;
    showUserAvatar?: Boolean;
    pendingRequestMode?: Boolean;
    eventManagementEnabled: Boolean;
}

export class EmployeeDetailsEventsList extends Component<EmployeeDetailsEventsListProps> {
    private readonly eventDigitsDateFormat = 'DD/MM/YYYY';

    public render() {
        return (<FlatList
                    data={this.props.events}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem} />
        );
    }

    private keyExtractor = (item: CalendarEvent) => item.calendarEventId;

    private renderItem = (itemInfo: ListRenderItemInfo<CalendarEvent>) => {
        const { item } = itemInfo;
        const { eventsContainer, eventRow, eventLeftIcons, eventTypeIconContainer, eventLeftIconsTiny, eventTypeIconContainerTiny, eventIcon, eventTextContainer, eventTitle, eventDetails, avatarContainer, avatarOuterFrame, avatarImage } = layoutStylesForEmployeeDetailsScreen;
        
        const leftIconsStyle = this.props.showUserAvatar ? eventLeftIcons : eventLeftIconsTiny;
        const typeIconContainerStyle = this.props.showUserAvatar ? eventTypeIconContainer : eventTypeIconContainerTiny;

        const eventsContainerFlattened = StyleSheet.flatten([
            eventsContainer, {width: Dimensions.get('window').width}
        ]);

        const secondRowEventDetails = this.props.pendingRequestMode ? 'requests ' + item.type.toLowerCase() : this.descriptionStatus(item);

        return (
                <View style={eventsContainerFlattened} key={item.calendarEventId}>
                    <View style={eventRow}>
                    <View style={leftIconsStyle}>
                        <View style={typeIconContainerStyle}>
                            <ApplicationIcon name={eventTypeToGlyphIcon.get(item.type)} style={eventIcon} />
                        </View>
                        {
                            this.props.showUserAvatar ? 
                            <View style={avatarContainer}>
                                <Avatar photo={this.props.employee.photo} style={avatarOuterFrame} imageStyle={avatarImage} />
                            </View> : null
                        }
                    </View>
                        <View style={eventTextContainer}>
                            <StyledText style={eventTitle}>{this.props.employee.name}</StyledText>
                            <StyledText style={eventDetails}>{secondRowEventDetails}</StyledText>
                            <StyledText style={eventDetails}>{this.descriptionFromTo(item)}</StyledText>
                        </View>
                        {
                            (this.props.pendingRequestMode || this.props.eventManagementEnabled) ? <EventManagementToolset 
                            event={this.props.events.find(e => e.calendarEventId === item.calendarEventId)} 
                            employeeId={this.props.employee.employeeId} 
                            eventSetNewStatusAction={this.props.eventSetNewStatusAction} /> : null
                        }
                    </View>
                </View>
        );
    }

    private descriptionFromTo(event: CalendarEvent): string {
        let description: string;

        if (event.isWorkout || event.isDayoff ) {
            description = `on ${event.dates.startDate.format(this.eventDigitsDateFormat)} (${this.props.hoursToIntervalTitle(event.dates.startWorkingHour, event.dates.finishWorkingHour)})`;
        } else {
            description = `from ${event.dates.startDate.format(this.eventDigitsDateFormat)} to ${event.dates.endDate.format(this.eventDigitsDateFormat)}`;
        }

        return description;
    }

    private descriptionStatus(event: CalendarEvent): string {
        let description: string;

        if (event.isRequested) {
            description = 'requests ' + event.type.toLowerCase();
        } else if (event.isApproved) {
            let prefix = event.dates.endDate.isAfter(moment(), 'date') ? 'has coming ' : 'on ';
            description = prefix + event.type.toLowerCase();
        }

        return description;
    }
}
