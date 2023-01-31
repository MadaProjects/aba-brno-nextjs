import Link from 'next/link';
import Cookies from 'js-cookie';
import { MouseEvent, useCallback, useEffect, useState } from 'react';

const USER_CONSENT_COOKIE_KEY = 'cookie_consent_is_true';
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

export const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === 'true';
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, 'true', {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <section className='fixed bottom-0 left-0 w-full z-50 bg-slate-200 dark:bg-slate-800 dark:border-t-2 dark:border-slate-400'>
      <div className='container mx-auto flex flex-col items-start px-5 py-3 md:py-6 space-y-2 md:flex-row md:space-y-0 md:items-stretch md:space-x-2'>
        <div className='flex items-center flex-grow text-gray-900 dark:text-slate-200 md:w-full'>
          <p className='text-sm font-medium mb-0'>
            Ahoj! Pečeme si pro vás ty nejlepší cookies, aby vaše
            prohlížení bylo sladší než cukr. A nebojte se, když si jednu
            nebo dvě zamlsáte, tajemství si necháme pro sebe. Pro více
            informací se podívejte{' '}
            <Link
              href='../../suhlas-so-spracovanim-osobnych-udajov'
              className='text-sm underline hover:underline-none hover:text-primary dark:hover:text-secondary '>
              zde
            </Link>
            .
          </p>
        </div>
        <div className='flex flex-col xl:flex-row items-center justify-center	w-full md:w-auto md:pl-10'>
          <button
            className='px-8 py-3 mt-4 md:mt-0 min-w-[150px] inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'
            onClick={onClick}>
            Odmítnout
          </button>

          <button
            className='px-8 py-3 mt-4 md:mt-4 xl:mt-0 xl:ml-6 min-w-[150px] inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'
            onClick={onClick}>
            Povolit
          </button>
        </div>
      </div>
    </section>
  );
};
