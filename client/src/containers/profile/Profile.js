import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { profileBasic } from '../../utils/styles';
import { withRouter, Redirect } from 'react-router-dom';
import withAuth from '../../hoc/withAuth';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query, Mutation } from 'react-apollo';
import { SEND_INVITATION, REMOVE_FRIEND, GET_USER } from './queries';

import MovieItem from './MovieItem';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';

const Profile = ({ session, match, refetch }) => {
  const { username } = match.params;

  const { handleModal } = useContext(ModalContext);
  const [isFriend, setFriend] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    if (session.getCurrentUser) {
      const { friends } = session.getCurrentUser;

      setCurrentUsername(session.getCurrentUser.username);
      let isOnFriendList = friends.filter(f => f === username).length > 0;
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
      {({ data, loading }) => {
        if (loading) return <Spinner />
        if (!data.getUser) return (
          <>
            {handleModal('Error! User does not exist!', true)}
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

Profile.propTypes = {
  session: PropTypes.object,
  match: PropTypes.object,
  refetch: PropTypes.func
};

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile));