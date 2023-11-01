import {Meta, StoryObj, applicationConfig, moduleMetadata} from '@storybook/angular';
import {LoginPresComponent} from './login-pres.component';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SvgDirective} from '@shared/directives';
import {provideSvgImage} from '@core/svg-utils';
import {provideHttpClient} from '@angular/common/http';

export default {
  title: 'Features/Login',
  component: LoginPresComponent,
  decorators: [
    applicationConfig({
      providers: [
        provideHttpClient(),
        provideSvgImage({
          path: '/images.json',
        }),
      ],
    }),
    moduleMetadata({
      imports: [ReactiveFormsModule, SvgDirective],
    }),
  ],
} as Meta<LoginPresComponent>;

/** Default component story type */
type Story = StoryObj<LoginPresComponent>;

/** Default story */
export const Primary: Story = {
  render: (args: LoginPresComponent) => ({
    props: {
      ...args,
    },
  }),
};

/** Invalid form */
export const InvalidForm: Story = {
  render: (args: LoginPresComponent) => {
    const form = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      isRemember: new FormControl(false),
    });

    form.controls.email.setErrors({invalidUser: true});
    form.controls.password.setErrors({invalidPassword: true});
    form.controls.email.markAsTouched();
    form.controls.password.markAsTouched();

    return {
      props: {
        ...args,
        form,
      },
    };
  },
};
