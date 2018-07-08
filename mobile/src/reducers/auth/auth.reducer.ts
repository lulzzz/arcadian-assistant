import { Reducer } from 'redux';
import { combineEpics } from 'redux-observable';
import { startLoginProcessEpic$, startLogoutProcessEpic$, listenerAuthStateEpic$ } from './auth.epics';
import { AuthActions } from './auth.action';
import { AuthenticationState } from '../../auth/authentication-state';

export const authEpics$ = combineEpics(
    startLoginProcessEpic$ as any,
    startLogoutProcessEpic$ as any,
    listenerAuthStateEpic$ as any
);

export interface AuthInfo {
    isAuthenticated: boolean;
}

export interface AuthState {
    authInfo: AuthInfo | null;
}

const initState: AuthState = {
    authInfo: null,
};

export const authReducer = (state: AuthState = initState, action: AuthActions): AuthState => {
    switch (action.type) {
        case 'USER-LOGGED-IN':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: true
                }
            };
        case 'USER-LOGGED-OUT':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: false
                }
            };
        default:
            return state;
   }
};
