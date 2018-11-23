import { deserialize } from 'santee-dcts/src/deserializer';
import { ActionsObservable } from 'redux-observable';
import { User } from './user.model';
import {
    LoadUser,
    loadUserFinished,
    LoadUserFinished,
    loadUserEmployeeFinished,
    LoadUserEmployeeFinished,
    LoadUserEmployeePermissions,
    loadUserEmployeePermissionsFinished,
    LoadUserPreferences, loadUserPreferencesFinished, UpdateUserPreferences
} from './user.action';
import { Observable } from 'rxjs/Observable';
import { loadFailedError } from '../errors/errors.action';
import { AppState } from 'react-native';
import { DependenciesContainer } from '../app.reducer';
import { Employee } from '../organization/employee.model';
import { handleHttpErrors } from '../errors/errors.epics';
import { startLogoutProcess } from '../auth/auth.action';
import { UserEmployeePermissions } from './user-employee-permissions.model';
import { UserPreferences } from './user-preferences.model';

export const loadUserEpic$ = (action$: ActionsObservable<LoadUser>, appState: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-USER')
        .switchMap(x => deps.apiClient.getJSON(`/user`)
            .pipe(handleHttpErrors(false)))
        .map(x => deserialize(x, User))
        .map(x => loadUserFinished(x.employeeId))
        .catch(e => Observable.of(startLogoutProcess()));

export const loadUserFinishedEpic$ = (action$: ActionsObservable<LoadUserFinished>, appState: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-USER-FINISHED')
        .switchMap(x => deps.apiClient.getJSON(`/employees/${x.userEmployeeId}`)
            .pipe(handleHttpErrors(false)))
        .map(obj => deserialize(obj, Employee))
        .map(z => loadUserEmployeeFinished(z))
        .catch(e => Observable.of(startLogoutProcess()));

export const loadUserEmployeePermissionsEpic$ = (action$: ActionsObservable<LoadUserEmployeePermissions>, appState: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-USER-EMPLOYEE-PERMISSIONS')
        .switchMap(x => deps.apiClient.getJSON(`/user/permissions/${x.employeeId}`)
            .pipe(handleHttpErrors(false)))
        .map(obj => deserialize(obj, UserEmployeePermissions))
        .map(x => loadUserEmployeePermissionsFinished(x));

export const loadUserPreferencesEpic$ = (action$: ActionsObservable<LoadUserPreferences>, appState: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD-USER-PREFERENCES')
        .switchMap(x => deps.apiClient.getJSON(`/user-preferences/${x.userId}`)
            .pipe(handleHttpErrors(false)))
        .map(obj => deserialize(obj, UserPreferences))
        .map(x => loadUserPreferencesFinished(x));

export const updateUserPreferencesEpic$ = (action$: ActionsObservable<UpdateUserPreferences>, appState: AppState, deps: DependenciesContainer) =>
    action$.ofType('UPDATE-USER-PREFERENCES')
        .switchMap(x => {
            const requestBody = Object.assign({}, x.preferences);

            return deps.apiClient.put(`/user-preferences/${x.userId}`, requestBody)
                .pipe(handleHttpErrors(false)); //todo set previous state in case of error
        })
        .map(obj => deserialize(obj, UserPreferences))
        .map(x => loadUserPreferencesFinished(x));
