import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../../../utils/styles';

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

const InputWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1em;

  .label {
    font-size: 1em;
    margin-bottom: .4em;
    font-weight: ${fonts.fontExtraLight};
  }

  .input {
    width: 100%;
    max-width: 250px;
    height: 34px;
    padding-left: .7em;
    border: 1px solid ${colors.mainColor};
    border-radius: 15px;
    background: transparent;
    color: ${colors.mainColor};

    &::placeholder {
      color: ${colors.mainColor};
    }
  }
`;

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
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
