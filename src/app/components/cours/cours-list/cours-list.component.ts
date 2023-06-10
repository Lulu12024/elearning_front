import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { Router } from '@angular/router';
import { CourService } from 'src/app/shared/services/cours.service';
@Component({
  selector: 'app-cours-list',
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent {
  constructor(
    private localstorage:LocalStorageService,
    private router:Router , private cours:CourService
  ){

  }
  isLoading:boolean = false;
  courses:any;

  ngOnInit(){
    this.getAllCourse()
  }
  goToDetail(item:any){
    console.log('detail')
    console.log(item)
    let data = { 
      courId: item.id
    }
    this.localstorage.saveCoursDetail(data)
    this.router.navigate(['cours_detail'])
  }
  

  getAllCourse()
  {
    this.cours.getAllCourse()
    .subscribe(
      (result:any) => {
      console.log(result)
      this.isLoading = false
      this.courses= result
      console.log(this.courses)
    },
    (error)  => {
      this.isLoading = false
    })
  }
  logout()
  {
    this.router.navigate(['login']);
  }
}
