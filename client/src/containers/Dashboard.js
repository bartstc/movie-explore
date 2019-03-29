import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sectionBasic, fonts, colors, title, device } from '../utils/styles';

import MovieWrapper from '../components/UI/MovieWrapper';

const Dashboard = () => (
  <DashboardWraper>
    <header>
      <h2 className="title">Most popular movies.</h2>
    </header>
    <Section>
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, eos. Vitae quisquam molestiae eaque sed aperiam tempore.</p>
      </MovieWrapper>
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, eos. Vitae quisquam molestiae eaque sed aperiam tempore.</p>
      </MovieWrapper>
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, eos. Vitae quisquam molestiae eaque sed aperiam tempore.</p>
      </MovieWrapper>
    </Section>
  </DashboardWraper>
);

const DashboardWraper = styled.div`
  ${title}
  ${sectionBasic}
`;

const Section = styled.section`

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 2em;
  }
`;

export default Dashboard;