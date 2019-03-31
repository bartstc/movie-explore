import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sectionBasic, title, device, fonts } from '../utils/styles';

import MovieWrapper from '../components/UI/MovieWrapper';

const Dashboard = () => (
  <DashboardWraper>
    <h2 className="title">Last added.</h2>
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
      <MovieWrapper title="Venom" genre="Action, Sci-Fi" year="2018" director="Ruben Fleischer">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, eos. Vitae quisquam molestiae eaque sed aperiam tempore.</p>
      </MovieWrapper>
    </Section>
    <h2 className="title">Top 10.</h2>
    <Section>
      <li className="top-movie">
        <p className="position">1</p>
        <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      </li>
      <li className="top-movie">
        <p className="position">2</p>
        <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      </li>
      <li className="top-movie">
        <p className="position">3</p>
        <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      </li>
      <li className="top-movie">
        <p className="position">4</p>
        <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      </li>
      <li className="top-movie">
        <p className="position">5</p>
        <MovieWrapper title="Venom" genre="Action, Sci-Fi" />
      </li>
    </Section>
  </DashboardWraper>
);

const DashboardWraper = styled.div`
  ${title}
  ${sectionBasic}

  .note {
    font-weight: ${fonts.fontLight};
    font-size: .9em;
    max-width: 400px;
  }
`;

const Section = styled.section`
  margin-bottom: .6em;

  @media ${device.mobileL} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
  }

  .top-movie {
    display: grid;
    grid-template-columns: 10% 88%;
    grid-column-gap: 2%;

    .position {
      font-size: 1.7em;
      text-align: end;
      font-weight: ${fonts.fontBold};
      line-height: .9em;
    }
  }
`;

export default Dashboard;