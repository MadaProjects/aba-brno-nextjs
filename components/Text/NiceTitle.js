import PropTypes from 'prop-types';
import { Heading } from '../Tags/Heading';

export const NiceTitle = ({ headingText, perex, headingLevel }) => {
  return (
    <div
      data-testid='niceTitle'
      className='container mx-auto px-4 pt-8 pb-5 text-center dark:text-white md:pt-12 md:pb-6'>
      <div className='relative overflow-hidden'>
        {headingText && (
          <Heading
            level={headingLevel}
            headingClass={`${
              perex ? '' : 'mb:0 xl:mb-0'
            } z-30 relative pt-8`}>
            {headingText}
          </Heading>
        )}
      </div>

      {perex && (
        <p className='italic mb-7 text-center max-w-lg mx-auto md:mt-6'>
          {perex}
        </p>
      )}
    </div>
  );
};

NiceTitle.propTypes = {
  headingText: PropTypes.string,
  perex: PropTypes.string,
};
