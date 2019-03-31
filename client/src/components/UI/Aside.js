import React from 'react';
import styled from 'styled-components';
import { semiTitle, device, colors, fonts } from '../../utils/styles';

import MovieWrapper from './MovieWrapper';

const Aside = () => (
  <AsideWrapper>
    <h2 className="semi-title">Most popular.</h2>
    <ul className="most-popular">
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer" />
    </ul>
    <h2 className="semi-title">Genres.</h2>
    <ul className="genres">
      <li>Action</li>
      <li>Sci-Fi</li>
      <li>Historical</li>
      <li>Comedy</li>
      <li>Adventure</li>
      <li>Drama</li>
      <li>Horror</li>
    </ul>
  </AsideWrapper>
);

const AsideWrapper = styled.aside`
  ${semiTitle}
  padding: 0 .8em;
  
  .most-popular {
    display: grid;

    @media ${device.mobileL} {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1em;
    }

    @media ${device.tablet} {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: .6em;
    }

    @media ${device.laptop} {
      grid-template-columns: 1fr;
      grid-column-gap: 0;
    }
  }

  @media ${device.laptop} {
    padding: 0;
    padding-top: 90px;
  }

  .genres {
    color: ${colors.mainWhite};
    font-weight: ${fonts.fontLight};
  }
`;

export default Aside;