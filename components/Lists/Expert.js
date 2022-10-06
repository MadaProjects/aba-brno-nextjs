import Image from 'next/image';

export const Expert = ({ expert }) => {
  return (
    <div data-testid='expert'>
      <Image
        src={expert.img}
        alt={expert.name}
        layout='fixed'
        width={200}
        height={200}
      />
      <a href={expert.url}>{expert ? <h2>{expert.name}</h2> : ''}</a>
      {expert ? <p>{expert.perex}</p> : ''}
    </div>
  );
};

Expert.defaultProps = {
  expert: {
    name: 'Test name',
    perex: 'Lorem ipsum',
    url: 'test-name',
    img: '/imgurl.png',
  },
};
