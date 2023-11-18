import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngs-campaign-list-pres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-list-pres.component.html',
  styleUrls: ['./campaign-list-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignListPresComponent {}
