import PropTypes from 'prop-types';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Heading } from '../Tags/Heading';
import { Tabs } from '../Tabs/Tabs';

export const ExpertPage = ({ pageData }) => {
  return (
    <div data-testid='expertPage'>
      <div className='flex flex-col md:flex-row mx-auto max-w-5xl mx-auto'>
        <div className='md:w-3/5'>
          <Heading
            level={1}
            headingClass='max-w-5xl mx-auto normal-case mb-2 md:text-left xl:mb-2'>
            {pageData.Name}
          </Heading>
          {pageData.Perex ? (
            <p className='italic mb-7 text-center max-w-lg mx-auto md:text-left md:ml-0'>
              {pageData.Perex}
            </p>
          ) : (
            ''
          )}

          {pageData.ImportantInfo ? (
            <p className='p-4 border-2 border-primary dark:border-secondary bg-slate-200 dark:bg-slate-800'>
              {pageData.ImportantInfo}
            </p>
          ) : (
            ''
          )}
        </div>

        <div className='mx-auto mb-10 md:w-2/5 md:pl-8 md:mb-0'>
          <div className='relative w-60 h-60 md:ml-auto md:mr-0 border-2 border-primary dark:border-secondary'>
            <Image
              src={pageData.Image.data.attributes.url}
              alt={pageData.Name}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
            />
          </div>
          <div className='flex items-center	 justify-center	mt-2 md:justify-end	'>
            {pageData.social_media_sites.data.map((socialSite, i) => {
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

              let socialMediaLink = socialSite.attributes.Url;
              let openInNewTab = true;

              switch (socialSite.attributes.Logo) {
                case 'Facebook':
                  socialMediaIcon = (
                    <svg
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'>
                      <path
                        fillRule='evenodd'
                        d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                        clipRule='evenodd'></path>
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
                      className='w-5 h-5'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'>
                      <path
                        fillRule='evenodd'
                        d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                        clipRule='evenodd'></path>
                    </svg>
                  );
                  break;
                case 'Email':
                  socialMediaLink = `mailto:${socialSite.attributes.Url}`;
                  openInNewTab = false;
                  socialMediaIcon = (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                      />
                    </svg>
                  );
                  break;
                case 'Telephone':
                  socialMediaLink = `tel:${socialSite.attributes.Url}`;
                  openInNewTab = false;
                  socialMediaIcon = (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-5 h-5'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z'
                      />
                    </svg>
                  );
                  break;
              }

              return (
                <a
                  href={socialMediaLink}
                  className='text-primary hover:text-gray-900 dark:text-white dark:hover:text-secondary mx-1 md:mx-[6px]'
                  key={`expert-social-${i}`}
                  target={openInNewTab ? `_blank` : ''}
                  rel={openInNewTab ? 'noopener noreferrer' : ''}>
                  {socialMediaIcon}
                  <span className='sr-only'>
                    {socialSite.attributes.Title}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <div className='max-w-5xl mx-auto md:mt-5'>
        <Tabs tabs={pageData.TabText} sendContactTo={pageData.Email} />
      </div>
    </div>
  );
};

/*
ExpertPage.defaultProps = {
  pageData: {
    Name: 'Lorem ipsum',
  },
};
*/

ExpertPage.propTypes = {
  pageData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Perex: PropTypes.string,
    Text: PropTypes.string,
  }),
};
