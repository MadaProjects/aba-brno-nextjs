import Image from 'next/legacy/image';
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
  imgData,
  buttonNewTab = false,
  isEven = false,
}) => {
  const cleanBtnLink = buttonLink === 'homepage' ? '/' : buttonLink;
  const switchOrder = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
  const textMarginSide = isEven
    ? 'xl:ml-auto xl:pr-10'
    : 'xl:mr-auto xl:pl-10';

  const urlify = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
      return (
        '<a href="' +
        url +
        '" rel="noopener noreferrer" target="_blank">' +
        url +
        '</a>'
      );
    });
  };

  return (
    <div
      data-testid='textWithImage'
      className={`flex flex-col  dark:text-white  md:py-0 ${switchOrder}`}>
      <div className='px-4 pt-10 pb-0 md:py-10 md:w-[60%] md:px-10 xl:w-[50%] xl:py-20'>
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
                  className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
                  {buttonText}
                </a>
              ) : (
                <Link
                  href={cleanBtnLink}
                  className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
                  {buttonText}
                </Link>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className='relative h-60 min-h-[350px] w-full md:w-[40%] md:h-auto xl:w-[50%] '>
        {imgUrl ? (
          <Image
            src={imgUrl}
            layout='fill'
            alt={imgData.data.attributes.name}
            objectFit='cover'
            objectPosition='center'
          />
        ) : (
          ''
        )}

        {imgData.data.attributes.caption && (
          <p
            className='absolute mb-0 bottom-0 right-0 z-10 text-xs pr-2	text-right dark:text-slate-500'
            dangerouslySetInnerHTML={{
              __html: urlify(imgData.data.attributes.caption),
            }}></p>
        )}
      </div>
    </div>
  );
};
