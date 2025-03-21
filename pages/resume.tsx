"use client";
import { useQuestionStore } from "@/store/quiz-store";
import MaxWidthWrapper from "@/components/atoms/max-width-wrapper";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Stage from "@/components/atoms/stage"; // Separate component import

type StageConfig = {
    title: string;
    percentage: [number, number];
    questionIndex: number;
};

type CompletedStage = {
    title: string;
    percentage: number;
    answer: boolean;
    question: string;
};

const stageConfig: StageConfig[] = [
    {
        title: "Aligning with your goals",
        percentage: [0, 49],
        questionIndex: 0,
    },
    {
        title: "Setting skills to improve",
        percentage: [0, 33],
        questionIndex: 1,
    },
    {
        title: "Picking content",
        percentage: [0, 60],
        questionIndex: 2,
    },
];

export default function Resume() {
    const { experiences, saveAdditionalAnswer } = useQuestionStore();
    const [stage, setStage] = useState<number>(0);
    const [completedStages, setCompletedStages] = useState<CompletedStage[]>([]);

    const handleStageCompletion = (answer: boolean) => {
        const currentStage = stageConfig[stage];
        setCompletedStages((prev) => [
            ...prev,
            {
                title: currentStage.title,
                percentage: currentStage.percentage[1],
                answer,
                question: experiences[currentStage.questionIndex]?.question || "",
            },
        ]);
        setStage(stage + 1);
        saveAdditionalAnswer(currentStage.questionIndex, answer);
    };

    return (
        <div className="flex justify-center">
            <MaxWidthWrapper
                className={cn(
                    "grid px-6 grid-cols-1 gap-10 xl:gap-16 lg:px-0 relative z-50 h-full"
                )}
            >
                {completedStages.map((completed, index) => (
                    <Stage
                        key={index}
                        title={completed.title}
                        percentage={[completed.percentage, 100]}
                        question={completed.question}
                        answer={completed.answer}
                    />
                ))}

                {stage < stageConfig.length && (
                    <Stage
                        title={stageConfig[stage].title}
                        percentage={stageConfig[stage].percentage}
                        question={experiences[stageConfig[stage].questionIndex]?.question}
                        onAnswer={handleStageCompletion}
                    />
                )}

                {stage === stageConfig.length && (
                    <Link
                        className="w-full lg:w-3/5 bg-purple py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center"
                        href="/result"
                    >
                        Continue
                    </Link>
                )}
            </MaxWidthWrapper>
            <div className="absolute bottom-0 flex flex-col justify-center items-center">
                <p>⭐️⭐️⭐️⭐️⭐️⭐️</p>
                <p>100 000+ people like you have already taken control of their finances</p>
            </div>
        </div>
    );
}
