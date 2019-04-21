import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom'; // access to e.g. match
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query } from 'react-apollo';
import { GET_MOVIE } from './queries';
import { DetailsWrapper, Actions } from './styled';

import ScrollToTopOnMount from '../../utils/scrollToTopOnMount';
import Rating from './Rating';
import Comments from './Comments';
import CommentForm from './CommentForm';
import Like from './actions/Like';
import Watched from './actions/Watched';
import ToWatch from './actions/ToWatch';
import Spinner from '../../shared/Spinner';

// match: include isExact(bool), params, path, url
const MovieDetails = ({ match }) => {
  const { handleModal } = useContext(ModalContext);
  const { _id } = match.params;

  return (
    <>
      <ScrollToTopOnMount />
      <Query query={GET_MOVIE} variables={{ _id }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return (
            <>
              {handleModal('Error! Movie not found!', true)}
              <Redirect to="/" />
            </>
          )
          const { title, imageUrl, director, year, genres, description, likes, watched, toWatch, rating, numberOfRatings, comments } = data.getMovie;

          return (
            <DetailsWrapper>
              <div className="main-content">
                <figure className="img-wrapper">
                  <img src={imageUrl} alt="" />
                </figure>
                <header className="details-header">
                  <h1 className="details-title">{title}</h1>
                  <p className="details-subtitle"><span>{genres.join(', ')}</span></p>
                  <p className="details-subtitle">{director}</p>
                  <p className="details-subtitle">{year}</p>
                </header>
              </div>
              <Rating ratingValue={rating} votes={numberOfRatings} movieId={_id} />
              <Actions>
                <Like
                  likes={likes}
                  _id={_id}
                />
                <Watched
                  watched={watched}
                  _id={_id}
                />
                <ToWatch
                  toWatch={toWatch}
                  _id={_id}
                />
              </Actions>
              <p className="details">{description}</p>
              <Comments comments={comments} movieId={_id} />
              <CommentForm movieId={_id} />
            </DetailsWrapper>
          )
        }}
      </Query>
    </>
  )
};

MovieDetails.propTypes = {
  match: PropTypes.object
};

export default withRouter(MovieDetails);