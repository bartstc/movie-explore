import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MovieWrapper } from './styled';

const MovieItem = ({ _id, title, rating }) => (
  <MovieWrapper>
    <Link to={`/movie/${_id}`} className="movie-title">{title}</Link>
    <p className="rating">{rating.toFixed(1)}</p>
  </MovieWrapper>
);

MovieItem.propTypes = {
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired
};

export default MovieItem;