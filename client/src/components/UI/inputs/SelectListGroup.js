import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../../../utils/styles';
import classnames from 'classnames';

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

const SelectWrapper = styled.p`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1em;

  .select {
    width: 250px;
    height: 34px;
    border: 1px solid ${colors.mainColor};
    border-radius: 15px;
    background: transparent;
    color: ${colors.mainColor};
    padding-left: .6em;
  }

  option {
    background: ${colors.mainBlack};
  }

  option:hover,
  option:focus,
  option:active,
  option:checked {
    background: ${colors.mainColor};
    color: ${colors.mainBlack}
  }

  .label {
    font-size: 1em;
    margin-bottom: .4em;
    font-weight: ${fonts.fontExtraLight};
  }
`;

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
