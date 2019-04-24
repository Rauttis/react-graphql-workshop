import React, { useEffect } from 'react';
import Tweet from './Tweet';

const Tweets = ({ loading, me, tweets, subscribeToNewTweets }) => {
  useEffect(() => {
    return subscribeToNewTweets && subscribeToNewTweets()
  })
  return tweets.length > 0
    ? tweets
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(tweet => (
          <Tweet key={tweet.id} loading={loading} me={me} tweet={tweet} />
        ))
    : 'No tweets yet.';
}

export default Tweets;
