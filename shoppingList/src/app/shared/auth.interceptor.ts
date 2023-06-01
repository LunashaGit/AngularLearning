import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<
      | any
      | {
          messages: {
            user: {
              id: number;
              name: string;
              email: string;
              token: string;
            };
          };
        }
    >,
    next: HttpHandler
  ): Observable<
    HttpEvent<
      | any
      | {
          messages: {
            user: {
              id: number;
              name: string;
              email: string;
              token: string;
            };
          };
        }
    >
  > {
    const token = sessionStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
