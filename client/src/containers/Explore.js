import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sectionBasic, device } from '../utils/styles';

import TextFieldGroup from '../components/UI/inputs/TextFieldGroup';
import MovieWrapper from '../components/UI/MovieWrapper';

const Explore = () => (
  <ExploreWrapper>
    <TextFieldGroup
      label="Enter movie or category name:"
      placeholder="Search ..."
      id="search"
      name="search"
    // value={this.state.email}
    // onChange={this.onChange}
    />
    <div className="movies-list">
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
    </div>
  </ExploreWrapper>
);

const ExploreWrapper = styled.section`
  ${sectionBasic}

  .movies-list {
    @media ${device.tablet} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: .7em;
    }
  }
`;

export default Explore;