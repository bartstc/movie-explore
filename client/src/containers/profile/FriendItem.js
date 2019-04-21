import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Mutation } from 'react-apollo';
import { REMOVE_FRIEND } from './queries';
import { FriendWrapper } from './styled';

const FriendItem = ({ currentUsername, friendUsername, refetch }) => {
  const { handleModal } = useContext(ModalContext);

  const onClick = (onRemove) => {
    onRemove().then(async () => {
      handleModal('Friend removed', false);
      await refetch();
    })
      .catch(err => handleModal(err.message.substring(15), true));
  };

  return (
    <FriendWrapper>
      <i className="far fa-user" />
      <Link to={`/user/${friendUsername}`} className="username">{friendUsername}</Link>
      <span>
        <Mutation
          mutation={REMOVE_FRIEND}
          variables={{ currentUsername, friendUsername }}>
          {removeFriend => (
            <button onClick={() => onClick(removeFriend)} className="btn">x</button>
          )}
        </Mutation>
      </span>
    </FriendWrapper>
  )
};

FriendItem.propTypes = {
  friendUsername: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

export default FriendItem;