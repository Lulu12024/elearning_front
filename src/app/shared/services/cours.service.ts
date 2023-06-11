import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import  { environment} from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CourService {

  constructor(
      private http: HttpClient
      ) { }

    createCours(item:any){
      return this.http.post( environment.apiUrl + 'create/cours/' , item);
    }

    coursSuivi(item:any){
      return this.http.post( environment.apiUrl + 'cours-suivis/' ,  item);
    }

    coursProposition(){
      return this.http.get( environment.apiUrl + 'user/dashboard/');
    }

    suivreCours(item:any){
      return this.http.post ( environment.apiUrl + 'suivi-cours' , item)
    }

    updateProgression(item:any){
      return this.http.post( environment.apiUrl + 'update-cours-suivi', item);
    }

    searchCoursById(item:any){
      return this.http.post( environment.apiUrl + 'cours/search_by_id/' , item);
    }
    getAllCourse(){
      return this.http.get(environment.apiUrl + 'all-courses');
    }

    getUserProgress(item:any){
      return this.http.post(environment.apiUrl + 'cours-pourcentage' , item);
    }

    getCoursProgression(item:any){
      return this.http.post(environment.apiUrl + 'cours-progression' , item);
    }

    updateCoursProgression(item:any){
      return this.http.post(environment.apiUrl + 'update-cours-suivi-after-quiz' , item);
    }

    //supression de cours
    deleteCours(item:any){
      return this.http.post(environment.apiUrl + 'delete-course' , item);
    }

    //supression de chapitre
    deleteChapter(item:any){
      return this.http.post(environment.apiUrl + 'delete-chapitre' , item);
    }

    //supression de section
    deleteSection(item:any){
      return this.http.post(environment.apiUrl + 'delete-sections' , item);
    }

    //soumission d'un quiz
    getQuizAnswer(item:any){
      return this.http.post(environment.apiUrl + 'quiz' , item);
    }
}
