import { Component , ViewChild} from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { Router } from '@angular/router';
import { CourService } from 'src/app/shared/services/cours.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog-component/confirmation-dialog-component.component';
import { UtilsService } from 'src/app/shared/services/utils.service';
@Component({
  selector: 'app-cour-gestion',
  templateUrl: './cour-gestion.component.html',
  styleUrls: ['./cour-gestion.component.css']
})
export class CourGestionComponent {
  constructor(
    private localstorage:LocalStorageService,
    private utils:UtilsService,
    private router:Router , private cours:CourService
  ){

  }
  isLoading:boolean = false;
  courses:any;
  showCoursChapter = false;
  showConfirmation:boolean = false;
  confirmationMessage = 'Êtes-vous sûr de vouloir supprimer ce cours ?';
  title:string ="Cours"
  selectedCourseIndex: number = -1;
  selectedChapterIndex:number = -1;

  @ViewChild('confirmationDialog') confirmationDialog!: ConfirmationDialogComponent;
  

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
  
  showConfirmationDialog() {
    console.log('show')
    this.confirmationDialog.open();
  }
  // deleteCourse(confirmed: boolean , item:any) {
  //   if (confirmed) {
  //     console.log(this.showConfirmation);
  //     this.deleteCours(item);

  //     console.log('Le cours a été supprimé.');
  //   }

  //   this.showConfirmation = false;
  // }
  confirmDelete(item:any) {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ?");
    
    if (confirmation) {
      // Appeler la fonction de suppression ici
      this.deleteCours(item);
    }
  }

  deleteCourse(confirmed: boolean ) {
    if (confirmed) {
      console.log(this.showConfirmation);

      console.log('Le cours a été supprimé.');
    }

    this.showConfirmation = false;
  }
  deleteCours(item:any){
    this.isLoading= true;
    console.log(item)
    let data = {
      courseId : item.id
    }
    this.cours.deleteCours(data).subscribe(
      (result) =>{
        console.log(result)
        this.isLoading = false;
        this.utils.notifySuccessMessage("Le cours a été supprimé avec succès" , this.title)
        this.getAllCourse();
      } , 
      (error)=>{
        this.utils.notifyErrorMessage("Une erreur s'est produite", this.title)
      }
    );
  }

  showEditForm(index: number) {
  if (this.selectedCourseIndex === index) {
    this.selectedCourseIndex = -1; // Cacher les chapitres du cours sélectionné
  } else {
    this.selectedCourseIndex = index; // Afficher les chapitres du cours sélectionné
  }
  
}
  confirmDeleteChapter(item:any){
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer ce chapitre ?");
    
    if (confirmation) {
      // Appeler la fonction de suppression ici
      this.deleteChapter(item);
    }
  }
  deleteChapter(item:any){
    this.isLoading= true;
    console.log(item)
    let data = {
      chapitreId : item.id
    }
    this.cours.deleteChapter(data).subscribe(
      (result) =>{
        console.log(result);
        this.isLoading = false;
        this.utils.notifySuccessMessage("Le chapitre de ce cours a été supprimé avec succès" , this.title)
        this.getAllCourse();
      } , 
      (error)=>{
        this.utils.notifyErrorMessage("Une erreur s'est produite", this.title)
      }
    )
  }
  showChapterEditForm(index:number){
    if (this.selectedChapterIndex === index) {
      this.selectedChapterIndex = -1; // Cacher les chapitres du cours sélectionné
    } else {
      this.selectedChapterIndex = index; // Afficher les chapitres du cours sélectionné
    }
    
  }
  confirmDeleteSection(item:any){
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette section  ?");
    
    if (confirmation) {
      // Appeler la fonction de suppression ici
      this.deleteSection(item);
    }
  }
  deleteSection(item:any){
    this.isLoading = true;
    console.log(item);
    let data = {
      sectionId : item.id
    }
    this.cours.deleteSection(data).subscribe(
      (result) =>{
        console.log(result);
        this.isLoading = false;
        this.utils.notifySuccessMessage("La section de ce chapitre a été supprimé avec succès" , this.title)
        this.getAllCourse();
      } , 
      (error)=>{
        this.utils.notifyErrorMessage("Une erreur s'est produite", this.title)
      }
    );
  }
}
