import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../utils/UIstore';
import { Mutation } from 'react-apollo';
import { REMOVE_FRIEND } from '../../queries';

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
    <Friend>
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
    </Friend>
  )
};

const Friend = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .65em;

  .username {
    font-size: .8em;
    font-weight: ${fonts.fontLight};
    padding-left: .3em;
    color: ${colors.mainWhite};
  }

  .btn {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 30px;
  }
`;

FriendItem.propTypes = {
  friendUsername: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

export default FriendItem;