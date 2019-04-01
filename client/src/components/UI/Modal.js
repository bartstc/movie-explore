import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors, fonts } from '../../utils/styles';

const Modal = ({ message, error }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    <ModalWrapper
      style={{
        transform: show ? 'translateY(0)' : 'translateY(-20vh)',
        opacity: show ? '1' : '0'
      }}>
      {}
      {error
        ? <i className="fas fa-exclamation-triangle"></i>
        : <i className="far fa-check-circle"></i>}
      <p className="message">{message}This is place for message</p>
    </ModalWrapper>
  )
};

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 20;
  background: ${colors.mainBlack};
  opacity: .8;
  border-radius: 10px;
  width: 280px;
  min-height: 50px;
  padding: .6em;
  transition: all 0.3s ease-out;
  top: 10%;
  left: 50%;
  margin-left: -140px;
  box-sizing: border-box;
  text-align: center;

  .fas,
  .far {
    font-size: 1.5em;
    color: ${colors.mainColor};
    margin-bottom: .3em;
  }

  .message {
    font-size: .9em;
    color: ${colors.mainWhite};
    font-weight: ${fonts.fontExtraLight};
  }
`;

Modal.propTypes = {
  message: PropTypes.string,
  error: PropTypes.bool,
};

Modal.defaultProps = {
  error: false
};

export default Modal;