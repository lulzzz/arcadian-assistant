import { Reducer } from 'redux';
import { TicketAction, loadTicketTemplatesFinished } from './tickets.actions';
import { TicketTemplate } from './ticket-template.model';
import { ActionsObservable } from 'redux-observable';

const tempMessage = new TicketTemplate();
tempMessage.templateId = 'call-saul';
tempMessage.title = 'Better Call Saul';
tempMessage.description = 'You know what to do';
tempMessage.recipients = ['IT Helpdesk'];


const tempMessage2 = new TicketTemplate();
tempMessage.templateId = 'internet-is-dead';
tempMessage.title = 'Internet died';
tempMessage.description = 'again...';
tempMessage.recipients = ['IT Helpdesk'];

export const loadTicketTemplatesEpic$ = (action$: ActionsObservable<TicketAction>) =>
    action$.ofType('LOAD-TICKET-TEMPLATES')
        .first()
        //.mergeMap(x => Observable.fromPromise(fetch(''))
        .delay(2000)
        .map(x => [tempMessage, tempMessage2])
        .map(x => loadTicketTemplatesFinished(x));


export const ticketTemplatesReducer: Reducer<TicketTemplate[]> = (state = null, action: TicketAction) => {
    switch (action.type) {
        case 'LOAD-TICKET-TEMPLATES-FINISHED':
            return [...action.templates];

        default:
            return state;
    }
};