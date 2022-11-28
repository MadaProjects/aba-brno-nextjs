import Image from 'next/image';
import useSWR from 'swr';
import { Expert } from './Expert';
import { NiceTitle } from '../Text/NiceTitle';
import { expertExamples } from '../../__mocks__/expertsMocks';
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
  experts,
}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists?populate[0]=Image`,
    fetcher
  );

  // TODO change loading to icon
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const suffledExperts = data.data ? shuffleArray(data.data) : [];
  const selectedExperts = suffledExperts.filter((expert, i) => i < 4);

  return (
    <div data-testid='expertsList'>
      <NiceTitle
        headingText={headingText}
        perex={perex}
        graphicText={graphicText}
      />
      <div
        className={`container mx-auto flex flex-col md:flex-row	 ${styles.experts}`}>
        {selectedExperts.map((expert, i) => (
          <Expert expert={expert.attributes} key={i} />
        ))}
      </div>
    </div>
  );
};

ExpertsList.defaultProps = {
  experts: expertExamples,
};
