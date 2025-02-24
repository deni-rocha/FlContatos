import { useColorScheme } from 'nativewind';
import React, { createContext, useState } from 'react';


type InitialState = {
    setColorScheme(scheme: Parameters<(value: "light" | "dark" | "system") => void>[0]): void;
    toggleColorScheme(): void;
    colorScheme: "light" | "dark" | undefined;
    isDarkMode: boolean
}

const initialState: InitialState = {
    setColorScheme(_scheme) {
        
    },
    toggleColorScheme() {
        
    },
    colorScheme: 'dark',
    isDarkMode: true
}
// Cria um contexto
const ThemeContext = createContext(initialState);

const ThemeProvider = ({ children }: { children: React.JSX.Element}) => {
    const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme()
    const isDarkMode = colorScheme === 'dark'
    
  
    return (
      <ThemeContext.Provider value={{ colorScheme, isDarkMode, setColorScheme, toggleColorScheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };

export { ThemeContext, ThemeProvider }