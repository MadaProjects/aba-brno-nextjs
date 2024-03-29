import dynamic from 'next/dynamic';

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/legacy/image';
import { gql } from '@apollo/client';
import client from '../appolo-client';

import { Header } from '../components/Header/Header';
import { MainFooter } from '../components/Footer/MainFooter';
import { SimpleText } from '../components/Text/SimpleText';
import { TextWithImage } from '../components/Text/TextWithImage';
import { TextOnImage } from '../components/Text/TextOnImage';
import { ExpertsList } from '../components/Lists/ExpertsList';
import { DynamicZone } from '../components/DynamicZone/DynamicZone';

import styles from '../styles/Home.module.css';

export default function Home({
  pageData,
  allWorkshops,
  headerMenu,
  footerMenu,
  setting,
}) {
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

      <Header headerMenu={headerMenu} />

      <main className={styles.main}>
        {dymamicComponents.map((elementInZone, i) => {
          if (elementInZone.__typename === 'ComponentPageTextWithImage') {
            numberOfTextWithImageBlocks++;
          }

          if (
            elementInZone.__typename !== 'ComponentNewPageDecorativeImg'
          ) {
            numberOfDynamicBlocks++;
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

      <MainFooter footerMenu={footerMenu} setting={setting} />
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
                ... on ComponentNewPageContactForm {
                  WhereSendEmailsFromForm
                }

                ... on ComponentNewPagePage {
                  Title
                  TextUnderTitle
                  ButtonText
                  ListOf
                  ShowAll
                }


                ... on ComponentNewPageTextWithPhotoEffect {
                  TitleOnPage
                  PhotoBlock {
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
                
                ... on ComponentNewPageTextSlider {
                  Image {
                    data {
                      attributes {
                        url
                        name
                        caption
                      }
                    }
                  }
                Slide {
                  Text
                  TextUnder
                }
              }
                
                ... on ComponentNewPageTextOnImage {
                  Titlee: Title
                  Perex
                  Textt: Text
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
                    workshop {
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

                ... on ComponentNewPageTextWithImage {
                  TextWithImageBlock {
                    Title
                    Perex
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
                    workshop {
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
                
                
                ... on ComponentNewPageSliderNew {
                  ComponentName
                  Slide {
                    id
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
                    workshop {
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
                
                ... on ComponentNewPageDecorativeImg {
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

                ... on ComponentNewPageText {
                  Text {
                    Title
                    Perex
                    Text
                    ButtonText
                    ExternalUrl

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
                    workshop {
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
      pageData: data.pages.data[0],
      allWorkshops: data.workshops.data,
      headerMenu: data.headerMenu.data.attributes,
      footerMenu: data.footerMenu.data.attributes,
      setting: data.setting.data.attributes,
    },
  };
}
