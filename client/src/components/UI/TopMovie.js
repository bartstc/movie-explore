import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device, fonts, colors } from '../../utils/styles';

const TopMovie = ({ imageUrl, rating, title }) => (
  <TopMovieWrapper>
    <figure className="img-wrapper">
      <img src={imageUrl} alt="" />
    </figure>
    <p className="rating">{rating}</p>
    <h2 className="movie-title">{title}</h2>
  </TopMovieWrapper>
);

const TopMovieWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.2em;

  .rating {
    font-size: 1.2em;
    text-align: start;
    font-weight: ${fonts.fontBold};
    color: ${colors.mainColor};
    padding: 0 .5em;

    @media ${device.mobileL} {
      font-size: 1.5em;
    }

    @media ${device.laptop} {
      font-size: 1.2em;
    }
  }

  .img-wrapper {
    width: 100px;
    height: 140px;
    position: relative;

    @media ${device.mobileL} {
      width: 130px;
      height: 180px;
    }

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
    font-size: 1.2em;
    font-weight: ${fonts.fontExtraLight};
    padding-left: 0 .7em;
    color: ${colors.mainWhite};

    @media ${device.mobileL} {
      font-size: 1.5em;
    }

    @media ${device.laptop} {
      font-size: 1em;
    }
  }
`;

TopMovie.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  imageUrl: PropTypes.string
};

export default TopMovie;