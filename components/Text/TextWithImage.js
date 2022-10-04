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
    <div data-testid='textWithImage' className='flex flex-col md:flex-row'>
      <div>
        <div>
          <Heading level={headingLevel}>{headingText}</Heading>
          {perexText ? <p>{perexText}</p> : ''}
        </div>
        {paragraphText ? <p>{paragraphText}</p> : ''}
      </div>
      <div className='relative min-h-screen w-full'>
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
