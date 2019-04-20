import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../utils/styles';
import { ModalContext } from '../../../store/UIStore/UIstore';
import { Mutation } from 'react-apollo';
import { ADD_WATCHED, REMOVE_WATCHED, GET_MOVIE } from '../../../queries';

import withSession from '../../../utils/withSession';

const Watched = ({ watched, _id, session, refetch }) => {
  const { handleModal } = useContext(ModalContext);
  const [isWatched, setIsWatched] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (session.getCurrentUser) {
      const { username, watched } = session.getCurrentUser;
      const prevWatched = watched.findIndex(i => i._id === _id) > -1;
      setIsWatched(prevWatched);
      setUsername(username);
    };
  }, []);

  const onClick = (addWatched, removeWatched) => {
    if (!session.getCurrentUser) {
      handleModal('You must log in', true);
      return;
    };

    setIsWatched(!isWatched);
    handleAddToWatched(addWatched, removeWatched);
  };

  const handleAddToWatched = (addWatched, removeWatched) => {
    if (!isWatched) {
      addWatched().then(async () => {
        handleModal('Added to watched movies');
        await refetch();
      })
    } else {
      removeWatched().then(async () => {
        await refetch();
      });
    };
  };

  // Optimistic UI
  const updateAddWatched = (cache, { data: { addWatched } }) => {
    const { getMovie } = cache.readQuery({ query: GET_MOVIE, variables: { _id } });

    cache.writeQuery({
      query: GET_MOVIE,
      variables: { _id },
      data: {
        getMovie: { ...getMovie, watched: addWatched.watched + 1 } // expected res
      }
    });
  };

  const updateRemoveWatched = (cache, { data: { removeWatched } }) => {
    const { getMovie } = cache.readQuery({ query: GET_MOVIE, variables: { _id } });

    cache.writeQuery({
      query: GET_MOVIE,
      variables: { _id },
      data: {
        getMovie: { ...getMovie, watched: removeWatched.watched - 1 } // expected res
      }
    });
  };

  return (
    <Mutation
      mutation={REMOVE_WATCHED}
      variables={{ _id, username }}
      update={updateRemoveWatched}
    >
      {removeWatched => (
        <Mutation
          mutation={ADD_WATCHED}
          variables={{ _id, username }}
          update={updateAddWatched}
        >
          {addWatched => (
            <li className="action">
              <WatchedButton
                isWatched={isWatched}
                onClick={() => onClick(addWatched, removeWatched)}
                className="btn">
                <i className="fas fa-check"></i>
              </WatchedButton>
              <p>{watched}</p>
            </li>
          )}
        </Mutation>
      )}
    </Mutation>
  )
};

const WatchedButton = styled.button`
  background: transparent;
  border: none;
  width: 30px;
  height: 30px;
  color: ${props => props.isWatched ? colors.mainColor : colors.mainWhite};
  font-size: 1.1em;  
`;

Watched.propTypes = {
  watched: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  session: PropTypes.object,
  refetch: PropTypes.func
};

export default withSession(Watched);