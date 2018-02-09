import { StyleSheet } from 'react-native';

export const employeesListStyles  = StyleSheet.create({
    view: {
        paddingTop: 5,
        flex: 1,
        backgroundColor: '#FFF'
    }
});

export const employeesListItemStyles = StyleSheet.create({
    layout: {
        height: 80,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imgContainer: {
        width: 72,
        height: 72,
        marginLeft: 12
    },
    img: {
        width: 72,
        height: 72
    },
    info: {
        flex: 1,
        marginRight: 12,
        marginLeft: 12,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    baseText: {
        fontFamily: 'Helvetica-Light',
        fontSize: 9,
        paddingTop: 2
    },
    name: {
        fontFamily: 'Helvetica-Light',
        fontSize: 15,
        paddingBottom: 2
    }
});