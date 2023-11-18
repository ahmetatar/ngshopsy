import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavigationContComponent} from '@features/navigation';
import {UiMessagesComponent} from '@shared/modules/ui-messages';

@Component({
  selector: 'ngs-default-layout',
  standalone: true,
  imports: [NavigationContComponent, RouterOutlet, UiMessagesComponent],
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultLayoutComponent {}
