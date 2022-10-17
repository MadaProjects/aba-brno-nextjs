import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Heading } from '../Tags/Heading';

export const SimpleText = ({
  headingLevel = 1,
  headingText,
  paragraphText,
  perexText,
  buttonText,
  buttonLink,
  buttonNewTab = false,
}) => {
  return (
    <div
      data-testid='simpleText'
      className='container mx-auto px-4 text-center'>
      <Heading level={headingLevel}>{headingText}</Heading>
      {perexText ? <p>{perexText}</p> : ''}
      {paragraphText ? (
        <div>
          <ReactMarkdown>{paragraphText}</ReactMarkdown>
        </div>
      ) : (
        ''
      )}

      {buttonText ? (
        <div>
          {buttonNewTab ? (
            <a href={buttonLink} target='_blank' rel='noreferrer'>
              {buttonText}
            </a>
          ) : (
            <a href={buttonLink}>{buttonText}</a>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

SimpleText.propTypes = {
  headingLevel: PropTypes.number,
  headingText: PropTypes.string,
  paragraphText: PropTypes.string,
  perexText: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  buttonNewTab: PropTypes.bool,
};
