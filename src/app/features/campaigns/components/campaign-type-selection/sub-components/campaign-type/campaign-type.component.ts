import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {CampaignType, CardButton} from './campaign-type.model';
import {SvgDirective} from '@shared/directives';

@Component({
  selector: 'ngs-campaign-type',
  standalone: true,
  imports: [SvgDirective],
  styleUrls: ['./campaign-type.component.scss'],
  template: `<div [svg]="campaignType.image" class="card-img-top"></div>
    <div data-testid="card-body" class="card-body d-flex flex-column">
      <h5 class="card-title">{{ campaignType.title }}</h5>
      <p class="card-text">{{ campaignType.text }}</p>
      <a
        data-testid="card-button"
        class="btn btn-primary mt-auto"
        (click)="campaignTypeButtonClicked.emit(campaignType.button)"
        >{{ campaignType.button.text }}</a
      >
    </div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignTypeComponent {
  @Input()
  campaignType!: CampaignType;

  @Output()
  campaignTypeButtonClicked = new EventEmitter<CardButton>();
}
