export interface Button {
  title: string;
  type: 'submit' | 'button';
  cssClass: string;
  name: string;
}

export interface ButtonClickedEvent {
  source: Button;
}
