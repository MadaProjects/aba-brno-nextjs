import Head from 'next/head';
import Image from 'next/legacy/image';
import { gql } from '@apollo/client';
import client from '../appolo-client';
import { SimpleText } from '../components/Text/SimpleText';
import { TextWithImage } from '../components/Text/TextWithImage';
import { TextOnImage } from '../components/Text/TextOnImage';
import { ExpertsList } from '../components/Lists/ExpertsList';
import styles from '../styles/Home.module.css';

import { useState } from 'react';
import { DynamicZone } from '../components/DynamicZone/DynamicZone';

export default function Home({ mainMenu, pageData, allWorkshops }) {
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

      <main className={styles.main} role='main'>
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

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: gql`
      query getPage {
        pages(filters: { Url: { eq: "homepage" } }) {
          data {
            attributes {
              Title
              pageDynamicZone {
                __typename

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
                ... on ComponentPagePage {
                  Title
                  GraphicTitleSignpost: GraphicTitle
                  TextUnderTitle
                  ButtonText
                  ListOf
                  ShowAll
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
                    data {
                      attributes {
                        Title
                        Text
                        TextUnder
                      }
                    }
                  }
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
                ... on ComponentPageSlider {
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
              }
            }
          }
        }
        workshops(sort: "DateOfTheWorkshop:desc") {
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
