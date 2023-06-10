import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { User } from 'src/app/shared/model/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
   constructor( private router:Router, 
    private localstorage: LocalStorageService,
    private auth:AuthService, 
    private utils:UtilsService){

   }
  isLoading:boolean = false;
  item:User = new User() 
  data:any;
  title:string = 'Utilisateur';

  ngOnInit(){
    this.getUserData()
  }

  logout()
  {
    this.router.navigate(['login']);
  }
  getUserData(){
    this.data  = this.localstorage.getUserToEdit();

    this.item.first_name = this.data.first_name;
    this.item.last_name = this.data.last_name;
    this.item.username = this.data.username;
    this.item.email = this.data.email;
    this.item.is_admin = this.data.is_admin
    this.item.id = this.data.id

    console.log(this.item.is_admin)

  }
  submit(){
    console.log(this.item)
    if (this.item.canEdit() == false) {
      this.utils.notifyErrorMessage(this.item.getErrorMessage() , this.title)
      return;
    }
    this.isLoading = true
    //let email:string = this.item.email
    this.auth.userEdit(this.item)
    .subscribe(
      (result:any) => {
        this.isLoading = false
        this.utils.notifySuccessMessage('Utilisateur modifier avec succès' , this.title)
       this.router.navigate(['user-list'])
     },
     (error: any) => {
      this.isLoading = false
      console.log(error)
      this.utils.notifyErrorMessage(error.message , this.title)
     }
     )
  }
}
