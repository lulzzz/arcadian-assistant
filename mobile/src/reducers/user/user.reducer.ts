import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { UserInfoState, userInfoReducer } from './user-info.reducer';
import { loadUserEpic$, loadUserFinishedEpic$, loadUserEmployeePermissionsEpic$ } from './user.epics';

export const userEpics = combineEpics(
    loadUserEpic$ as any,
    loadUserFinishedEpic$ as any,
    loadUserEmployeePermissionsEpic$ as any
);