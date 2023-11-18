import {createFeatureSelector, createSelector} from '@ngrx/store';
import {selectAllMessages, uiMessageAdapter} from './ui-messages.reducer';
import {UiMessageState} from './ui-messages.state';

/**
 * Feature selector to select message store
 */
export const selectUiMessageState = createFeatureSelector<UiMessageState>('messages');

/**
 * Derived selector. It selects all message objects
 */
export const selectMessages = createSelector(selectUiMessageState, selectAllMessages);
