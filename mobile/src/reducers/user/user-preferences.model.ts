import { dataMember, required } from 'santee-dcts';

export enum DependentDepartmentsPendingActions {
    None = 'None',
    HeadsOnly = 'HeadsOnly',
    All = 'All',
}

export class UserPreferences {
    @dataMember()
    @required()
    public areEmailNotificationsEnabled: boolean;

    @dataMember()
    @required()
    public arePushNotificationsEnabled: boolean;

    @dataMember({
        customDeserializer: (value: string) => {

            switch (value) {
                case (DependentDepartmentsPendingActions.None):
                    return DependentDepartmentsPendingActions.None;
                case (DependentDepartmentsPendingActions.HeadsOnly):
                    return DependentDepartmentsPendingActions.HeadsOnly;
                case (DependentDepartmentsPendingActions.All):
                    return DependentDepartmentsPendingActions.All;
                default: {
                    console.log('Unexpected server value for dependent department pending actions');

                    return DependentDepartmentsPendingActions.None;
                }
            }
        }
    })
    @required()
    public departmentsPendingAction: DependentDepartmentsPendingActions;

    public constructor() {
        this.areEmailNotificationsEnabled = false;
        this.arePushNotificationsEnabled = false;
        this.departmentsPendingAction = DependentDepartmentsPendingActions.None;
    }

    public clone(): UserPreferences {
        const result = new UserPreferences();

        result.areEmailNotificationsEnabled = this.areEmailNotificationsEnabled;
        result.arePushNotificationsEnabled = this.arePushNotificationsEnabled;

        return result;
    }

    public equals(obj: UserPreferences): boolean {
        if (!obj) {
            return false;
        }

        if (obj === this) {
            return true;
        }

        return this.areEmailNotificationsEnabled === obj.areEmailNotificationsEnabled &&
            this.arePushNotificationsEnabled === obj.arePushNotificationsEnabled &&
            this.departmentsPendingAction === obj.departmentsPendingAction;
    }
}
