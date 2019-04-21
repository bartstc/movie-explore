import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Mutation } from 'react-apollo';
import { RATE_MOVIE } from './queries';
import { RatingWrapper, Stars } from './styled';

import withSession from '../../hoc/withSession';

const Rating = ({ ratingValue, votes, movieId, session }) => {
  const { handleModal } = useContext(ModalContext);
  const [rating, setRating] = useState(0);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (session.getCurrentUser) {
      const { _id } = session.getCurrentUser;
      setUserId(_id);
    };

    setRating(ratingValue);
  }, []);

  const amount = 10;
  const stars = [];
  let style;

  for (let i = 1; i <= amount; i++) {
    if (i < rating || i <= rating + 0.5) {
      style = "star color"
    } else {
      style = "star"
    };

    stars.push({ value: i, style });
  };

  return (
    <Mutation
      mutation={RATE_MOVIE}
    >
      {rateMovie => (
        <RatingWrapper>
          <p className="rating-value">{ratingValue.toFixed(1)}</p>
          <div className="rating">
            <Stars>
              {stars.map(({ value, style }) => (
                <label
                  key={value}
                  className={style}
                  onChange={e => {
                    if (!session.getCurrentUser) {
                      handleModal('You must log in to rate', true);
                      return;
                    };

                    handleModal('Rating added');
                    rateMovie({ variables: { movieId, userId, rating: value } })
                      .then()
                      .catch(err => handleModal(err.message.substring(15), true));
                  }} >
                  <input type='radio' name='rating' value={value} />
                </label>
              ))}
            </Stars>
            <p className="votes">{votes.length} votes</p>
          </div>
        </RatingWrapper>
      )}
    </Mutation>
  );
};

Rating.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  movieId: PropTypes.string.isRequired,
  votes: PropTypes.array.isRequired,
  session: PropTypes.object
};

export default withSession(Rating);