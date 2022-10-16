import { ApolloProvider } from '@apollo/client';
import client from '../appolo-client';
import { Layout } from '../components/Layout/Layout';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
