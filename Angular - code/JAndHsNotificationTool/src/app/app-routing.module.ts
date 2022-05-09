import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './Components/companies/companies.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { UserComponent } from './Components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/Notifications' },
  { path: 'Notifications', component: NotificationsComponent },
  { path: 'Companies', component: CompaniesComponent },
  { path: 'Profile', component: ProfileComponent },
  { path: 'Users', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
