import { StyleSheet } from 'react-native';

const screenPadding = 19;
export const baseColor = '#2FAFCC';

export const ListStyle = StyleSheet.create({
    footer: {
        height: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export const ScreenStyle = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    viewHeaderText: {
        fontSize: 12,
        paddingLeft: screenPadding,
        paddingRight: screenPadding
    },
    separator: {
        height: 5
    }
});

export const FeedStyle = StyleSheet.create({
    layout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 5,
        paddingLeft: screenPadding,
        paddingRight: screenPadding
    },
    imgContainer: {
        marginTop: 5,
        flex: 2,
        aspectRatio: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    touchableOpacityContainer: {
        marginTop: 0,
        flex: 2
    },
    to: {
        fontSize: 11,
        color: '#333333',
        fontWeight: '600'
    },
    info: {
        flex: 6,
        flexDirection: 'column',
        alignSelf: 'center',
        paddingLeft: 13
    },
    title: {
        textAlign: 'left',
        fontSize: 15,
        lineHeight: 18
    },
    text: {
        textAlign: 'left',
        paddingTop: 2,
        paddingBottom: 2,
        fontSize: 11
    },
    tags: {
        color: '#2FAFCC',
        fontSize: 11
    },
    date: {
        fontSize: 9,
        color: '#333333'
    }
});
