import {HttpBackend} from '@angular/common/http';
import {Provider} from '@angular/core';
import {Rules, mockHttpBackendFactory, success} from '@core/http';
import {PRODUCT_MOCKS} from './product.mocks';

const RULES: Rules = [
  {
    condition: (req) => req.url.includes('https://ng-firebase-samples-default-rtdb.firebaseio.com/products.json'),
    then: success(PRODUCT_MOCKS),
  },
];

export const ProductMockHttpBackend = mockHttpBackendFactory(RULES);
export const provideProductTestingBackend = (): Provider[] => {
  return [ProductMockHttpBackend, {provide: HttpBackend, useExisting: ProductMockHttpBackend}];
};
