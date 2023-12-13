import { HttpInterceptorFn } from '@angular/common/http';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let localStorageService: LocalStorageService = inject(LocalStorageService);
  let authService: AuthService = inject(AuthService);

  const token = localStorageService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }
  return next(req);
};
