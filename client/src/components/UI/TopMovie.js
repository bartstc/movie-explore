import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { TopMovieWrapper } from './styled';

const TopMovie = ({ imageUrl, rating, title, _id }) => (
  <TopMovieWrapper>
    <figure className="img-wrapper">
      <img src={imageUrl} alt="" />
    </figure>
    <p className="rating">{rating.toFixed(1)}</p>
    <Link to={`/movie/${_id}`} className="movie-title">{title}</Link>
  </TopMovieWrapper>
);

TopMovie.propTypes = {
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  imageUrl: PropTypes.string,
  _id: PropTypes.string
};

export default TopMovie;