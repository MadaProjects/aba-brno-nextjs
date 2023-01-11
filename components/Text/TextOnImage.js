import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

/*
 <Image
              src={backgroundImage}
              layout='fill'
              alt=''
              objectFit='cover'
              objectPosition='center'
            />
            */

// TODO This could use simpleText component
export const TextOnImage = ({
  headingLevel = 1,
  headingText,
  perexText,
  paragraphText,
  backgroundImage,
  buttonText,
  buttonLink,
  buttonNewTab = false,
}) => {
  const cleanBtnLink = buttonLink === 'homepage' ? '/' : buttonLink;

  return (
    <div
      data-testid='textOnImage'
      className='mx-auto text-center relative dark:text-white py-5 md:py-10 overflow-hidden'>
      {backgroundImage ? (
        <div
          className='bg-center bg-repeat	bg-cover bg-fixed min-h-[200px] absolute inset-0 z-10 before:content-[""] before:absolute before:inset-0 before:z-20 before:bg-black/[.50] dark:before:bg-black/[.70]'
          style={{ backgroundImage: `url(${backgroundImage})` }}></div>
      ) : (
        ''
      )}

      <div className='container px-4 mx-auto z-30 relative'>
        <Heading
          level={headingLevel}
          headingClass={
            perexText ? 'mb-3 xl:mb-3 text-white' : 'text-white'
          }>
          {headingText}
        </Heading>
        {perexText ? (
          <p className='italic mb-7 text-center text-white max-w-lg mx-auto'>
            {perexText}
          </p>
        ) : (
          ''
        )}
        {paragraphText ? (
          <div className='max-w-5xl	mr-auto ml-auto text-white'>
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
              <Link href={cleanBtnLink}>
                <a className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'>
                  {buttonText}
                </a>
              </Link>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
