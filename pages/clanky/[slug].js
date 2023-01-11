import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { Heading } from '../../components/Tags/Heading';
import ReactMarkdown from 'react-markdown';

export default function Article({ pageData }) {
  console.log(pageData);

  const wordsPerMinute = 225;
  const totalNumberOfWordsInArticle =
    pageData.Text.trim().split(/\s+/).length;
  const totalMinutesToread = Math.ceil(
    totalNumberOfWordsInArticle / wordsPerMinute
  );

  const createdDate = new Date(pageData.createdAt);
  const formatedDate = `${createdDate.getDate()}. ${
    createdDate.getMonth() + 1
  }. ${createdDate.getFullYear()}`;

  const updatedDate = new Date(pageData.updatedAt);
  const formatedUpdatedDate = `${updatedDate.getDate()}. ${
    updatedDate.getMonth() + 1
  }. ${updatedDate.getFullYear()}`;

  return (
    <div>
      <Head>
        <title>ABA Brno</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container max-w-5xl mx-auto px-4 py-5 dark:text-white md:py-10'>
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

        <p className='mb-2 text-sm text-right	'>{`${totalMinutesToread} minuty čtení`}</p>
        <div className='mb-10'>
          <div className='relative w-full h-80 max-w-5xl mx-auto '>
            <Image
              src={pageData.Image.data.attributes.url}
              alt={pageData.Name}
              layout='fill'
              objectFit='cover'
              objectPosition='center'
            />
          </div>
          {pageData.Image.data.attributes.caption ? (
            <p className='block text-sm text-center mt-2 dark:text-gray-400'>
              {`Zdroj: ${pageData.Image.data.attributes.caption}`}
            </p>
          ) : (
            ''
          )}
        </div>

        <div className='max-w-5xl mx-auto textContainer'>
          <ReactMarkdown>{pageData.Text}</ReactMarkdown>
        </div>

        <hr className='mt-6 mb-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mt-8 lg:mb-4'></hr>
        <div className='text-sm	text-right dark:text-gray-400'>
          {pageData.Author.data ? (
            <p className='mb-0'>
              {`Autor: `}
              <span className='dark:text-white'>
                {pageData.Author.data.attributes.Name}
              </span>
            </p>
          ) : (
            ''
          )}
          <div>
            <p className='mb-0'>
              Datum zveřejnění:{' '}
              <time
                datetime={pageData.createdDate}
                className='dark:text-white'>
                {formatedDate}
              </time>
            </p>
          </div>

          {formatedUpdatedDate != formatedDate ? (
            <div>
              <p className='mb-0'>
                Poslední aktualizace:{' '}
                <time datetime={pageData.updatedAt}>
                  {formatedUpdatedDate}
                </time>
              </p>
            </div>
          ) : (
            ''
          )}
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
              createdAt
              updatedAt
              Author {
                data {
                  attributes {
                    Name
                  }
                }
              }
              Image {
                data {
                  attributes {
                    url
                    caption
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
