"use client";
import { cn } from "@/lib/utils";
import { useQuestionStore } from "@/store/quiz-store";
// import Image from "next/image";
import { useState } from "react";
import Answer from "../atoms/answer";

type AnswersProps = {
  data: string[];
  handleAnswer: (questionId: number, answer: string | string[]) => void;
  questionId: number;
  multiChoice: boolean;
  goNextQuestion: () => void;
};

const Answers = ({
  data,
  handleAnswer,
  questionId,
  multiChoice,
  goNextQuestion,
}: AnswersProps) => {
  const [selectedAns, setSelectedAns] = useState<string | string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { questions, onCompleteQuestions } = useQuestionStore();

  const handleSelectAnswer = (answer: string) => {
    if (submitted) return;

    if (Array.isArray(selectedAns) && multiChoice && selectedAns.includes(answer)) {
      setSelectedAns(selectedAns.filter(item => item !== answer));
      return;
    }
    if (!multiChoice && selectedAns === answer) {
      setSelectedAns("");
      return;
    }
    setSelectedAns(
      Array.isArray(selectedAns) && multiChoice
        ? [...selectedAns, answer]
        : answer
    );
  };

  const handleSubmit = () => {
    if (!selectedAns) return;
    handleAnswer(questionId, selectedAns);
    setSubmitted(true);
    if (questionId === 30) {
      console.log("qqqq", questions.every((q) => q.userSelectedAnswer != null));
      onCompleteQuestions();
      return;
    }
    goNextQuestion();
    setSelectedAns("");
    setSubmitted(false);
    return;
  };
  return (
    <>
      {data.length === 0
        ? (<form onSubmit={() => {
          const name = document.getElementById("name") as HTMLInputElement;
          if (name.value.length > 2) {
            handleSubmit();
          }
        }} className="flex flex-col gap-y-4 justify-center w-full">
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                Your Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={(e) => handleSelectAnswer(e.target.value)}
                required
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-purple disabled:opacity-15 py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center"
            >
              <p className="dark:text-white text-xl font-semibold">Continue</p>
            </button>
          </div>
        </form>)
        : (
          <>
            <ul
              className={cn(
                data.length > 7 ? "grid grid-cols-1 md:grid-cols-2 gap-x-4" : "flex flex-col justify-center w-full",
                "gap-y-4"
              )}
            >
              {data.map((answer) => (
                <Answer
                  key={answer}
                  answer={answer}
                  selectedAns={selectedAns}
                  multiChoice={multiChoice}
                  handleSelectAnswer={handleSelectAnswer}
                />
              ))}
            </ul>
            <button
              onClick={handleSubmit}
              disabled={selectedAns.length < 1}
              className="w-full bg-purple disabled:opacity-15 py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center"
            >
              Continue
            </button>
          </>
        )}

    </>
  );
};

export default Answers;
