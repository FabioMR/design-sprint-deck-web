import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.authService.loggedIn) {
      const currentUser = await this.authService.currentUserAsPromise;

      if (route.data.permission && !currentUser.permissions[route.data.permission]) {
        this.router.navigate(['/404']);
        return false;
      } else {
        return true;
      }
    } else {
      const queryParams: any = {}
      if (state.url && state.url !== '/') {
        queryParams.redirecionar = state.url;
      }

      this.router.navigate(['/'], { queryParams });
      return false;
    }
  }

}
