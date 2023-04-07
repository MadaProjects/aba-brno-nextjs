import { useState, useEffect } from 'react';
import Link from 'next/link';

export const Slider = ({ slides, headingLevel }) => {
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

  const heightVar = 'h-[60vh] min-h-[400px] lg:min-h-[550px]';

  return (
    <div className='pb-6'>
      {slides.map((slide, i) => {
        let slideBtnUrl = '';
        let openInNewTab = false;

        if (slide.ExternalUrl) {
          slideBtnUrl = slide.ExternalUrl;
          openInNewTab = true;
        } else if (slide.article.data) {
          slideBtnUrl = `../clanky/${slide.article.data.attributes.Url}`;
        } else if (slide.expert.data) {
          slideBtnUrl = `../odbornici/${slide.expert.data.attributes.Url}`;
        } else if (slide.page.data) {
          slideBtnUrl = `../${slide.page.data.attributes.Url}`;
        } else if (slide.workshop.data) {
          slideBtnUrl = `../poradame/${slide.workshop.data.attributes.Url}`;
        }

        return (
          <div
            key={`slide-${i}`}
            className={
              i + 1 == activeIndex
                ? `block mx-auto relative bg-no-repeat bg-center bg-cover ${heightVar}`
                : `hidden mx-auto relative bg-no-repeat bg-center bg-cover ${heightVar}`
            }
            style={{
              backgroundImage: `url(${slide.Image.data.attributes.url})`,
            }}>
            <div className='container h-full h-full mx-auto px-4 py-4 lg:py-20 lg:px-6 relative'>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:left-6 md:top-[initial] md:right-[initial] md:bottom-20 md:translate-x-0 md:translate-y-0 bg-black/80 w-[300px] md:w-[400px] xl:w-[450px] text-white px-4 py-4 md:px-10 md:py-6'>
                {headingLevel === 1 && i === 0 ? (
                  <h1 className='font-black text-lg text-center md:text-xl'>
                    {slide.Title}
                  </h1>
                ) : (
                  <h2 className='font-black text-lg text-center md:text-xl'>
                    {slide.Title}
                  </h2>
                )}

                {slide.Text && (
                  <p className='mb-0 mt-4 text-center'>{slide.Text}</p>
                )}

                {slide.ButtonText && slideBtnUrl && (
                  <div className='text-center mt-4'>
                    {openInNewTab ? (
                      <a
                        href={slideBtnUrl}
                        rel='noopener noreferrer'
                        target='_blank'
                        className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent tracking-wider		'>
                        {slide.ButtonText}
                      </a>
                    ) : (
                      <Link
                        href={slideBtnUrl}
                        className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out 	hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent tracking-wider		'>
                        {slide.ButtonText}
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </div>

            {slide.Image.data.attributes.caption && (
              <p
                className='absolute bottom-[-20px] right-0 mb-0 text-xs pr-2 text-right text-slate-600 dark:text-slate-400'
                dangerouslySetInnerHTML={{
                  __html: urlify(slide.Image.data.attributes.caption),
                }}></p>
            )}
          </div>
        );
      })}

      {slides.length > 1 ? (
        <div className='flex items-center justify-center mt-6 lg:mt-4'>
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
