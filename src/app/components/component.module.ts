import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment'
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { UtilsService } from '../shared/services/utils.service';
import { AppRoutingModule } from '../app-routing.module';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin/dashboard-admin.component';
import { AppComponent } from '../app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard/dashboard.routing.module';
import { CoursRoutingModule } from './cours/cours.routing.module';
import { UserRoutingModule } from './users/user-routing-module';
import { CoursCreateComponent } from './cours/cours-create/cours-create.component';
import { CoursDetailComponent } from './cours/cours-detail/cours-detail.component';
import { CoursListComponent } from './cours/cours-list/cours-list.component';
import { LoaderComponent } from './loader/loader.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { CourGestionComponent } from './cours/cour-gestion/cour-gestion.component';
import { ConfirmationDialogComponent } from './confirmation-dialog-component/confirmation-dialog-component.component';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    DashboardRoutingModule,
    CoursRoutingModule,
    UserRoutingModule
    //AngularFireModule.initializeApp(environment.firebaseConfig),

    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,
    //NgbModule,
  ],
  declarations: [
    //AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SidebarComponent,
    CourGestionComponent,
    DashboardAdminComponent,
    CoursCreateComponent,
    CoursDetailComponent,
    LoaderComponent,
    UserListComponent,
    UserEditComponent,
    CoursListComponent,
    ConfirmationDialogComponent

  ],
  providers: [
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class ComponentModule { }

