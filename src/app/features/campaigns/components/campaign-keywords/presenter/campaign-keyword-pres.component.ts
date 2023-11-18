import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngs-campaign-keyword-pres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-keyword-pres.component.html',
  styleUrls: ['./campaign-keyword-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignKeywordPresComponent {}
