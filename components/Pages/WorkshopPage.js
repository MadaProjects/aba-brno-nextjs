// TODO remove legacy image
import Image from 'next/legacy/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Heading } from '../Tags/Heading';
import { ShareSocial } from '../../components/ShareSocial/ShareSocial';

// TODO merge all to one function
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

export const WorkshopPage = ({ pageData }) => {
  console.log(pageData);

  let updateDateWithTime = false;
  const updatedDate = new Date(pageData.DateOfTheWorkshop);
  let formatedUpdatedDate = `${updatedDate.getDate()}. ${
    updatedDate.getMonth() + 1
  }. ${updatedDate.getFullYear()}`;

  if (pageData.TimeOfTheWorkshop) {
    const time = pageData.TimeOfTheWorkshop.split(':');
    const date = new Date(pageData.DateOfTheWorkshop);
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    updateDateWithTime = date;

    formatedUpdatedDate = `${updateDateWithTime.getDate()}. ${
      updateDateWithTime.getMonth() + 1
    }. ${updateDateWithTime.getFullYear()} ${updateDateWithTime.getHours()}:${
      updateDateWithTime.getMinutes() < 10
        ? '0' + updateDateWithTime.getMinutes()
        : updateDateWithTime.getMinutes()
    }`;
  }

  return (
    <div data-testid='workshopPage'>
      <div className='container max-w-5xl mx-auto px-4 py-5 dark:text-white md:py-10'>
        <Heading level={1} headingClass='max-w-5xl mx-auto mb-0'>
          {pageData.Title}
        </Heading>

        <time
          dateTime={formatedUpdatedDate}
          className='block mb-4 text-lg text-center dark:text-white font-bold'>
          {formatedUpdatedDate}
        </time>

        {pageData.Perex ? (
          <p className='italic mb-7 text-center max-w-lg mx-auto'>
            {pageData.Perex}
          </p>
        ) : (
          ''
        )}

        <div className='mb-10'>
          <div className='relative w-full h-60 max-w-5xl mx-auto '>
            <Image
              src={pageData.Image.data.attributes.url}
              alt={pageData.Title}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
            />
          </div>

          {pageData.Image.data.attributes.caption && (
            <p
              className='text-xs pr-0	text-right dark:text-white'
              dangerouslySetInnerHTML={{
                __html: urlify(pageData.Image.data.attributes.caption),
              }}></p>
          )}
        </div>

        <div className='max-w-5xl mx-auto textContainer'>
          <ReactMarkdown>{pageData.Text}</ReactMarkdown>
        </div>

        {pageData.Poster && pageData.Poster.data && (
          <div className='mt-6 md:mt-12 text-center relative'>
            <Image
              src={pageData.Poster.data.attributes.url}
              alt={pageData.Title}
              width='100%'
              height='100%'
              layout='responsive'
              objectFit='contain'
            />
          </div>
        )}

        {pageData.RegistrationLinkForTheTorkshop ? (
          <div className='mt-6 md:mt-12 text-center'>
            <Link
              href={pageData.RegistrationLinkForTheTorkshop}
              target='_blank'
              className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent tracking-wider '>
              Přihláška
            </Link>
          </div>
        ) : (
          ''
        )}

        {pageData.therapeutists.data.length > 0 ? (
          <div className='mt-6 md:mt-12'>
            <p className='mb-0 font-bold'>Přednášející:</p>
            <ul className=''>
              {pageData.therapeutists.data.map((therapeutist) => (
                <li key={therapeutist.attributes.Url}>
                  <Link
                    href={`/odbornici/${therapeutist.attributes.Url}`}
                    target='_blank'
                    className='hover:underline'>
                    {therapeutist.attributes.Name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}

        <hr className='mt-6 mb-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-8 lg:mb-4'></hr>

        <ShareSocial text={pageData.Title} />
      </div>
    </div>
  );
};
