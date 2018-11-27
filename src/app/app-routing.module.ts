import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { UsersComponent } from './components/users/users.component';
import { UserActivitiesComponent } from './components/user-activities/user-activities.component';
import { LoginComponent } from './components/login/login.component';
import { ActivityDetailsComponent } from './components/activity-details/activity-details.component';
import { AuthGuardService as AuthGuard } from './services/guard/auth-guard.service';
import { DadesentitatComponent } from './components/dadesentitat/dadesentitat.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activities',
        component: ActivitiesComponent,
        canActivate: [AuthGuard]
    },
    { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
    {
        path: 'userActivities',
        component: UserActivitiesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'activity/:id',
        component: ActivityDetailsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dadesentitat',
        component: DadesentitatComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
