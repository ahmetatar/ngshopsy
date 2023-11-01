import {Injectable, inject} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {UiMessageActions, UiMessageState, selectMessages} from './store';
import {MessageType} from './ui-messages.contracts';

@Injectable({
  providedIn: 'root',
})
export class UiMessagesService {
  private readonly store = inject(Store<UiMessageState>);

  /**
   * Pushes ui message to store
   *
   * @param text alert text
   * @param messageType alert type
   */
  public pushMessage(title: string, text: string, messageType: MessageType) {
    this.store.dispatch(UiMessageActions.pushMessage({content: {title, text, messageType}}));
  }

  /**
   * Removes given message from store
   *
   * @param id message id
   */
  public removeMessage(id: string) {
    this.store.dispatch(UiMessageActions.removeMessage({id}));
  }

  /**
   * Gets pushed messages
   *
   * @returns all messages state
   */
  public get messages$() {
    return this.store.pipe(select(selectMessages));
  }

  /**
   * Clear UI messages
   */
  public clearMessages() {
    this.store.dispatch(UiMessageActions.clearMessages());
  }
}
