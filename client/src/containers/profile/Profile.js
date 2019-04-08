import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { profileBasic } from '../../utils/styles';
import { withRouter, Redirect } from 'react-router-dom';
import { ModalContext } from '../../utils/UIstore';
import { Query, Mutation } from 'react-apollo';
import { SEND_INVITATION, REMOVE_FRIEND, GET_USER } from '../../queries';

import MovieItem from './MovieItem';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

const Profile = ({ session, match, refetch }) => {
  const { username } = match.params;

  const { handleModal } = useContext(ModalContext);
  const [isFriend, setFriend] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    console.log('Profile component mounted');
    if (session.getCurrentUser) {
      const { friends } = session.getCurrentUser;
      console.log(username);

      setCurrentUsername(session.getCurrentUser.username);
      let isOnFriendList = friends.filter(f => f === username).length > 0;
      console.log(friends.filter(f => f === username));
      setFriend(isOnFriendList);
    };
  }, []);

  const onClick = (sendInvitation, removeFriend) => {
    handleMutation(sendInvitation, removeFriend);
  };

  const handleMutation = (sendInvitation, removeFriend) => {
    if (!isFriend) {
      sendInvitation().then(async () => {
        handleModal('Invitation sent!');
        await refetch(); // refetch getCurrentUser query
      })
        .catch(err => handleModal(err.message.substring(15), true));
    } else {
      const confirmRemove = window.confirm('Are you sure?');
      if (confirmRemove) removeFriend().then(async () => {
        setFriend(false);
        await refetch();
      });
    };
  };

  return (
    <Query query={GET_USER} variables={{ username }}>
      {({ data, loading, error }) => {
        if (loading) return <Spinner />
        if (error) return (
          <>
            {handleModal('Error! Something went wrong!', true)}
            <Redirect to="/" />
          </>
        );

        const { watched, liked } = data.getUser;

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
            {session.getCurrentUser && session.getCurrentUser.username !== username &&
              <Mutation
                mutation={SEND_INVITATION}
                variables={{ senderUsername: currentUsername, username }}>
                {sendInvitation => (
                  <Mutation
                    mutation={REMOVE_FRIEND}
                    variables={{ currentUsername, friendUsername: username }}>
                    {removeFriend => (
                      <Button
                        onClick={() => onClick(sendInvitation, removeFriend)}>
                        {isFriend ? 'Remove friend' : 'Add to friend'}
                      </Button>
                    )}
                  </Mutation>
                )}
              </Mutation>
            }
          </ProfileWrapper>
        )
      }}
    </Query>
  )
};

const ProfileWrapper = styled.section`
  ${profileBasic}
`;

export default withRouter(Profile);