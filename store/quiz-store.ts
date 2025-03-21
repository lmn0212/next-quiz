import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Experience, Question, Quizz } from "@/lib/types";

interface State {
  quizzes: Quizz[];
  questions: Question[];
  experiences: Experience[];
  selectedQuizz: Quizz | null;
  currentQuestion: number;
  hasCompleteAll: boolean;
  selectQuizz: (quizz: Quizz) => void;
  fetchQuizzes: () => Promise<void>;
  selectAnswer: (questionId: number, selectedAnswer: string | string []) => void;
  saveAdditionalAnswer: (questionId: number, selectedAnswer: boolean) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  onCompleteQuestions: () => void;
  sendData: (email: string) => void;
  reset: () => void;
}

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://quiz.mindtech.health/"
    : "http://localhost:3000/";

    const API_SERVICE = "https://api.mindtech.top/"

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => {
      return {
        quizzes: [],
        questions: [],
        experiences: [],
        selectedQuizz: null,
        currentQuestion: 0,
        hasCompleteAll: false,
        selectQuizz: (quizz: Quizz) => {
          set({ selectedQuizz: quizz, questions: quizz.questions, experiences:quizz.experiences });
        },
        fetchQuizzes: async () => {
          try {
            const res = await fetch(`${API_URL}data.json`);
            const json = await res.json();
            const quizzes = json.quizzes as Quizz[];
            set({ quizzes, hasCompleteAll: false }, false);
          } catch (error) {
            console.log(error);
          }
        },

        selectAnswer: (questionId: number, selectedAnswer: string | string[]) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          // change this information in the question copy
          newQuestions[questionIndex] = {
            ...questionInfo,
            userSelectedAnswer: selectedAnswer,
          };
          // update the status
          set({ questions: newQuestions }, false);
        },
        onCompleteQuestions: () => {
          set({ hasCompleteAll: true, currentQuestion: 0 });
        },
        goNextQuestion: () => {
          const { currentQuestion, questions } = get();
          const nextQuestion = currentQuestion + 1;
          if (nextQuestion < questions.length) {
            set({ currentQuestion: nextQuestion }, false);
          }
        },

        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion }, false);
          }
        },

        saveAdditionalAnswer: (questionId: number, selectedAnswer: boolean) => {
          const { experiences } = get();
          const newExperiences = structuredClone(experiences);
          const questionIndex = newExperiences.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newExperiences[questionIndex];
          // change this information in the question copy
          newExperiences[questionIndex] = {
            ...questionInfo,
            userSelectedAnswer: selectedAnswer,
          };
          set({ experiences: newExperiences }, false);
        },
        sendData: async (email: string) => {
          const { experiences, questions } = get();
          const filteredQuestions = questions.map((obj)=> {
            return {"id":obj.id, "question":obj.question, "answer":obj.userSelectedAnswer}
          })
          const data = {experiences, questions:filteredQuestions, email}; 
          try {
            const response = await fetch(`${API_SERVICE}notion/saveQuizData`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with status ${response.status}`);
            }
    
            const quizResult = await response.json();
            console.log('Data added:', quizResult);
            return quizResult.value;
        } catch (error) {
            console.error('Error adding data:', error);
        }

        },

        reset: () => {
          set(
            {
              currentQuestion: 0,
              questions: [],
              experiences: [],
              hasCompleteAll: false,
              selectedQuizz: null,
            },
            false
          );
        },
      };
    },
    {
      name: "quizz",
    }
  )
);
