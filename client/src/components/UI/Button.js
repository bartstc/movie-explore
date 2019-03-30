import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { colors } from '../../utils/styles';

const Button = ({ disabled, onClick, btnType, type, children, style }) => (
  <ButtonWrapper
    disabled={disabled}
    onClick={onClick}
    className={[btnType].join(' ')}
    type={type}
    style={style}
  >
    {children}
  </ButtonWrapper>
);

const ButtonWrapper = styled.button`
  width: 250px;
  height: 34px;
  border: none;
  border-radius: 15px;
  background: ${colors.mainColor};
  margin-top: .3em;
  color: ${colors.mainWhite};
  transition: opacity .2s ease-in-out;

  &.disabled {
    opacity: .4;
  }
`;

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.string
};

Button.defaultProps = {
  type: 'button'
};

export default Button;