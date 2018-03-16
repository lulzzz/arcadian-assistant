import { StackNavigator, addNavigationHelpers, NavigationState } from 'react-navigation';
import React from 'react';
import { Text, View, Image, Platform, StatusBar, SafeAreaView } from 'react-native';
import { TopNavBar } from '../navigation/top-nav-bar';
import { PeopleScreenNavigator } from './navigator/people-screen-navigator';
import { Department } from '../reducers/organization/department.model';
import { connect, Dispatch } from 'react-redux';
import { AppState } from '../reducers/app.reducer';

interface PeopleScreenProps {
    departments: Department[];
    peopleNav: NavigationState;
    dispatch?: Dispatch<any>;
}

const mapStateToProps = (state: AppState): PeopleScreenProps => ({
    departments: state.organization.departments,
    peopleNav: state.peopleNav,
});

class PeopleScreenImpl extends React.Component<PeopleScreenProps> {
    
    public render() {
        
        const navigation = addNavigationHelpers({
            dispatch: this.props.dispatch as any,
            state: this.props.peopleNav
        });

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#2FAFCC' }}>
                <PeopleScreenNavigator navigation={navigation} />
            </SafeAreaView>
        );
    }
}

export const PeopleHomeScreen = connect(mapStateToProps)(PeopleScreenImpl);