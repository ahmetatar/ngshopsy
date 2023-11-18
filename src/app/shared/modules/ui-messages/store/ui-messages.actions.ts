import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {UiMessage} from '../ui-messages.contracts';

export const UiMessageActions = createActionGroup({
  source: 'UI Messages',
  events: {
    'Push Message': props<{content: UiMessage}>(),
    'Remove Message': props<{id: string}>(),
    'Clear Messages': emptyProps(),
  },
});
