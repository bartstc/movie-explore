import styled from 'styled-components';
import { device, semiTitle, colors, fonts } from '../../utils/styles';
import borderStar from '../../assets/star.png';
import fillStar from '../../assets/star_fill.png';

export const CommentFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const CommentsWrapper = styled.section`
  ${semiTitle};
  margin-top: 1.2em;
  padding: 0 .4em;

  .comment {
    padding: 0 .3em;
    margin-bottom: 1em;
  }

  .user {
    display: flex;
    align-items: center;

    .username {
      font-weight: ${fonts.fontBold};
      padding-left: .4em;
    }
  }

  .date {
    font-weight: ${fonts.fontLight};
    color: ${colors.mainColor};
    font-size: .8em;
    font-style: italic;
  }

  .text {
    margin-top: .2em;
    font-size: .85em;
    font-weight: ${fonts.fontLight};

    @media ${device.mobileL} {
      font-size: .95em;
    }
  }

  .no-comments {
    font-weight: ${fonts.fontExtraLight};
    color: ${colors.mainColor};
    font-size: .85em;
    margin-bottom: 1em;
  }

  .delete {
    width: 80px;
    height: 25px;
    background: ${colors.mainColor};
    color: ${colors.mainWhite};
    border: none;
    border-radius: 5px;
    margin-top: .2em;
  }
`;

export const DetailsWrapper = styled.section`
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

export const Actions = styled.ul`
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

export const RatingWrapper = styled.div`
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

export const Stars = styled.ul`
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
    cursor: pointer;

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