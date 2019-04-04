import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { sectionBasic, headerBasic } from '../utils/styles';
import { withRouter } from 'react-router-dom';
import withAuth from '../utils/withAuth';
// import { Mutation } from 'react-apollo';

import TextFieldGroup from '../components/UI/inputs/TextFieldGroup';
import TextareaFieldGroup from '../components/UI/inputs/TextareaFieldGroup';
import SelectListGroup from '../components/UI/inputs/SelectListGroup';
import Button from '../components/UI/Button';
// import Error from '../utils/error';
import ScrollToTopOnMount from '../utils/scrollToTopOnMount';

// const initialState = {
//   title: '',
//   imageUrl: '',
//   director: '',
//   shortDescription: '',
//   description: '',
//   // username: ''
// };

const genreOptions = [
  { label: '* Select genres', value: 0 },
  { label: 'Action', value: 'Action' },
  { label: 'Sci-Fi', value: 'Sci-Fi' },
  { label: 'Drama', value: 'Drama' },
  { label: 'Documentary', value: 'Documentary' },
  { label: 'Fantasy', value: 'Fantasy' },
  { label: 'Historical', value: 'Historical' },
  { label: 'Horror', value: 'Horror' },
  { label: 'Comedy', value: 'Comedy' },
  { label: 'Adventure', value: 'Adventure' },
  { label: 'Thriller', value: 'Thriller' },
  { label: 'War', value: 'War' },
  { label: 'Others', value: 'Others' }
];

const AddMovie = () => {
  const [years, setListOfYears] = useState([{ label: '* Select year', value: 0 }]);
  const [genres, setListOfGenres] = useState([]);

  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let listOfYears = [];

    let startYear = 1920;
    while (startYear <= currentYear) {
      listOfYears.push({ label: startYear++, value: startYear++ });
    };

    setListOfYears([...years, ...listOfYears]);
  }, []);

  const onSelectChange = e => {
    if (genres.filter(i => i === e.target.value).length > 0) {
      console.log('Genre already added!');
      // open modal!!
      return;
    };

    setListOfGenres([...genres, e.target.value]);
  };

  return (
    <>
      <ScrollToTopOnMount />
      <Section>
        <h1 className="main-title">Add new <strong className="accent">Movie.</strong></h1>
        <p className="main-info">All fields are required. Remember to provide the right data.</p>
        <Form>
          <TextFieldGroup
            label="Title"
            placeholder="* Title ..."
            id="title"
            name="title"
          // value={this.state.email}
          // onChange={this.onChange}
          />
          <TextFieldGroup
            label="Director"
            placeholder="* Director ..."
            id="director"
            name="director"
          // value={this.state.email}
          // onChange={this.onChange}
          />
          <SelectListGroup
            name="year"
            id="year"
            label="Select year"
            // value={this.state.status}
            // onChange={this.onChange}
            options={years}
          // error={errors.status}
          />
          <SelectListGroup
            name="genres"
            id="genres"
            label="Select genres"
            // value={this.state.status}
            onChange={e => onSelectChange(e)}
            options={genreOptions}
          // error={errors.status}
          />
          {genres.length > 0 && <ul className="selected">
            <p>Selected genres:</p>
            {genres.map(genre => (
              <p>{genre}</p>
            ))}
          </ul>}
          <TextareaFieldGroup
            label="Short description"
            placeholder="* One sentence about the movie ..."
            id="shortDescription"
            name="shortDescription"
            // value={this.state.description}
            // onChange={this.onChange}
            error=""
          />
          <TextareaFieldGroup
            label="Description"
            placeholder="* Movie description ..."
            id="description"
            name="description"
            // value={this.state.description}
            // onChange={this.onChange}
            error=""
          />
          <Button type="submit">Done</Button>
        </Form>
      </Section>
    </>
  )
};

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

  .selected {
    font-size: .82em;
    text-align: center;
    margin-bottom: 1em;
  }
`;

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddMovie));