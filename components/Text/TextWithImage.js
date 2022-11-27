import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

export const TextWithImage = ({
  headingLevel = 1,
  headingText,
  perexText,
  paragraphText,
  imgUrl,
  buttonText,
  buttonLink,
  buttonNewTab = false,
  isEven = false,
}) => {
  const cleanBtnLink = buttonLink === 'homepage' ? '/' : buttonLink;
  const switchOrder = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
  const textMarginSide = isEven
    ? 'xl:ml-auto xl:pr-10'
    : 'xl:mr-auto xl:pl-10';

  return (
    <div
      data-testid='textWithImage'
      className={`flex flex-col  dark:text-white py-5 md:py-0 ${switchOrder}`}>
      <div className='px-4 pt-10 pb-0 md:w-[60%] md:px-10 xl:w-[50%] xl:py-20'>
        <div className={`xl:max-w-[690px] xl:mr-0 ${textMarginSide}`}>
          <div>
            <Heading
              level={headingLevel}
              headingClass={perexText ? 'mb-3 xl:mb-3' : ''}>
              {headingText}
            </Heading>
            {perexText ? (
              <p className='italic mb-7 text-center'>{perexText}</p>
            ) : (
              ''
            )}
          </div>
          {paragraphText ? (
            <p className='text-justify'>{paragraphText}</p>
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
      <div className='relative h-60 w-full md:w-[40%] md:h-auto xl:w-[50%] '>
        {imgUrl ? (
          <Image
            src={imgUrl}
            layout='fill'
            alt=''
            objectFit='cover'
            objectPosition='center'
          />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};
