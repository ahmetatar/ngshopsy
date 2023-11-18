import {RouterState} from '@ngrx/router-store';
import {Action} from '@ngrx/store';
import {AuthState} from '@core/auth';
import {ProductState} from '@shared/modules/product/store/product.state';
import {UiMessageState} from '@shared/modules/ui-messages';

export type MessageMetadata = {messageMetadata: {title: string; text: string; messageType: string}};
export type ActionWithMessageMetadata = Action & MessageMetadata;

/**
 * Checks whether action payload contains action-metadata
 *
 * @param action Store action
 * @returns true if the payload contains metadata, false otherwise
 */
export const hasUiMessageActionMetadata = (action: ActionWithMessageMetadata) => !!action.messageMetadata;

/**
 * Create UI message action metadata to prevent boiler codes
 *
 * @param title message titlke
 * @param text message detail body
 * @param messageType message type
 * @returns UI message metadata
 */
export const createUiMessageActionMetadata = (title: string, text: string, messageType: string): MessageMetadata => ({
  messageMetadata: {
    title,
    text,
    messageType,
  },
});

/**
 * Root app state
 */
export interface AppState {
  auth: AuthState;
  messages: UiMessageState;
  products: ProductState;
  router: RouterState;
}
