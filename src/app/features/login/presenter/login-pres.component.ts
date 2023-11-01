import {ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginInfo} from '../contracts/login.contracts';
import {SvgDirective} from '@shared/directives';

@Component({
  selector: 'ngs-login-pres',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SvgDirective],
  templateUrl: './login-pres.component.html',
  styleUrls: ['./login-pres.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPresComponent {
  /** Login submit event */
  @Output()
  loginSubmitted = new EventEmitter<LoginInfo>();

  /** Login form */
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')]],
    password: ['', [Validators.required, Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}')]],
    isRemember: false,
  });

  /** Gets all login informations */
  public get loginInfo() {
    return this.form.value as LoginInfo;
  }

  /** Username field */
  public get email() {
    return this.form.get('email');
  }

  /** Password field */
  public get password() {
    return this.form.get('password');
  }

  constructor(private fb: FormBuilder) {}
}
