import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngs-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  /** Input for modal id */
  @Input()
  modalId: string = '';
}
