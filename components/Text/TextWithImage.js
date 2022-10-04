import Image from 'next/image';

export const TextWithImage = ({
  headingLevel = 1,
  headingText,
  paragraphText,
  imgUrl,
}) => {
  const HeadingTag = `h${headingLevel}`;

  return (
    <div data-testid='textWithImage' className='flex flex-col md:flex-row'>
      <div>
        <HeadingTag>{headingText}</HeadingTag>
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
