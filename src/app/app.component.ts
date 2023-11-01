import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UiMessagesComponent} from './shared/components/ui-messages';
import {SvgDirective} from './shared';

@Component({
  standalone: true,
  imports: [RouterModule, UiMessagesComponent, SvgDirective],
  selector: 'app',
  templateUrl: './app.component.html',
})
export class AppComponent {}
