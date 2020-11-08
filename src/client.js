/*eslint no-undef: 0*/

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';

const http = new HttpLink({ uri: 'https://pangaea-interviews.now.sh/api/graphql' });
const delay = setContext(
  () =>
    new Promise((success) => {
      setTimeout(() => {
        success();
      }, 800);
    }),
);

const link = ApolloLink.from([delay, http]);
const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
