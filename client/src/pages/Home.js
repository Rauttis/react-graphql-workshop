import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Input from '../components/Input';
import Tweets from '../components/Tweets';
import Loading from '../components/Loading'

import { Query } from 'react-apollo';
import { allTweetsQuery } from '../queries';

const Form = styled.form`
  display: flex;
  margin: 24px 0;
`;

const Home = ({ loading, me }) => {
  const [tweet, setTweet] = useState('');
  return (
    <Container>
      <Heading>Home</Heading>
      <Form
        onSubmit={event => {
          event.preventDefault();
        }}
      >
        <Input
          onChange={event => setTweet(event.target.value)}
          placeholder="What's happening?"
          value={tweet}
        />
        <Button primary disabled={loading || tweet === ''}>
          Tweet
        </Button>
      </Form>
      <Query query={allTweetsQuery}>
        {({ data, loading: tweetsLoading, error }) => {
          if (error) return <h3>Error</h3>
          if (tweetsLoading) return <Loading />
          const {tweets} = data
          return <Tweets loading={loading} me={me} tweets={tweets} />
        }}
      </Query>

    </Container>
  );
};

export default Home;
