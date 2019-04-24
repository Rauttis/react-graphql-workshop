import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React from 'react';
import { Router } from '@reach/router';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Profile from '../pages/Profile';

const currentUserQuery = gql`
  query getCurrentUser {
    me {
      id
      username
      displayName
      photo
    }
  }
`;

const App = () => (
  <Query query={currentUserQuery}>
    {({ data, loading, error }) => {
      if (error) return `Error: ${error.message}`;

      const { me } = data;

      return (
        <>
          <Navbar me={me} />
          <Router primary={false}>
            <Home loading={loading} me={me || {}} path="/" />
            <Profile loading={loading} me={me || {}} path="/:username" />
          </Router>
        </>
      );
    }}
  </Query>
);

export default App;
