import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, NavigationEnd, Params, Router, RouterEvent } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs';

export const changePasswordGuardGuard = (activatedRoute: ActivatedRouteSnapshot) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const token = activatedRoute.params['token'];
  return authService.verifyChangePasswordToken(token).pipe(
    tap(() => {
    return true
    
  }), 
  catchError(() =>  of(router.createUrlTree(['homepage'])))
  )
};
