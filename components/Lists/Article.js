import Image from 'next/legacy/image';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

// TODO should be in article tag
export const Article = ({ data }) => {
  const dateFormated = new Date(data.publishedAt);

  return (
    <div
      data-testid='article'
      className=' flex flex-col w-full mb-10 md:w-[calc(33%_-_2rem)] xl:w-[calc(33%_-_4rem)] px-0 md:mx-4 xl:mx-8 shadow-lg shadow-slate-300 dark:shadow-none dark:border-solid dark:border-2 dark:border-slate-600'>
      <div className='relative w-full min-h-[200px] mb-0 '>
        <Image
          src={data.Image.data.attributes.url}
          layout='fill'
          alt={data.Image.data.attributes.caption}
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className='flex flex-col px-4 py-4 dark:border-t-2 dark:border-slate-600 h-full'>
        <div className='h-full'>
          <Link
            href={`/clanky/${data.Url}`}
            className='hover:underline text-primary dark:text-secondary'>
            <h3 className='mb-2 text-center text-xl xl:text-2xl font-black text-primary dark:text-secondary'>
              {data.Title}
            </h3>
          </Link>
          <p className='dark:text-white text-justify'>{data.Perex}</p>
        </div>
        <div className='flex flex-col md:justify-between items-end text-sm mt-4 dark:text-white'>
          <time
            className='mb-2 md:mb-0'
            dateTime={
              data.publishedAt
            }>{`${dateFormated.getDate()}. ${dateFormated.getMonth()}. ${dateFormated.getFullYear()}`}</time>

          {data.Author.data ? (
            <p className='mb-0'>
              <Link
                href={`../odbornici/${data.Author.data.attributes.Url}`}
                className='dark:text-white underline hover:no-underline hover:color-primary dark:hover:color-secondary'>
                {data.Author.data.attributes.Name}
              </Link>
            </p>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
