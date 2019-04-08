import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../../utils/styles';
import { ModalContext } from '../../utils/UIstore';

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
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-20vh)'};
  opacity: ${props => props.show ? '1' : '0'};

  .fas,
  .far {
    font-size: 1.5em;
    color: ${colors.mainColor};
    margin-bottom: .3em;
  }

  .message {
    font-size: .9em;
    color: ${colors.mainColor};
    font-weight: ${fonts.fontBold};
  }
`;

Modal.propTypes = {
  show: PropTypes.bool,
  error: PropTypes.bool,
  message: PropTypes.string
};

export default Modal;