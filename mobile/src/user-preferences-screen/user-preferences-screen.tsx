import { Component } from 'react';
import { Picker, SafeAreaView, ScrollView, View } from 'react-native';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { loadUserPreferences, updateUserPreferences, UserActions } from '../reducers/user/user.action';
import { DependentDepartmentsPendingActions, UserPreferences } from '../reducers/user/user-preferences.model';
import { AppState } from '../reducers/app.reducer';
import { LoadingView } from '../navigation/loading';
import { preferencesStyles } from './preferences.styles';
import { SwitchSettingsView } from './switch-setting-view';
import { StyledText } from '../override/styled-text';

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

    public componentDidMount() {
        this.props.loadUserPreferences(this.props.userId);
    }

    public render() {
        const preferences = this.props.preferences;

        if (preferences !== null) {
            return <SafeAreaView style={preferencesStyles.container}>
                <ScrollView style={preferencesStyles.scrollView}>
                    <SwitchSettingsView title='Email notifications'
                                        onValueChange={this.onEnableEmailNotificationsChanged}
                                        value={this.props.preferences.areEmailNotificationsEnabled}/>
                    <SwitchSettingsView title='Push notifications' onValueChange={this.onEnablePushNotificationsChanged}
                                        value={this.props.preferences.arePushNotificationsEnabled}/>
                    <View style={preferencesStyles.pickerSettingContainer}>
                        <StyledText
                            style={preferencesStyles.pickerSettingTitle}>{'Dependent department pending requests'}
                        </StyledText>
                        <Picker
                            selectedValue={this.props.preferences.departmentsPendingAction}
                            style={preferencesStyles.pickerStyle}
                            onValueChange={this.onDepartmentPendingActionChanged}>
                            <Picker.Item label={'Show only current department employees'}
                                         value={DependentDepartmentsPendingActions.None}/>
                            <Picker.Item label={'Show current department plus heads of dependent departments'}
                                         value={DependentDepartmentsPendingActions.HeadsOnly}/>
                            <Picker.Item
                                label={'Show current departments plus all employees from dependent departments'}
                                value={DependentDepartmentsPendingActions.All}/>
                        </Picker>
                    </View>
                </ScrollView>
            </SafeAreaView>;
        }

        return <LoadingView/>;
    }

    private onEnableEmailNotificationsChanged = (value: boolean) => {
        const userId = this.props.userId;
        const oldPreferences = this.props.preferences;
        const newPreferences = oldPreferences.clone();
        newPreferences.areEmailNotificationsEnabled = value;

        this.props.updateUserPreferences(userId, oldPreferences, newPreferences);
    };

    private onEnablePushNotificationsChanged = (value: boolean) => {
        const userId = this.props.userId;
        const oldPreferences = this.props.preferences;
        const newPreferences = oldPreferences.clone();
        newPreferences.arePushNotificationsEnabled = value;

        this.props.updateUserPreferences(userId, oldPreferences, newPreferences);
    };

    private onDepartmentPendingActionChanged = (itemValue: any, itemPosition: number) => {
        const userId = this.props.userId;
        const oldPreferences = this.props.preferences;
        const newPreferences = oldPreferences.clone();

        switch (itemPosition) {
            case 0: {
                newPreferences.departmentsPendingAction = DependentDepartmentsPendingActions.None;
                break;
            }
            case 1: {
                newPreferences.departmentsPendingAction = DependentDepartmentsPendingActions.HeadsOnly;
                break;
            }
            case 2: {
                newPreferences.departmentsPendingAction = DependentDepartmentsPendingActions.All;
                break;
            }
            default: {
                newPreferences.departmentsPendingAction = DependentDepartmentsPendingActions.None;
                break;
            }
        }

        this.props.updateUserPreferences(userId, oldPreferences, newPreferences);
    };
}

export const UserPreferencesScreen = connect(mapStateToProps, mapDispatchToProps)(UserPreferencesScreenImpl);
