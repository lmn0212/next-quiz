"use client";
import MaxWidthWrapper from "@/components/atoms/max-width-wrapper";
import { useState } from "react";
import Form from "next/form";
import { useRouter } from 'next/navigation'
import { useQuestionStore } from "@/store/quiz-store";
import { MotionDiv } from "@/components/animated/motion-div";
import { cn } from "@/lib/utils";

export default function Result() {
    const { questions, sendData, reset } = useQuestionStore();
    const [form, setForm] = useState(false);
    const [email, setEmail] = useState("");
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendData(email);
        reset();
        router.push("/")
    };

    return (
        <MaxWidthWrapper
            className={cn(
                "xl:place-content-center",
                "grid px-6 grid-cols-1 gap-10 xl:gap-16 lg:px-0 relative z-50 h-full"
            )}
        >
            {form ? (
                <div className="flex justify-center">
                    <MotionDiv
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full md:w-1/2 flex flex-col xs:gap-4 lg:gap-6 lg:mt-28 xl:mt-0"
                    >
                        <h1 className="xs:text-2xl md:text-4xl font-normal text-dark-blue dark:text-white xl:text-6xl 2xl:text-6xl">
                            Enter your email to create account and save progress
                        </h1>
                        <p className="text-gray-navy italic dark:text-light-blue xs:text-sm xl:text-xl">
                            Don&apos;t worry we are not going to send you spam
                        </p>
                    </MotionDiv>
                    <Form
                        action="/"
                        onSubmit={handleSubmit}
                        className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4"
                    >
                        <div className="sm:col-span-4 w-full lg:w-2/3 ">
                            <label
                                htmlFor="email"
                                className="block text-sm/6 font-medium text-dark-blue dark:text-white"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full lg:w-2/3 bg-purple py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center"
                        >
                            Confirm
                        </button>
                    </Form>
                </div>
            ) : (
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col xs:gap-4 md:gap-10 lg:mt-28 xl:mt-0"
                >
                    <h1 className="xs:text-4xl md:text-5xl font-normal text-dark-blue dark:text-white xl:text-6xl 2xl:text-6xl">
                        Topics tailored to your goals
                    </h1>
                    <div className="flex justify-left gap-2">
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-s font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                            {questions[27]?.userSelectedAnswer}
                        </span>
                        {Array.isArray(questions[2]?.userSelectedAnswer) &&
                            questions[2].userSelectedAnswer.map((item, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-s font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
                                >
                                    {item}
                                </span>
                            ))}
                    </div>
                    <p className="text-gray-navy italic dark:text-light-blue xs:text-sm xl:text-xl">
                        Discover how to make everyday financial decisions easier, gain
                        confidence about your money, and build the future you deserve—all
                        without stress or long hours.
                    </p>
                    <button
                        className="w-full lg:w-3/5 bg-purple py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center"
                        onClick={() => setForm(true)}
                    >
                        Let&apos;s start!
                    </button>
                </MotionDiv>
            )}
        </MaxWidthWrapper>
    );
}
