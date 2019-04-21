import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';

export const SelectWrapper = styled.p`
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

export const TextareaWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1.1em;

  .label {
    font-size: 1em;
    margin-bottom: .4em;
    font-weight: ${fonts.fontExtraLight};
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

export const InputWrapper = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 1em;

  .label {
    font-size: 1em;
    text-align: center;
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