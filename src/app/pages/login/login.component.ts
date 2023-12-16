import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  formLogin!: FormGroup;
  errorMessage?: string;
  loading: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this.localStorageService.remoteToken();
    this.localStorageService.remoteTokenRefresh();
  }

  get email() { return this.formLogin.get('email') }

  get password() { return this.formLogin.get('email') }

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.errorMessage = undefined;
      this.loading = true;
      const user: User = this.formLogin.value as User;
      this.authService.login(user).subscribe({
        next: (response) => {
          this.localStorageService.setToken(response.data.token);
          this.localStorageService.setTokenRefresh(response.data.tokenRefresh);
          this.userService.loadUser();
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = 'Invalid email or password';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.errorMessage = 'Invalid email or password';
    }
  }

}
