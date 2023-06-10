import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/model/user.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AuthService} from 'src/app/shared/services/auth.service'
import { LocalStorageService} from 'src/app/shared/services/localstorage.service'
import { LoaderComponent } from '../../loader/loader.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  item: User = new User();
  title: string= "Connexion";
  loginform = {
    'username': "",
    'password': ""
  }
  isLoading= false;

  constructor(private utils: UtilsService,
    private localStorage:LocalStorageService,
    public auth: AuthService,
    private router:Router) { }

  ngOnInit() {
  }

  login(){

    if (this.loginform.username=== undefined || this.loginform.username === null || this.loginform.username === "" ){
      let stringMessage = "Veuillez saisir un nom d'utilisateur";
      return this.utils.notifyErrorMessage(stringMessage, this.title)
    }
    if (this.loginform.password=== undefined || this.loginform.password === null || this.loginform.password === "" ){
      let stringMessage = "Veuillez saisir votre mot de passe ";
      return this.utils.notifyErrorMessage(stringMessage, this.title)
    }
    this.isLoading = true   //this.router.navigate(['dashboard'])
    let item = {
      username : this.loginform.username,
      password :  this.loginform.password
    }
    this.auth.login(item)
    .subscribe(
      (result:any) => {
        console.log(result.data)
      this.localStorage.saveUserConnected(result.data);
      this.router.navigate(['dashboard'])
      this.isLoading = false
    },
    (error)  => {
      this.isLoading = false
      this.utils.notifyErrorMessage(error.error.message , this.title)
    })
  }
}
