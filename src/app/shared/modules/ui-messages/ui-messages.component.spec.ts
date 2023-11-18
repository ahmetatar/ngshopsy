import {fireEvent, render, screen} from '@testing-library/angular';
import {UiMessagesComponent} from './ui-messages.component';
import {UiMessagesService} from './ui-messages.service';
import {UiMessagesServiceFixture} from './ui-messages.service.fixture';
import {UiMessageComponentContext} from './ui-messages.component.context';
import {TestBed} from '@angular/core/testing';
import {mockMessages} from './ui-messages.component.mocks';

describe('UiMessagesComponent', () => {
  const uiMessageServiceFixture = new UiMessagesServiceFixture();

  async function setupTest(inputs?: UiMessageComponentContext) {
    uiMessageServiceFixture.removeMessage = jest.fn();
    uiMessageServiceFixture.messages$.next(mockMessages);

    return await render(UiMessagesComponent, {
      providers: [{provide: UiMessagesService, useValue: uiMessageServiceFixture}],
      componentInputs: inputs,
    });
  }

  it('should render messages', async () => {
    await setupTest();

    expect(await screen.findByText('File download')).toBeInTheDocument();
    expect(await screen.findByText('Download completed successfully!')).toBeInTheDocument();
  });

  it('should be remove message when click dismiss button', async () => {
    await setupTest({options: {dismissible: true}});
    const uiMessageService = TestBed.inject(UiMessagesService);
    fireEvent.click(screen.getAllByRole('button')[0]);

    expect(uiMessageService.removeMessage).toHaveBeenCalledWith('1');
  });
});
