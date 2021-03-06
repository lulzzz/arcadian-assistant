import { required, dataMember, typedArray } from 'santee-dcts';
import { Set } from 'immutable';

export class UserEmployeePermissions {

    @dataMember()
    @required()
    public employeeId: string;

    @dataMember({
        customDeserializer: (names: string[]) => Set(names)
    })
    @required()
    public permissionsNames: Set<string>;

    public get canApproveCalendarEvents(): boolean {
        return this.permissionsNames.has('approveCalendarEvents');
    }

    public get canRejectCalendarEvents(): boolean {
        return this.permissionsNames.has('rejectCalendarEvents');
    }

    public equals(obj: UserEmployeePermissions): boolean {
        if (!obj) {
            return false;
        }

        if (obj === this) {
            return true;
        }

        return this.employeeId === obj.employeeId && this.permissionsNames.equals(obj.permissionsNames);
    }
}