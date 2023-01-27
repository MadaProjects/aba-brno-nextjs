import { useState, useEfect } from 'react';
import useSWR from 'swr';
import { NiceTitle } from '../Text/NiceTitle';
import { Article } from './Article';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// TODO get only x articles from api
export const ArticlesList = ({
  headingText = '',
  perex = '',
  graphicText = '',
  doNotShowArticleWithThisUrl = false,
}) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate[0]=Image`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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
      className='container mx-auto px-4 py-5 md:py-10'>
      {headingText ? (
        <NiceTitle
          headingText={headingText}
          perex={perex}
          graphicText={graphicText}
        />
      ) : (
        ''
      )}
      <div className='flex flex-col md:flex-row'>
        {onlyThreeArticles.map((article, i) => (
          <Article key={i} data={article.attributes} />
        ))}
      </div>

      <div className='container mx-auto px-6 xl:px-12 text-center md:text-right'>
        <a
          href=''
          className='px-8 py-3 mt-4 inline-block font-black bg-primary text-white leading-none border-solid border-2 border-primary transition-colors duration-300 ease-in-out hover:bg-white hover:text-primary dark:bg-secondary dark:border-secondary dark:hover:text-white dark:hover:bg-transparent'>
          všechny články
        </a>
      </div>
    </div>
  );
};
