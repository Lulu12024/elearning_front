import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentModule } from './components/component.module';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './shared/services/localstorage.service';
import { LoaderComponent } from './components/loader/loader.component';
// import { ComponentRoutingModule } from './components/component.routing.module';
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    //RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ComponentModule,
    
    //ComponentRoutingModule
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    // AngularFireStorageModule,
    // AngularFireDatabaseModule,
  ],
  providers: [
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
