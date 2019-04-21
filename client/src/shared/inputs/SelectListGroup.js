import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { SelectWrapper } from './styled';

const SelectListGroup = ({ name, value, error, onChange, options, id, label }) => {
  const selectOptions = options.map((option, i) => (
    <option key={i} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <SelectWrapper>
      <label className="label" htmlFor={id}>{label}</label>
      <select
        className={classnames('select', {
          'is-invalid': error
        })}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
    </SelectWrapper>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string,
  label: PropTypes.string
};

export default SelectListGroup;
