import Image from 'next/legacy/image';
import Link from 'next/link';
import useSWR from 'swr';
import { Expert } from './Expert';
import { NiceTitle } from '../Text/NiceTitle';
//import { expertExamples } from '../../__mocks__/expertsMocks';
import styles from './Experts.module.scss';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

// TODO change key in map
export const ExpertsList = ({
  headingText,
  perex,
  graphicText,
  showAll,
}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists?populate[0]=Image`,
    fetcher
  );

  // TODO change loading to icon
  if (error) return <div>Failed to load {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  const suffledExperts = data.data ? shuffleArray(data.data) : [];
  const selectedExperts = suffledExperts.filter(
    (expert, i) => i < (showAll ? 9999 : 4)
  );

  return (
    <div data-testid='expertsList'>
      <NiceTitle
        headingText={headingText}
        perex={perex}
        graphicText={graphicText}
      />
      <div
        className={`container mx-auto flex flex-col flex-wrap px-4 py-5 md:flex-row md:py-10 md:px-0 ${
          !showAll ? 'pb-0 md:pb-0' : ''
        }`}>
        {selectedExperts.map((expert, i) => (
          <Expert expert={expert.attributes} key={i} />
        ))}
      </div>
      {!showAll && (
        <div
          className={`container mx-auto px-6 xl:px-12 text-center md:text-right `}>
          <Link
            href='../odbornici'
            className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'>
            Všichni odborníci
          </Link>
        </div>
      )}
    </div>
  );
};

/*
ExpertsList.defaultProps = {
  experts: expertExamples,
};
*/
