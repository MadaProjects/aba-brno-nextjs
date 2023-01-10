import PropTypes from 'prop-types';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Heading } from '../Tags/Heading';
import { Tabs } from '../Tabs/Tabs';

export const ExpertPage = ({ pageData }) => {
  return (
    <div data-testid='expertPage'>
      <div className='flex flex-col md:flex-row mx-auto  mx-auto'>
        <div className='md:w-3/5'>
          <Heading level={1} headingClass='max-w-5xl mx-auto normal-case'>
            {pageData.Name}
          </Heading>
          {pageData.Perex ? (
            <p className='italic mb-7 text-center max-w-lg mx-auto'>
              {pageData.Perex}
            </p>
          ) : (
            ''
          )}
        </div>

        <div className='mx-auto md:w-2/5 md:pl-8'>
          <div className='relative w-60 h-60'>
            <Image
              src={pageData.Image.data.attributes.url}
              alt={pageData.Name}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
            />
          </div>
        </div>
      </div>
      <div className='max-w-5xl mx-auto'>
        <Tabs tabs={pageData.TabText} sendContactTo={pageData.Email} />
      </div>
    </div>
  );
};

/*
ExpertPage.defaultProps = {
  pageData: {
    Name: 'Lorem ipsum',
  },
};
*/

ExpertPage.propTypes = {
  pageData: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Perex: PropTypes.string,
    Text: PropTypes.string,
  }),
};
