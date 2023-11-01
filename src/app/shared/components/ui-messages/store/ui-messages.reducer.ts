import {createEntityAdapter} from '@ngrx/entity';
import {UiMessage} from '../ui-messages.contracts';
import {createReducer, on} from '@ngrx/store';
import {UiMessageActions} from './ui-messages.actions';

export const messageFeatureKey = 'messages';

/**
 * Generates unique message id
 *
 * @param msg ui message
 * @returns message id
 */
const generateMessageId = (msg: UiMessage) => `${msg.messageType}_${Math.random().toString(36).substring(2, 7)}`;

/**
 * Gets message id
 *
 * @param msg ui message
 * @returns message id
 */
const selectMessageId = (msg: UiMessage) => msg.id || '';

/**
 * Makes it compatible to add the message object to the entities collection
 *
 * @param msg ui message
 * @returns message entity
 */
const prepareAsEntity = (msg: UiMessage) => ({
  id: generateMessageId(msg),
  ...msg,
});

/**
 * UI message entity adapter
 */
export const uiMessageAdapter = createEntityAdapter<UiMessage>({
  selectId: selectMessageId,
});

/**
 * UI messages store initial state
 */
export const uiMessageInitialState = uiMessageAdapter.getInitialState();

/**
 * UI messages reducer
 */
export const messageReducer = createReducer(
  uiMessageInitialState,
  on(UiMessageActions.pushMessage, (state, message) => {
    return uiMessageAdapter.addOne(prepareAsEntity(message.content), state);
  }),
  on(UiMessageActions.clearMessages, (state) => {
    return uiMessageAdapter.removeAll(state);
  }),
  on(UiMessageActions.removeMessage, (state, {id}) => {
    return uiMessageAdapter.removeOne(id, state);
  }),
);
