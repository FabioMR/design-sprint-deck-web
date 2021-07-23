import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  _currentUser = new BehaviorSubject<any>(this.tokenPayload);

  logoutTimeout;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
  ) { }

  clear() {
    localStorage.clear();
  }

  get loggedIn() {
    return !!this.tokenPayload;
  }

  get currentUserAsObservable() {
    return this._currentUser.asObservable();
  }

  get currentUserAsPromise() {
    return this.currentUserAsObservable.pipe(take(1)).toPromise()
  }

  get token() {
    return localStorage.token;
  }

  set token(value) {
    if (localStorage.token !== value) {
      localStorage.token = value;
      this.setLogoutTimeout();
      this._currentUser.next(this.tokenPayload);
    }
  }

  private setLogoutTimeout() {
    if (this.logoutTimeout) {
      clearTimeout(this.logoutTimeout);
    }

    if (this.tokenPayload.exp) {
      const seconds = Math.round(moment.duration(moment.unix(this.tokenPayload.exp).diff(moment())).asSeconds());

      this.logoutTimeout = setTimeout(() => {
        this.clear();
        this.router.navigate(['/']);
      }, seconds * 1000);
    }
  }

  private get tokenPayload() {
    try {
      return this.jwtHelper.decodeToken(this.token);
    } catch (error) {
      return null;
    }
  }
}
