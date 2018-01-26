import { Department } from './department.model';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { OrganizationState } from './organization.reducer';
import { departmentsReducer } from './departments.reducer';
import { employeesReducer, EmployeesStore } from './employees.reducer';
import {
    loadDepartmentsEpic$, loadChiefsEpic$, loadDepartmentsFinishedEpic$, loadEmployeesForDepartmentEpic$,
    loadUserEpic$ } from './organization.epics';
import { userReducer } from './user.reducer';
import { Employee } from './employee.model';
import { User } from './user.model';

export interface OrganizationState {
    departments: Department[];
    employees: EmployeesStore;
    user: User;
}

export const organizationEpics = combineEpics(
    loadDepartmentsEpic$ as any,
    loadChiefsEpic$ as any,
    loadDepartmentsFinishedEpic$ as any,
    loadEmployeesForDepartmentEpic$ as any,
    loadUserEpic$ as any);

export const organizationReducer = combineReducers<OrganizationState>({
    departments: departmentsReducer,
    employees: employeesReducer,
    user: userReducer
});