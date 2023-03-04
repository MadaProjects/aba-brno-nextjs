import Image from 'next/legacy/image';
import Link from 'next/link';
import { Heading } from '../Tags/Heading';

const checkIfWorkshtopIsInFuture = (date) => {
  const today = new Date();
  const workshopDate = new Date(date);

  if (today < workshopDate) {
    return true;
  } else {
    return false;
  }
};

export const Workshop = ({ data }) => {
  let updateDateWithTime = false;

  const updatedDate = new Date(data.DateOfTheWorkshop);
  let formatedUpdatedDate = `${updatedDate.getDate()}. ${
    updatedDate.getMonth() + 1
  }. ${updatedDate.getFullYear()}`;

  if (data.TimeOfTheWorkshop) {
    const time = data.TimeOfTheWorkshop.split(':');
    const date = new Date(data.DateOfTheWorkshop);
    date.setHours(time[0]);
    date.setMinutes(time[1]);
    updateDateWithTime = date;

    formatedUpdatedDate = `${updateDateWithTime.getDate()}. ${
      updateDateWithTime.getMonth() + 1
    }. ${updateDateWithTime.getFullYear()} ${updateDateWithTime.getHours()}:${
      updateDateWithTime.getMinutes() < 10
        ? '0' + updateDateWithTime.getMinutes()
        : updateDateWithTime.getMinutes()
    }`;
  }

  const disabledWorkshopClass = checkIfWorkshtopIsInFuture(
    updateDateWithTime ? updateDateWithTime : updatedDate
  )
    ? ''
    : 'opacity-50';

  return (
    <div
      data-testid='article'
      className={`${disabledWorkshopClass} flex flex-col w-full mb-10 md:w-[calc(33%_-_2rem)] xl:w-[calc(33%_-_4rem)] px-0 md:mx-4 xl:mx-8 shadow-lg shadow-slate-300 dark:shadow-none dark:border-solid dark:border-2 dark:border-slate-600`}>
      <div
        className={` relative w-full min-h-[200px] md:min-h-[300px] mb-0`}>
        <Image
          src={data.Image.data.attributes.url}
          layout='fill'
          alt={
            data.Image.data.attributes.caption
              ? data.Image.data.attributes.caption
              : data.Title
          }
          objectFit='cover'
          objectPosition='center'
        />
      </div>
      <div className='flex flex-col px-4 py-4 dark:border-t-2 dark:border-slate-600 h-full'>
        <div className='h-full'>
          <Link
            href={`/poradame/${data.Url}`}
            className='hover:underline text-primary dark:text-secondary'>
            <h2 className='mb-0 text-center text-xl xl:text-2xl font-black text-primary dark:text-secondary'>
              {data.Title}
            </h2>
          </Link>
          <time
            dateTime={formatedUpdatedDate}
            className='block mb-4 text-lg text-center dark:text-white '>
            {formatedUpdatedDate}
          </time>

          <p className='mb-0 dark:text-white text-justify'>{data.Perex}</p>
        </div>
      </div>
    </div>
  );
};
