import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.string,
  type: PropTypes.string.isRequired,
};

Button.defaultProps = {
  type: 'button'
};

export default Button;