import { StyleSheet, Dimensions } from 'react-native';

export const chevronColor = '#2FAFCC';

const circleDiameter = Dimensions.get('window').width * 0.5;
const chevronHeight = 50;
const headerGap = 20; //adds additional gap over the avatar. used mainly for ios
const placeholderHeight =  circleDiameter * 0.5; //used to add background for the avatar
const paddingInfoContainer = 12;
const paddingTile = 1;


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
        marginTop: circleDiameter * 0.5 - headerGap

    },
    avatarContainer: {
        borderRadius: circleDiameter / 2,
        height: circleDiameter,
        width: circleDiameter,
        zIndex: avatarContainerZIndex + 1,
        left: '50%',
        top: -circleDiameter * 0.5 + chevronHeight * 0.5,
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
        color: '#000',
        top: 10
    },
    department: {
        fontSize: 13,
        textAlign: 'center',
        color: '#2FAFCC',
        fontWeight: 'bold',
        top: 15
    },
    infoContainer: {
        flexDirection: 'row',
        padding: paddingInfoContainer,
        top: 30
    },
    contactsContainer: {
        top: 40,
        padding: 5,
    }
});

export const tileStyles = StyleSheet.create({
    container: {
        padding: paddingTile,
        width: (Dimensions.get('window').width - 2 * paddingInfoContainer - 3 * paddingTile) / 4,
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
       paddingLeft: 45,
       height: 60,
       alignItems: 'center'
    },
    iconContainer: {
        width: 50,
        height: 40,
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