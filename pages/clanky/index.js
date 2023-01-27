import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../../appolo-client';
import { SimpleText } from '../../components/Text/SimpleText';
import { TextWithImage } from '../../components/Text/TextWithImage';
import { TextOnImage } from '../../components/Text/TextOnImage';
import { ExpertsList } from '../../components/Lists/ExpertsList';
import styles from '../../styles/Home.module.css';

import { useState } from 'react';
import { DynamicZone } from '../../components/DynamicZone/DynamicZone';

export default function Home({ mainMenu, pageData }) {
  console.log('Page data');
  console.log(pageData);

  let numberOfTextWithImageBlocks = 0;

  const dymamicComponents = pageData.attributes.pageDynamicZone;

  return (
    <div className={styles.container}>
      <Head>
        <title>ABA Brno</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        {dymamicComponents.map((elementInZone, i) => {
          if (elementInZone.__typename === 'ComponentPageTextWithImage') {
            numberOfTextWithImageBlocks++;
          }
          return (
            <DynamicZone
              element={elementInZone}
              key={i}
              numberOfTextWithImageBlocks={numberOfTextWithImageBlocks}
            />
          );
        })}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query getPage {
        pages(filters: { Url: { eq: "clanky" } }) {
          data {
            attributes {
              Title
              pageDynamicZone {
                __typename
                ... on ComponentPagePage {
                  Title
                  GraphicTitleSignpost: GraphicTitle
                  TextUnderTitle
                  ButtonText
                  ListOf
                }
                ... on ComponentPageTextOnImage {
                  text_on_image {
                    data {
                      attributes {
                        Title
                        Perex
                        Text
                        ButtonText
                        ExternalUrl
                        InternalUrl
                        BackgroundImage {
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
                ... on ComponentPageNiceTitle {
                  Title
                  GraphicTitle
                  TextUnder
                }
                ... on ComponentPageTextWithImage {
                  text_block_with_image {
                    data {
                      attributes {
                        Title
                        Perex
                        Text
                        ButtonText
                        ExternalUrl
                        InternalUrl
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
                ... on ComponentPageText {
                  text_block {
                    data {
                      attributes {
                        Title
                        Perex
                        Text
                        ButtonText
                        ExternalUrl
                        BackgroundColor
                        InternalUrl {
                          data {
                            attributes {
                              Url
                            }
                          }
                        }
                      }
                    }
                  }
                }
                ... on ComponentPageSlider {
                  sliders {
                    data {
                      attributes {
                        Title
                        Text
                        ExternalUrl
                        ButtonText
                        article {
                          data {
                            attributes {
                              Url
                            }
                          }
                        }
                        expert {
                          data {
                            attributes {
                              Url
                            }
                          }
                        }
                        page {
                          data {
                            attributes {
                              Url
                            }
                          }
                        }
                        Image {
                          data {
                            attributes {
                              url
                              name
                              caption
                            }
                          }
                        }
                      }
                    }
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
      pageData: data.pages.data[0],
    },
  };
}

/*
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug: 'test' } }],
    fallback: false,
  };
}
*/
/*
export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query MainMenu {
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
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      mainMenu: data,
    },
  };
}
*/
