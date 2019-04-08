import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../utils/UIstore';
import { Mutation } from 'react-apollo';
import { ACCEPT_OR_REJECT_INVITATION } from '../../queries';

const InvitationItem = ({ currentUsername, friendUsername, refetch }) => {
  const { handleModal } = useContext(ModalContext);

  const onReject = (rejection) => {
    rejection().then(async () => {
      handleModal('Invitation rejected', false);
      await refetch();
    })
      .catch(err => handleModal(err.message.substring(15), true));
  };

  const onAccept = (acceptation) => {
    acceptation().then(async () => {
      handleModal('Invitation accepted', false);
      await refetch();
    })
      .catch(err => handleModal(err.message.substring(15), true));
  };

  return (
    <Invitation>
      <i className="far fa-user" />
      <Link to={`/user/${friendUsername}`} className="username">{friendUsername}</Link>
      <span>
        <Mutation
          mutation={ACCEPT_OR_REJECT_INVITATION}
          variables={{ currentUsername, friendUsername, rejection: true }}>
          {acceptOrRejectInvitation => (
            <button onClick={() => onReject(acceptOrRejectInvitation)} className="btn">x</button>
          )}
        </Mutation>
        <Mutation
          mutation={ACCEPT_OR_REJECT_INVITATION}
          variables={{ currentUsername, friendUsername, rejection: false }}>
          {acceptOrRejectInvitation => (
            <button onClick={() => onAccept(acceptOrRejectInvitation)} className="btn">✓</button>
          )}
        </Mutation>
      </span>
    </Invitation>
  )
};

const Invitation = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .65em;

  .username {
    font-size: .8em;
    font-weight: ${fonts.fontLight};
    padding-left: .5em;
    color: ${colors.mainWhite};
  }

  .btn {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 40px;
  }

  span {
    display: flex;
  }
`;

InvitationItem.propTypes = {
  friendUsername: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

export default InvitationItem;