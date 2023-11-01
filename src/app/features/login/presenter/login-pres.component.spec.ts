import {ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginPresComponent} from './login-pres.component';
import {ReactiveFormsModule} from '@angular/forms';
import {provideSvgImage} from '@core/svg-utils';
import {provideHttpClient} from '@angular/common/http';
import {MockSvgDirective} from '@shared/directives';

describe('LoginPresComponent', () => {
  let fixture: ComponentFixture<LoginPresComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginPresComponent, MockSvgDirective],
      providers: [provideHttpClient(), provideSvgImage({path: 'some/path'})],
    }).createComponent(LoginPresComponent);
  });

  it('should be invalid state form elements if form values is invalid', () => {
    fixture.componentInstance.form.setValue({
      email: 'test',
      password: '000',
      isRemember: false,
    });

    expect(fixture.componentInstance.form.valid).toBe(false);
  });
});
