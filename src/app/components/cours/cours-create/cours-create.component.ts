import { Component  } from '@angular/core';
import { CourService } from 'src/app/shared/services/cours.service';
import { Course } from 'src/app/shared/model/course.model';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { Router ,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cours-create',
  templateUrl: './cours-create.component.html',
  styleUrls: ['./cours-create.component.css']
})
export class CoursCreateComponent {

  constructor(private coursService: CourService,
    private utils:UtilsService,
  private router: Router) {}
  canShowChapitre = false;
  canShowSection=false;
  canshowListSection=false;
  title:string = 'Cours';
  canShowChapterSection: boolean[] = []; // Tableau pour gérer l'affichage des sections par chapitre
  sectionIndex: number = 0; // Index de la section actuelle
  sections: { title: string, description: string }[] = [];
  isLoading: boolean = false;
  //course = new Course()
  // course = {
  //   title: '',
  //   description: '',
  //   chapters: [
  //     {
  //       title: '',
  //       description: '',
  //       subSections: [
  //         {
  //           title: '',
  //           content: '',
  //         }
  //       ],
  //     },
  //   ],
  // };
  
  course = {
    title: '',
    description: '',
    chapters: [
      {
        title: '',
        description: '',
        subsections: [
          {
            title: '',
            content: '',
          },
        ],
        quiz: 
          {
            questions: [
              {
                statement: '',
                options: [
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                  { text: '', isCorrect: false },
                ],
              },
            ],
          },
      },
    ],
  };

  ngOnInit(){
    this.addChapter()
  }
  onSubmit() {
    this.isLoading = true
    console.log(this.course)
    this.coursService.createCours(this.course)
      .subscribe(
        (result) => {
          this.isLoading = false
          // Gérer la réponse de l'API en cas de succès
          console.log(result);
          console.log('Cours créé avec succès:');
          this.utils.notifySuccessMessage('Cours créé avec succès' , this.title)
          this.router.navigate(['/cours_list'])
          // Effectuer des actions supplémentaires, comme la redirection vers la page du cours créé
        },
        error => {
          this.isLoading = false
          // Gérer les erreurs de l'API
          this.utils.notifyErrorMessage(error.error.message , this.title)
          console.error('Erreur lors de la création du cours:', error);
          // Afficher un message d'erreur à l'utilisateur ou effectuer des actions supplémentaires
        }
      );
  }

  showChapterform(){
    this.canShowChapitre = true
  }
  // showSectionform(){
  //   this.canShowSection = true
  // }
  addChapter() {
    this.course.chapters.push({
      title: '',
      description: '',
      subsections: [],
      quiz: 
        {
          questions: [
            {
              statement: '',
              options: [
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false },
              ],
            },
          ],
        },
      
    });
  }

  showSectionForm(chapterIndex: number) {
    console.log('section')
    this.canShowChapterSection[chapterIndex] = true;
    this.sectionIndex = this.course.chapters[chapterIndex].subsections.length;
    this.course.chapters[chapterIndex].subsections.push({
      title: '',
      content: '',
    });
    this.canshowListSection = false
  }
  addQuestion(chapterIndex: number) {
    this.course.chapters[chapterIndex].quiz.questions.push({
      statement: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    });
  }

  deleteQuiz(chapterIndex: number, quizIndex: number) {
    this.course.chapters[chapterIndex].quiz;
  }

  // saveSection(chapterIndex: number) {
  //   this.canShowChapterSection[chapterIndex] = false;
  // }
  saveSection(chapterIndex: number) {
    const section = this.course.chapters[chapterIndex].subsections[this.sectionIndex];
    this.sections.push({ title: section.title, description: section.content });
    this.canShowChapterSection[chapterIndex] = false;
    this.canshowListSection = true
  }
  cancelSectionForm(chapterIndex: number) {
    this.canShowChapterSection[chapterIndex] = false;
    this.course.chapters[chapterIndex].subsections.pop();
  }

  deleteSection(chapterIndex: number, sectionIndex: number) {
    this.course.chapters[chapterIndex].subsections.splice(sectionIndex, 1);
  }

  // public toggleOption(option: any) {
  //   option.isCorrect = !option.isCorrect;
  // }
  // addChapter() {
  //   this.course.chapters.push({
  //     title: '',
  //     description: '',
  //     subSections: [{
  //       title: '',
  //       content: ''
  //     }],
  //     quiz: []
  //   });
  // }

  // addQuiz(chapterIndex: number) {
  //   this.course.chapters[chapterIndex].quiz.push({
  //     options: {},
  //     correctOption: ''
  //   });
  // }
}
