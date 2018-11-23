import { dataMember, required } from 'santee-dcts';

export class UserPreferences {
    @dataMember()
    @required()
    public areEmailNotificationsEnabled: boolean;

    @dataMember()
    @required()
    public arePushNotificationsEnabled: boolean;

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
