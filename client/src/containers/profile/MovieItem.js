import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';
import { Link } from 'react-router-dom';

const MovieItem = ({ _id, title, rating }) => (
  <Movie>
    <Link to={`/movie/${_id}`} className="movie-title">{title}</Link>
    <p className="rating">{rating.toFixed(1)}</p>
  </Movie>
);

const Movie = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .4em;
  padding-left: .6em;
  margin-bottom: .8em;
  border-radius: 7px;
  background: #171717;

  .movie-title {
    font-size: .85em;
    line-height: 1em;
    color: ${colors.mainWhite};
  }

  .rating {
    font-weight: ${fonts.fontBold};
    font-size: .85em;
    color: ${colors.mainColor};
  }
`;

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default MovieItem;