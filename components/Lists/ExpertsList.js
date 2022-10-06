import Image from 'next/image';
import { expertExamples } from '../../__mocks__/expertsMocks';

import styles from './Experts.module.scss';

export const ExpertsList = () => {
  const suffledExperts = [];
  const experts = expertExamples;

  //const suffledExperts = experts ? shuffleArray(experts) : [];
  const selectedExperts = experts.filter((expert, i) => i < 4);

  return (
    <div
      data-testid='expertsList'
      className={`columns ${styles.experts}`}></div>
  );
};
