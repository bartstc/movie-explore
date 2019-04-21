import styled from 'styled-components';
import { fonts, colors, device } from '../../utils/styles';

export const MovieWrapperStyles = styled.li`
  margin-bottom: 1em;
  
  .img-wrapper {
    height: 170px;
    position: relative;

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(transparent, ${colors.mainBlack});
    }
  }

  .movie-title {
    font-size: 1.15em;
    font-size: .8em;
    font-weight: ${fonts.fontBold};
    padding: 0 .4em;
    color: ${colors.mainWhite};
  }

  .movie-info {
    display: block;
    font-size: .7em;
    font-weight: ${fonts.fontBold};
    color: ${colors.mainColor};
    padding: 0 .4em;
    line-height: 1.3em;
  }
`;

export const TopMovieWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1.2em;

  .rating {
    font-size: 1.2em;
    text-align: start;
    font-weight: ${fonts.fontBold};
    color: ${colors.mainColor};
    padding: 0 .5em;

    @media ${device.mobileL} {
      font-size: 1.5em;
    }

    @media ${device.laptop} {
      font-size: 1.2em;
    }
  }

  .img-wrapper {
    width: 100px;
    height: 140px;
    position: relative;

    @media ${device.mobileL} {
      width: 130px;
      height: 180px;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      z-index: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(transparent, ${colors.mainBlack});
    }
  }

  .movie-title {
    font-size: 1.2em;
    font-weight: ${fonts.fontExtraLight};
    padding-left: 0 .7em;
    color: ${colors.mainWhite};

    @media ${device.mobileL} {
      font-size: 1.5em;
    }

    @media ${device.laptop} {
      font-size: 1em;
    }
  }
`;