import type { Metadata } from "next";
import type { AppProps } from "next/app";
import "../app/globals.css";
// import localFont from "next/font/local";
import ThemeProvider from "@/components/providers/theme-provider";
import Header from "@/components/molecules/header";
import ImageBackground from "@/components/atoms/image-background";
import MaxWidthWrapper from "@/components/atoms/max-width-wrapper";
import { useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

// const rubik = localFont({
//   src: "../public/assets/fonts/Rubik-VariableFont_wght.ttf",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Financial Quiz",
  description: "Quiz to choose better financial course",
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const { darkMode } = useThemeStore();
  return (
    <div className={cn(
      darkMode && "dark",
      "xs:min-h-screen lg:h-full w-full lg:overflow-hidden transition-all",
    )}>
      <div className="bg-white dark:bg-dark-blue xs:py-10 md:py-12 w-full h-full min-h-screen transition relative">
        {/* BACKGROUND PATTERN  */}
        <ImageBackground />
        <MaxWidthWrapper className="flex justify-end xs:mb-10 lg:mb-2 xs:px-5 md:px-0">
          <Header />
        </MaxWidthWrapper>

        <main className="h-full xl:h-auto flex items-center justify-center xl:mt-16 2xl:mt-18">{
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        }</main>
      </div>
    </div>

  );
}