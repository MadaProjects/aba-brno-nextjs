import { ApolloProvider } from '@apollo/client';
import client from '../appolo-client';
import { Layout } from '../components/Layout/Layout';
//import { CookieConsent } from '../components/Banner/CookieConsent';

import '../styles/globals.css';

// TODO add cookie consent
// <CookieConsent />

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ApolloProvider client={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </div>
  );
}

export default MyApp;
