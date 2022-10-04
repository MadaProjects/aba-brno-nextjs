import Image from 'next/image';
import { Heading } from '../Tags/Heading';

export const TextOnImage = ({
  headingLevel = 1,
  headingText,
  perexText,
  paragraphText,
  imgUrl,
  btnText,
  btnLink,
}) => {
  return (
    <div data-testid='textOnImage'>
      <div className='relative min-h-[200px]'>
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
      <Heading level={headingLevel}>{headingText}</Heading>
      {perexText ? <p>{perexText}</p> : ''}
      {paragraphText ? <p>{paragraphText}</p> : ''}
      {btnText ? <a href={btnLink}>{btnText}</a> : ''}
    </div>
  );
};
