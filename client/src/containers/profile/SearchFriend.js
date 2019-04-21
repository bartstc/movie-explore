import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_FRIENDS } from './queries';
import { SearchWrapper } from './styled';

import TextFieldGroup from '../../shared/inputs/TextFieldGroup';

const SearchFriend = () => {
  const [searchResults, setSearchResults] = useState([]);


  const onChange = ({ searchFriends }) => {
    setSearchResults(searchFriends);
  };

  return (
    <ApolloConsumer>
      {client => {
        return (
          <>
            <TextFieldGroup
              label="Find friend:"
              placeholder="Friend username ..."
              id="friendUsername"
              name="friendUsername"
              onChange={async e => {
                e.persist();
                const { data } = await client.query({
                  query: SEARCH_FRIENDS,
                  variables: { keyword: e.target.value }
                });
                onChange(data);
              }}
            />
            <SearchWrapper>
              {searchResults.map(({ username }) => (
                <li key={username}>
                  <i className="far fa-user" />
                  <Link to={`/user/${username}`} className="username">{username}</Link>
                </li>
              ))}
            </SearchWrapper>
          </>
        )
      }}
    </ApolloConsumer>
  );
};

export default SearchFriend;