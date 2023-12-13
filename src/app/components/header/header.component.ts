import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private userService: UserService = inject(UserService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  private user?: User;
  
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get getUser() {
    if (this.isLoggedIn && !this.user) {
      if (this.authService.isLoggedIn()) {
        const email = this.localStorageService.getEmail();
        if (email) {
          this.userService.getUser(email).subscribe({
            next: (response) => {
              this.user = response.data;
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      }
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
