import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TextareaWrapper } from './styled';

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

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string
};

export default TextAreaFieldGroup;
