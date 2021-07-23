import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResponseInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.headers.has('X-Token')) {
          this.authService.token = event.headers.get('X-Token');
        }
      })
    );
  }
}
