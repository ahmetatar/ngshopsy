import {ChangeDetectionStrategy, Component, Input, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardButton} from './campaign-type.contracts';
import {SvgDirective} from '@shared/directives';

@Component({
  selector: 'ngs-campaign-type',
  standalone: true,
  imports: [CommonModule, SvgDirective],
  styleUrls: ['./campaign-type.component.scss'],
  template: `<div [svg]="cardImage" class="card-img-top"></div>
    <div class="card-body">
      <h5 class="card-title" [innerText]="title"></h5>
      <p class="card-text" [innerText]="text"></p>
      <a class="btn btn-primary" [innerText]="cardButton.text"></a>
    </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignTypeComponent {
  @Input()
  title: string = '';

  @Input()
  text: string = '';

  @Input()
  cardImage: string = '';

  @Input()
  cardButton!: CardButton;
}
