import Link from 'next/link';

// TODO check if this works properly
export const ShareSocial = ({ text, url }) => {
  const get_current_url = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    } else {
      return '';
    }
  };

  return (
    <div>
      <p className='mb-2 mt-6 text-sm text-right'>Sdílet: </p>
      <div className='flex items-center justify-end	'>
        <Link
          target={'_blank'}
          title='Sdílet na Twitteru'
          rel='noopener noreferrer'
          passHref={true}
          className='twitter-share-button mr-2 hover:text-primary dark:hover:text-secondary'
          href={`http://twitter.com/share?text=${text}&url=${get_current_url()}&hashtags=ABA,ABABrno`}>
          <svg
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'
            aria-hidden='true'>
            <path d='M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84'></path>
          </svg>
        </Link>

        <Link
          target={'_blank'}
          title='Sdílet na Facebooku'
          rel='noopener noreferrer'
          href={`https://www.facebook.com/sharer/sharer.php?u=${get_current_url()}`}
          className='fb-xfbml-parse-ignore hover:text-primary dark:hover:text-secondary'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-5 h-5'
            fill='currentColor'
            viewBox='0 0 24 24'>
            <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
          </svg>
        </Link>
      </div>
    </div>
  );
};
