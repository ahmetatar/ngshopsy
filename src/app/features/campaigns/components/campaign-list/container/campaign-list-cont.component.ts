import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CampaignListPresComponent} from '../presenter';

@Component({
  selector: 'ngs-campaign-list-cont',
  standalone: true,
  imports: [CommonModule, CampaignListPresComponent],
  template: `<ngs-campaign-list-pres />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignListContComponent {}
