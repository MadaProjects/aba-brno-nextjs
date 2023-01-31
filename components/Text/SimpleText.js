import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

export const SimpleText = ({
  headingLevel = 1,
  headingText,
  paragraphText,
  perexText,
  buttonText,
  buttonLink,
  buttonNewTab = false,
}) => {
  const cleanBtnLink = buttonLink === 'homepage' ? '/' : buttonLink;

  return (
    <div
      data-testid='simpleText'
      className='container mx-auto text-center dark:text-white px-4 py-6 md:py-10'>
      <Heading
        level={headingLevel}
        headingClass={perexText ? 'mb-3 xl:mb-3' : ''}>
        {headingText}
      </Heading>
      {perexText ? (
        <p className='italic mb-7 text-center max-w-lg mx-auto'>
          {perexText}
        </p>
      ) : (
        ''
      )}
      {paragraphText ? (
        <div className='max-w-4xl	mr-auto ml-auto'>
          <ReactMarkdown>{paragraphText}</ReactMarkdown>
        </div>
      ) : (
        ''
      )}

      {buttonText ? (
        <div className='text-center mb-6'>
          {buttonNewTab ? (
            <a
              href={cleanBtnLink}
              target='_blank'
              rel='noreferrer'
              className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'>
              {buttonText}
            </a>
          ) : (
            <Link
              href={cleanBtnLink}
              className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'>
              {buttonText}
            </Link>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

SimpleText.propTypes = {
  headingLevel: PropTypes.number,
  headingText: PropTypes.string,
  paragraphText: PropTypes.string,
  perexText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  buttonNewTab: PropTypes.bool,
};
