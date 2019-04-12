import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../utils/styles';
import { ModalContext } from '../../../utils/UIstore';
import { Mutation } from 'react-apollo';
import { ADD_TO_WATCH, REMOVE_TO_WATCH, GET_MOVIE } from '../../../queries';

import withSession from '../../../utils/withSession';

const ToWatch = ({ toWatch, _id, session, refetch }) => {
  const { handleModal } = useContext(ModalContext);
  const [isToWatch, setIsToWatch] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (session.getCurrentUser) {
      const { username, toWatch } = session.getCurrentUser;
      const prevWatched = toWatch.findIndex(i => i._id === _id) > -1;
      setIsToWatch(prevWatched);
      setUsername(username);
    };
  }, []);

  const onClick = (addToWatch, removeToWatch) => {
    if (!session.getCurrentUser) {
      handleModal('You must log in', true);
      return;
    };

    setIsToWatch(!isToWatch);
    handleAddToWatched(addToWatch, removeToWatch);
  };

  const handleAddToWatched = (addToWatch, removeToWatch) => {
    if (!isToWatch) {
      addToWatch().then(async () => {
        handleModal('Added to movies to watch');
        await refetch();
      })
    } else {
      removeToWatch().then(async () => {
        await refetch();
      });
    };
  };

  // Optimistic UI
  const updateAddToWatch = (cache, { data: { addToWatch } }) => {
    const { getMovie } = cache.readQuery({ query: GET_MOVIE, variables: { _id } });

    cache.writeQuery({
      query: GET_MOVIE,
      variables: { _id },
      data: {
        getMovie: { ...getMovie, toWatch: addToWatch.toWatch + 1 } // expected res
      }
    });
  };

  const updateRemoveToWatch = (cache, { data: { removeToWatch } }) => {
    const { getMovie } = cache.readQuery({ query: GET_MOVIE, variables: { _id } });

    cache.writeQuery({
      query: GET_MOVIE,
      variables: { _id },
      data: {
        getMovie: { ...getMovie, toWatch: removeToWatch.toWatch - 1 } // expected res
      }
    });
  };

  return (
    <Mutation
      mutation={REMOVE_TO_WATCH}
      variables={{ _id, username }}
      update={updateRemoveToWatch}
    >
      {removeToWatch => (
        <Mutation
          mutation={ADD_TO_WATCH}
          variables={{ _id, username }}
          update={updateAddToWatch}
        >
          {addToWatch => (
            <li className="action">
              <WatchedButton
                isToWatch={isToWatch}
                onClick={() => onClick(addToWatch, removeToWatch)}
                className="btn">
                <i className="far fa-eye"></i>
              </WatchedButton>
              <p>{toWatch}</p>
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
  color: ${props => props.isToWatch ? colors.mainColor : colors.mainWhite};
  font-size: 1.1em;  
`;

ToWatch.propTypes = {
  toWatch: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  session: PropTypes.object,
  refetch: PropTypes.func
};

export default withSession(ToWatch);