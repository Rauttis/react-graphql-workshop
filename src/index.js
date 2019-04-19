import ApolloClient from 'apollo-boost';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

const client = new ApolloClient({
  uri: `${window.location.protocol}//${
    window.location.host
  }/.netlify/functions/graphql`,
  headers: {
    authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZ2xubnJ5cyJ9.zWPZZQrX7SIrsEqnsLov4yTUWNmw-Fp95ueSt1J4f-A',
  },
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
