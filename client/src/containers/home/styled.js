import styled from 'styled-components';
import { fonts, semiTitle, device, title } from '../../utils/styles';

export const AsideWrapper = styled.aside`
  ${semiTitle}
  
  .most-popular {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: .3em;

    @media ${device.mobileL} {
      grid-template-columns: repeat(auto-fill, 120px); 
      grid-column-gap: .5em;
    }

    @media ${device.laptop} {
      padding: 0;
      grid-template-columns: 1fr;
      grid-column-gap: 0;
    }
  }
`;

export const HomeWrapper = styled.div`
  ${title}
  display: grid;

  @media ${device.laptop} {
    grid-template-columns: 84% 13%;
    grid-column-gap: 3%;
  }

  .note {
    font-weight: ${fonts.fontLight};
    font-size: .9em;
    max-width: 400px;
  }
`;

export const List = styled.ul`
  margin-bottom: .6em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: .3em;

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fill, 120px); 
    grid-column-gap: .5em;
  }
`;

export const TopList = styled.ul`
  margin-bottom: .6em;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .4em;
  }
`;