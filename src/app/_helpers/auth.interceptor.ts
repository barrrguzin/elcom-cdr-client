import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthService} from "../_services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (response) => {
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            //!error.ok && error.url == this.backendURL + '/login'
            if (error.status === 401) {
              this.authService.logout();
            }
          }
        }
      )
    )
  }
}
