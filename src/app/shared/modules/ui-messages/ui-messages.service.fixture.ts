import {ReplaySubject} from 'rxjs';
import {UiMessagesService} from './ui-messages.service';
import {UiMessage} from './ui-messages.contracts';

export class UiMessagesServiceFixture implements Readonly<UiMessagesService> {
  public pushMessage: jest.Mock;
  public removeMessage: jest.Mock;
  public clearMessages: jest.Mock;
  public messages$: ReplaySubject<UiMessage[]>;

  constructor() {
    this.pushMessage = jest.fn();
    this.removeMessage = jest.fn();
    this.clearMessages = jest.fn();
    this.messages$ = new ReplaySubject();
  }
}
