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
    switchControllerContainer: {
        marginRight: 20,
        alignSelf: 'center',
    },
    settingTitle: {
        fontSize: 20,
        textAlign: 'left',
        color: '#000',
        marginLeft: 20,
        alignSelf: 'center',
    },
});

