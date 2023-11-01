import {TestBed, inject, waitForAsync} from '@angular/core/testing';
import {UiMessagesService} from './ui-messages.service';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MessageType} from './ui-messages.contracts';
import {selectMessages} from './store';

describe('UiMessagesService', () => {
  const mockMessages = [{title: 'Error', text: 'An error occured', messageType: MessageType.Error}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {},
          selectors: [{selector: selectMessages, value: mockMessages}],
        }),
      ],
    });
  });

  it('should be dispatch with pushMessage action', inject(
    [MockStore, UiMessagesService],
    (store: MockStore, sut: UiMessagesService) => {
      store.dispatch = jest.fn();
      sut.pushMessage('Error', 'An error occured', MessageType.Error);

      expect(store.dispatch).toHaveBeenCalledWith({
        type: '[UI Messages] Push Message',
        content: expect.objectContaining({
          title: 'Error',
          text: 'An error occured',
          messageType: MessageType.Error,
        }),
      });
    },
  ));

  it('should be dispatch with removeMessage action', inject(
    [MockStore, UiMessagesService],
    (store: MockStore, sut: UiMessagesService) => {
      store.dispatch = jest.fn();
      sut.removeMessage('1');

      expect(store.dispatch).toHaveBeenCalledWith({
        type: '[UI Messages] Remove Message',
        id: '1',
      });
    },
  ));

  it('should be dispatch with removeMessage action', waitForAsync(
    inject([MockStore, UiMessagesService], (store: MockStore, sut: UiMessagesService) => {
      store.dispatch = jest.fn();
      sut.messages$.subscribe((messages) => {
        expect(messages).toEqual(mockMessages);
      });
    }),
  ));
});
