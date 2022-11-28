import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { Heading } from '../../components/Tags/Heading';
import ReactMarkdown from 'react-markdown';

export default function Article({ pageData }) {
  return (
    <div>
      <Head>
        <title>ABA Brno</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto px-4 py-5 dark:text-white md:py-10'>
        <Heading level={1} headingClass='max-w-5xl mx-auto'>
          {pageData.Title}
        </Heading>
        {pageData.Perex ? (
          <p className='italic mb-7 text-center max-w-lg mx-auto'>
            {pageData.Perex}
          </p>
        ) : (
          ''
        )}

        <div className='max-w-5xl mx-auto'>
          <ReactMarkdown>{pageData.Text}</ReactMarkdown>
        </div>
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles`
  );
  const articles = await res.json();

  const paths = articles.data.map((article) => ({
    params: { slug: article.attributes.Url },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query getPage {
        articles(filters: { Url: { eq: "${params.slug}" } }) {
          data {
            attributes {
              Title
              Perex
              Text
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      pageData: data.articles.data[0].attributes,
    },
  };
}
