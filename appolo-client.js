import fetch from 'cross-fetch';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// TODO add uri to env
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://aba-brno-strapi.herokuapp.com/graphql',
    fetch,
  }),
  //uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

export default client;
