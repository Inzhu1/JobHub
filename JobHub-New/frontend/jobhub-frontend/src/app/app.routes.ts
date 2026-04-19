import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';
import { JobListComponent } from './job-list/job-list';
import { JobFormComponent } from './job-form/job-form';
import { ApplicationFormComponent } from './application-form/application-form';
import { EmployerApplicationsComponent } from './employer-applications/employer-applications';
import { SeekerApplicationsComponent } from './seeker-applications/seeker-applications';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'jobs', component: JobListComponent, canActivate: [AuthGuard] },
  { path: 'jobs/new', component: JobFormComponent, canActivate: [AuthGuard] },
  { path: 'jobs/edit/:id', component: JobFormComponent, canActivate: [AuthGuard] },
  { path: 'apply/:jobId', component: ApplicationFormComponent, canActivate: [AuthGuard] },
  { path: 'employer-applications', component: EmployerApplicationsComponent, canActivate: [AuthGuard] },
  { path: 'my-applications', component: SeekerApplicationsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
