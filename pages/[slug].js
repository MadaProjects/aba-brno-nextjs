import dynamic from 'next/dynamic';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/legacy/image';
import { gql } from '@apollo/client';
import client from '../appolo-client';

import { SimpleText } from '../components/Text/SimpleText';
import { TextWithImage } from '../components/Text/TextWithImage';
import { TextOnImage } from '../components/Text/TextOnImage';
import { ExpertsList } from '../components/Lists/ExpertsList';
import { DynamicZone } from '../components/DynamicZone/DynamicZone';

import styles from '../styles/Home.module.css';

/*
const SimpleText = dynamic(() => import('../components/Text/SimpleText'));

const TextWithImage = dynamic(() =>
  import('../components/Text/TextWithImage')
);

const TextOnImage = dynamic(() =>
  import('../components/Text/TextOnImage')
);

const ExpertsList = dynamic(() =>
  import('../components/Lists/ExpertsList')
);

const DynamicZone = dynamic(() =>
  import('../components/DynamicZone/DynamicZone')
);
*/

export default function Home({ pageData, allWorkshops }) {
  let numberOfTextWithImageBlocks = 0;
  let numberOfDynamicBlocks = -1;
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

          if (elementInZone.__typename !== 'ComponentPageSlider') {
            numberOfDynamicBlocks++;
          } else {
            if (elementInZone.ShowTextBlock === true) {
              numberOfDynamicBlocks++;
            }
          }

          return (
            <DynamicZone
              element={elementInZone}
              allWorkshops={allWorkshops}
              key={i}
              orderNumber={numberOfDynamicBlocks}
              numberOfTextWithImageBlocks={numberOfTextWithImageBlocks}
            />
          );
        })}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`);
  const pages = await res.json();

  const paths = pages.data.map((page) => ({
    params: { slug: page.attributes.Url },
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
        pages(filters: { Url: { eq: "${params.slug}" } }) {
          data {
            attributes {
              Title
              pageDynamicZone {
                __typename
                ... on ComponentPageContactForm {
                  WhereSendEmailsFromForm
                }

                ... on ComponentPagePage {
                  Title
                  GraphicTitleSignpost: GraphicTitle
                  TextUnderTitle
                  ButtonText
                  ListOf
                  ShowAll
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
                              name
                              caption
                            }
                          }
                        }
                      }
                    }
                  }
                }
                ... on ComponentPageTextSlider {
                  BackgroundImage {
                    data {
                      attributes {
                        url
                      }
                    }
                  }
                  text_on_sliders {
                    data{
                      attributes {
                        Title
                        Text
                        TextUnder
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
                              name
                              caption
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
                ...on ComponentPageSlider {
                  ShowTextBlock
                  SmallBanner
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
                
                ... on ComponentPagePhotoEfect {
                  Title
                  GraphicTitlePhotoEffect: GraphicTitle
                  TextUnderTitle
                  photo_efect_text {
                    data {
                      attributes {
                        Title
                        Text
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
        workshops(sort: "DateOfTheWorkshop:desc")  {
          data {
            attributes {
              Title
              Url
              Perex
              Text
              DateOfTheWorkshop
              TimeOfTheWorkshop
              RegistrationLinkForTheTorkshop
              Image {
                data {
                  attributes {
                    name
                    caption
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
      pageData: data.pages.data[0],
      allWorkshops: data.workshops.data,
    },
  };
}
