import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PostDetailComponent } from './pages/post-detail/post-detail.component';
import { authGuard } from './guards/auth/auth.guard';
import { guestGuard } from './guards/guest/guest.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [guestGuard],
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [authGuard],
  },
  {
    path: 'post-details/:id',
    component: PostDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
