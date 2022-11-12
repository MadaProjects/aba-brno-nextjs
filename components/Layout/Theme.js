import { useState, createContext } from 'react';

const getInitialColorMode = () => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return 'dark';
  }

  return 'light';
};

export const ThemeContext = createContext();

export const ThemeProvide = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState(getInitialColorMode);

  const setColorMode = (value) => {
    rawSetColorMode(value);
    window.localStorage.setItem('theme', value);
  };

  return;
  <ThemeContext.Provider value={{ colorMode, setColorMode }}>
    {children}
  </ThemeContext.Provider>;
};
