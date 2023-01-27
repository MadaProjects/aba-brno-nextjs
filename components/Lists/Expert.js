import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';
import styles from './Experts.module.scss';

export const Expert = ({ expert }) => {
  return (
    <Link href={`/odbornici/${expert.Url}`}>
      <a
        className='w-full mb-10 md:w-1/3 md:mb-0 px-2 xl:px-8'
        data-testid='expert'
        aria-label={expert.Name}>
        <div className={`text-center`}>
          <div
            className={`relative overflow-hidden w-[100%]	h-60 lg:h-80 mx-auto `}>
            <div className='absolute inset-1/2 translate-x-[-50%] translate-y-[-50%] w-[100%] h-[100%] overflow-hidden'>
              <Image
                src={expert.Image.data.attributes.url}
                alt={expert.Name}
                layout='fill'
                objectFit='cover'
                objectPosition='center'
              />
            </div>
          </div>

          <div className='shadow-lg shadow-slate-300 py-4 px-4 dark:shadow-none dark:border-solid dark:border-2 dark:border-t-0 dark:border-slate-600'>
            <h3 className='mb-2 mt-0 text-xl xl:mb-6 xl:text-2xl font-black text-primary dark:text-secondary'>
              {expert.Name}
            </h3>

            {expert.Perex ? (
              <p className='dark:text-white mb-0 leading-5'>
                {expert.Perex}
              </p>
            ) : (
              ''
            )}
          </div>
        </div>
      </a>
    </Link>
  );

  /*
  return (
    <div data-testid='expert' className='w-full md:w-1/3 px-2 xl:px-8'>
      <div className='relative w-full min-h-[200px] mb-4'>
        <Image
          src={expert.Image.data.attributes.url}
          alt={expert.Name}
          layout='fill'
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <a href={expert.url}>{expert ? <h2>{expert.Name}</h2> : ''}</a>
      {expert.Perex ? <p>{expert.Perex}</p> : ''}
    </div>
  );
  */
};

Expert.defaultProps = {
  expert: {
    Name: 'Test name',
    Perex: 'Lorem ipsum',
    Url: 'test-name',
    Image: {
      data: {
        attributes: {
          url: '/defaultimg.jpg',
        },
      },
    },
  },
};
