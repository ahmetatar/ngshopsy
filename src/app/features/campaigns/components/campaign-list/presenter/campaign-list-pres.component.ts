import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'ngs-campaign-list-pres',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './campaign-list-pres.component.html',
  styleUrls: ['./campaign-list-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignListPresComponent {}
