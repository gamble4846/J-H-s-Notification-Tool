import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './Components/companies/companies.component';
import { LoginComponent } from './Components/login/login.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Login' },
  { path: 'Notifications', component: NotificationsComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Companies', component: CompaniesComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Users', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
