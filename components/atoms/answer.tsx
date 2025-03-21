import { cn } from "@/lib/utils";

type AnswerProps = {
  answer: string;
  selectedAns: string | string[];
  multiChoice: boolean;
  handleSelectAnswer: (answer: string) => void;
};
const Answer = ({
  answer,
  selectedAns,
  multiChoice,
  handleSelectAnswer,
}: AnswerProps) => {
  return (
    <li>
      <button
        onClick={() => handleSelectAnswer(answer)}
        className={cn(
          "w-full flex items-center gap-x-4 group bg-[#fff] dark:bg-slate py-4 px-5 rounded-xl shadow-lg hover:ring-2 hover:ring-purple transition-all font-semibold text-sm text-dark-blue dark:text-white text-center",
          (selectedAns === answer || multiChoice && selectedAns.includes(answer)) && "ring-purple ring-2 bg-[#a729f533]",
        )}
      >
        <span className="xl:text-lg">{answer}</span>
      </button>
    </li>
  );
};

export default Answer;
