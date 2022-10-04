import { Heading } from '../Tags/Heading';

export const SimpleText = ({
  headingLevel = 1,
  headingText,
  paragraphText,
}) => {
  return (
    <div
      data-testid='simpleText'
      className='container mx-auto px-4 text-center'>
      <Heading level={headingLevel}>{headingText}</Heading>
      {paragraphText ? <p>{paragraphText}</p> : ''}
    </div>
  );
};
