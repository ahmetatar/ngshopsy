/**
 * UI error message types
 */
export enum MessageType {
  Info = 'info',
  Error = 'danger',
  Warning = 'warning',
  Success = 'success',
}

/**
 * UI message state
 */
export interface UiMessage {
  id?: string;

  /**
   * Title of message
   */
  title: string;

  /**
   * Alert content for display message
   */
  text: string;

  /**
   * Message type (success, warning, error or info)
   */
  messageType: MessageType;
}
