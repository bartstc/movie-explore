import React, { useState } from 'react';
import styled from 'styled-components';
import { sectionBasic, device } from '../utils/styles';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_MOVIES } from '../queries';

import TextFieldGroup from '../components/UI/inputs/TextFieldGroup';
import MovieWrapper from '../components/UI/MovieWrapper';

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

const ExploreWrapper = styled.section`
  ${sectionBasic}

  .movies-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: .3em;

    @media ${device.mobileL} {
      max-width: 510px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fill, 120px); 
      grid-column-gap: .5em;
    }
  }
`;

export default Explore;