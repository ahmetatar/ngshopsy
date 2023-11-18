import {MessageType} from './ui-messages.contracts';

export const mockMessages = [
  {
    id: '1',
    title: 'File download',
    text: 'Download completed successfully!',
    messageType: MessageType.Success,
  },
  {
    id: '2',
    title: 'Opps! An error occured.',
    text: 'An error occured while downloding file. Try again later.',
    messageType: MessageType.Error,
  },
];
