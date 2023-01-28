import Head from 'next/head';
import Image from 'next/legacy/image';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { Heading } from '../../components/Tags/Heading';
import ReactMarkdown from 'react-markdown';
import { ExpertPage } from '../../components/Pages/ExpertPage';

export default function Expert({ pageData }) {
  const pageTitle = `ABA Brno - ${pageData.Name}`;
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto px-4 py-5 dark:text-white md:py-10'>
        <ExpertPage pageData={pageData} />
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
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query getExpert {
        therapeutists(filters: { Url: { eq: "${params.slug}" } }) {
          data {
            attributes {
              Name
              Perex
              Url
              Email
              ImportantInfo
              TabText {
                id
                Title
                Text
              }
              Image {
                data {
                  attributes {
                    url
                  }
                }
              }
              social_media_sites {
                data {
                  attributes {
                    Title
                    Url
                    Logo
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
