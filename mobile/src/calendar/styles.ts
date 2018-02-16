import { StyleSheet, ViewStyle } from 'react-native';

const daysCounterFontColor = '#fff';
const daysCounterTitleColor = '#18515E';
const daysCounterPrimaryColor = '#2FAFCC';

const triangleHeight = 50;
const circleDiameter = 100;

export const calendarScreenLayout = {
    calendar: {
        flex: 1
    },
    agenda: {
        flex: 1
    }
};

const weekDayElementsZIndex = 1;

export const calendarStyles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 8,
        marginRight: 8,
        flex: 1,
        alignSelf: 'stretch'
    },
    today: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    todayTitle: {
        fontSize: 14,
        lineHeight: 16,
        color: daysCounterTitleColor
    },
    weeksContainer: {
        flex: 1
    },
    weeksNames: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
    },
    weekName: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weeks: {
        flex: 7,
        flexDirection: 'column'
    },
    week: {
        flex: 1,
        flexDirection: 'row'
    },
    weekDayContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    weekDay: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    weekDayCircle: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    weekDayCircleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        zIndex: weekDayElementsZIndex + 1
    },
    weekDayText: {
        fontSize: 12,
        lineHeight: 14
    }
});

export const calendarIntervalColors = {
    vacation: '#2F80ED',
    sickLeave: '#F2C94C',
    dayoff: '#EB5757'
};

// serjKim: Depends on count of overlapped intervals?..
const intervalOpacity = 0.5;
export const intervalMargin = 0.2;

export const calendarIntervalStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        opacity: intervalOpacity,
        zIndex: weekDayElementsZIndex
    },
    halfInterval: {
        width: '50%'
    },
    interval: {
        flex: 1
    }
});

export const agendaStyles = StyleSheet.create({
    container: {
        flex: calendarScreenLayout.calendar.flex,
        alignSelf: 'stretch'
    }
});

export const daysCountersStyles = StyleSheet.create({
    container: {
        flex: 1
    },
    counters: {
        flex: 1,
        flexDirection: 'row'
    }
});

export const daysCounterSeparatorStyles = StyleSheet.create({
    container: {
        width: circleDiameter,
        backgroundColor: daysCounterPrimaryColor
    }
});

export const daysCounterStyles = StyleSheet.create({
    container: {
        backgroundColor: daysCounterPrimaryColor,
        flexDirection: 'column',
        width: '50%',
        flex: 1
    },
    content: {
        marginTop: triangleHeight,
        flexDirection: 'column',
        alignItems: 'center',
        flex: 20
    },
    contentValue: {
        fontSize: 25,
        color: daysCounterFontColor
    },
    contentTitle: {
        fontSize: 11,
        color: daysCounterFontColor
    }
});

const daysCounterShapeZIndex = 2;

export const selectedDayStyles = StyleSheet.create({
    container: {
        borderRadius: circleDiameter / 2,
        height: circleDiameter,
        width: circleDiameter,
        zIndex: daysCounterShapeZIndex + 1,
        left: '50%',
        backgroundColor: '#fff',
        position: 'absolute',
        transform: [{ translateX: -50 }],
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: daysCounterPrimaryColor,
    },
    circleCurrentDay: {
        fontSize: 40,
        color: daysCounterTitleColor,
        marginTop: -5
    },
    circleCurrentMonth: {
        fontSize: 15,
        color: daysCounterTitleColor,
        marginTop: -8
    }
});

export const triangleStyles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: 0,
        height: 0,
        zIndex: daysCounterShapeZIndex,
        borderBottomWidth: triangleHeight,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#fff',
        position: 'absolute',
        transform: [
            { rotate: '180deg' }
        ]
    }
});