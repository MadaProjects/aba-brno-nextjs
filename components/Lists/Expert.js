import Image from 'next/image';
import Link from 'next/link';
import styles from './Experts.module.scss';

export const Expert = ({ expert }) => {
  return (
    <Link href={`/teraputi/${expert.Url}`}>
      <a className={`column ${styles.link}`}>
        <div className={styles.linkInner}>
          <div className={styles.imgWrap}>
            <Image
              src={expert.Image.data.attributes.url}
              alt={expert.Name}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
              className={styles.img}
            />
          </div>
          <h3 className={styles.name}>{expert.Name}</h3>
          {expert.Perex ? (
            <p className={styles.text}>{expert.Perex}</p>
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
