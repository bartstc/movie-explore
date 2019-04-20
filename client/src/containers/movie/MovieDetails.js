import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device, colors, fonts } from '../../utils/styles';
import { withRouter, Redirect } from 'react-router-dom'; // access to e.g. match
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query } from 'react-apollo';
import { GET_MOVIE } from '../../queries';

import ScrollToTopOnMount from '../../utils/scrollToTopOnMount';
import Rating from './Rating';
import Comments from './Comments';
import CommentForm from './CommentForm';
import Like from './actions/Like';
import Watched from './actions/Watched';
import ToWatch from './actions/ToWatch';
import Spinner from '../../components/UI/Spinner';

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

const DetailsWrapper = styled.section`
  max-width: 650px;
  margin: 0 auto;

  .main-content {
    padding: 0 .6em;
    padding-bottom: 1em;
    display: grid;
    grid-template-columns: 120px auto;

    @media ${device.tablet} {
      grid-template-columns: 200px auto;
    }
  }

  .img-wrapper {
    position: relative;
    height: 180px;

    @media ${device.tablet} {
      height: 300px;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(transparent, ${colors.mainBlack});
    }
  }

  .details-header {
    padding-left: .6em;
    padding-top: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media ${device.mobileL} {
      padding-left: 1.4em;
    }

    .details-title {
      font-size: 1.3em;
      color: ${colors.mainWhite};
      font-weight: ${fonts.fontBold};
      line-height: 1.1em;

      @media ${device.tablet} {
        font-size: 2.2em;
      }
    }

    .details-subtitle {
      font-size: .8em;
      color: ${colors.mainColor};
      font-weight: ${fonts.fontLight};

      @media ${device.tablet} {
        font-size: 1em;
      }

      span {
        font-weight: ${fonts.fontBold};
      }
    }
  }

  .details {
    padding: .6em;
    font-size: .85em;
    line-height: 1.35em;
    font-weight: ${fonts.fontExtraLight};

    @media ${device.mobileL} {
      font-size: 1em;
    } 
  }

  .creator {
    font-size: .85em;
    font-weight: ${fonts.fontLight};
    color: ${colors.mainColor};
    font-style: italic;
    padding: 0 0 1em .6em;
  }
`;

const Actions = styled.ul`
  padding: 0 .2em;
  display: flex;
  margin-bottom: .5em;

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 .2em;
    margin-right: .4em;
  }

  p {
    font-weight: ${fonts.fontLight};
    line-height: .9em;
    font-size: .8em;
  }
`;

MovieDetails.propTypes = {
  match: PropTypes.object
};

export default withRouter(MovieDetails);