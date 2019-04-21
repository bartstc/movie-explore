import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../store/UIStore/UIstore';
import { ModalWrapper } from './styled';

const Modal = () => {
  const { show, message, error } = useContext(ModalContext);

  return (
    <ModalWrapper show={show}>
      {error
        ? <i className="fas fa-exclamation-triangle"></i>
        : <i className="far fa-check-circle"></i>}
      <p className="message">{message}</p>
    </ModalWrapper>
  )
};

Modal.propTypes = {
  show: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string
};

export default Modal;