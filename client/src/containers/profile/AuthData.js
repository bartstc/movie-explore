import React from 'react';
import styled from 'styled-components';
import { device, fonts, colors } from '../../utils/styles';

import TextFieldGroup from '../../components/UI/inputs/TextFieldGroup';
// import Button from '../../components/UI/Button';

const AuthData = () => {
  return (
    <>
      <h2 className="list-title">Movies to watch: 4</h2>
      <ul className="movies-list">
        <li className="movie-item">
          <div>
            <p className="movie-title">Venom</p>
            <p className="movie-genres">Action, Sci-Fi</p>
          </div>
          <button className="remove">x</button>
        </li>
        <li className="movie-item">
          <div>
            <p className="movie-title">Venom</p>
            <p className="movie-genres">Action, Sci-Fi</p>
          </div>
          <button className="remove">x</button>
        </li>
        <li className="movie-item">
          <div>
            <p className="movie-title">Venom</p>
            <p className="movie-genres">Action, Sci-Fi</p>
          </div>
          <button className="remove">x</button>
        </li>
      </ul>
      <h2 className="list-title">Recommended by friends: 2</h2>
      <ul className="movies-list">
        <li className="movie-item">
          <div>
            <p className="movie-title">Venom</p>
            <p className="movie-genres">Action, Sci-Fi</p>
          </div>
          <button className="remove">x</button>
        </li>
        <li className="movie-item">
          <div>
            <p className="movie-title">Venom</p>
            <p className="movie-genres">Action, Sci-Fi</p>
          </div>
          <button className="remove">x</button>
        </li>
      </ul>
      <h2 className="list-title">Friends: 6</h2>
      <FriendsList>
        <FriendItem>
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
          <button className="remove">x</button>
        </FriendItem>
        <FriendItem>
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
          <button className="remove">x</button>
        </FriendItem>
        <FriendItem>
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
          <button className="remove">x</button>
        </FriendItem>
        <FriendItem>
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
          <button className="remove">x</button>
        </FriendItem>
      </FriendsList>
      <h2 className="list-title">Invitations: 2</h2>
      <FriendsList>
        <FriendItem>
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
          <button className="remove">x</button>
        </FriendItem>
      </FriendsList>

      <TextFieldGroup
        label="Find friend:"
        placeholder="Friend username ..."
        id="friendUsername"
        name="friendUsername"
      // value={password || ''}
      // onChange={onChange}
      />
      <ul>
        <FindFriends>
          <FriendItem>
            <i className="far fa-user" />
            <p className="username">JohnDoe</p>
          </FriendItem>
        </FindFriends>
      </ul>
    </>
  );
};

const FriendsList = styled.ul`
  display: grid;
  margin-bottom: 1.2em;
  

  @media ${device.mobileL} {
    grid-column-gap: .8em;
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${device.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FriendItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .65em;

  @media ${device.mobileL} {
    max-width: 180px;
  }

  .username {
    font-size: .8em;
    font-weight: ${fonts.fontLight};
    padding-left: .3em;
  }

  .remove {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 30px;
  }
`;

const FindFriends = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default AuthData;