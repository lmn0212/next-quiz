"use client";
import { useQuestionStore } from "@/store/quiz-store";
import CurrentQuestion from "../atoms/current-question";
import Answers from "./answers";
import Progress from "../atoms/progress";
import { MotionDiv } from "../animated/motion-div";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Game = () => {
  const { questions, currentQuestion, selectAnswer, goNextQuestion } =
    useQuestionStore();
  const question = questions[currentQuestion];

  const [shouldAnimateQuestion, setShouldAnimateQuestion] = useState(false);
  const [shouldAnimateAnswers, setShouldAnimateAnswers] = useState(false);

  useEffect(() => {
    // Activar la animación cuando cambie la pregunta
    setShouldAnimateQuestion(true);
    setShouldAnimateAnswers(true); // Reiniciar la animación de las respuestas
  }, [currentQuestion]);

  return (
    <>
      <AnimatePresence
        initial={false}
        mode="wait"
        onExitComplete={() => setShouldAnimateQuestion(true)}
      >
        {shouldAnimateQuestion && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="xs:mt-2 lg:mt-auto xl:mt-2 w-full "
            key={currentQuestion} // Asegúrate de proporcionar una clave única para que React maneje las animaciones correctamente
          >
            <Progress
              total={questions.length}
              currentIndex={currentQuestion + 1}
            />
          </MotionDiv>
        )}
      </AnimatePresence>
      {
        question.options.length === 1
          ? (
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col xs:gap-4 md:gap-10 lg:mt-28 xl:mt-0"
            >
              <h1 className="xs:text-4xl md:text-5xl font-normal text-dark-blue dark:text-white xl:text-6xl 2xl:text-6xl">
                {question.question}
              </h1>
              <p className="text-gray-navy italic dark:text-light-blue xs:text-sm xl:text-xl">{question.options[0]}</p>
              <button
                onClick={() => {
                  selectAnswer(question.id, question.options[0]);
                  goNextQuestion();
                }}
                className="flex items-center justify-center max-w-sm gap-x-4 bg-[#fff] dark:bg-slate py-3 px-4 xl:py-5 rounded-2xl shadow-lg ring-1 hover:ring-purple transition-all"
              >
                <p className="dark:text-white text-xl font-semibold">Continue</p>
              </button>
            </MotionDiv>
          )
          : (
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="flex flex-col xl:items-center gap-2 lg:px-6 mb-4 w-full max-h-96 lg:mt-16 xl:mt-0 xl:max-h-full">

                <AnimatePresence
                  initial={false}
                  mode="wait"
                  onExitComplete={() => setShouldAnimateQuestion(true)}
                >
                  {shouldAnimateQuestion && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={currentQuestion}
                      className="flex flex-col gap-4"
                    >
                      <p className="italic xs:text-sm md:text-md text-gray-navy dark:text-light-blue xl:text-xl" >
                        Question {currentQuestion + 1} of {questions.length}
                      </p>
                      <CurrentQuestion data={question} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => setShouldAnimateAnswers(true)}
              >
                {shouldAnimateAnswers && (
                  <MotionDiv
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-col gap-y-4 justify-center w-full"
                    key={currentQuestion} // Asegúrate de proporcionar una clave única para que React maneje las animaciones correctamente
                  >
                    <Answers
                      data={question.options}
                      questionId={question.id}
                      multiChoice={question.multiChoice}
                      handleAnswer={selectAnswer}
                      goNextQuestion={goNextQuestion}
                    />
                  </MotionDiv>
                )}
              </AnimatePresence>
            </div>
          )
      }

    </>
  );
};

export default Game;
