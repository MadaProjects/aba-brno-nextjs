import { ApolloClient, InMemoryCache } from '@apollo/client';

// TODO add uri to env
const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

export default client;
