import React from 'react';
import { Action } from 'redux';
import { connect, Dispatch } from 'react-redux';

import { EmployeesList } from './employees-list';
import { AppState } from '../reducers/app.reducer';
import { EmployeeMap } from '../reducers/organization/employees.reducer';
import { Employee } from '../reducers/organization/employee.model';

interface PeopleDepartmentProps {
    employeesMap: EmployeeMap;
    departmentId: string;
}

const mapStateToProps = (state: AppState): PeopleDepartmentProps => ({
    employeesMap: state.organization.employees.employeesById,
    departmentId: state.userInfo.employee.departmentId
});

export class PeopleDepartmentImpl extends React.Component<PeopleDepartmentProps> {  
    public render() {
        const departmentId = this.props.departmentId;
        const predicate = function(employee: Employee) {
            return employee.departmentId === departmentId;
        };

        return <EmployeesList employees={this.props.employeesMap.toArray().filter(predicate)} />;
    }
}

export const PeopleDepartment = connect(mapStateToProps)(PeopleDepartmentImpl);