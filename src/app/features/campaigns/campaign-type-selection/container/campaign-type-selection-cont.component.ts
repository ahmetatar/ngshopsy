import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'ngs-campaign-type-selection-cont',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-type-selection-cont.component.html',
  styleUrls: ['./campaign-type-selection-cont.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignTypeSelectionContComponent {}
