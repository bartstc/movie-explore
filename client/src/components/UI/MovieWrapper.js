import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts, device } from '../../utils/styles';

import venom from '../../assets/venom.jpg';

const MovieWrapper = ({ title, genre, year, director, children }) => (
  <Article>
    <figure className="img-wrapper">
      <img src={venom} alt="" />
    </figure>
    <h2 className="movie-title">{title}</h2>
    <h3 className="movie-info"><span>{genre}</span>, {year}, {director}</h3>
    {children}
  </Article>
);

const Article = styled.article`
  margin-bottom: 1.6em;

  @media ${device.mobileL} {
    margin-bottom: 2.6em;
  }
  
  .img-wrapper {
    width: 100%;
    height: 40%;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(transparent, ${colors.mainBlack});
    }
  }

  .movie-title {
    font-size: calc(.2em + 5vw);
    font-weight: ${fonts.fontBold};
    margin-bottom: .1em;
    padding: 0 .4em;

    @media ${device.tablet} {
      font-size: 1.6em;
    }
  }

  .movie-info {
    display: block;
    font-size: .85em;
    font-weight: ${fonts.fontLight};
    color: ${colors.mainColor};
    margin-bottom: .6em;
    padding: 0 .4em;

    span {
      font-weight: ${fonts.fontBold};
    }

    @media ${device.mobileL} {
      font-size: calc(.1em + 3vw);
      padding: 0 .8em;
    }

    @media ${device.tablet} {
      font-size: 1em;
    }
  }

  p {
    font-size: .85em;
    margin-top: .6em;
    padding: 0 .4em;

    @media ${device.mobileL} {
      font-size: 1em;
      margin-top: 0;
      padding: 0 .8em;
    }
  }
`;

MovieWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string,
  year: PropTypes.string,
  director: PropTypes.string
};

export default MovieWrapper;