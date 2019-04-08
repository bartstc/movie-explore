import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, fonts } from '../../utils/styles';
import { Link } from 'react-router-dom';

import venom from '../../assets/venom.jpg';

const MovieWrapper = ({ title, genres, year, imageUrl, _id }) => (
  <ListItem>
    <figure className="img-wrapper">
      <img src={(imageUrl) ? imageUrl : venom} alt="" />
    </figure>
    <Link to={`/movie/${_id}`} className="movie-title">{title.length < 12 ? title : `${title.substring(0, 10)}...`}</Link>
    <h2 className="movie-info">{genres && genres.join(", ").length < 17 ? genres.join(", ") : `${genres.join(", ").substring(0, 12)}...`}</h2>
    <p className="movie-info">{year}</p>
  </ListItem>
)

const ListItem = styled.li`
  margin-bottom: 1em;
  
  .img-wrapper {
    height: 170px;
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
    font-size: 1.15em;
    font-size: .8em;
    font-weight: ${fonts.fontBold};
    padding: 0 .4em;
    color: ${colors.mainWhite};
  }

  .movie-info {
    display: block;
    font-size: .7em;
    font-weight: ${fonts.fontBold};
    color: ${colors.mainColor};
    padding: 0 .4em;
    line-height: 1.3em;
  }
`;

MovieWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.array,
  imageUrl: PropTypes.string
};

export default MovieWrapper;