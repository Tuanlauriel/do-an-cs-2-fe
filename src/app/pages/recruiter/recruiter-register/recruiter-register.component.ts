import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CloudinaryService } from '../../../services/cloudinary.service';
import { User } from '../../../interfaces/user';
import { Company } from '../../../interfaces/company';
import { RecruiterService } from '../../../services/recruiter.service';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-recruiter-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './recruiter-register.component.html',
  styleUrl: './recruiter-register.component.scss'
})
export class RecruiterRegisterComponent implements OnInit{
  private authService: AuthService = inject(AuthService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);
  private cloudinaryService: CloudinaryService = inject(CloudinaryService);
  private recruiterService: RecruiterService = inject(RecruiterService);

  logoSelected?: File;
  businessLicenseSelected?: File;
  recruiterForm!: FormGroup;
  companyForm!: FormGroup;

  loading: boolean = false;
  errorMessage?: string;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.recruiterForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required]]
    });

    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      website: ['', Validators.required],
      location: ['', Validators.required],
      logo: [null, Validators.required],
      businessLicense: [null, Validators.required]
    });
  }

  selectLogo(event: any): void {
    this.logoSelected = event.target.files[0];
  }

  selectBusinessLicense(event: any): void {
    this.businessLicenseSelected = event.target.files[0];
  }

  onSubmit(): void {
    if (this.recruiterForm.valid && this.companyForm.valid) {
      this.errorMessage = undefined;
      this.loading = true;
      let logoUrlObservable;
      let businessLicenseUrlObservable;
      if (this.logoSelected && this.businessLicenseSelected) {
        logoUrlObservable = this.cloudinaryService.uploadFile(this.logoSelected, 'logo');
        businessLicenseUrlObservable = this.cloudinaryService.uploadFile(this.businessLicenseSelected, 'cv');
        forkJoin([logoUrlObservable, businessLicenseUrlObservable]).subscribe({
          next: (responses) => {
            let logoUrl = responses[0].data;
            let businessLicenseUrl = responses[1].data;
  
            let user: User = this.recruiterForm.value as User;
            let company: Company = this.companyForm.value as Company;
  
            company.logo = logoUrl;
            company.businessLicense = businessLicenseUrl;
  
            console.log(company);
            console.log(user);
            this.recruiterService.postRecruiter(user, company).subscribe({
              next: (response) => {
                console.log(response);
                this.authService.login(user).subscribe({
                  next: (response) => {
                    this.localStorageService.setToken(response.data.token);
                    this.localStorageService.setTokenRefresh(response.data.tokenRefresh);
                    this.userService.loadUser();
                    this.router.navigate(['/recruiter/home']);
                  },
                  error: (err) => {
                    console.log(err);
                  }
                });
              },
              error: (err) => {
                console.log(err);
                this.loading = false;
                this.errorMessage = 'Server Error.';
              },
              complete: () => {
                this.loading = false;
              }
            })
          },
          error: (err) => {
            console.log(err);
            this.loading = false;
            this.errorMessage = 'Server Error.';
          }
        });
      }

    } else {
      this.errorMessage = 'Invalid Data, Please check the information again.'
    }
  }

}
