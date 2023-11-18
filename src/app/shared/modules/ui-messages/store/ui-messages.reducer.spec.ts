import {MessageType, UiMessage} from '../ui-messages.contracts';
import {UiMessageActions} from './ui-messages.actions';
import {messageReducer, uiMessageInitialState} from './ui-messages.reducer';

describe('UI Message reducer tests', () => {
  it('should add message to entities when called push message', () => {
    const message: UiMessage = {
      title: 'Opps!',
      text: 'An error occured',
      messageType: MessageType.Error,
    };

    const state = messageReducer(uiMessageInitialState, UiMessageActions.pushMessage({content: message}));

    expect(state).toEqual({
      ids: state.ids,
      entities: {
        [state.ids[0]]: {
          id: state.ids[0],
          ...message,
        },
      },
    });
  });

  it('should clear message entities state when called clear messages', () => {
    const state = messageReducer(uiMessageInitialState, UiMessageActions.clearMessages());
    expect(state).toEqual({
      ids: [],
      entities: {},
    });
  });
});
