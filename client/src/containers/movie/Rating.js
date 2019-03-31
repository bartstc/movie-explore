import React, { useState } from 'react';
import styled from 'styled-components';

import borderStar from '../../assets/star.png';
import fillStar from '../../assets/star_fill.png';
import { fonts, device } from '../../utils/styles';

const Rating = () => {
  const [rating, setRating] = useState(0);

  const onRatingChange = e => {
    setRating(e.target.value)
  };

  let amount = 10;
  let stars = [];
  let style;

  for (let i = 1; i <= amount; i++) {

    if (i <= rating) {
      style = "star color"
    } else {
      style = "star"
    }

    stars.push(<label key={i} className={style} onChange={(e) => onRatingChange(e)} ><input type='radio' name='rating' value={i} /></label>)
  };

  return (
    <RatingWrapper>
      <p className="rating-value">7.8</p>
      <div className="rating">
        <Stars>{stars}</Stars>
        <p className="votes">146 votes</p>
      </div>
    </RatingWrapper>
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

export default Rating;