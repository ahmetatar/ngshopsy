import {Meta, StoryObj, applicationConfig, argsToTemplate, moduleMetadata} from '@storybook/angular';
import {SvgDirective} from '@shared/directives';
import {ProductPresComponent} from './product-pres.component';
import {provideHttpClient} from '@angular/common/http';
import {provideSvgImage} from '@core/svg-utils';
import {PRODUCT_MOCKS} from './testing';

export default {
  title: 'Shared/Modules/Product',
  component: ProductPresComponent,
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
      imports: [SvgDirective],
    }),
  ],
  render: (args: ProductPresComponent) => ({
    props: {
      ...args,
    },
    template: `
      <ngs-product-pres ${argsToTemplate(args)}>
        <button class="btn btn-primary">Add</button>
      </ngs-product-pres>`,
  }),
} as Meta<ProductPresComponent>;

/** Default component story type */
type Story = StoryObj<ProductPresComponent>;

/** Default story */
export const Primary: Story = {
  args: {
    product: PRODUCT_MOCKS[0],
  },
};
