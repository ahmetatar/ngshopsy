import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'ngs-campaigns-page',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampaignsComponent {}
