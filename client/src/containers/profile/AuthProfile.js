import React from 'react';
import styled from 'styled-components';
import { profileBasic } from '../../utils/styles';

import MovieItem from './MovieItem';
import FriendItem from './FriendItem';
import InvitationItem from './InvitationItem';
import SearchFriend from './SearchFriend';

const AuthData = ({ session, refetch }) => {
  const { username, friends, invitations, toWatch, watched, liked } = session.getCurrentUser;

  return (
    <ProfileWrapper>
      <header>
        <h1 className="title">{username}</h1>
      </header>
      <div className="content-wrapper">
        <div className="list-wrapper">
          <h2 className="list-title">Watched movies: {watched.length}</h2>
          {(!watched.length > 0)
            ? <p className="alt">No viewed movies.</p>
            : <ul>
              {watched.map(movie => (
                <MovieItem key={movie._id} {...movie} />
              ))}
            </ul>
          }
        </div>
        <div className="list-wrapper">
          <h2 className="list-title">Liked movies: {liked.length}</h2>
          {(!liked.length > 0)
            ? <p className="alt">No liked movies.</p>
            : <ul>
              {liked.map(movie => (
                <MovieItem key={movie._id} {...movie} />
              ))}
            </ul>
          }
        </div>
      </div>
      <h2 className="list-title">Movies to watch: 4</h2>
      {(!toWatch.length > 0)
        ? <p className="alt">No movies to watch.</p>
        : <ul>
          {toWatch.map(movie => (
            <MovieItem key={movie._id} {...movie} />
          ))}
        </ul>
      }
      <div className="content-wrapper">
        <div>
          <h2 className="list-title">Friends: {friends.length}</h2>
          {(!friends.length > 0)
            ? <p className="alt">You do not have any friends.</p>
            : <ul>
              {friends.map(f => (
                <FriendItem key={f} friendUsername={f} currentUsername={username} refetch={refetch} />
              ))}
            </ul>
          }
        </div>
        <div>
          <h2 className="list-title">Invitations: {invitations.length}</h2>
          {(!invitations.length > 0)
            ? <p className="alt">You do not have any invitations.</p>
            : <ul>
              {invitations.map(inv => (
                <InvitationItem key={inv} friendUsername={inv} currentUsername={username} refetch={refetch} />
              ))}
            </ul>
          }
        </div>
      </div>
      <SearchFriend />
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.section`
  ${profileBasic};
`;

export default AuthData;