import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UiMessagesComponent} from './ui-messages.component';
import {UiMessagesService} from './ui-messages.service';
import {MessageType} from './ui-messages.contracts';
import {UiMessageComponentFixture} from './ui-message.component.fixture';
import {UiMessagesServiceFixture} from './ui-messages.service.fixture';

describe('UiMessagesComponent', () => {
  let component: UiMessagesComponent;
  let fixture: ComponentFixture<UiMessagesComponent>;
  let messagesComponentFixture: UiMessageComponentFixture;
  let uiMessageServiceFixture: UiMessagesServiceFixture;

  beforeEach(async () => {
    uiMessageServiceFixture = new UiMessagesServiceFixture();

    await TestBed.configureTestingModule({
      imports: [UiMessagesComponent],
      providers: [{provide: UiMessagesService, useValue: uiMessageServiceFixture}],
    }).compileComponents();

    uiMessageServiceFixture.messages$.next([
      {
        id: '1',
        title: 'File download',
        text: 'Download completed successfully!',
        messageType: MessageType.Success,
      },
    ]);

    uiMessageServiceFixture.messages$.next([
      {
        id: '2',
        title: 'An error occured',
        text: 'API request failed!',
        messageType: MessageType.Error,
      },
    ]);

    fixture = TestBed.createComponent(UiMessagesComponent);
    messagesComponentFixture = new UiMessageComponentFixture(fixture.debugElement);
    component = fixture.componentInstance;
  });

  afterAll(() => jest.clearAllMocks());
});
