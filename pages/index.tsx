"use client";
import Link from "next/link";
import MaxWidthWrapper from "@/components/atoms/max-width-wrapper";
import { MotionDiv } from "@/components/animated/motion-div";
import { cn } from "@/lib/utils";

export default function Home() {
    return (
        <MaxWidthWrapper
            className={cn(
                "xl:place-content-center",
                "grid px-6 grid-cols-1 gap-10 xl:gap-16 lg:px-0 relative z-50 h-full"
            )}
        >
            <>
                <MotionDiv
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col xs:gap-4 md:gap-10 lg:mt-28 xl:mt-0"
                >
                    <h1 className="xs:text-4xl md:text-5xl font-normal text-dark-blue dark:text-white xl:text-6xl 2xl:text-6xl">
                        The best future you deserve starts with your <span className="font-bold">personal finances</span>
                    </h1>
                    <p className="text-gray-navy italic dark:text-light-blue xs:text-sm xl:text-xl">
                        Doomscrolling? Replace it with 5-minute microlearning. Gain control of your financial future—stress-free, step by step, and truly life-changing.
                    </p>
                    <Link className="w-full lg:w-3/5 bg-purple py-4 px-5 rounded-xl shadow-lg text-white font-semibold text-lg text-center" href="/quiz">Go to Quiz</Link>
                </MotionDiv>
            </>
        </MaxWidthWrapper>
    );
}