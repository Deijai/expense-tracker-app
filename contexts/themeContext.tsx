// src/contexts/themeContext.tsx
import { darkTheme, lightTheme } from '@/constants/theme';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// Definindo o tipo para o contexto
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof lightTheme & { isDarkMode: boolean };
  setSystemTheme: () => void;
  useSystemTheme: boolean;
};

// Criando o contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider do tema
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [useSystemTheme, setUseSystemTheme] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Atualiza o tema quando o sistema mudar e estiver usando tema do sistema
  useEffect(() => {
    if (useSystemTheme) {
      setIsDarkMode(systemColorScheme === 'dark');
    }
  }, [systemColorScheme, useSystemTheme]);

  // Função para alternar o tema manualmente
  const toggleTheme = () => {
    setUseSystemTheme(false);
    setIsDarkMode(prev => !prev);
  };

  // Função para retornar ao tema do sistema
  const setSystemTheme = () => {
    setUseSystemTheme(true);
    setIsDarkMode(systemColorScheme === 'dark');
  };

  // Seleciona o tema correto baseado no modo atual
  // Acrescenta a propriedade isDarkMode ao tema para facilitar o uso
  const theme = {
    ...(isDarkMode ? darkTheme : lightTheme),
    isDarkMode: isDarkMode
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme, setSystemTheme, useSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};