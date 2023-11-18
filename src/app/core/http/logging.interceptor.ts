import {HttpHandlerFn, HttpRequest} from '@angular/common/http';

const LINE_COLOR = 'background: #FFEB3B; color: #000; font-size: 12px';

/**
 * Logging interceptor for every outcoming request.
 *
 * @param req current request
 * @param next handler
 * @returns http event
 */
export const loggingInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  console.groupCollapsed(`%c[LOG] ${new Date().toLocaleString()} - ${req.urlWithParams}`, LINE_COLOR);
  console.log(req.body);
  console.groupEnd();
  return next(req);
};
