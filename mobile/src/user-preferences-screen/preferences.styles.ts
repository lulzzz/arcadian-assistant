import { StyleSheet, Platform, TextStyle } from 'react-native';

export const preferencesStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    settingsView: {
        alignItems: 'flex-start',
        paddingLeft: 10
    },
    scrollView: {},
    switchSettingContainer: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    pickerSettingContainer: {
        flex: 1,
        height: 200,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    pickerStyle: {
        marginTop: -60,
        width: 400,
        height: 50,
        marginLeft: 10,
    },
    switchControllerContainer: {
        marginRight: 20,
        alignSelf: 'center',
    },
    switchSettingTitle: {
        fontSize: 20,
        textAlign: 'left',
        color: '#000',
        marginLeft: 20,
        alignSelf: 'center',
    },
    pickerSettingTitle: {
        fontSize: 20,
        textAlign: 'left',
        color: '#000',
        marginLeft: 20,
        marginTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
});

