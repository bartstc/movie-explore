import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Mutation } from 'react-apollo';
import { ACCEPT_OR_REJECT_INVITATION } from './queries';
import { InvitationWrapper } from './styled';

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
    <InvitationWrapper>
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
    </InvitationWrapper>
  )
};

InvitationItem.propTypes = {
  friendUsername: PropTypes.string.isRequired,
  currentUsername: PropTypes.string.isRequired,
  refetch: PropTypes.func
};

export default InvitationItem;