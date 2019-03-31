import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device, colors, fonts, semiTitle } from '../../utils/styles';

const Comments = () => (
  <CommentsWrapper>
    <ul>
      <h2 className="semi-title">Comments.</h2>
      <li className="comment">
        <div className="user">
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
        </div>
        <p className="date">21.03.2019 | 21.43</p>
        <p className="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, consequatur eos, voluptatibus nostrum.</p>
      </li>
      <li className="comment">
        <div className="user">
          <i className="far fa-user" />
          <p className="username">JohnDoe</p>
        </div>
        <p className="date">21.03.2019 | 21.43</p>
        <p className="text">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit, consequatur eos, voluptatibus nostrum.</p>
      </li>
    </ul>
  </CommentsWrapper>
);

const CommentsWrapper = styled.section`
  ${semiTitle};
  margin-top: .8em;
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
    font-size: .85em;
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
`;

export default Comments;