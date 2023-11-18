import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Button, ButtonClickedEvent} from './action-buttons.model';
import {ACTION_BUTTONS_OPTIONS, ActionButtonsOptions} from './action-buttons.options';

@Component({
  selector: 'ngs-action-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionButtonsComponent implements OnInit {
  private readonly defaultOptions = inject(ACTION_BUTTONS_OPTIONS);

  @Input()
  buttons: Button[] = [];

  @Input()
  options: Partial<ActionButtonsOptions> = {};

  @Output()
  buttonClicked: EventEmitter<ButtonClickedEvent> = new EventEmitter();

  ngOnInit() {
    this.options = {
      ...this.defaultOptions,
      ...this.options,
    };
  }
}
