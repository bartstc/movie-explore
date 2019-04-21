import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { ADD_COMMENT, GET_MOVIE } from './queries';
import { CommentFormWrapper } from './styled';

import TextareaFieldGroup from '../../shared/inputs/TextareaFieldGroup';
import Button from '../../shared/Button';

import withSession from '../../hoc/withSession';

const CommentForm = ({ movieId, session }) => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (session.getCurrentUser) {
      const { username } = session.getCurrentUser;
      setUsername(username);
    };
  }, []);

  const onChange = e => {
    setText(e.target.value);
  };

  const clearState = () => {
    setText('');
  };

  const validateForm = () => {
    const isInvalid = !username || !text;
    return isInvalid;
  };

  const onSubmit = (e, addComment) => {
    e.preventDefault();

    addComment().then(() => {
      clearState();
    })
      .catch(err => console.log(err));
  };

  let form;
  (!username)
    ? form = <p>Sign In to add comment.</p>
    : form = (
      <Mutation
        mutation={ADD_COMMENT}
        variables={{ text, movieId, username }}
        refetchQueries={() => [
          { query: GET_MOVIE, variables: { _id: movieId } }
        ]}
      >
        {(addComment, { loading }) => (
          <CommentFormWrapper onSubmit={e => onSubmit(e, addComment)}>
            <TextareaFieldGroup
              label="Add Comment"
              placeholder="Comment text ..."
              id="description"
              name="description"
              value={text}
              onChange={onChange}
            />
            <Button
              type="submit"
              disabled={loading || validateForm()}
              btnType={validateForm() && 'disabled'}
            >Add</Button>
          </CommentFormWrapper>
        )}
      </Mutation>
    )
  return form;
};

CommentForm.propTypes = {
  movieId: PropTypes.string.isRequired,
  session: PropTypes.object
};

export default withSession(CommentForm);