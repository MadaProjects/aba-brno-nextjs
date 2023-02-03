import Image from 'next/image';
import { NiceTitle } from '../Text/NiceTitle';

export const TextWithPhotosList = ({
  list,
  headingText = '',
  perex = '',
  graphicText = '',
}) => {
  return (
    <div
      data-testid='articlesList'
      className='container mx-auto px-4 py-5 md:py-10 md:px-0'>
      {headingText ? (
        <NiceTitle
          headingText={headingText}
          perex={perex}
          graphicText={graphicText}
        />
      ) : (
        ''
      )}
      <div className='flex flex-col flex-wrap md:flex-row '>
        {list.map((item, i) => {
          const currentItem = item.attributes;
          console.log(currentItem);

          return (
            <div
              key={i}
              className='w-full md:w-1/2 xl:w-1/4 px-4 md:px-10 mb-10'>
              <div
                className={`px-2 pt-2 pb-8 bg-stone-200 dark:bg-slate-700 shadow-lg shadow-stone-400 dark:shadow-none max-w-[250px] mx-auto ${
                  i % 2 === 0 ? 'rotate-3' : '-rotate-3'
                }`}>
                <div className='relative w-full min-h-[250px] mb-0'>
                  <Image
                    src={currentItem.Image.data.attributes.url}
                    layout='fill'
                    alt={currentItem.Image.data.attributes.caption}
                    objectFit='cover'
                    objectPosition='center'
                  />
                </div>
              </div>
              <div className='mt-6'>
                <h3 className='mb-2 text-center text-xl xl:text-2xl font-black text-primary dark:text-secondary'>
                  {currentItem.Title}
                </h3>
                <p className='dark:text-white text-justify'>
                  {currentItem.Text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
