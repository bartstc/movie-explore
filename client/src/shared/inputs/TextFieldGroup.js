import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { InputWrapper } from './styled';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  id,
  type,
  onChange,
  disabled
}) => (
    <InputWrapper>
      <label className="label" htmlFor={id}>{label}</label>
      <input
        type={type}
        className={classnames('input', {
          'is-invalid': error
        })}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </InputWrapper>
  );

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
