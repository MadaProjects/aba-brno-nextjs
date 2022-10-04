import Image from 'next/image';
import { Heading } from '../Tags/Heading';

export const TextOnImage = ({
  headingLevel = 1,
  headingText,
  perexText,
  paragraphText,
  imgUrl,
}) => {
  return (
    <div data-testid='textOnImage'>
      <div>
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
    </div>
  );
};
