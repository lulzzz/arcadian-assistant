import { Action } from 'redux';
import { Department } from './department.model';
import { Employee } from './employee.model';
import { User } from './user.model';

export interface LoadDepartments extends Action {
    type: 'LOAD-DEPARTMENTS';
}

export const loadDepartments = (): LoadDepartments => ({ type: 'LOAD-DEPARTMENTS' });

export interface LoadDepartmentsFinished extends Action {
    type: 'LOAD-DEPARTMENTS-FINISHED';
    departments: Department[];
}

export const loadDepartmentsFinished = (departments: Department[]): LoadDepartmentsFinished =>
    ({ type: 'LOAD-DEPARTMENTS-FINISHED', departments });

export interface LoadEmployee extends Action {
    type: 'LOAD_EMPLOYEE';
    employeeId: string;
}

export const loadEmployee = (employeeId: string): LoadEmployee => ({ type: 'LOAD_EMPLOYEE', employeeId });

export interface LoadEmployeeFinished extends Action {
    type: 'LOAD_EMPLOYEE_FINISHED';
    employee: Employee;
}

export const loadEmployeeFinished = (employee: Employee): LoadEmployeeFinished => ({ type: 'LOAD_EMPLOYEE_FINISHED', employee});

export interface LoadEmployeesForDepartment extends Action {
    type: 'LOAD_EMPLOYEES_FOR_DEPARTMENT';
    departmentId: string;
}

export const loadEmployeesForDepartment = (departmentId: string): LoadEmployeesForDepartment => ({ type: 'LOAD_EMPLOYEES_FOR_DEPARTMENT', departmentId });

export interface LoadUser {
    type: 'LOAD-USER';
}

export const loadUser = (): LoadUser => ({ type: 'LOAD-USER' });

export interface LoadUserFinished {
    type: 'LOAD-USER-FINISHED';
    user: User;
}

export const loadUserFinished = (user: User): LoadUserFinished => ({ type: 'LOAD-USER-FINISHED', user });

export interface LoadEmployeeForUser {
    type: 'LOAD-EMPLOYEE-FOR-USER';
    user: User;
}

export const loadEmployeeForUser = (user: User): LoadEmployeeForUser => ({ type: 'LOAD-EMPLOYEE-FOR-USER', user });

export interface LoadEmployeeForUserFinished {
    type: 'LOAD-EMPLOYEE-FOR-USER-FINISHED';
    user: Employee;
}

export const loadEmployeeForUserFinished = (user: Employee): LoadEmployeeForUserFinished => ({ type: 'LOAD-EMPLOYEE-FOR-USER-FINISHED', user });

export type OrganizationActions =
    LoadDepartments | LoadDepartmentsFinished |
    LoadEmployee | LoadEmployeesForDepartment | LoadEmployeeFinished |
    LoadUser | LoadUserFinished | LoadEmployeeForUser | LoadEmployeeForUserFinished;