import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private localstorage: LocalStorageService){

  }
  userdata:any;

  ngOnInit(){
    this.userdata= this.localstorage.getUserConnected();
    // console.log(this.userdata)
    // console.log(this.userdata.username)
  }
}
