import Image from 'next/image';
import { Expert } from './Expert';
import { expertExamples } from '../../__mocks__/expertsMocks';

import styles from './Experts.module.scss';

// TODO change key in map
export const ExpertsList = ({ experts }) => {
  //const suffledExperts = experts ? shuffleArray(experts) : [];
  const selectedExperts = experts.filter((expert, i) => i < 4);

  return (
    <div data-testid='expertsList' className={`columns ${styles.experts}`}>
      {selectedExperts.map((expert, i) => (
        <Expert expert={expert} key={i} />
      ))}
    </div>
  );
};

ExpertsList.defaultProps = {
  experts: expertExamples,
};
