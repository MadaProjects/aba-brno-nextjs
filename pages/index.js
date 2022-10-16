import Head from 'next/head';
import Image from 'next/image';
import { gql } from '@apollo/client';
import client from '../appolo-client';
import { SimpleText } from '../components/Text/SimpleText';
import { TextWithImage } from '../components/Text/TextWithImage';
import { TextOnImage } from '../components/Text/TextOnImage';
import { ExpertsList } from '../components/Lists/ExpertsList';
import styles from '../styles/Home.module.css';

export default function Home({ mainMenu }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>ABA Brno</title>
        <meta name='description' content='ABA Brno' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1>Index page</h1>

        <div className='bg-sky-100 py-10'>
          <SimpleText
            headingLevel={1}
            headingText='Lorem ipsum'
            paragraphText='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Aliquam id dolor. Ut tempus purus at lorem. Donec iaculis gravida nulla. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Nam sed tellus id magna elementum tincidunt. Nunc dapibus tortor vel mi dapibus sollicitudin. Phasellus et lorem id felis nonummy placerat. Nunc tincidunt ante vitae massa. Fusce nibh.'
          />
        </div>
        <section>
          <TextWithImage
            headingLevel={1}
            headingText='Lorem ipsum'
            paragraphText='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Aliquam id dolor. Ut tempus purus at lorem. Donec iaculis gravida nulla. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Nam sed tellus id magna elementum tincidunt. Nunc dapibus tortor vel mi dapibus sollicitudin. Phasellus et lorem id felis nonummy placerat. Nunc tincidunt ante vitae massa. Fusce nibh.'
            imgUrl={`https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80`}
          />
        </section>
        <section>
          <TextOnImage
            headingLevel={1}
            headingText='Lorem ipsum'
            paragraphText='Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Aliquam id dolor. Ut tempus purus at lorem. Donec iaculis gravida nulla. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor. Nam sed tellus id magna elementum tincidunt. Nunc dapibus tortor vel mi dapibus sollicitudin. Phasellus et lorem id felis nonummy placerat. Nunc tincidunt ante vitae massa. Fusce nibh.'
            imgUrl={`https://images.unsplash.com/photo-1662581872277-0fd0bf3ae8f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80`}
          />
        </section>
        <section>
          <ExpertsList />
        </section>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
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
