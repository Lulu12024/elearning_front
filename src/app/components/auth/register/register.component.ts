import { Component } from '@angular/core';
import { User } from 'src/app/shared/model/user.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { AuthService} from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  item: User = new User();
  title: string= "Inscription";
  isLoading:boolean = false ;
  constructor(private utils: UtilsService,
    private auth:AuthService
    ) { }

  ngOnInit() {
  }

  register(){
    console.log('login');
    console.log(this.item);

    if (this.item.canSave() == false) {
      this.utils.notifyErrorMessage(this.item.getErrorMessage() , this.title)
      return;
    }
    this.isLoading = true
    this.auth.signIn(this.item)
    .subscribe(
      (result:any) => {
        this.isLoading = false
        this.utils.notifySuccessMessage('Compte créé avec succès' , this.title)
       console.log(result)
     },
     (error: any) => {
      this.isLoading = false
      console.log(error)
      this.utils.notifyErrorMessage(error.message , this.title)
     }
     )
     
  }
}
