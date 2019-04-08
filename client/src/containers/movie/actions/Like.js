import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../utils/styles';
import { ModalContext } from '../../../utils/UIstore';
import { Mutation } from 'react-apollo';
import { LIKE_MOVIE, UNLIKE_MOVIE, GET_MOVIE } from '../../../queries';

import withSession from '../../../utils/withSession';

const Like = ({ likes, _id, session, refetch }) => {
  const { handleModal } = useContext(ModalContext);
  const [isLiked, setLiked] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (session.getCurrentUser) {
      const { username, liked } = session.getCurrentUser;
      const prevLiked = liked.findIndex(liked => liked._id === _id) > -1;
      setLiked(prevLiked);
      setUsername(username);
    };
  }, []);

  const onClick = (likeMovie, unlikeMovie) => {
    if (!session.getCurrentUser) {
      handleModal('You must log in to add like', true);
      return;
    };

    setLiked(!isLiked);
    handleLike(likeMovie, unlikeMovie);
  };

  const handleLike = (likeMovie, unlikeMovie) => {
    if (!isLiked) {
      likeMovie().then(async () => {
        await refetch(); // refetch getCurrentUser query
      })
    } else {
      unlikeMovie().then(async () => {
        await refetch();
      });
    };
  };

  // Optimistic UI
  const updateLike = (cache, { data: { likeMovie } }) => {
    const { getMovie } = cache.readQuery({ query: GET_MOVIE, variables: { _id } });

    cache.writeQuery({
      query: GET_MOVIE,
      variables: { _id },
      data: {
        getMovie: { ...getMovie, likes: likeMovie.likes + 1 } // expected res
      }
    });
  };

  const updateUnlike = (cache, { data: { unlikeMovie } }) => {
    const { getMovie } = cache.readQuery({ query: GET_MOVIE, variables: { _id } });

    cache.writeQuery({
      query: GET_MOVIE,
      variables: { _id },
      data: {
        getMovie: { ...getMovie, likes: unlikeMovie.likes - 1 } // expected res
      }
    });
  };

  return (
    <Mutation
      mutation={UNLIKE_MOVIE}
      variables={{ _id, username }}
      update={updateUnlike}
    >
      {unlikeMovie => (
        <Mutation
          mutation={LIKE_MOVIE}
          variables={{ _id, username }}
          update={updateLike}
        >
          {likeMovie => (
            <li className="action">
              <LikeButton
                isLiked={isLiked}
                onClick={() => onClick(likeMovie, unlikeMovie)}
                className="btn">
                <i className="far fa-thumbs-up"></i>
              </LikeButton>
              <p>{likes}</p>
            </li>
          )}
        </Mutation>
      )}
    </Mutation>
  )
};

const LikeButton = styled.button`
  background: transparent;
  border: none;
  width: 30px;
  height: 30px;
  color: ${props => props.isLiked ? colors.mainColor : colors.mainWhite};
  font-size: 1.1em;  
`;

Like.propTypes = {
  likes: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  session: PropTypes.object,
  refetch: PropTypes.func
};

export default withSession(Like);