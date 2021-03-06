import React, { Component } from 'react';
import { View } from 'react-native';
import { daysCountersStyles } from './styles';
import { DaysCounter, EmptyDaysCounter } from './days-counter';
import { DaysCountersModel } from '../../reducers/calendar/days-counters.model';
import { AppState } from '../../reducers/app.reducer';
import { connect } from 'react-redux';
import { LoadingView } from '../../navigation/loading';

interface DaysCountersProps {
    daysCounters: DaysCountersModel;
}

class DaysCountersImpl extends Component<DaysCountersProps> {

    public render() {
        const { daysCounters: { allVacationDays, hoursCredit } } = this.props;

        if (!allVacationDays && !hoursCredit) {
            return (
                <View style={daysCountersStyles.container}>
                    <LoadingView/>
                </View>
            );
        }

        const vacationCounter = allVacationDays
            ? <DaysCounter  textValue={allVacationDays.toString()}
                            title={allVacationDays.title}
                            icon={{
                                name: 'vacation',
                                size: 30
                            }} />
            : <EmptyDaysCounter />;

        const daysoffCounter = hoursCredit
            ? <DaysCounter  textValue={hoursCredit.toString()}
                            title={hoursCredit.title}
                            icon={{
                                name: 'dayoff',
                                size: 30
                            }} />
            : <EmptyDaysCounter />;

        return (
            <View style={daysCountersStyles.container}>
                    { vacationCounter }
                    { daysoffCounter }
            </View>
        );
    }
}

const mapStateToProps = (state: AppState): DaysCountersProps => ({
    daysCounters: state.calendar.daysCounters
});

export const DaysCounters = connect(mapStateToProps)(DaysCountersImpl);
