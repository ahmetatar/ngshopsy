import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UiMessagesComponent} from './shared/modules/ui-messages';
import {SvgDirective} from './shared';

@Component({
  standalone: true,
  imports: [RouterModule, UiMessagesComponent, SvgDirective],
  selector: 'ngs-app',
  templateUrl: './app.component.html',
})
export class AppComponent {}
