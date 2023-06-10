import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment'
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

//import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from '../app-routing.module';

import { AppComponent } from '../app.component';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    //AngularFireModule.initializeApp(environment.firebaseConfig),
    //NgbModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    //AppComponent,
    //AdminLayoutComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class SharedModule { }

