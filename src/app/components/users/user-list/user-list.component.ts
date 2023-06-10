import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(private router:Router , private auth:AuthService , private localstorage: LocalStorageService){

  }
  isLoading:boolean = false
  users:any;

  ngOnInit(){
    this.getUserList();
  }
  logout()
  {
    this.router.navigate(['login']);
  }

  getUserList(){
    this.auth.userList()
    .subscribe(
      (result:any) => {
      console.log(result)
      this.isLoading = false
      this.users= result
      console.log(this.users)
    },
    (error)  => {
      this.isLoading = false
    })
  }

  goToUserEdit(item:any){
    this.localstorage.saveUserToEdit(item)
    this.router.navigate(['user_edit'])
  }
}
