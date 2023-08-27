import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const access = authService.isUserLoggedIn();
  if (access) {
    const roles = authService.getAuthorities();
    if (roles[0] == 'authorization failed') {
      authService.showErrorMessageDialog();
      return false;
    } else {
      console.log(roles)
      return access;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};

