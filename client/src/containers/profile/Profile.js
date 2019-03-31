import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { sectionBasic, title, device, fonts, colors } from '../../utils/styles';
import { withRouter } from 'react-router-dom';
import withAuth from '../../utils/withAuth';
import AuthData from './AuthData';

const Profile = () => (
  <ProfileWrapper>
    <header>
      <h1 className="title">JohnDoe</h1>
    </header>
    <h2 className="list-title">Added movies: 6</h2>
    <ul className="movies-list">
      <li className="movie-item">
        <div>
          <p className="movie-title">Venom</p>
          <p className="movie-genres">Action, Sci-Fi</p>
        </div>
        <button className="remove">x</button>
      </li>
      <li className="movie-item">
        <div>
          <p className="movie-title">Venom</p>
          <p className="movie-genres">Action, Sci-Fi</p>
        </div>
        <button className="remove">x</button>
      </li>
      <li className="movie-item">
        <div>
          <p className="movie-title">Venom</p>
          <p className="movie-genres">Action, Sci-Fi</p>
        </div>
        <button className="remove">x</button>
      </li>
      <li className="movie-item">
        <div>
          <p className="movie-title">Venom</p>
          <p className="movie-genres">Action, Sci-Fi</p>
        </div>
        <button className="remove">x</button>
      </li>
    </ul>
    <h2 className="list-title">Watched movies: 6</h2>
    <ul className="movies-list">
      <li className="movie-item">
        <div>
          <p className="movie-title">Venom</p>
          <p className="movie-genres">Action, Sci-Fi</p>
        </div>
        <button className="remove">x</button>
      </li>
      <li className="movie-item">
        <div>
          <p className="movie-title">Venom</p>
          <p className="movie-genres">Action, Sci-Fi</p>
        </div>
        <button className="remove">x</button>
      </li>
    </ul>
    <AuthData />
  </ProfileWrapper>
);

const ProfileWrapper = styled.section`
  ${sectionBasic}
  ${title}
  margin-bottom: 1em;

  .list-title {
    font-size: 1.1em;
    font-weight: ${fonts.fontLight};
    border-bottom: 1px solid ${colors.mainColor};
  }

  .movies-list {
    display: grid;
    grid-template-columns: 1fr;
    grid-column-gap: .5em;
    margin-bottom: 1.4em;

    @media ${device.mobileM} {
      grid-template-columns: repeat(2, 1fr);
    }

    @media ${device.tablet} {
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 1.8em;
    }
  }

  .movie-item {
    margin: .5em 0;
    display: flex;
    justify-content: space-between;
    padding: .3em;
    padding-left: .4em;
    border-radius: 7px;
    background: #171717;
    /* box-shadow: 2px 2px 4px 0px rgba(#222,.9); */

    @media ${device.mobileM} {
      max-width: 200px;
    }

    .movie-title {
      font-size: .9em;
      line-height: 1em;
    }

    .movie-genres {
      font-size: .75em;
      color: ${colors.mainColor};
    }

    .remove {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 30px;
  }
  }
`;

// export default withAuth(session => session && session.getCurrentUser)(withRouter(Profile));
export default withRouter(Profile);