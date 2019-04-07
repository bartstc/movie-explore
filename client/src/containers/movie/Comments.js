import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device, fonts, colors, semiTitle } from '../../utils/styles';
import { Mutation } from 'react-apollo';
import { REMOVE_COMMENT, GET_MOVIE } from '../../queries';

import withSession from '../../utils/withSession';

const Comments = ({ comments, movieId, session }) => {
  const onRemove = removeComment => {
    removeComment().then(({ data }) => console.log(data))
      .catch(err => console.log(err));
  };

  return (
    <CommentsWrapper>
      <ul>
        <h2 className="semi-title">Comments.</h2>
        {comments.length < 1
          ? <p className="no-comments">No comments added yet.</p>
          : comments.map(({ _id, username, text, date }) => (
            <li key={_id} className="comment">
              <div className="user">
                <i className="far fa-user" />
                <p className="username">{username}</p>
              </div>
              <p className="date">{date}</p>
              <p className="text">{text}</p>
              {session && session.getCurrentUser.username === username &&
                <Mutation
                  mutation={REMOVE_COMMENT}
                  variables={{ commentId: _id, movieId }}
                  refetchQueries={() => [
                    { query: GET_MOVIE, variables: { _id: movieId } }
                  ]}
                >
                  {(removeComment, attrs = {}) => {
                    return (
                      <button onClick={() => onRemove(removeComment)} className="delete">Delete</button>
                    )
                  }}
                </Mutation>
              }
            </li>
          ))
        }
      </ul>
    </CommentsWrapper>
  )
};

const CommentsWrapper = styled.section`
  ${semiTitle};
  margin-top: 1em;
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

  .no-comments {
    font-weight: ${fonts.fontExtraLight};
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

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withSession(Comments);