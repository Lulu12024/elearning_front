// interface Course {
//   title: string;
//   description: string;
//   chapters: Chapter[];
// }

// interface Chapter {
//   title: string;
//   description: string;
//   subSections: SubSection[];
//   quiz: Quiz[];
// }

// interface SubSection {
//   title: string;
//   content: string;
// }

// interface Quiz {
//   questions: Question[];
// }

// interface Question {
//   statement: string;
//   options: Option[];
// }

// interface Option {
//   text: string;
//   isCorrect: boolean;
// }
export class Course {
  title?: string;
  description?: string;
  chapters?: Chapter[];
}

export class Chapter {
  title?: string;
  description?: string;
  subSections?: SubSection[];
  quiz?: Quiz[];
}

export class SubSection {
  title?: string;
  content?: string;
}

export class Quiz {
  questions?: Question[];
}

export class Question {
  statement?: string;
  options?: Option[];
}

export class Option {
  text?: string;
  isCorrect?: boolean;
}
