"use client";
import { useQuestionStore } from "@/store/quiz-store";

const Score = () => {
  const { selectedQuizz, questions } = useQuestionStore();
  if (!selectedQuizz) return null;
  return (
    <div className="flex flex-col gap-2 bg-[#fff] dark:bg-slate p-2 rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col xl:justify-center xl:items-left gap-2 lg:px-2 w-full max-h-96 lg:mt-2 xl:mt-0 xl:max-h-full">
          <h4 className="font-bold text-dark-blue dark:text-white">Your goals in finance</h4>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[26].userSelectedAnswer}</p>
          {Array.isArray(questions[2].userSelectedAnswer) && questions[2].userSelectedAnswer?.map(((item: string, idx: number) => (<p key={idx} className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{item}</p>)))}
        </div>
        <div className="flex flex-col xl:justify-center xl:items-left gap-2 lg:px-2 w-full max-h-96 lg:mt-2 xl:mt-0 xl:max-h-full">
          <h4 className="font-bold text-dark-blue dark:text-white">Skills you&apos;d like to improve</h4>
          {Array.isArray(questions[5].userSelectedAnswer) && questions[5].userSelectedAnswer?.map(((item: string, idx: number) => (<p key={idx} className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{item}</p>)))}
        </div>
        <div className="flex flex-col xl:justify-center xl:items-left gap-2 lg:px-2 w-full max-h-96 lg:mt-2 xl:mt-0 xl:max-h-full">
          <h4 className="font-bold text-dark-blue dark:text-white">Your buying habits</h4>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[10].userSelectedAnswer}</p>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[21].userSelectedAnswer}</p>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[22].userSelectedAnswer}</p>
        </div>
        <div className="flex flex-col xl:justify-center xl:items-left gap-2 lg:px-2 w-full max-h-96 lg:mt-2 xl:mt-0 xl:max-h-full">
          <h4 className="font-bold text-dark-blue dark:text-white">Your current financial situation</h4>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[3].userSelectedAnswer}</p>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[9].userSelectedAnswer}</p>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[11].userSelectedAnswer}</p>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[23].userSelectedAnswer}</p>
          <p className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{questions[24].userSelectedAnswer}</p>
        </div>
        <div className="flex flex-col xl:justify-center xl:items-left gap-2 lg:px-2 w-full max-h-96 lg:mt-2 xl:mt-0 xl:max-h-full">
          <h4 className="font-bold text-dark-blue dark:text-white">Preferred learning time</h4>
          {Array.isArray(questions[6].userSelectedAnswer) && questions[6].userSelectedAnswer?.map(((item: string, idx: number) => (<p key={idx} className="w-full flex p-2 items-left border border-grey-600 bg-[#fff] dark:bg-slate rounded-xl transition-all text-sm text-dark-blue dark:text-white">{item}</p>)))}
        </div>
      </div>
    </div>
  );
};

export default Score;
