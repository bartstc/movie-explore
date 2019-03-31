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
    <h3 className="movie-info"><span>{genre}</span>{year && `, ${year}, ${director}`}</h3>
    {children}
  </Article>
);

const Article = styled.article`
  margin-bottom: 1.6em;
  
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
    font-size: 1.3em;
    font-weight: ${fonts.fontBold};
    padding: 0 .4em;
    color: ${colors.mainWhite};

    @media ${device.tablet} {
      font-size: 1.45em;
    }
  }

  .movie-info {
    display: block;
    font-size: .9em;
    font-weight: ${fonts.fontLight};
    color: ${colors.mainColor};
    margin-bottom: .6em;
    padding: 0 .4em;
    line-height: 1.1em;

    span {
      font-weight: ${fonts.fontBold};
    }
  }

  p {
    font-size: .8em;
    font-weight: ${fonts.fontExtraLight};
    margin-top: .83em;
    padding: 0 .4em;
  }
`;

MovieWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string,
  year: PropTypes.string,
  director: PropTypes.string
};

export default MovieWrapper;