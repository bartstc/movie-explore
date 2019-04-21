import styled from 'styled-components';
import { device } from '../../utils/styles';

export const ExploreWrapper = styled.section`

  .movies-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: .3em;

    @media ${device.mobileL} {
      max-width: 510px;
      margin: 0 auto;
      grid-template-columns: repeat(auto-fill, 120px); 
      grid-column-gap: .5em;
    }
  }
`;