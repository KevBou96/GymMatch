import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';
import { inject } from '@angular/core';
import { catchError, filter, map, of, switchMap, take, tap } from 'rxjs';

export const authGuard = () => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const token = localStorage.getItem('auth-token');
  if (!token) {
    return router.createUrlTree(['homepage'])
  }
  return authService.verifyUserAuth(token).pipe(tap(() => {
    return true;
  }), catchError(() =>  of(router.createUrlTree(['homepage'])))
  )
};
