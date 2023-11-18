import {HttpBackend, HttpErrorResponse, HttpEvent, HttpRequest, HttpResponse} from '@angular/common/http';
import {Type} from '@angular/core';
import {Observable, of} from 'rxjs';

export type Rules = {
  condition: (req: HttpRequest<any>) => boolean;
  then: Observable<HttpResponse<unknown>> | Observable<unknown> | HttpErrorResponse | undefined;
}[];

/**
 * Syntactic sugar function for httpbackend instances creation
 *
 * @param types to be instantiated
 * @returns type instance
 */
export const withBackends = <T>(...types: Type<T>[]) => types.map((type) => new type());

/**
 * Creates a new observable instance that is complete with an error.
 * The error detail will be an HttpErroResponse.
 *
 * @param error error details object to be used in HttpErrorResponse construction
 * @param status http status code
 * @returns observable completed with error
 */
export const complationWithError = <T>(error: T, status?: number) =>
  new Observable((observer) => observer.error(new HttpErrorResponse({error, status})));

/**
 * Gets an Observable HttpErrorResponse instance.
 *
 * @param error error details object to be used in HttpErrorResponse construction
 * @param status http status code
 * @returns Observable<HttpErrorResponse>
 */
export const error = <T>(error: T, status?: number) => of(new HttpErrorResponse({error, status}));

/**
 * Gets an Observable HttpResponse instance.
 *
 * @param body response body
 * @returns Observable<HttpResponse>
 */
export const success = <T>(body: T) => of(new HttpResponse({body}));

/**
 * It creates an HttpBackend that will execute the given rules when the request is made and
 * return mock responses based on the result. Rules are executed in the order they are added. If the first rule condition is successful,
 * it is decided whether to proceed to the next request according to the "then" sections.
 *
 * @link https://angular.io/api/common/http/HttpBackend
 * @usage { condition: (req: HttpRequest<any>) => boolean, then: success({ success: 'Ok' }) }
 *        { condition: (req: HttpRequest<any>) => boolean, then: error({reason}) }
 *        { condition: (req: HttpRequest<any>) => boolean, then: complationWithError(new HttpResponse({body: {}})) }
 *
 * @param rules to be executed
 * @returns mock http backend
 */
export function mockHttpBackendFactory(rules: Rules) {
  class MockHttpBackend extends HttpBackend {
    override handle(req: HttpRequest<any>): Observable<HttpEvent<any>> | any {
      return rules.find((rule) => rule.condition(req))?.then;
    }
  }
  return MockHttpBackend;
}

/**
 * It calls the handle method of multiple httpbackends sequentially. If any response is returned,
 * the other httpbackends are skipped.
 *
 * @example componseHttpBackendFactory(new MockBackend1(), new MockBackend2())
 * @param backends httpbackend instances
 * @returns composed httpbackends
 */
export const composeMockHttpBackendFactory = (...backends: HttpBackend[]) => {
  class ComposedMockHttpBackend extends HttpBackend {
    override handle(req: HttpRequest<any>): Observable<HttpEvent<any>> | any {
      for (const backend of backends) {
        const response = backend.handle(req);
        if (response) {
          return response;
        }
      }
    }
  }
  return ComposedMockHttpBackend;
};

/**
 * Gets provider that contains mocked httpbackend
 * 
 * @param rules to be executed
 * @returns httpbackend provider
 */
export const provideTestingBackend = (rules: Rules) => {
  const mockHttpBackend = mockHttpBackendFactory(rules);
  return [mockHttpBackend, {provide: HttpBackend, useExisting: mockHttpBackend}];
};

/**
 * Creates a composed HttpBackend instance using multiple HttpBackend instances
 * 
 * @param backends httpbackend instances
 * @returns httpbackend providers
 */
export const provideComposedTestingBackend = (backends: HttpBackend[]) => {
  const composedHttpBackend = composeMockHttpBackendFactory(...backends);
  return [composedHttpBackend, {provide: HttpBackend, useExisting: composedHttpBackend}];
};
