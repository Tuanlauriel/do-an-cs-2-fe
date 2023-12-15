import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { LocalStorageService } from '../services/local-storage.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = async (route, state) => {
  let userService: UserService = inject(UserService);
  let router: Router = inject(Router);
  if (userService.getUser()?.role === 'ADMIN') {
    return true;
  }

  router.navigate(['/not-found']);
  return false;

};
