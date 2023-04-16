import Head from 'next/head';
import Image from 'next/legacy/image';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { Heading } from '../../components/Tags/Heading';
import ReactMarkdown from 'react-markdown';
import { ExpertPage } from '../../components/Pages/ExpertPage';
import { Header } from '../../components/Header/Header';
import { MainFooter } from '../../components/Footer/MainFooter';

export default function Expert({ pageData, headerMenu, footerMenu, setting }) {
  return (
    <div>
      <Head>
        <title>{`${pageData.Title} | ${setting.SiteName}`}</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header headerMenu={headerMenu} />
      <main className='container mx-auto px-4 py-5 dark:text-white md:py-10'>
        <ExpertPage pageData={pageData} />
      </main>

      <MainFooter footerMenu={footerMenu} setting={setting} />
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
              TextBeforePricelist
              TextAfterPriceList
              PriceList {
                id
                LeftRow
                RightRow
              }
            }
          }
        }

        
        headerMenu {
          data {
            id
            attributes {
              Menu {
                main_page {
                  data {
                    id
                    attributes {
                      Title
                      Url
                    }
                  }
                }
                submenu_pages {
                  data {
                    id
                    attributes {
                      Title
                      Url
                    }
                  }
                }
              }
            }
          }
        }
        footerMenu {
          data {
            attributes {
              Menu {
                id
                Title
                pages {
                  data {
                    attributes {
                      Url
                      Title
                    }
                  }
                }
              }
            }
          }
        }
        setting {
          data {
            attributes {
              SiteName
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
      headerMenu: data.headerMenu.data.attributes,
      footerMenu: data.footerMenu.data.attributes,
      setting: data.setting.data.attributes,
    },
  };
}
