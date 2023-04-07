import Image from 'next/legacy/image';
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

export const TextWithImage = ({
  headingLevel = 1,
  blockData,
  imageOnLeft = false,
  headingText = false,
  perexText = false,
  paragraphText = false,
  imgUrl = false,
  buttonText = false,
  buttonLink = false,
  imgData = false,
  buttonNewTab = false,
}) => {
  const switchOrder = imageOnLeft ? 'md:flex-row' : 'md:flex-row-reverse';
  const textMarginSide = imageOnLeft ? 'xl:pr-10' : 'xl:pl-10';

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

  // TODO create single coponent for photo source to be used in all places
  return (
    <div
      data-testid='textWithImage'
      className={`flex flex-col  dark:text-white  md:py-0 ${switchOrder}`}>
      <div className='flex justify-items-center justify-center px-4 pt-10 pb-0 md:py-10 md:w-[60%] md:px-10 xl:w-[50%] xl:py-20'>
        <div
          className={`flex flex-col justify-items-center justify-center xl:max-w-[690px] xl:mx-auto`}>
          <div>
            <Heading
              level={headingLevel}
              headingClass={blockData.Perex ? 'mb-3 xl:mb-3' : ''}>
              {blockData.Title}
            </Heading>

            {blockData.Perex && (
              <p className='italic mb-7 text-center'>{blockData.Perex}</p>
            )}
          </div>

          {blockData.Text && (
            <p className='text-justify'>{blockData.Text}</p>
          )}

          {blockData.ButtonText && textBtnUrl && (
            <div className='text-center mt-4'>
              {openInNewTab ? (
                <a
                  href={textBtnUrl}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent tracking-wider		'>
                  {blockData.ButtonText}
                </a>
              ) : (
                <Link
                  href={textBtnUrl}
                  className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent tracking-wider		'>
                  {blockData.ButtonText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='relative h-60 min-h-[350px] w-full md:w-[40%] md:h-auto xl:w-[50%] xl:min-h-[450px] '>
        {blockData.Image ? (
          <Image
            src={blockData.Image.data.attributes.url}
            layout='fill'
            alt={
              blockData.Image.data.attributes.name
                ? blockData.Image.data.attributes.name
                : blockData.Title
            }
            objectFit='cover'
            objectPosition='center'
          />
        ) : (
          ''
        )}

        {blockData.Image.data.attributes.caption && (
          <p
            className={`absolute ${
              imageOnLeft
                ? 'pr-2 right-0'
                : 'pr-2 right-0 md:pl-2 md:left-0 md:pr-auto md:right-auto'
            } bottom-[-20px]  mb-0 bottom-0 z-10 text-xs pr-2text-right text-slate-600 dark:text-slate-400`}
            dangerouslySetInnerHTML={{
              __html: urlify(blockData.Image.data.attributes.caption),
            }}></p>
        )}
      </div>
    </div>
  );
};
