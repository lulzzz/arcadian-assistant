import { StyleSheet } from 'react-native';

export const chevronColor = '#2FAFCC';

const circleDiameter = 150;
const chevronHeight = 50;
const placeholderHeight = circleDiameter * .5 - chevronHeight * .5; //used to add background for the avatar
const headerGap = 20; //adds additional gap over the avatar. used mainly for ios

const avatarContainerZIndex = 2;

export const chevronStyles = StyleSheet.create({
    container: {
        height: chevronHeight
    },
    chevron: {
        width: '100%',
        backgroundColor: 'transparent',
        height: 0,
        zIndex: avatarContainerZIndex,
        borderBottomWidth: chevronHeight,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: chevronColor,
        position: 'absolute',
        transform: [
            { rotate: '180deg' }
        ]
    }
});

export const profileScreenStyles = StyleSheet.create({
    profileContainer: {
        flex: 1,
        backgroundColor: chevronColor
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 20
    }
});

export const layoutStyles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        marginTop: placeholderHeight

    },
    avatarContainer: {
        borderRadius: circleDiameter / 2,
        height: circleDiameter,
        width: circleDiameter,
        zIndex: avatarContainerZIndex + 1,
        left: '50%',
        top: placeholderHeight * -1,
        position: 'absolute',
        transform: [{ translateX: circleDiameter * -.5 }],
        alignItems: 'center',
        justifyContent: 'center'
    },
    chevronPlaceholder: {
        height: placeholderHeight + headerGap,
        backgroundColor: chevronColor
    }
});

export const contentStyles = StyleSheet.create({
    name: {
        fontSize: 36,
        textAlign: 'center',
        color: '#000'
    },
    position: {
        fontSize: 13,
        textAlign: 'center',
        color: '#000'
    },
    department: {
        fontSize: 13,
        textAlign: 'center',
        color: '#2FAFCC',
        fontWeight: 'bold'
    },
    infoContainer: {
        flexDirection: 'row',
        padding: 5
    },
    contactsContainer: {
        paddingTop: 20,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const tileStyles = StyleSheet.create({
    container: {
        padding: 1,
        width: '25%'
    },
    tile: {
        backgroundColor: 'rgba(47, 175, 204, 0.2)',
        paddingBottom: 8,
        paddingTop: 10,
        flexDirection: 'column',
        height: 66
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#18515E',
    },
    text: {
        fontSize: 11,
        textAlign: 'center',
        color: '#18515E',
        paddingTop: 2
    }
});

export const contactStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    iconContainer: {
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        color: '#18515E',
    },
    textContainer: {
        paddingLeft: 20,
        flexDirection: 'column'
    },
    text: {
        fontSize: 14,
        lineHeight: 17,
        color: '#333'
    },
    title: {
        paddingBottom: 3,
        fontSize: 10,
        lineHeight: 12,
        color: 'rgba(0, 0, 0, 0.7)'
    }
});