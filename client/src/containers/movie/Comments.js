import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Mutation } from 'react-apollo';
import { REMOVE_COMMENT, GET_MOVIE } from './queries';
import { CommentsWrapper } from './styled';

import withSession from '../../hoc/withSession';

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
              <p className="date"><Moment format="YYYY.MM.DD">{date}</Moment></p>
              <p className="text">{text}</p>
              {session.getCurrentUser && session.getCurrentUser.username === username &&
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

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  movieId: PropTypes.string.isRequired,
  session: PropTypes.object
};

export default withSession(Comments);