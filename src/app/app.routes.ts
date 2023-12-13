import { Routes } from '@angular/router';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { MyJobComponent } from './pages/my-job/my-job.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { JobsComponent } from './pages/jobs/jobs.component';
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

export const routes: Routes = [
    {
        path: '', component: UserLayoutComponent, children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'jobs', component: JobsComponent },
            { path: 'companies', component: CompaniesComponent },
            { path: 'my-job', component: MyJobComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
    },
    {
        path: 'recruiter', component: RecruiterLayoutComponent, children: [
            { path: 'home', component: RecruiterHomeComponent },
            { path: 'register', component: RecruiterRegisterComponent },
            { path: '', redirectTo: '/recruiter/home', pathMatch: 'full' }
        ]
    },
    {
        path: 'admin', component: AdminLayoutComponent, children: [
            { path: 'dashboard', component: DashboardAdminComponent },
            { path: 'banner-list', component: BannerListComponent },
            { path: 'add-banner', component: AddBannerComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    },
    { path: '**', component: PageNotFoundComponent}
];
