export interface Question {
  id: number;
  question: string;
  options: string[];
  multiChoice: boolean;
  userSelectedAnswer?: string | string[] | null;
}
export interface Experience {
  id: number;
  question: string;
  userSelectedAnswer?: boolean | null;
}

export interface Quizz {
  title: string;
  icon: string;
  questions: Question[];
  experiences: Experience[];
}
