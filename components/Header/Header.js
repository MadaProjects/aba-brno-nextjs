import { gql, useQuery } from '@apollo/client';
import client from '../../appolo-client';
import { ApolloProvider } from '@apollo/client';
import { useState, useEffect } from 'react';
import { Navbar, DarkThemeToggle, Alert } from 'flowbite-react';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Spinner } from '../Spinner';

export const MENU_QUERY = gql`
  query MainMenu {
    headerMenu {
      data {
        id
        attributes {
          Menu {
            main_page {
              data {
                id
                attributes {
                  Title
                  Url
                }
              }
            }
            submenu_pages {
              data {
                id
                attributes {
                  Title
                  Url
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const Header = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const router = useRouter();

  const handleHamburegerMenuClick = () => {
    setOpenMenu(!openMenu);
  };

  useEffect(() => {
    setDarkMode(localStorage.theme === 'dark' ? true : false);
  }, []);

  const handleSetDarkMode = () => {
    if (localStorage.theme === 'dark') {
      localStorage.theme = 'light';
      document.body.classList.remove('dark');
      setDarkMode(false);
    } else {
      localStorage.theme = 'dark';
      document.body.classList.add('dark');
      setDarkMode(true);
    }
  };

  const { loading, error, data } = useQuery(MENU_QUERY);

  if (loading) return <Spinner />;
  if (error) return `${error.message}`;

  const homepageUrl = document.location.host;

  return (
    <div className=' shadow-md dark:shadow-none ' data-testid='header'>
      <div className='container mx-auto'>
        <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-slate-900'>
          <div className='container flex flex-nowrap items-center justify-between mx-auto'>
            <Link href='/' className='flex items-center mr-10'>
              <Image
                src='/logo.png'
                className='mr-3 h-6 sm:h-9 hover:cursor-pointer'
                alt='ABA Brno'
                width={100}
                height={44}
              />
            </Link>

            <div className='flex md:order-2 md:ml-7'>
              <button
                id='theme-toggle'
                type='button'
                onClick={handleSetDarkMode}
                className='text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5'>
                <svg
                  id='theme-toggle-dark-icon'
                  className={`${isDarkMode ? 'hidden' : ''} w-5 h-5 `}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z'></path>
                </svg>
                <svg
                  id='theme-toggle-light-icon'
                  className={`${isDarkMode ? '' : 'hidden'} w-5 h-5`}
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                    fillRule='evenodd'
                    clipRule='evenodd'></path>
                </svg>
              </button>

              <button
                data-collapse-toggle='navbar-default'
                type='button'
                className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
                aria-controls='navbar-default'
                aria-expanded='false'
                onClick={handleHamburegerMenuClick}>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='w-6 h-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                    clipRule='evenodd'></path>
                </svg>
              </button>
            </div>

            <div
              className={`${
                openMenu ? `` : `hidden`
              } items-center justify-between w-full md:flex md:w-auto md:order-1 md:ml-auto`}
              id='navbar-default'>
              <ul className='flex flex-col p-4 mt-4 bg-gray-50 tracking-wider rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                {data.headerMenu.data.attributes?.Menu.map((menu, i) => {
                  const activeClassName =
                    'block py-2 pr-4 pl-3 text-whitebg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white';
                  const nonActiveClassName =
                    'block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent';

                  if (menu.main_page.data.attributes.Url === 'homepage') {
                    return '';
                  }

                  return (
                    <li key={i}>
                      <Link
                        href={`../${menu.main_page.data.attributes.Url}`}
                        className={
                          router.asPath ===
                          `./${menu.main_page.data.attributes.Url}`
                            ? activeClassName
                            : nonActiveClassName
                        }
                        aria-current='page'>
                        {menu.main_page.data.attributes.Title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
