import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ngs-campaign-list-cont',
  standalone: true,
  imports: [CommonModule],
  template: `<p>campaign-list-cont works!</p>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignListContComponent {}
