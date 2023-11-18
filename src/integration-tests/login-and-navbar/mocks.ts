import {Component} from '@angular/core';
import {LoginContComponent} from '@features/login';
import {NavigationContComponent} from '@features/navigation';
import {UiMessagesComponent} from '@shared/modules/ui-messages';

/**
 * Mock container component for test
 */
@Component({
  selector: 'ngs-mock-layout',
  imports: [LoginContComponent, NavigationContComponent, UiMessagesComponent],
  standalone: true,
  template: `<ngs-ui-messages /><ngs-navigation-cont /><ngs-login-cont />`,
})
export class MockLoginAndLoginStatusContainer {}
