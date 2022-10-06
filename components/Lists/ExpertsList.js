import Image from 'next/image';
import { expertExamples } from '../../__mocks__/expertsMocks';

import styles from './Experts.module.scss';

export const ExpertsList = () => {
  const suffledExperts = [];
  const experts = expertExamples;

  //const suffledExperts = experts ? shuffleArray(experts) : [];
  const selectedExperts = experts.filter((expert, i) => i < 4);

  return (
    <div data-testid='expertsList' className={`columns ${styles.experts}`}>
      {experts
        ? selectedExperts.map((expert, i) => {
            if (expert.attributes.Name) {
              const newUrl =
                expert.attributes.Image.data.attributes.formats;

              return (
                <a href='' key={i} className={`column ${styles.link}`}>
                  <div className={styles.linkInner}>
                    <div className={styles.imgWrap}>
                      <span className={styles.img}>
                        <Image
                          className={styles.imgUpdate}
                          src={newUrl}
                          alt={expert.attributes.Name}
                          fill='fixed'
                          width={300}
                          height={300}
                        />
                      </span>
                    </div>
                    <h3 className={styles.name}>
                      {expert.attributes.Name}
                    </h3>
                    {expert.attributes.Perex ? (
                      <p className={styles.text}>
                        {expert.attributes.Perex}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </a>
              );
            }
          })
        : ''}
    </div>
  );
};
