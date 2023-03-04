import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/legacy/image';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { Heading } from '../../components/Tags/Heading';
import { ArticlesList } from '../../components/Lists/ArticlesList';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { ShareSocial } from '../../components/ShareSocial/ShareSocial';
import { WorkshopPage } from '../../components/Pages/WorkshopPage';

export default function Article({ pageData }) {
  const router = useRouter();

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

  // TODO check date format in time tag
  return (
    <div>
      <Head>
        <title>ABA Brno</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='container mx-auto' data-testid='articlePage'>
        <WorkshopPage pageData={pageData} />
      </main>

      <footer></footer>
    </div>
  );
}
export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Workshops`
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
  const { data } = await client.query({
    query: gql`
      query getPage {
        workshops(filters: { Url: { eq: "${params.slug}" } }) {
          data {
            attributes {
              Title
              Url
              Perex
              Text
              DateOfTheWorkshop
              TimeOfTheWorkshop
              RegistrationLinkForTheTorkshop
              therapeutists {
                data {
                  attributes {
                    Name
                    Url
                  }
                }
              }
              Poster {
                data {
                  attributes {
                    url
                    caption
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
      pageData: data.workshops.data[0].attributes,
    },
  };
}
