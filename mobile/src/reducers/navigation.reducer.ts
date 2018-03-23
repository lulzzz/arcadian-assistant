import { RootNavigator } from '../tabbar/tab-navigator';
import { NavigationAction, NavigationState } from 'react-navigation';
import { PeopleScreenNavigator } from '../people/navigator/people-screen-navigator';

export const navigationReducer = (state: NavigationState, action: NavigationAction) => {
    const nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

export const navigationMiddlewareKeyReducer = (state: string = '') => {
    return state;
};