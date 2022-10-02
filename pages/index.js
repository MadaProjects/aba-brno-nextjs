import Head from 'next/head';
import Image from 'next/image';
import { SimpleText } from '../components/Text/SimpleText';
import styles from '../styles/Home.module.css';

export default function Home() {
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
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
