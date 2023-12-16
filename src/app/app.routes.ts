import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MyJobComponent } from './pages/my-job/my-job.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { RecruiterLayoutComponent } from './layouts/recruiter-layout/recruiter-layout.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RecruiterHomeComponent } from './pages/recruiter/recruiter-home/recruiter-home.component';
import { RecruiterRegisterComponent } from './pages/recruiter/recruiter-register/recruiter-register.component';
import { DashboardAdminComponent } from './pages/admin/dashboard-admin/dashboard-admin.component';
import { BannerListComponent } from './pages/admin/banner-list/banner-list.component';
import { AddBannerComponent } from './pages/admin/add-banner/add-banner.component';
import { JobListComponent } from './pages/job-list/job-list.component';
import { CompanyRecruiterComponent } from './pages/recruiter/company-recruiter/company-recruiter.component';
import { JobRecruiterComponent } from './pages/recruiter/job-recruiter/job-recruiter.component';
import { adminGuard } from './auth-guard/admin.guard';
import { recruiterGuard } from './auth-guard/recruiter.guard';
import { JobCreateComponent } from './pages/recruiter/job-create/job-create.component';
import { RecruiterListJobComponent } from './pages/recruiter/recruiter-list-job/recruiter-list-job.component';
import {AdminCreateJobFieldComponent} from "./pages/admin/admin-create-job-field/admin-create-job-field.component";
import {AdminJobFieldListComponent} from "./pages/admin/admin-job-field-list/admin-job-field-list.component";
import {JobDetailsComponent} from "./pages/job-details/job-details.component";
import {CompanyInfoComponent} from "./pages/company-info/company-info.component";

export const routes: Routes = [
    {
        path: '', component: UserLayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'jobs', component: JobListComponent },
            { path: 'jobs/:id', component: JobDetailsComponent },
            { path: 'companies', component: CompaniesComponent },
            { path: 'companies/:id', component: CompanyInfoComponent },
            { path: 'my-job', component: MyJobComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
    {
        path: 'recruiter', component: RecruiterLayoutComponent, children: [
            { path: 'home', component: RecruiterHomeComponent },
            { path: 'register', component: RecruiterRegisterComponent },
            { path: 'company', component: CompanyRecruiterComponent, canActivate: [recruiterGuard] },
            { path: 'job', component: JobRecruiterComponent, canActivate: [recruiterGuard], children: [
                { path: 'list', component: RecruiterListJobComponent },
                { path: 'create', component: JobCreateComponent },
            ] },
            { path: 'register', component: RecruiterRegisterComponent },
            { path: '', redirectTo: '/recruiter/home', pathMatch: 'full' }
        ]
    },
    {
        path: 'admin', component: AdminLayoutComponent, canActivate: [adminGuard], children: [
            { path: 'dashboard', component: DashboardAdminComponent },
            { path: 'banner-list', component: BannerListComponent },
            { path: 'add-banner', component: AddBannerComponent },
            { path: 'create-job-field', component: AdminCreateJobFieldComponent },
            { path: 'job-field-list', component: AdminJobFieldListComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', component: PageNotFoundComponent },
    { path: 'not-found', component: PageNotFoundComponent },
];
