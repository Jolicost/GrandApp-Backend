import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { UsersComponent } from './components/users/users.component';
import { UserActivitiesComponent } from './components/userActivities/user-activities/user-activities.component';
import { DialogComponent, DialogContentComponent } from './components/dialog/dialog/dialog.component';

// Reactive forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

// Angular google map
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    SideBarComponent,
    DashboardComponent,
    ActivitiesComponent,
    UsersComponent,
    DialogComponent,
    DialogContentComponent,
    UserActivitiesComponent
  ],
  entryComponents: [DialogContentComponent], // per fer servir el dialogcontentComponent
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDBNBmRlzQDTVzB07XLJbuusxIh84qXOOg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
