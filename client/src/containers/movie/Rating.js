import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fonts, device } from '../../utils/styles';
import { ModalContext } from '../../utils/UIstore';
import { Mutation } from 'react-apollo';
import { RATE_MOVIE } from '../../queries';

import borderStar from '../../assets/star.png';
import fillStar from '../../assets/star_fill.png';
import withSession from '../../utils/withSession';

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

  let amount = 10;
  let stars = [];
  let style;

  for (let i = 1; i <= amount; i++) {

    if (i <= Math.round(rating)) {
      style = "star color"
    } else {
      style = "star"
    }

    stars.push({ value: i, style });
  };

  return (
    <Mutation
      mutation={RATE_MOVIE}
    >
      {rateMovie => (
        <RatingWrapper>
          <p className="rating-value">{ratingValue}</p>
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
                    rateMovie({ variables: { movieId, userId, rating: value } })
                      .then()
                      .catch(err => handleModal(err.message, true));
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

const RatingWrapper = styled.div`
  padding: 0 .6em;
  display: flex;

  .rating-value {
    font-size: 2.4em;
    font-weight: ${fonts.fontBold};
    line-height: 1.2em;
    padding-right: .15em;

    @media ${device.mobileL} {
      font-size: 3em;
    }
  }

  .votes {
    font-size: .8em;
    font-weight: ${fonts.fontLight};
    padding-left: .2em;
  }
`;

const Stars = styled.ul`
  display: flex;

  input{
    position: absolute;
    left: -99999px;
  }

  label {
    width: 22px;
    height: 22px;
    color: transparent;
    transition: all .1s ease-in-out;
    background: url(${borderStar}) no-repeat center;
    background-size: 80%;

    @media ${device.mobileL} {
      width: 33px;
      height: 33px;
    }
  }

  label:hover {
    background: url(${fillStar}) no-repeat center;
    background-size: 80%;
  }

  .color {
    background: url(${fillStar}) no-repeat center;
    background-size: 80%;
  }
`;

Rating.propTypes = {
  ratingValue: PropTypes.number.isRequired,
  votes: PropTypes.array.isRequired,
  session: PropTypes.object
};

export default withSession(Rating);