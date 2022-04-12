import {ApolloClient, InMemoryCache} from "@apollo/client";
import {CachePersistor, LocalStorageWrapper} from 'apollo3-cache-persist';

const cache = new InMemoryCache();


/*const persistor = new CachePersistor({
    cache,
    storage: new LocalStorageWrapper(window.localStorage ? window.localStorage : null),
    trigger: "write",
    debug: true,
});*/

const client = new ApolloClient({
    uri: "http://localhost:3201/query",
    cache,
});


export const readQuery = ({query, variables = {}}) => client.readQuery({query, variables});

export default client;
