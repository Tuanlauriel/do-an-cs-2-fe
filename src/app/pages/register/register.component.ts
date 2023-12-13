import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  private userService: UserService = inject(UserService);
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  formRegister!: FormGroup;
  errorMessage?: string;
  loading: boolean = false;

  ngOnInit(): void {

    this.formRegister = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  get firstName() { return this.formRegister.get('firstName') }

  get lastName() { return this.formRegister.get('lastName') }

  get email() { return this.formRegister.get('email') }

  get password() { return this.formRegister.get('password') }

  onSubmit(): void {
    if (this.formRegister.valid) {
      this.errorMessage = undefined;
      const user = this.formRegister.value as User;
      this.loading = true;

      this.userService.postUser(user).subscribe({
        next: (response) => {
          console.log(response);
          this.authService.login(user).subscribe({
            next: (response) => {
              this.localStorageService.setToken(response.data.token);
              this.localStorageService.setTokenRefresh(response.data.tokenRefresh);
              this.router.navigate(['/home']);
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (error) => {
          switch (error.status) {
            case 0:
              this.errorMessage = 'Server error.'
              break;
            case 409:
              this.errorMessage = 'User already exists.'
          }
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      this.errorMessage = 'Please check data.'
    }
  }

}
