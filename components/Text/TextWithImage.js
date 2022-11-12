import Image from 'next/image';
import { Heading } from '../Tags/Heading';

export const TextWithImage = ({
  headingLevel = 1,
  headingText,
  perexText,
  paragraphText,
  imgUrl,
}) => {
  const HeadingTag = `h${headingLevel}`;

  return (
    <div
      data-testid='textWithImage'
      className='flex flex-col md:flex-row dark:text-white py-5 md:py-10'>
      <div className='px-4 py-10 md:w-[60%] md:px-10 xl:w-[50%]'>
        <div className='xl:max-w-[690px] xl:mr-0 xl:ml-auto'>
          <div>
            <Heading level={headingLevel}>{headingText}</Heading>
            {perexText ? <p>{perexText}</p> : ''}
          </div>
          {paragraphText ? <p>{paragraphText}</p> : ''}
        </div>
      </div>
      <div className='relative h-60 w-full md:w-[40%] md:h-auto xl:w-[50%] xl:ml-10'>
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
