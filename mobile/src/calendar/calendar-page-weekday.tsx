import React, { Component } from 'react';
import { View, StyleSheet, PixelRatio, TouchableOpacity } from 'react-native';
import { calendarStyles, intervalMargin } from './styles';
import { DayModel } from '../reducers/calendar/calendar.model';
import { OnSelectedDayCallback } from './calendar-page';
import { StyledText } from '../override/styled-text';
import { Moment } from 'moment';

export const WeekDay = (props: { hide: boolean, children: any[] }) =>
    props.hide
        ? null
        : <View style={calendarStyles.weekDay}>{props.children}</View>;

interface WeekDayCircleDefaultProps {
    customTextColor?: string;
}

interface WeekDayCircleProps extends WeekDayCircleDefaultProps {
    weekHeight: number;
    day: DayModel;
    selectedDay: DayModel;
}

export class WeekDayCircle extends Component<WeekDayCircleProps> {
    public static defaultProps: WeekDayCircleDefaultProps = {
        customTextColor: '#000'
    };

    public render() {
        const { day, weekHeight } = this.props;

        const height = PixelRatio.roundToNearestPixel(weekHeight - (weekHeight * 0));

        const circleStyles = StyleSheet.flatten([
            calendarStyles.weekDayCircle,
            {
                width: height,
                height: height,
                borderRadius: PixelRatio.roundToNearestPixel(height / 2),
                borderWidth: 2,
                borderColor: this.isSelectedDay(day) ? '#2FAFCC' : 'transparent',
                backgroundColor: this.isSelectedDay(day)
                    ? '#fff'
                    : 'transparent'
            }
        ]);

        const innerCircleSize = (circleStyles.width as number) - (circleStyles.width as number * intervalMargin);

        const innerCircleStyles = StyleSheet.flatten([
            calendarStyles.weekDayCircle,
            {
                width: innerCircleSize,
                height: innerCircleSize,
                borderRadius: circleStyles.borderRadius - (circleStyles.borderRadius * intervalMargin),
                backgroundColor: this.isSelectedDay(day)
                    ? '#2FAFCC'
                    : 'transparent'
            }
        ]);

        const circleTextStyles = StyleSheet.flatten([
            calendarStyles.weekDayNumber,
            {
                color: day.belongsToCurrentMonth
                    ? this.isSelectedDay(day)
                        ? '#fff'
                        : this.props.customTextColor
                    : '#dadada'
            }
        ]);

        return (
            <View style={calendarStyles.weekDayCircleContainer}>
                <View style={circleStyles}>
                    <View style={innerCircleStyles}>
                        <StyledText style={circleTextStyles}>{day.date.date()}</StyledText>
                    </View>
                </View>
            </View>
        );
    }

    private isSelectedDay(day: DayModel) {
        return this.props.selectedDay
            && this.props.selectedDay.date
            && this.props.selectedDay.date.isSame(day.date, 'day');
    }
}

interface WeekDayTouchableProps {
    day: DayModel;
    onSelectedDay: OnSelectedDayCallback;
}

export class WeekDayTouchable extends Component<WeekDayTouchableProps> {
    public shouldComponentUpdate() {
        return false;
    }

    public render() {
        return (
            <TouchableOpacity style={calendarStyles.weekDayTouchable} onPressIn={this.onSelectedDay} delayPressIn={0}>
            </TouchableOpacity>
        );
    }

    private onSelectedDay = () => {
        this.props.onSelectedDay(this.props.day);
    }
}