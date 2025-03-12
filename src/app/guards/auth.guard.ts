import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  if (authService.isAuth()){
    if (isTokenExpired()){
      authService.logOut();
      router.navigate(['/login']);    
    }
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const authService = inject(AuthService);
  const token = authService.token;
  const payload = authService.getPayload(token);
  const exp = payload.exp;
  const now = new Date().getTime()/1000;
  
  return exp < now ? true : false;
}
