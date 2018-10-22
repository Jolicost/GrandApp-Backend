import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { UsersComponent } from './components/users/users.component';
import { UserActivitiesComponent } from './components/userActivities/user-activities/user-activities.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userActivities', component: UserActivitiesComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
