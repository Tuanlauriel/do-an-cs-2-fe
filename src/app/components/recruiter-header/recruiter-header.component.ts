import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-recruiter-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './recruiter-header.component.html',
  styleUrl: './recruiter-header.component.scss'
})
export class RecruiterHeaderComponent {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  private user?: User;
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get getUser() {
    if (this.isLoggedIn) {
      this.userService.loadUser();
      this.user = this.userService.getUser();
    }
    return this.user;
  }

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
