import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device, colors, fonts, semiTitle } from '../../utils/styles';

import TextareaFieldGroup from '../../components/UI/inputs/TextareaFieldGroup';
import Button from '../../components/UI/Button';
import Error from '../../utils/error';

const CommentForm = () => (
  <Form>
    <TextareaFieldGroup
      label="Add Comment"
      placeholder="Comment text ..."
      id="description"
      name="description"
      // value={this.state.description}
      // onChange={this.onChange}
      error=""
    />
    <Button
      type="submit"
    // disabled={loading || validateForm()}
    // btnType={validateForm() && 'disabled'}
    >Add</Button>
    {/* {error && <Error error={error} />} */}
  </Form>
);

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CommentForm;