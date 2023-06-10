 import { Injectable } from '@angular/core';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { environment} from '../../../environments/environment'
 @Injectable({
  providedIn: 'root'
 })
export class AuthService {

  constructor(
    private http: HttpClient
     ) { }

  login(item:any) {
    //return this.http.post(environment.apiUrl + 'login', item.email, item.password);
    return this.http.post(environment.apiUrl + 'login/', item);
  }

signIn(item:any) {
    return this.http.post( environment.apiUrl + 'register' , item);
}

userList(){
  return this.http.get (environment.apiUrl + 'users')
}

userEdit(item:any){
  return this.http.post(environment.apiUrl + 'edit-users/' , item)
}
  
//   logout() {
//     //return this.afAuth.signOut();
//   }

}
