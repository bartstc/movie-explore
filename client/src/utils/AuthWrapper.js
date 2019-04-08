import React from 'react';
import styled from 'styled-components';
import { device, headerBasic } from './styles';
import bg from '../assets/bg.png';

const AuthWrapper = ({ children }) => (
  <FormStyles>
    {children}
  </FormStyles>
);

const FormStyles = styled.section`
  ${headerBasic}
  
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
  }
  
  .img-showcase {
    display: none;
    background: url(${bg}) no-repeat center;
    background-size: cover;
    min-height: 500px;

    @media ${device.tablet} {
      display: block;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
  }
`;

export default AuthWrapper;