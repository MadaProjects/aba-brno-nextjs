import { useEffect, useLayoutEffect } from 'react';
import { MainFooter } from '../Footer/MainFooter';
import { Header } from '../Header/Header';

export const Layout = ({ children }) => {
  // TODO this run twice
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  return (
    <div
      data-testid='layout'
      className='dark:bg-slate-900 dark:text-white'>
      <Header />
      <div className='text-base text-forText'>{children}</div>
      <MainFooter />
    </div>
  );
};
