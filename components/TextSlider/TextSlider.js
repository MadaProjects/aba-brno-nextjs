import { useState, useEffect } from 'react';

const urlify = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
      url +
      '" rel="noopener noreferrer" target="_blank">' +
      url +
      '</a>'
    );
  });
};

export const TextSlider = ({ slides, backgroundImage }) => {
  const [activeIndex, setActiveIndex] = useState(1);

  const goToSlide = (e) => {
    e.preventDefault();
    setActiveIndex(parseInt(e.target.value));
  };

  const goToPrevSlide = (e) => {
    e.preventDefault();

    const numberOfSlides = slides.length;
    let prevSliderNumber = activeIndex - 1;

    if (prevSliderNumber < 1) {
      prevSliderNumber = numberOfSlides;
    }

    setActiveIndex(prevSliderNumber);
  };

  const goToNextSlide = (e) => {
    e.preventDefault();

    const numberOfSlides = slides.length;
    let nextSliderNumber = activeIndex + 1;

    if (nextSliderNumber > numberOfSlides) {
      nextSliderNumber = 1;
    }

    setActiveIndex(nextSliderNumber);
  };

  // TODO automatic slider slideshow
  /*
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setTimeout(() => {
        const numberOfSlides = slides.length;
        let nextSliderNumber = activeIndex + 1;

        if (nextSliderNumber > numberOfSlides) {
          nextSliderNumber = 1;
        }

        setActiveIndex(nextSliderNumber);
      }, 5000);
    }
  }, [slides.length]);
  */

  return (
    <div>
      <div
        className='relative h-[30vh] min-h-[350px] bg-no-repeat bg-center bg-cover after:content-[""] after:bg-black/30 after:absolute after:inset-0 dark:after:bg-black/60'
        style={{
          backgroundImage: `url(${backgroundImage.data.attributes.url})`,
        }}>
        {slides.map((slide, i) => {
          return (
            <div
              key={`slide-${i}`}
              className={
                i + 1 == activeIndex
                  ? `block mx-auto relative h-full z-10`
                  : `hidden mx-auto relative h-full	z-10`
              }>
              <div className='container h-full h-full mx-auto px-4 py-10 lg:py-20 lg:px-6 relative'>
                <div className='md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 max-w-xl text-white px-4 py-4'>
                  {slide.Text && (
                    <p className='mb-0 mt-4 text-center'>{slide.Text}</p>
                  )}

                  {slide.TextUnder && (
                    <p className='mb-0 mt-4 text-center'>
                      <strong>{slide.TextUnder}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {backgroundImage.data.attributes.caption && (
          <p
            className='absolute bottom-0 z-20 right-0 mb-0 text-xs pr-2 text-right text-slate-400'
            dangerouslySetInnerHTML={{
              __html: urlify(backgroundImage.data.attributes.caption),
            }}></p>
        )}
      </div>

      {slides.length > 1 ? (
        <div
          className='flex items-center justify-center 
        mt-6 lg:mt-4'>
          <a
            href=''
            className='mx-4 p-px hover:scale-125 transition-transform duration-300 dark:text-slate-300'
            onClick={goToPrevSlide}
            rel='nofollow'
            title='Previous slide'
            aria-label='Previous slide'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-8 h-8'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 19.5L8.25 12l7.5-7.5'
              />
            </svg>

            <span className='sr-only'>Previous slide</span>
          </a>
          <a
            href=''
            className='mx-4 p-px hover:scale-125 transition-transform duration-300 dark:text-slate-300'
            onClick={goToNextSlide}
            rel='nofollow'
            title='Next slide'
            aria-label='Next slide'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-8 h-8'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M8.25 4.5l7.5 7.5-7.5 7.5'
              />
            </svg>

            <span className='sr-only'>Next slide</span>
          </a>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
