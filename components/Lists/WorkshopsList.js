import Link from 'next/link';
import { NiceTitle } from '../Text/NiceTitle';
import { Workshop } from './Workshop';

export const WorkshopsList = ({
  workshops,
  headingText = '',
  perex = '',
  doNotShowArticleWithThisUrl = false,
  showAll,
  headingLevel,
}) => {
  return (
    <div
      data-testid='articlesList'
      className='container mx-auto px-4 pt-5 pb-10 md:pt-10 md:pb-12 md:px-0'>
      {headingText ? (
        <NiceTitle
          headingText={headingText}
          perex={perex}
          headingLevel={headingLevel}
        />
      ) : (
        ''
      )}

      <div className='flex flex-col md:flex-row'>
        {workshops && workshops.length ? (
          workshops.map((workshop, i) => (
            <Workshop key={i} data={workshop.attributes} />
          ))
        ) : (
          <p>No workshops found</p>
        )}
      </div>
      <div className='flex flex-col md:flex-row'></div>
      {!showAll && (
        <div className='container mx-auto px-6 xl:px-12 text-center md:text-right'>
          <Link
            href='../poradame'
            className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
            Všechny workshopy
          </Link>
        </div>
      )}
    </div>
  );
};
