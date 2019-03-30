import React from 'react';
import styled from 'styled-components';
import { sectionBasic, headerBasic } from '../utils/styles';

import TextFieldGroup from '../components/UI/inputs/TextFieldGroup';
import TextareaFieldGroup from '../components/UI/inputs/TextareaFieldGroup';
import Button from '../components/UI/Button';

const AddMovie = () => (
  <Section>
    <Form>
      <TextFieldGroup
        label="Title"
        placeholder="Title ..."
        id="title"
        name="title"
      // value={this.state.email}
      // onChange={this.onChange}
      />
      <TextFieldGroup
        label="Director"
        placeholder="Director ..."
        id="director"
        name="director"
      // value={this.state.email}
      // onChange={this.onChange}
      />
      <TextFieldGroup
        label="Year"
        placeholder="Year ..."
        id="year"
        name="year"
      // value={this.state.email}
      // onChange={this.onChange}
      />
      <TextFieldGroup
        label="Genres"
        placeholder="Separate with the commas ..."
        id="genres"
        name="genres"
      // value={this.state.email}
      // onChange={this.onChange}
      />
      <TextareaFieldGroup
        label="Short description"
        placeholder="One sentence about the movie ..."
        id="shortDescription"
        name="shortDescription"
        // value={this.state.description}
        // onChange={this.onChange}
        error=""
      />
      <TextareaFieldGroup
        label="Description"
        placeholder="Movie description ..."
        id="description"
        name="description"
        // value={this.state.description}
        // onChange={this.onChange}
        error=""
      />
      <Button type="submit">Done</Button>
    </Form>
  </Section>
);

const Section = styled.section`
  ${sectionBasic}
  ${headerBasic}
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
`;

export default AddMovie;