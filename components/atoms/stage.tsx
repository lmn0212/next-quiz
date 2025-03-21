import { useEffect, useState } from "react";
import { MotionDiv } from "@/components/animated/motion-div";
import AnimatedCounter from "@/components/atoms/animated-counter";
import AnimatedProgress from "@/components/atoms/animated-progress";

type StageProps = {
    title: string;
    percentage: [number, number];
    question: string;
    answer?: boolean; // Optional if it's completed
    onAnswer?: (answer: boolean) => void; // Only used for the active stage
};

export default function Stage({
    title,
    percentage,
    question,
    onAnswer,
}: StageProps) {
    const [showModal, setShowModal] = useState(false);

    // Set the duration of the progress bar animation
    const progressBarDuration = 2000; // in milliseconds (2 seconds)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true); // Show the modal after the progress bar animation
        }, progressBarDuration);
        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, [title]);

    return (
        <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col xs:gap-4 md:gap-5 lg:mt-28 xl:mt-0"
        >
            <div className="flex justify-between">
                <h4 className="xs:text-l md:text-xl lg:text-2xl font-bold text-dark-blue dark:text-white">
                    {title}
                </h4>
                <p className="xs:text-l md:text-xl lg:text-2xl font-bold text-dark-blue dark:text-white">
                    <AnimatedCounter
                        from={percentage[0]}
                        to={percentage[1]}
                        duration={progressBarDuration / 1000} // Match counter duration with progress bar
                    />
                    %
                </p>
            </div>
            <AnimatedProgress
                name={title.toLowerCase().replace(/\s+/g, "-")}
                total={100}
                start={percentage[0]}
                currentIndex={percentage[1]}
                durationVal={progressBarDuration / 1000} // Match duration with modal delay
            />
            {onAnswer && showModal && (
                <div id="modal-window" className="w-full flex justify-center">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl lg:w-2/3 lg:max-w-2xl">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="w-full sm:flex sm:items-start">
                                <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0">
                                    <h3 className="text-base font-semibold text-gray-400">
                                        To move forward, specify
                                    </h3>
                                    <div className="mt-2">
                                        <p className="xs:text-l md:text-xl lg:text-2xl font-bold text-dark-blue dark:text-white">
                                            {question}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-4">
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-1/2"
                                onClick={() => { onAnswer(true); setShowModal(false); }}
                            >
                                Yes
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-1/2"
                                onClick={() => { onAnswer(false); setShowModal(false); }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MotionDiv>
    );
}
