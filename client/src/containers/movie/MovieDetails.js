import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device, colors, fonts } from '../../utils/styles';

import venom from '../../assets/venom.jpg';
import ScrollToTopOnMount from '../../utils/scrollToTopOnMount';
import Rating from './Rating';
import Actions from './Actions';
import Comments from './Comments';
import CommentForm from './CommentForm';

const MovieDetails = () => (
  <>
    <ScrollToTopOnMount />
    <DetailsWrapper>
      <figure className="img-wrapper">
        <img src={venom} alt="" />
      </figure>
      <header className="details-header">
        <h1 className="details-title">Venom</h1>
        <p className="details-subtitle"><span>Action, Sci-Fi,</span> 2018, Ruben Fleischer</p>
      </header>
      <Rating />
      <Actions />
      <p className="details">Venom is the first film in Sony's Marvel Universe and based upon the titular anti - hero of the same name which follows Eddie Brock and the Venom symbiote teaming up against Carlton Drake. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <Comments />
      <CommentForm />
    </DetailsWrapper>
  </>
);

const DetailsWrapper = styled.section`
  padding-top: 55px;
  padding-bottom: 50px;

  @media ${device.tablet} {
    padding-top: 90px;
  }

  .img-wrapper {
    position: relative;

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
    padding: .6em;
    padding-top: 0;

    .details-title {
      font-size: 1.7em;
      color: ${colors.mainWhite};
      font-weight: ${fonts.fontBold};
      line-height: 1.1em;

      @media ${device.mobileL} {
        font-size: 2.6em;
      }
    }

    .details-subtitle {
      font-size: .9em;
      color: ${colors.mainColor};
      font-weight: ${fonts.fontLight};

      @media ${device.mobileL} {
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
    font-weight: ${fonts.fontLight};

    @media ${device.mobileL} {
      font-size: 1em;
    } 
  }
`;



export default MovieDetails;