import {createEntityAdapter} from '@ngrx/entity';
import {UiMessage} from '../ui-messages.contracts';
import {createReducer, on} from '@ngrx/store';
import {UiMessageActions} from './ui-messages.actions';
import {prepareAsEntity} from '@core/store';

export const messageFeatureKey = 'messages';

/**
 * Gets message id
 *
 * @param msg ui message
 * @returns message id
 */
const selectMessageId = (msg: UiMessage) => msg.id || '';

/**
 * UI message entity adapter
 */
export const uiMessageAdapter = createEntityAdapter<UiMessage>({
  selectId: selectMessageId,
});

/** Default message selectors */
export const {
  selectAll: selectAllMessages,
  selectEntities: selectMessageEntities,
  selectIds: selectMessageIds,
  selectTotal: selectTotalMessage,
} = uiMessageAdapter.getSelectors();

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
    return uiMessageAdapter.addOne(prepareAsEntity(message.content.messageType, message.content), state);
  }),
  on(UiMessageActions.clearMessages, (state) => {
    return uiMessageAdapter.removeAll(state);
  }),
  on(UiMessageActions.removeMessage, (state, {id}) => {
    return uiMessageAdapter.removeOne(id, state);
  }),
);
