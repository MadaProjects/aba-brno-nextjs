import Head from 'next/head';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { Heading } from '../../components/Tags/Heading';
import ReactMarkdown from 'react-markdown';

export default function Expert({ pageData }) {
  console.log(pageData.Name);
  const pageTitle = `ABA Brno - ${pageData.Name}`;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto px-4 py-5 dark:text-white md:py-10'>
        <Heading level={1} headingClass='max-w-5xl mx-auto'>
          {pageData.Name}
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
    `${process.env.NEXT_PUBLIC_API_URL}/api/therapeutists`
  );
  const experts = await res.json();

  const paths = experts.data.map((expert) => ({
    params: { slug: expert.attributes.Url },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  console.log('xxxx');
  const { data } = await client.query({
    query: gql`
      query getExpert {
        therapeutists(filters: { Url: { eq: "${params.slug}" } }) {
          data {
            attributes {
              Name
              Perex
              Url
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
      pageData: data.therapeutists.data[0].attributes,
    },
  };
}
