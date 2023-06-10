// Chat users
export class User {
    id?: number
    username?: string
    last_name?:string
    first_name?:string
    password!: string  
    password_confirm?: string 
    email!: string
    is_admin!: boolean
    condition_utilisation!:boolean
  
    private errorMessage: string;
  
    constructor(){
      this.errorMessage = "";
    }
    
    //get error message
    getErrorMessage(): string {
      return this.errorMessage;
    }//end getErrorMessage
    
      //check for save
    canSave(): boolean {
      
        if(this.last_name === undefined || this.last_name === null ){
            this.errorMessage = "Veuillez saisir un nom"; return false;
        }
        if(this.first_name === undefined || this.first_name === null ){
            this.errorMessage = "Veuillez saisir un prenom"; return false;
        }
            //mot de passe
        if(this.username === undefined || this.username === null ){
            this.errorMessage = "Veuillez saisir un nom d'utilisateur"; return false;
        }
        //email
        if(this.email === undefined || this.email === null ){
            this.errorMessage = "Veuillez saisir votre email"; return false;
        }
        //mot de passe
        if(this.password === undefined || this.password === null ){
            this.errorMessage = "Veuillez saisir un mot de passe"; return false;
        }
        //mot de passe
        if(this.password_confirm === undefined || this.password_confirm === null ){
            this.errorMessage = "Veuillez confirmer votre mot de passe"; return false;
        }

        //mot de passe
        if(this.password_confirm !=this.password ){
            this.errorMessage = "Les mots de passe ne coincident pas"; return false;
        }
        // if(this.condition_utilisation == null || this.condition_utilisation == undefined ){
        //     this.errorMessage = "Veuillez confirmez avoir lu les conditions d'utilisations"; return false;
        // }
    
        return true;
      }//end canSave
  
  
      //check for edit
      canEdit(): boolean {
      
        if(this.last_name === undefined || this.last_name === null ){
            this.errorMessage = "Veuillez saisir un nom"; return false;
        }
        if(this.first_name === undefined || this.first_name === null ){
            this.errorMessage = "Veuillez saisir un prenom"; return false;
        }
            //mot de passe
        if(this.username === undefined || this.username === null ){
            this.errorMessage = "Veuillez saisir un nom d'utilisateur"; return false;
        }
        //email
        if(this.email === undefined || this.email === null ){
            this.errorMessage = "Veuillez saisir votre email"; return false;
        }
            return true;
      }//end canEdit
   
  }
  
  