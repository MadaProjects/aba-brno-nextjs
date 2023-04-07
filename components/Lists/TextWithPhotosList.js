import Image from 'next/image';
import { NiceTitle } from '../Text/NiceTitle';

// TODO Images should had maximum size
export const TextWithPhotosList = ({ list, title }) => {
  return (
    <div
      data-testid='articlesList'
      className='container mx-auto px-4 py-5 md:py-10 md:px-0'>
      {title && <NiceTitle headingText={title} />}

      <div className='flex flex-col flex-wrap md:flex-row pt-4 md:pt-10'>
        {list.map((item, i) => {
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
                    src={item.Image.data.attributes.url}
                    layout='fill'
                    alt={
                      item.Image.data.attributes.caption
                        ? item.Image.data.attributes.caption
                        : item.Title
                    }
                    objectFit='cover'
                    objectPosition='center'
                  />
                </div>
              </div>
              <div className='mt-8'>
                <h3 className='mb-2 text-center text-xl xl:text-2xl font-black text-primary dark:text-secondary'>
                  {item.Title}
                </h3>
                <p className='dark:text-white text-justify'>{item.Text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
