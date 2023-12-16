import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

export const recruiterGuard: CanActivateFn = (route, state) => {
  let userService: UserService = inject(UserService);
  let router: Router = inject(Router);
  if (userService.getUser()?.role === 'RECRUITER') {
    return true;
  }

  router.navigate(['/not-found']);
  return false;
};
