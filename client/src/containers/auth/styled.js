import styled from 'styled-components';
import { device, headerBasic } from '../../utils/styles';

export const AuthWrapper = styled.section`
  ${headerBasic}
    
    @media ${device.tablet} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1em;
    }
  
    .img-showcase {
      display: none;
      height: 540px;
  
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