import { Component } from 'react';
import { View } from 'react-native';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { loadUserPreferences, updateUserPreferences, UserActions } from '../reducers/user/user.action';
import { UserPreferences } from '../reducers/user/user-preferences.model';
import { AppState } from '../reducers/app.reducer';

interface UserPreferencesScreenProps {
    userId: string;
    preferences: UserPreferences;
}

const mapStateToProps = (state: AppState): UserPreferencesScreenProps => ({
    userId: state.userInfo.employeeId,
    preferences: state.userInfo.preferences,
});

interface UserPreferencesDispatchProps {
    loadUserPreferences: (userId: string) => void;
    updateUserPreferences: (userId: string, previousPreferences: UserPreferences, newPreferences: UserPreferences) => void;
}

const mapDispatchToProps = (dispatch: Dispatch<UserActions>): UserPreferencesDispatchProps => ({
    loadUserPreferences: (userId: string) => {
        dispatch(loadUserPreferences(userId));
    },
    updateUserPreferences: (userId: string, previousPreferences: UserPreferences, newPreferences: UserPreferences) => {
        dispatch(updateUserPreferences(userId, previousPreferences, newPreferences));
    }
});

class UserPreferencesScreenImpl extends Component<UserPreferencesScreenProps & UserPreferencesDispatchProps> {

    public render() {
        return <View/>;
    }
}

export const UserPreferencesScreen = connect(mapStateToProps, mapDispatchToProps)(UserPreferencesScreenImpl);
