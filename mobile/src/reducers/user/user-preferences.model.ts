import { dataMember, required } from 'santee-dcts';

export class UserPreferences {
    @dataMember()
    @required()
    public areEmailNotificationsEnabled: boolean;

    @dataMember()
    @required()
    public arePushNotificationsEnabled: boolean;

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
            this.arePushNotificationsEnabled === obj.arePushNotificationsEnabled;
    }

    //todo department setting
}
