"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

type ProgressProps = {
  name: string;
  currentIndex: number;
  durationVal?: number;
  start: number;
  total: number;
};

const AnimatedProgress = ({ name, currentIndex, start, durationVal, total }: ProgressProps) => {
  const progressRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<HTMLDivElement>(null);
  const startPercentage = (start / total) * 100;
  const progressPercentage = (currentIndex / total) * 100;
  useEffect(() => {
    if (progressRef.current) {
      animate(
        progressRef.current,
        { width: `${progressPercentage}%` },
        { duration: durationVal ?? 2, ease: "easeOut" }
      );
    }
    if (animateRef.current) {
      animate(
        animateRef.current,
        { transform: `translateX(${-100 + progressPercentage}%` },
        { duration: durationVal ?? 2, ease: "easeOut" }
      );
    }
  }, [durationVal, progressPercentage]);

  return (
    <div id={`progress-${name}`} key={name} className="w-full relative block overflow-hidden z-0 rounded-lg h-[8px] bg-[#fff] dark:bg-slate" role="progressbar">
      <span ref={animateRef} className="w-full absolute left-[0] bottom-[0] top-[0] origin-left-center h-[8px] bg-purple" style={{ transform: `translateX(${-100 + startPercentage}%)` }}></span>
    </div>
  );

};

export default AnimatedProgress;