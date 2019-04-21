import styled from 'styled-components';
import { fonts, colors } from '../utils/styles';

export const ButtonWrapper = styled.button`
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

export const ModalWrapper = styled.div`
  position: fixed;
  z-index: 20;
  background: ${colors.mainBlack};
  opacity: .8;
  border-radius: 10px;
  width: 280px;
  min-height: 50px;
  padding: .6em;
  transition: all 0.3s ease-out;
  top: 10%;
  left: 50%;
  margin-left: -140px;
  box-sizing: border-box;
  text-align: center;
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(-20vh)'};
  opacity: ${props => props.show ? '1' : '0'};

  .fas,
  .far {
    font-size: 1.5em;
    color: ${colors.mainColor};
    margin-bottom: .3em;
  }

  .message {
    font-size: .9em;
    color: ${colors.mainColor};
    font-weight: ${fonts.fontBold};
  }
`;

export const Loader = styled.span`
  display:block;
  width: 90px;
  height: 90px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: " ";
    display: block;
    margin: 0 auto;
    width: 50px;
    height: 50px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;