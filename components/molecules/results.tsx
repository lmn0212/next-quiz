"use client";
import Link from "next/link";
import { useQuestionStore } from "@/store/quiz-store";
import Score from "@/components/atoms/score";
import { MotionDiv } from "../animated/motion-div";

const Results = () => {
    const { questions } =
        useQuestionStore();

    return (
        <>
            <MotionDiv
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col xs:gap-3 md:gap-6 h-full lg:mt-2"
            >
                <h2 className="xs:text-2xl md:text-5xl font-normal text-dark-blue dark:text-white xl:text-3xl">
                    Hi {questions[18].userSelectedAnswer}!
                </h2>
                <p className="xs:text-xl font-bold text-dark-blue dark:text-white xl:text-2xl">
                    Here is your quiz summary
                </p>
            </MotionDiv>
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-center gap-y-4 items-center"
            >
                <Score />
                <Link
                    className="w-full lg:w-3/5 bg-purple py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center"
                    href="/resume"
                >
                    Show my personal plan
                </Link>
            </MotionDiv>
        </>
    );
};

export default Results;