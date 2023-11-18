import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {LoginContComponent} from '@features/login';

@Component({
  selector: 'ngs-login-page',
  standalone: true,
  imports: [LoginContComponent],
  template: `<ngs-login-cont />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {}
