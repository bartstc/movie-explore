import React, { useState } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_MOVIES } from './queries';
import { ExploreWrapper } from './styled';

import TextFieldGroup from '../../shared/inputs/TextFieldGroup';
import MovieWrapper from '../../components/UI/MovieWrapper';

const Explore = () => {
  const [searchResults, setSearchResults] = useState([]);

  const onChange = ({ searchMovies }) => {
    setSearchResults(searchMovies);
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <ExploreWrapper>
            <TextFieldGroup
              label="Enter movie, director or category:"
              placeholder="Search ..."
              id="search"
              name="search"
              onChange={async e => {
                e.persist();
                const { data } = await client.query({
                  query: SEARCH_MOVIES,
                  variables: { keyword: e.target.value }
                });
                onChange(data);
              }}
            />
            <ul className="movies-list">
              {searchResults.map(movie => (
                <MovieWrapper key={movie._id} {...movie} />
              ))}
            </ul>
          </ExploreWrapper>
        )
      }}
    </ApolloConsumer>
  )
};

export default Explore;