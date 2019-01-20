import { ApolloClient } from 'apollo-client';
import Cookies from 'universal-cookie';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

const cookies = new Cookies();

export default () => {
  let locationOrigin = 'www.mplay.run';
  if (typeof window !== 'undefined') {
    locationOrigin = window.location.host;
  }

  let httpProtocole = 'http:';
  let cache;
  if (typeof window !== 'undefined') {
    httpProtocole = window.location.protocol;
    cache = new InMemoryCache().restore(window.__APOLLO_STATE__)
  } else {
    cache = new InMemoryCache({})
  }

  const GRAPHQL_ENDPOINT = `${httpProtocole}//${locationOrigin}/graphql`;

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message }) => {
      console.error(`[GraphQL error]: ${message}`);
      }
      );
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });


  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: cookies.get('jwt') ? `Bearer ${cookies.get('jwt')}` : null,
      }
    }
  });

  const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    // Add the cookie
    // This way the backend can refresh the jwt
    credentials: 'same-origin',
  });

  const link = authLink.concat(errorLink.concat(httpLink));

  const client = new ApolloClient({
    link,
    cache,
  });

  return client;
}
