import Image from 'next/image';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';
import styles from './Experts.module.scss';

export const Expert = ({ expert }) => {
  return (
    <Link href={`/odbornici/${expert.Url}`}>
      <a className={`w-full	md:w-1/2 xl:w-1/4 ${styles.link}`}>
        <div className={` text-center ${styles.linkInner}`}>
          <div
            className={`relative overflow-hidden w-40	h-40 rounded-full border-2 mx-auto border-primary dark:border-secondary ${styles.imgWrap}  dark:after:border-x-secondary	`}>
            <div className='absolute inset-1/2	translate-x-[-50%] translate-y-[-50%] w-[80%] h-[80%] rounded-full overflow-hidden'>
              <Image
                src={expert.Image.data.attributes.url}
                alt={expert.Name}
                layout='fill'
                objectFit='cover'
                objectPosition='center'
                className={styles.img}
              />
            </div>
          </div>

          <h3 className='mb-2 mt-4 text-xl xl:text-2xl font-black text-primary dark:text-secondary'>
            {expert.Name}
          </h3>

          {expert.Perex ? (
            <p className='dark:text-white'>{expert.Perex}</p>
          ) : (
            ''
          )}
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
    name: 'Test name',
    perex: 'Lorem ipsum',
    url: 'test-name',
    img: '/imgurl.png',
  },
};
