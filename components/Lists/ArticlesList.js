import { useState, useEfect } from 'react';
import useSWR from 'swr';
import { NiceTitle } from '../Text/NiceTitle';
import { Article } from './Article';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

// TODO get only x articles from api
export const ArticlesList = ({ headingText, perex, graphicText }) => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate[0]=Image`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const onlyThreeArticles = data.data.filter((article, i) =>
    i < 3 ? true : false
  );

  return (
    <div
      data-testid='articlesList'
      className='container mx-auto px-4 py-5 md:py-10'>
      <NiceTitle
        headingText={headingText}
        perex={perex}
        graphicText={graphicText}
      />
      <div className='flex'>
        {onlyThreeArticles.map((article, i) => (
          <Article key={i} data={article.attributes} />
        ))}
      </div>
    </div>
  );
};
