"use client";
import React, { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // const { darkMode } = useThemeStore();
  return (
    <div className={"xs:min-h-screen lg:h-full w-full lg:overflow-hidden transition-all"}>
      {children}
    </div>
  );
};

export default ThemeProvider;