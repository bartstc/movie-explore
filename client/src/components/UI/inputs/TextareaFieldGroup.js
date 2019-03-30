import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../../utils/styles';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  id,
  onChange,
  label
}) => (
    <TextareaWrapper>
      <label className="label" htmlFor={id}>{label}</label>
      <textarea
        className={classnames('textarea', {
          'is-invalid': error
        })}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </TextareaWrapper>
  );

const TextareaWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1.1em;

  .label {
    font-size: 1em;
    margin-bottom: .4em;
  }

  .textarea {
    width: 100%;
    max-width: 250px;
    min-height: 70px;
    padding: .7em;
    border: 1px solid ${colors.mainColor};
    border-radius: 15px;
    background: transparent;
    color: ${colors.mainColor};

    &::placeholder {
      color: ${colors.mainColor};
    }
  }
`;

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
