import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sectionBasic, title, device, fonts } from '../utils/styles';
import { withRouter } from 'react-router-dom';
import withAuth from '../utils/withAuth';

const Profile = () => (
  <ProfileWrapper>
    <header>
      <h1 className="title">Hello, Bart</h1>
    </header>
    <h2 className="subtitle">Added movies: 4</h2>
    <ul className="movies-list">
      <li>
        <p className="movie">Venom</p>
      </li>
      <li>
        <p className="movie">Venom</p>
      </li>
      <li>
        <p className="movie">Venom</p>
      </li>
      <li>
        <p className="movie">Venom</p>
      </li>
    </ul>
    <h2 className="subtitle">Movies to watch: 3</h2>
    <ul className="movies-list">
      <li>
        <p className="movie">Venom</p>
      </li>
      <li>
        <p className="movie">Venom</p>
      </li>
      <li>
        <p className="movie">Venom</p>
      </li>
    </ul>
  </ProfileWrapper>
);

const ProfileWrapper = styled.section`
  ${sectionBasic}
  ${title}

  /* .movies-list {
    @media ${device.tablet} {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: .7em;
    }
  } */

  .subtitle {
    font-size: 1.2em;
    font-weight: ${fonts.fontLight};
    margin-bottom: .5em;
  }

  .movies-list {
    margin-bottom: 1.6em;
  }

  .movie {
    line-height: 1.5em;
  }
`;

export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile));