import { useState, useEfect } from 'react';
import useSWR from 'swr';
import { NiceTitle } from '../Text/NiceTitle';
import { Article } from './Article';
import { Spinner } from '../Spinner';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// TODO get only x articles from api
export const ArticlesList = ({
  headingText = '',
  perex = '',
  graphicText = '',
  doNotShowArticleWithThisUrl = false,
  showAll,
  headingLevel,
}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className='my-10 md:my-16'>
        <Spinner />
      </div>
    );

  let numberOfArticlesInFilteredArticles = 0;
  const onlyThreeArticles = data.data.filter((article, i) => {
    if (
      doNotShowArticleWithThisUrl &&
      doNotShowArticleWithThisUrl == article.attributes.Url
    ) {
      return false;
    }
    if (numberOfArticlesInFilteredArticles <= 3) {
      numberOfArticlesInFilteredArticles++;
      return true;
    }

    return false;
  });

  return (
    <div
      data-testid='articlesList'
      className='container mx-auto px-4 pt-5 pb-10 md:pt-10 md:pb-12 md:px-0'>
      {headingText ? (
        <NiceTitle
          headingText={headingText}
          perex={perex}
          graphicText={graphicText}
          headingLevel={headingLevel}
        />
      ) : (
        ''
      )}
      <div className='flex flex-col md:flex-row'>
        {onlyThreeArticles.map((article, i) => (
          <Article key={i} data={article.attributes} />
        ))}
      </div>
      {!showAll && (
        <div className='container mx-auto px-6 xl:px-12 text-center md:text-right'>
          <a
            href=''
            className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-tertiary dark:border-tertiary dark:hover:text-white dark:hover:bg-transparent'>
            Všechny články
          </a>
        </div>
      )}
    </div>
  );
};
