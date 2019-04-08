import React, { useState } from 'react';
import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';
import { Link } from 'react-router-dom';
import { ApolloConsumer } from 'react-apollo';
import { SEARCH_FRIENDS } from '../../queries';

import TextFieldGroup from '../../components/UI/inputs/TextFieldGroup';

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
            <FindFriends>
              {searchResults.map(({ username }) => (
                <li key={username}>
                  <i className="far fa-user" />
                  <Link to={`/user/${username}`} className="username">{username}</Link>
                </li>
              ))}
            </FindFriends>
          </>
        )
      }}
    </ApolloConsumer>
  );
};

const FindFriends = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  .username {
    font-size: 1em;
    font-weight: ${fonts.fontLight};
    color: ${colors.mainWhite};
    padding-left: 1em;
  }
`;

export default SearchFriend;