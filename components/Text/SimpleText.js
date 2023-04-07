import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

export const SimpleText = ({ headingLevel = 1, textData }) => {
  let textBtnUrl = '';
  let openInNewTab = false;

  if (textData.ExternalUrl) {
    textBtnUrl = textData.ExternalUrl;
    openInNewTab = true;
  } else if (textData.article.data) {
    textBtnUrl = `../clanky/${textData.article.data.attributes.Url}`;
  } else if (textData.expert.data) {
    textBtnUrl = `../odbornici/${textData.expert.data.attributes.Url}`;
  } else if (textData.page.data) {
    textBtnUrl = `../${textData.page.data.attributes.Url}`;
  } else if (textData.workshop.data) {
    textBtnUrl = `../poradame/${textData.workshop.data.attributes.Url}`;
  }

  return (
    <div
      data-testid='simpleText'
      className='container mx-auto text-center dark:text-white px-4 py-6 md:py-10'>
      <Heading
        level={headingLevel}
        headingClass={textData.Perex ? 'mb-3 xl:mb-3' : ''}>
        {textData.Title}
      </Heading>
      {textData.Perex ? (
        <p className='italic mb-7 text-center max-w-lg mx-auto'>
          {textData.Perex}
        </p>
      ) : (
        ''
      )}
      {textData.Text ? (
        <div className='max-w-4xl	mr-auto ml-auto'>
          <ReactMarkdown>{textData.Text}</ReactMarkdown>
        </div>
      ) : (
        ''
      )}

      {textData.ButtonText && textBtnUrl && (
        <div className='text-center mb-6'>
          {openInNewTab ? (
            <a
              href={textBtnUrl}
              target='_blank'
              rel='noreferrer'
              className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
              {textData.ButtonText}
            </a>
          ) : (
            <Link
              href={textBtnUrl}
              className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
              {textData.ButtonText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

SimpleText.propTypes = {
  headingLevel: PropTypes.number,
  textData: PropTypes.object,
};
