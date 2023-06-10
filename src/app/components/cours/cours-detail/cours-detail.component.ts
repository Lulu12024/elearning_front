import { Component } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { CourService } from 'src/app/shared/services/cours.service';
import { UtilsService} from 'src/app/shared/services/utils.service'
@Component({
  selector: 'app-cours-detail',
  templateUrl: './cours-detail.component.html',
  styleUrls: ['./cours-detail.component.css']
})
export class CoursDetailComponent {

  //courses:any;
  isLoading: boolean = false;
  currentCourse: any;
  currentChapter: any;
  currentSection:any;
  currentSectionIndex: number = 0;
  currentChapterIndex: number = 0;
  isCourseStarted: boolean = false;
  quizMode: boolean = false;
  courses:any;
  successTitle:string = '';
  successDescription:string = '';
  endCour:boolean = false;
  cour:any
  selectedAnswer: boolean[] = [];
  userdata:any;
  currentQuiz: any; // Le quiz actuel
  currentQuestionIndex: number = 0; // Index de la question actuelle
  selectedAnswers: boolean[] = []; // Tableau pour stocker les réponses sélectionnées par l'utilisateur
  progression:number =0;
  userProgress: number = 0;
  pourcentage=0;
  userProgressCours:number= -1;
  successPercentage:number = 0;
  //userAnswers: boolean[] = [];
  //userAnswers: (boolean | undefined)[][] = [];
  //userAnswers: { [questionIndex: number]: number[] } = {};
  userAnswers: number[][] = [];
  constructor(private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private utils:UtilsService,
    private cours: CourService,private router: Router,
    
  ) {
    console.log(this.currentChapter)
    // this.currentChapter.currentQuiz.questions.forEach(() => {
    //   this.userAnswers.push([]);
    // });
  }

  ngOnInit() {
    this.cour = this.localStorage.getCoursDetail();
    this.userdata= this.localStorage.getUserConnected();
    this.getCours(this.cour);
    this.getUserProgress();
    this.getCoursPourcentage()
    console.log( this.userProgress);
    
    //this.progression = (sectionsValides * 10) + (quizValides * 20);
  }

  startCourse() {
    console.log(this.userProgressCours)
    if (this.userProgressCours == 0 ) {
      let data= {
        utilisateurId :  this.userdata.reference,
        coursId : this.cour.courId,
        progression : 0
      }
      this.isLoading = true;
      console.log(data)
      this.cours.suivreCours(data).subscribe(
        (result: any) => {
          console.log(result[0])
          this.isLoading = false;
          
          // this.isCourseStarted = true;
  
          // // this.currentChapter = this.currentCourse.chapters[0];
          // this.currentChapter  = this.currentCourse.chapters[this.currentChapterIndex];
          // this.currentSectionIndex = 0;
          // //this.currentSection = this.currentChapter.subsections[0];
          // this.quizMode = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
    }
    this.isCourseStarted = true;
  
    // this.currentChapter = this.currentCourse.chapters[0];
    this.currentChapter  = this.currentCourse.chapters[this.currentChapterIndex];
    this.currentSectionIndex = 0;
    //this.currentSection = this.currentChapter.subsections[0];
    this.quizMode = false;
    console.log(this.currentChapter)
    
  }

  nextSection() {
    
    //this.resetCurrentSection();
    // if (this.currentSectionIndex < this.currentChapter.subsections.length - 1) {
    //   this.currentSectionIndex++;
    //   this.currentSection = this.currentChapter.subsections[this.currentSectionIndex];
    // } else {
      // Toutes les sections du chapitre ont été parcourues, passer au mode de quiz
      //enregistrer le nouveau niveu de progression

    let item = {
      progression :this.userProgressCours+ this.pourcentage,
      users : this.userdata.reference,
      courId : this.cour.courId
    }
    this.isLoading = true ; 
    this.cours.updateProgression(item).subscribe(
      (result:any) =>{
        this.isLoading = false;
        this.getUserProgress();
      }
    )

      this.quizMode = true;
       // Toutes les sections du chapitre ont été parcourues, passer au quiz
      this.currentQuiz = this.currentChapter.quiz;
      this.currentQuestionIndex = 0;

      this.selectedAnswers = new Array(this.currentQuiz.questions.length).fill(false);
   // }

    
  }

  getCours(item: any) {
    console.log('yo')
    this.cours.searchCoursById(item)
      .subscribe(
        (result: any) => {
          console.log(result[0])
          this.isLoading = false;
          this.currentCourse = result[0];
          console.log(this.currentCourse);
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }
  // Vérifiez si une réponse est sélectionnée pour une question donnée
  isAnswerSelected(questionIndex: number, optionIndex: number): boolean {
    return this.userAnswers[questionIndex]?.includes(optionIndex);
  }

  // toggleAnswer(questionIndex: number, optionIndex: number) {
  //   if (!this.userAnswers[questionIndex]) {
  //     this.userAnswers[questionIndex] = [];
  //   }
  
  //   const index = this.userAnswers[questionIndex].indexOf(optionIndex);
  
  //   if (index === -1) {
  //     this.userAnswers[questionIndex].push(optionIndex);
  //   } else {
  //     this.userAnswers[questionIndex].splice(index, 1);
  //   }
  // }

  // Basculez la sélection d'une réponse pour une question donnée
toggleAnswer(questionIndex: number, optionIndex: number): void {
  const selectedOptions = this.userAnswers[questionIndex] || [];
  const optionPosition = selectedOptions.indexOf(optionIndex);

  if (optionPosition > -1) {
    selectedOptions.splice(optionPosition, 1); // Désélectionnez l'option
  } else {
    selectedOptions.push(optionIndex); // Sélectionnez l'option
  }

  this.userAnswers[questionIndex] = selectedOptions;
}
  // calculateProgress(): string {
  //   const totalChapters = this.currentCourse.chapters.length;
  //   const totalSection =this.currentCourse.chapters.reduce((total:number, chapter:any) => total + chapter.subsections.length, 0);
  //   //const totalSection = this.currentCourse.chapters.subsections.length;
  //   console.log(totalSection);
  //   const currentChapterProgress = (this.currentChapterIndex + 1) / totalChapters * 100;
  //   const currentQuizProgress = (this.currentChapterIndex - totalChapters + 1) / totalSection * 100;

  //   if (this.currentChapterIndex < totalChapters) {
  //     return `Chapitre ${this.currentChapterIndex + 1} de ${totalChapters} (${currentChapterProgress.toFixed(2)}%)`;
  //   } else if (this.currentChapterIndex < totalChapters + totalSection) {
  //     return `Quiz ${this.currentChapterIndex - totalChapters + 1} de ${totalSection} (${currentQuizProgress.toFixed(2)}%)`;
  //   } else {
  //     return 'Cours terminé';
  //   }
  // }
  calculateProgress(): string {
    const totalChapters = this.currentCourse.chapters.length;
    const totalSections = this.currentCourse.chapters.reduce((total: number, chapter: any) => total + chapter.subsections.length, 0);
    const currentChapterProgress = (this.currentChapterIndex + 1) / totalChapters * 100;
    const currentSectionProgress = (this.currentSectionIndex + 1) / totalSections * 100;
  
    if (!this.isCourseStarted) {
      // Le cours n'a pas encore commencé
      return 'Cours non commencé';
    } else if (!this.quizMode) {
      // Affichage de la progression du chapitre
      return `Chapitre ${this.currentChapterIndex + 1} de ${totalChapters} (${currentChapterProgress.toFixed(2)}%)`;
    } else {
      // Affichage de la progression du quiz
      return `Quiz ${this.currentChapterIndex - totalChapters + 1} de ${totalSections} (${currentSectionProgress.toFixed(2)}%)`;
    }
  }

  //recuperer le pourcentage d'avancement d'un utilisateur sur un cours 
  getUserProgress() {
    let data = {
      courId: this.cour.courId,
      utilisateurId : this.userdata.reference
    }
    this.cours.getUserProgress(data).subscribe(
      (progress: any )=> {
        console.log(progress)
        if(progress.length > 0){
          
          console.log(this.userProgressCours)
          this.userProgress = progress[0].progression;
          console.log(this.userProgress)
        }
        else{
          this.userProgressCours = progress.length ;
          console.log(this.userProgressCours)
        }
      },
      error => {
        // Gérer les erreurs
        console.error('Erreur lors de la récupération du niveau de progression de l\'utilisateur:', error);
      }
    );
  }
  getCoursPourcentage(){
    let data = {
      courId : this.cour.courId,
    }
    this.cours.getCoursProgression(data).subscribe(
      (result: any )=> {
        console.log(result[0].pourcentage_progression)
        this.pourcentage = result[0].pourcentage_progression;
      },
      error => {
        // Gérer les erreurs
        console.error('Erreur lors de la récupération du pourcentage', error);
      }
    );
  }
  logout()
  {
    this.router.navigate(['login']);
  }

  resetCurrentSection() {
    this.currentChapter.subsections = null;
    this.currentSectionIndex = 0;
  }


  // isSelectedAnswer(questionIndex: number, optionIndex: number): boolean {
  //   const selectedAnswer = this.selectedAnswers[questionIndex];
  //   return selectedAnswer && selectedAnswer.includes(optionIndex);
  // }
  
  
  submitQuiz(currentQuiz:any): void {
    // Traitez les réponses du quiz ici
    // Par exemple, affichez les réponses sélectionnées par l'utilisateur
    // for (let i = 0; i < this.currentQuiz.questions.length; i++) {
    //   const question = this.currentQuiz.questions[i];
    //   const selectedAnswer = this.selectedAnswers[i];
    //   if (selectedAnswer) {
    //     console.log('Question:', question.statement);
    //     //console.log('Réponse sélectionnée:', question.options.filter((option, index) => selectedAnswer[index]).map(option => option.text));
    //     // console.log('Réponse sélectionnée:', question.options.filter((option, index) => selectedAnswer[index]).map((option: any) => option.text));
    //     console.log('Réponses sélectionnées:', question.options.map((option: any, index: number) => {
    //       if (this.selectedAnswer[index]) {
    //         return option.text;
    //       }
    //     }).filter(Boolean));
    //   }
    // }
    // Vérification des réponses
    /******************************************************************************************************* */
    // let correctAnswers = 0;
    // for (let question of this.currentQuiz.questions) {
    //   for (let option of question.options) {
    //     console.log(option)
    //     console.log(this.userAnswers);
    //     //if (option.isCorrect && this.userAnswers.includes(option)) {
    //     if (option.is_correct == this.userAnswers[0]) {
    //       console.log('pui true')
    //       correctAnswers++;
    //       break;
    //     }
    //   }
    // }
    // console.log(correctAnswers);
    // // Calcul du pourcentage de réussite
    // const totalQuestions = this.currentQuiz.questions.length;
    // const successPercentage = (correctAnswers / totalQuestions) * 100;
    console.log(currentQuiz)
    let data = {
      answers : this.userAnswers,
      quiz : currentQuiz
    }
    console.log(data)
    this.cours.getQuizAnswer(data).subscribe(
      (result: any) =>{
        console.log(this.successPercentage)
        this.successPercentage = result.successPercentage
      }
    )
    /******************************************************************************************************* */
    // Affichage du pourcentage de réussite à l'utilisateur
    //alert(`Votre pourcentage de réussite : ${successPercentage}%`);
    
    if (this.successPercentage > 60) {
      // Passer au chapitre suivant
    this.nextSection();

    // Incrémente l'index du chapitre actuel
    this.currentChapterIndex++;

    // Réinitialise les sélections de réponses
    this.selectedAnswer = [];

    // Affiche le contenu du nouveau chapitre
    this.showChapterContent();

    this.utils.notifySuccessMessage(`Votre pourcentage de réussite : ${this.successPercentage}%` , 'Quiz')
    }
    else{

      this.utils.notifyErrorMessage(`Votre pourcentage de réussite : ${this.successPercentage}% . Veuillez recommzncez le quiz ` , 'Quiz')

    }

    
    
  }
  calculateScore(answers: any[]): number {
    const totalQuestions = this.currentCourse.chapters[this.currentChapterIndex].quiz.questions.length;
    console.log(totalQuestions);
    let correctAnswers = 0;
  
    for (let i = 0; i < totalQuestions; i++) {
      const selectedOptionIndex = answers[i]; // Index de l'option sélectionnée pour la question i
      const question = this.currentCourse.chapters[this.currentChapterIndex].quiz.questions[i];
      const selectedOption = question.options[selectedOptionIndex];
  
      if (selectedOption.is_correct) {
        correctAnswers++;
      }
    }
  
    const score = (correctAnswers / totalQuestions) * 100;
    return score;
  }
  
  
  showChapterContent() {
    // Vérifie si tous les chapitres ont été parcourus
    if (this.currentChapterIndex < this.currentCourse.chapters.length) {
      // Récupère le chapitre actuel
      this.currentChapter  = this.currentCourse.chapters[this.currentChapterIndex];
  
      // Affiche le titre et la description du chapitre
      // this.currentChapterTitle = currentChapter.title;
      // this.currentChapterDescription = currentChapter.description;
  
      // Affiche la première section du chapitre
      this.quizMode = false;

      this.currentSectionIndex = 0;
      //this.currentSection = this.currentChapter.subsections[this.currentSectionIndex];
    } else {
      // Tous les chapitres ont été parcourus, affiche un message de fin de cours
      this.successTitle= "Cours terminé";
      this.successDescription = "Félicitations ! Vous avez terminé le cours.";
  
      // Réinitialise la section actuelle
      this.quizMode = false;
      this.endCour= true
      this.currentSection = null;
    }
  }
}
