export const SimpleText = ({
  headingLevel = 1,
  headingText,
  paragraphText,
}) => {
  const HeadingTag = `h${headingLevel}`;

  return (
    <div
      data-testid='simpleText'
      className='container mx-auto px-4 text-center'>
      <HeadingTag className='mb-4 text-2xl uppercase font-black text-primary'>
        {headingText}
      </HeadingTag>
      {paragraphText ? <p>{paragraphText}</p> : ''}
    </div>
  );
};
