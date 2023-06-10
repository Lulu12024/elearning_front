import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourService } from 'src/app/shared/services/cours.service';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private router:Router,
    private cours: CourService,
    private localStorage:LocalStorageService,
    
  ){}
  percentage= 20;
  isLoading:boolean = true;
  userData: any;
  courSuivi:any;
  courses:any;
  ngOnInit(){
      
      this.userData= this.localStorage.getUserConnected()
      this.getDataCoursSuivi()
      this.getPropositionCours()
  }
  goToDetail(item:any){
    console.log('detail')
    console.log(item)
    let data = { 
      courId: item.id
    }
    this.localStorage.saveCoursDetail(data)
    this.router.navigate(['cours_detail'])
  }

  getDataCoursSuivi(){
    console.log(this.userData)
    let data = {
      utilisateurId : this.userData.reference
    }
    this.cours.coursSuivi(data)
    .subscribe(
      (result:any) => {
      console.log(result)
      this.isLoading = false
      this.courSuivi= result
    },
    (error)  => {
      this.isLoading = false
    })
  }


  getPropositionCours(){
    this.cours.coursProposition()
    .subscribe(
      (result:any) => {
      console.log(result)
      this.isLoading = false
      this.courses= result
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
