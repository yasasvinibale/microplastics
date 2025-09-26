import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeProviderContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('ocean');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark', 'ocean', 'forest', 'laboratory');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'ocean') {
      root.classList.add('ocean');
    } else if (theme === 'forest') {
      root.classList.add('forest');
    } else if (theme === 'laboratory') {
      root.classList.add('laboratory');
    }
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
    }
  return context;
};
