import PropTypes from 'prop-types';
import { Heading } from '../Tags/Heading';
import style from './NiceTitle.module.css';

export const NiceTitle = ({ headingText, graphicText, perex }) => {
  return (
    <div
      data-testid='niceTitle'
      className='container mx-auto px-4 py-5 text-center dark:text-white md:py-10'>
      <div className='relative overflow-hidden'>
        {headingText ? (
          <Heading level={2} headingClass='z-30 relative pt-8 md:pt-14'>
            {headingText}
          </Heading>
        ) : (
          ''
        )}
        {graphicText ? (
          <span
            className={`${style.graphicText} text-primary dark:text-secondary opacity-10 leading-none text-5xl md:text-8xl`}>
            {graphicText}
          </span>
        ) : (
          ''
        )}
      </div>

      {perex ? (
        <p className='italic mb-7 text-center max-w-lg mx-auto md:mt-6'>
          {perex}
        </p>
      ) : (
        ''
      )}
    </div>
  );
};

NiceTitle.propTypes = {
  headingText: PropTypes.string,
  graphicText: PropTypes.string,
  perex: PropTypes.string,
};
