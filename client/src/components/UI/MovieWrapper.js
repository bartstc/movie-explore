import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MovieWrapperStyles } from './styled';

const MovieWrapper = ({ title, genres, year, imageUrl, _id }) => (
  <MovieWrapperStyles>
    <figure className="img-wrapper">
      <img src={imageUrl} alt="" />
    </figure>
    <Link to={`/movie/${_id}`} className="movie-title">{title.length < 12 ? title : `${title.substring(0, 10)}...`}</Link>
    <h2 className="movie-info">{genres && genres.join(", ").length < 17 ? genres.join(", ") : `${genres.join(", ").substring(0, 12)}...`}</h2>
    <p className="movie-info">{year}</p>
  </MovieWrapperStyles>
)

MovieWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  genres: PropTypes.array,
  imageUrl: PropTypes.string,
  year: PropTypes.number,
  _id: PropTypes.string
};

export default MovieWrapper;