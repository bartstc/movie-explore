import React from 'react';
import PropTypes from 'prop-types';
import { ButtonWrapper } from './styled';

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