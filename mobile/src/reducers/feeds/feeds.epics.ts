import { ActionsObservable, ofType } from 'redux-observable';
import * as fAction from './feeds.action';
import * as oAction from '../organization/organization.action';
import { deserializeArray, deserialize } from 'santee-dcts/src/deserializer';
import { Observable } from 'rxjs/Observable';
import { loadFailedError } from '../errors/errors.action';
import { Feed } from './feed.model';
import { AppState, DependenciesContainer } from '../app.reducer';

export const loadFeedsEpic$ = (action$: ActionsObservable<fAction.LoadFeeds>, appState: AppState, deps: DependenciesContainer) =>
    action$.ofType('LOAD_FEEDS')
        .switchMap(x => deps.apiClient.getJSON(`/feeds/messages`))
        .map(x => deserializeArray(x as any, Feed))
        .map(x => fAction.loadFeedsFinished(x))
        .catch(e => Observable.of(loadFailedError(e.message)));

export const loadFeedsFinishedEpic$ = (action$: ActionsObservable<fAction.LoadFeedsFinished>) =>
    action$.ofType('LOAD_FEEDS_FINISHED')
        .flatMap(x => x.feeds.map(feed => oAction.loadEmployee(feed.employeeId)));