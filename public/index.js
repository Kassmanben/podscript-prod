import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from 'react-apollo';
import './app.css';
const client = new ApolloClient({
  uri: "http://localhost:4000"
});

ReactDOM.render(
    <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    , document.getElementById('episodeBody'));
