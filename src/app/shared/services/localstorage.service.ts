import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {



  constructor(private http: HttpClient) { }
//enregistre un profil
public saveUserConnected(obj: any): void {
    this.saveToSession("ELEARNING_USER_CONNECTED", obj);
  };

//retourne un profil
public getUserConnected(): any {
    return this.readFromSession("ELEARNING_USER_CONNECTED");
  };

//enregistrer les details d'un cours pour pouvoir l'afficher
public saveCoursDetail(obj: any): void {
  this.saveToSession("ELEARNING_COUS_DETAIL", obj);
};

//retounez les details du cours 
public getCoursDetail(): void {
  return this.readFromSession("ELEARNING_COUS_DETAIL");
};

//save user data to edit
public saveUserToEdit(obj:any):void {
  this.saveToSession("ELEARNING_USER_EDIT", obj);
}

//get user data to edit
public getUserToEdit():void {
  return this.readFromSession("ELEARNING_USER_EDIT");
}

// //save type intervention data to edit
// public saveTypeInterventionToEdit(obj:any): void{
//     this.saveToSession("GNSP_TYPE_INTERVENTION_TO_EDIT", obj);
// }

// //retourne type intervention to edit
// public getTypeInterventionToEdit(): any {
//     return this.readFromSession("GNSP_TYPE_INTERVENTION_TO_EDIT");
// };

// //save type moyen d'appel data to edit
// public saveMoyenAppelToEdit(obj:any): void{
//     this.saveToSession("GNSP_MOYEN_AAPPEL_TO_EDIT", obj);
// }

// //retourne moyen appel to edit
// public getMoyenAppelToEdit(): any {
//     return this.readFromSession("GNSP_MOYEN_AAPPEL_TO_EDIT");
// };

// //save  hopital data to edit
// public savehopitalToEdit(obj:any): void{
//     this.saveToSession("GNSP_HOPITAL_TO_EDIT", obj);
// }

// //retourne  hopital to edit
// public gethopitalToEdit(): any {
//     return this.readFromSession("GNSP_HOPITAL_TO_EDIT");
// };

// //save  groupement data to edit
// public savegroupementToEdit(obj:any): void{
//     this.saveToSession("GNSP_GROUPEMENT_TO_EDIT", obj);
// }

// //retourne  groupement to edit
// public getgroupementToEdit(): any {
//     return this.readFromSession("GNSP_GROUPEMENT_TO_EDIT");
// };
// //save  compagnie data to edit
// public savecompagnieToEdit(obj:any): void{
//     this.saveToSession("GNSP_COMPAGNIE_TO_EDIT", obj);
// }

// //retourne  compagnie to edit
// public getcompagnieToEdit(): any {
//     return this.readFromSession("GNSP_COMPAGNIE_TO_EDIT");
// };
// //save  caserne data to edit
// public savecaserneToEdit(obj:any): void{
//     this.saveToSession("GNSP_CASERNE_TO_EDIT", obj);
// }

// //retourne  caserne to edit
// public getcaserneToEdit(): any {
//     return this.readFromSession("GNSP_CASERNE_TO_EDIT");
// };
// //save vixtime statistique
// public saveVictimesStatistiques(obj:any): void{
//     this.saveToSession("GNSP_VICTIME_STAT_TO_EDIT", obj);
// }

// //retourne  victime statistique to edit
// public getVictimesStatistiques(): any {
//     return this.readFromSession("GNSP_VICTIME_STAT_TO_EDIT");
// };

// //save vehicule attribution to edit
// public saveVéhiculeAttribution(obj:any): void{
//     this.saveToSession("GNSP_VEHICULE_ATTRIBUTION_TO_EDIT", obj);
// }

// //retourne  vehicule attribution to edit
// public getVéhiculeAttribution(): any {
//     return this.readFromSession("GNSP_VEHICULE_ATTRIBUTION_TO_EDIT");
// };
// //save profil attribution  to edit
// public saveProfilAttribution(obj:any): void{
//     this.saveToSession("GNSP_PROFIL_ATTRIBUTION_TO_EDIT", obj);
// }

// //retourne  profil attribution to edit
// public getProfilAttribution(): any {
//     return this.readFromSession("GNSP_PROFIL_ATTRIBUTION_TO_EDIT");
// };
// //save victime opération to edit
// public saveVictimeOpération(obj:any): void{
//     this.saveToSession("GNSP_VICTIME_OPERATION_TO_EDIT", obj);
// }

// //retourne  victime intervention to edit
// public getVictimeIntervention(): any {
//     return this.readFromSession("GNSP_VICTIME_OPERATION_TO_EDIT");
// };
// //save intervention opération to edit
// public saveInterventionOpération(obj:any): void{
//     this.saveToSession("GNSP_INTERVENTION_OPERATION_TO_EDIT", obj);
// }

// //retourne  intervention opération to edit
// public getInterventionOpération(): any {
//     return this.readFromSession("GNSP_INTERVENTION_OPERATION_TO_EDIT");
// };

  private  convertTolatin1(str:any) {
    var latin1String= "";
    for (var i = 0 ; i < str.length; i++){
      if ( str.charCodeAt(i) <= 255){
        latin1String += str.charAt(i);
      }
    }
    return latin1String;
  }
  private saveToSession(key: string, value: any): void {
    var stringified = JSON.stringify(value);
    var latin1String = this.convertTolatin1(stringified)
    var jsonValue = btoa(latin1String);
    localStorage.setItem(key, jsonValue);
  };

  private readFromSession(key: any): any {
    var result = null;
    try {
      var json = localStorage.getItem(key);
      if (json !== null) {
        result = JSON.parse(atob(json));
      }
     
    } catch (e) {
      result = null;
    }
    return result;
    // var results = localStorage.getItem(key)
    // return results;
  };

}