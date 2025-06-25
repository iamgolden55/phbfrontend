import React from 'react';
import { FluentProvider, webLightTheme, webDarkTheme, Theme } from '@fluentui/react-components';
import { createContext, useContext, useState, useEffect } from 'react';

// Custom theme extensions
const customLightTheme: Theme = {
  ...webLightTheme,
  colorBrandBackground: '#0078D4',
  colorBrandForeground: '#FFFFFF',
  colorNeutralBackground1: '#F3F2F1',
  colorNeutralBackground2: '#FFFFFF',
  fontFamilyBase: '"Segoe UI Variable", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica", sans-serif',
};

const customDarkTheme: Theme = {
  ...webDarkTheme,
  colorBrandBackground: '#0084FF',
  colorBrandForeground: '#FFFFFF',
  colorNeutralBackground1: '#201F1E',
  colorNeutralBackground2: '#323130',
  fontFamilyBase: '"Segoe UI Variable", "Segoe UI", -apple-system, BlinkMacSystemFont, "Roboto", "Helvetica", sans-serif',
};

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useFluentTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useFluentTheme must be used within FluentThemeProvider');
  }
  return context;
};

interface FluentThemeProviderProps {
  children: React.ReactNode;
}

export const FluentThemeProvider: React.FC<FluentThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('phb_theme_mode');
    return saved === 'dark';
  });

  useEffect(() => {
    localStorage.setItem('phb_theme_mode', isDarkMode ? 'dark' : 'light');
    // Apply theme class to body for global styles
    document.body.classList.toggle('dark-theme', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = isDarkMode ? customDarkTheme : customLightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <FluentProvider theme={theme} style={{ minHeight: '100vh' }}>
        {children}
      </FluentProvider>
    </ThemeContext.Provider>
  );
};