import { Footer } from 'flowbite-react';
import { gql, useQuery } from '@apollo/client';
import { Spinner } from '../Spinner';
import Image from 'next/legacy/image';
import Link from 'next/link';

export const FOOTER_MENU_QUERY = gql`
  query footerMenu {
    footerMenu {
      data {
        attributes {
          Menu {
            id
            Title
            pages {
              data {
                attributes {
                  Url
                  Title
                }
              }
            }
          }
        }
      }
    }
    setting {
      data {
        attributes {
          SiteName
          social_media_sites {
            data {
              attributes {
                Title
                Url
                Logo
              }
            }
          }
        }
      }
    }
  }
`;

export const MainFooter = () => {
  const { loading, error, data } = useQuery(FOOTER_MENU_QUERY);
  const currentYear = new Date().getFullYear();

  if (loading) return <Spinner />;
  if (error) return `${error.message}`;

  return (
    <div className='container mx-auto mt-6 md:mt-10'>
      <footer className='p-4 bg-white sm:p-6 dark:bg-slate-900'>
        <div className='md:flex md:justify-between'>
          <div className='mb-6 md:mb-0'>
            <Link
              href='../'
              className='flex items-center overflow-visible'>
              <Image
                src='/logo.png'
                width={100}
                height={44}
                className='mr-3 h-8 hover:cursor-pointer '
                alt='ABA Brno'
              />
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3 md:pl-10'>
            {data.footerMenu.data.attributes.Menu.map((menuColumn, i) => (
              <div key={`${menuColumn}-${i}`} className='max-w-[200px]'>
                <h2 className='mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white'>
                  {menuColumn.Title}
                </h2>
                <ul className='text-gray-600 dark:text-gray-400'>
                  {menuColumn.pages.data.map((menuItem, i) => (
                    <li key={`footer-menu-item-${i}`} className='mb-4'>
                      <a
                        href={`../${menuItem.attributes.Url}`}
                        className='hover:underline'>
                        {menuItem.attributes.Title}
                      </a>
                    </li>
                  ))}

                  {
                    //TODO - external links to footer
                  }
                  {menuColumn.external_links &&
                    menuColumn.external_links.data.map((menuItem, i) => (
                      <li key={`footer-menu-item-2-${i}`} className='mb-4'>
                        <a
                          href={menuItem.attributes.Title}
                          className='hover:underline'
                          target='_blank'
                          rel='noopener noreferrer'>
                          {menuItem.attributes.Title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <div className='sm:flex sm:items-center sm:justify-between'>
          <span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
            © {currentYear}{' '}
            <a
              href='https://www.petermada.info/'
              target='_blank'
              className='hover:underline'
              rel='noopener noreferrer'>
              Peter Mada
            </a>
            . All Rights Reserved.
          </span>
          <div className='flex mt-4 space-x-6 sm:justify-center sm:mt-0'>
            {data.setting &&
              data.setting.data.attributes.social_media_sites.data.map(
                (socialMedia, i) => {
                  let socialMediaIcon = (
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'>
                      <path
                        fillRule='evenodd'
                        d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z'
                        clipRule='evenodd'></path>
                    </svg>
                  );

                  switch (socialMedia.attributes.Logo) {
                    case 'Facebook':
                      socialMediaIcon = (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
                        </svg>
                      );
                      break;
                    case 'Twitter':
                      socialMediaIcon = (
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'
                          aria-hidden='true'>
                          <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
                        </svg>
                      );
                      break;
                    case 'Instagram':
                      socialMediaIcon = (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
                        </svg>
                      );
                      break;
                    case 'LinkedIn':
                      socialMediaIcon = (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' />
                        </svg>
                      );
                      break;
                    case 'Email':
                      socialMediaLink = `mailto:${socialSite.attributes.Url}`;
                      openInNewTab = false;
                      socialMediaIcon = (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z' />
                        </svg>
                      );
                      break;
                    case 'Telephone':
                      socialMediaLink = `tel:${socialSite.attributes.Url}`;
                      openInNewTab = false;
                      socialMediaIcon = (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M20.89 23.654c-7.367 3.367-18.802-18.86-11.601-22.615l2.107-1.039 3.492 6.817-2.083 1.026c-2.189 1.174 2.37 10.08 4.609 8.994.091-.041 2.057-1.007 2.064-1.011l3.522 6.795c-.008.004-1.989.978-2.11 1.033zm-9.438-2.264c-1.476 1.072-3.506 1.17-4.124.106-.47-.809-.311-1.728-.127-2.793.201-1.161.429-2.478-.295-3.71-1.219-2.076-3.897-1.983-5.906-.67l.956 1.463c.829-.542 1.784-.775 2.493-.609 1.653.388 1.151 2.526 1.03 3.229-.212 1.223-.45 2.61.337 3.968 1.243 2.143 4.579 2.076 6.836.316-.412-.407-.811-.843-1.2-1.3z' />
                        </svg>
                      );
                      break;
                    case 'Facebook_messenger':
                      socialMediaIcon = (
                        <svg
                          className='w-5 h-5'
                          fill='currentColor'
                          xmlns='http://www.w3.org/2000/svg'
                          fillRule='evenodd'
                          clipRule='evenodd'
                          viewBox='0 0 24 24'>
                          <path d='M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z' />
                        </svg>
                      );
                      break;
                    case 'WhatsApp':
                      socialMediaIcon = (
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='w-5 h-5'
                          fill='currentColor'
                          viewBox='0 0 24 24'>
                          <path d='M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z' />
                        </svg>
                      );
                      break;
                  }

                  return (
                    <a
                      href={socialMedia.attributes.Url}
                      className='text-gray-500 hover:text-gray-900 dark:hover:text-white'
                      key={`social-media-footer-${i}`}
                      target='_blank'
                      rel='noopener noreferrer'>
                      {socialMediaIcon}
                      <span className='sr-only'>
                        {socialMedia.attributes.Title}
                      </span>
                    </a>
                  );
                }
              )}
          </div>
        </div>
      </footer>
    </div>
  );
};

/*

              <Footer.Icon href='#' icon={BsFacebook} />
              <Footer.Icon href='#' icon={BsInstagram} />
              <Footer.Icon href='#' icon={BsTwitter} />
              <Footer.Icon href='#' icon={BsGithub} />
              <Footer.Icon href='#' icon={BsDribbble} />*/
