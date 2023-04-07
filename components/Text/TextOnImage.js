import Image from 'next/legacy/image';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

const urlify = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" rel="noopener noreferrer" target="_blank">' +
      url +
      '</a>'
    );
  });
};

// TODO This could use simpleText component
export const TextOnImage = ({ headingLevel = 1, blockData }) => {
  let textBtnUrl = '';
  let openInNewTab = false;

  if (blockData.ExternalUrl) {
    textBtnUrl = blockData.ExternalUrl;
    openInNewTab = true;
  } else if (blockData.article.data) {
    textBtnUrl = `../clanky/${blockData.article.data.attributes.Url}`;
  } else if (blockData.expert.data) {
    textBtnUrl = `../odbornici/${blockData.expert.data.attributes.Url}`;
  } else if (blockData.page.data) {
    textBtnUrl = `../${blockData.page.data.attributes.Url}`;
  } else if (blockData.workshop.data) {
    textBtnUrl = `../poradame/${blockData.workshop.data.attributes.Url}`;
  }
  return (
    <div
      data-testid='textOnImage'
      className='mx-auto text-center relative dark:text-white py-5 md:py-10 xl:py-20 overflow-hidden'>
      {blockData.Image && blockData.Image.data && (
        <div
          className='bg-center bg-repeat	bg-cover bg-fixed min-h-[200px] absolute inset-0 z-10 before:content-[""] before:absolute before:inset-0 before:z-20 before:bg-black/[.50] dark:before:bg-black/[.70]'
          style={{
            backgroundImage: `url(${blockData.Image.data.attributes.url})`,
          }}></div>
      )}

      <div className='container px-4 mx-auto z-30 relative'>
        <Heading
          level={headingLevel}
          headingClass={
            blockData.Perex ? 'mb-3 xl:mb-3 text-white' : 'text-white'
          }>
          {blockData.Titlee}
        </Heading>

        {blockData.Perex && (
          <p className='italic mb-7 text-center text-white max-w-lg mx-auto'>
            {blockData.Perex}
          </p>
        )}

        {blockData.Textt && (
          <div className='max-w-5xl	mr-auto ml-auto text-white'>
            <ReactMarkdown>{blockData.Textt}</ReactMarkdown>
          </div>
        )}

        {blockData.ButtonText && textBtnUrl && (
          <div className='text-center mt-4'>
            {openInNewTab ? (
              <a
                href={textBtnUrl}
                rel='noopener noreferrer'
                target='_blank'
                className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
                {blockData.ButtonText}
              </a>
            ) : (
              <Link
                href={textBtnUrl}
                className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
                {blockData.ButtonText}
              </Link>
            )}
          </div>
        )}
      </div>

      {blockData.Image.data.attributes.caption && (
        <p
          className='absolute bottom-0 z-20 right-0 mb-0 text-xs pr-2 text-right text-slate-400'
          dangerouslySetInnerHTML={{
            __html: urlify(blockData.Image.data.attributes.caption),
          }}></p>
      )}
    </div>
  );
};
