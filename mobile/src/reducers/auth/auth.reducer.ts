import { Reducer } from 'redux';
import { combineEpics } from 'redux-observable';
import { startLoginProcessEpic$, startLogoutProcessEpic$, listenerAuthStateEpic$, jwtTokenEpic$ } from './auth.epics';
import { AuthActions } from './auth.action';

export const authEpics$ = combineEpics(
    startLoginProcessEpic$ as any,
    startLogoutProcessEpic$ as any,
    listenerAuthStateEpic$ as any,
    jwtTokenEpic$ as any
);

export interface AuthInfo {
    isAuthenticated: boolean;
    jwtToken: string | null;
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
                    ...state.authInfo,
                    isAuthenticated: true,
                }
            };
        case 'USER-LOGGED-OUT':
            return {
                ...state,
                authInfo: {
                    isAuthenticated: false,
                    jwtToken: null
                }
            };

        case 'JWT-TOKEN-SET':
            return {
                ...state,
                authInfo: {
                    ...state.authInfo,
                    jwtToken: action.jwtToken
                }
            };
        default:
            return state;
   }
};
