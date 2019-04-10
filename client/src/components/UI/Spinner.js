import React from 'react';
import styled from 'styled-components';

const Spinner = () => (
  <Loader></Loader>
);

const Loader = styled.span`
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

export default Spinner;