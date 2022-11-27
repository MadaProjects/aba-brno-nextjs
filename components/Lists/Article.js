import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

export const Article = ({ data }) => {
  const dateFormated = new Date(data.publishedAt);

  return (
    <div data-testid='article' className='w-full md:w-1/3 px-2 xl:px-8'>
      <div className='relative w-full min-h-[200px] mb-4'>
        <Image
          src={data.Image.data.attributes.url}
          layout='fill'
          alt={data.Image.data.attributes.caption}
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className='px-4'>
        <div>
          <Link href={`/clanky/${data.Url}`}>
            <a className='hover:underline text-primary dark:text-secondary'>
              <h3 className='mb-2 text-xl xl:text-2xl font-black text-primary dark:text-secondary'>
                {data.Title}
              </h3>
            </a>
          </Link>
          <p className='dark:text-white'>{data.Perex}</p>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between		md:items-center	text-sm mt-4 dark:text-white'>
          <time
            className='mb-2 md:mb-0'
            dateTime={
              data.publishedAt
            }>{`${dateFormated.getDate()}. ${dateFormated.getMonth()}. ${dateFormated.getFullYear()}`}</time>
          <a href=''>Mgr. Lorem ipsum</a>
        </div>
      </div>
    </div>
  );
};
