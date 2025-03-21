"use client";
import Game from "@/components/molecules/game";
import MaxWidthWrapper from "@/components/atoms/max-width-wrapper";
import Results from "@/components/molecules/results";
// import Subjects from "@/components/atoms/subjects";
import { useQuestionStore } from "@/store/quiz-store";
import { useEffect } from "react";
import { MotionDiv } from "@/components/animated/motion-div";
import { cn } from "@/lib/utils";

export default function Quiz() {
  const { fetchQuizzes, quizzes, selectedQuizz, hasCompleteAll } =
    useQuestionStore();
  const selectQuizz = useQuestionStore((state) => state.selectQuizz);
  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  return (
    <MaxWidthWrapper
      className={cn(
        selectedQuizz && "xl:place-content-center",
        "grid px-6 grid-cols-1 gap-10 xl:gap-16 lg:px-0 relative z-50 h-full"
      )}
    >
      {!selectedQuizz && (
        <>
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col xs:gap-4 md:gap-10 lg:mt-28 xl:mt-0"
          >
            <h1 className="xs:text-4xl md:text-5xl font-normal text-dark-blue dark:text-white xl:text-6xl 2xl:text-6xl">
              Change is <span className="text-gray-400 line-through">hard</span> fun and exciting
            </h1>
            <p className="text-gray-navy italic dark:text-light-blue xs:text-sm xl:text-xl">
              We’re here to bring the joy of financial empowerment into your life            </p>
            {/* <Subjects data={quizzes} /> */}
            <button
              key="Finance"
              onClick={() => {
                selectQuizz(quizzes.find((q) => q.title === "Finance")!);
              }}
              className="flex items-center justify-center max-w-sm gap-x-4 bg-[#fff] dark:bg-slate py-3 px-4 xl:py-5 rounded-2xl shadow-lg ring-1 hover:ring-purple transition-all"
            >
              {/* <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: backgroundColors[subject.title] }}
          >
            <Image src={subject.icon} alt="arrow" width={30} height={30} />
          </div> */}
              <p className="dark:text-white text-xl font-semibold">Continue</p>
            </button>
          </MotionDiv>
        </>
      )}
      {selectedQuizz && hasCompleteAll === false && <Game />}
      {hasCompleteAll && <Results />}
    </MaxWidthWrapper>
  );
}
