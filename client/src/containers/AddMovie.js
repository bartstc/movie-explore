import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { sectionBasic, headerBasic } from '../utils/styles';
import { withRouter } from 'react-router-dom';
import withAuth from '../utils/withAuth';
import { Mutation } from 'react-apollo';
import { ADD_MOVIE } from '../queries';
import { ModalContext } from '../utils/UIstore';

import TextFieldGroup from '../components/UI/inputs/TextFieldGroup';
import TextareaFieldGroup from '../components/UI/inputs/TextareaFieldGroup';
import SelectListGroup from '../components/UI/inputs/SelectListGroup';
import Button from '../components/UI/Button';
import ScrollToTopOnMount from '../utils/scrollToTopOnMount';

const initialState = {
  title: '',
  imageUrl: '',
  director: '',
  year: '',
  shortDescription: '',
  description: '',
  username: ''
};

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

const AddMovie = ({ session, history }) => {
  const { handleModal } = useContext(ModalContext);

  const [years, setListOfYears] = useState([{ label: '* Select year', value: 0 }]);
  const [genres, setListOfGenres] = useState([]);
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    let currentYear = new Date().getFullYear();
    let listOfYears = [];

    let startYear = 1920;
    for (let i = startYear; i <= currentYear; i++) {
      listOfYears.push({ label: i, value: i });
    };

    setState({ ...state, username: session.getCurrentUser.username, imageUrl: 'imageUrl' });
    setListOfYears([...years, ...listOfYears]);
  }, []);

  const onGenresSelectChange = e => {
    if (genres.filter(i => i === e.target.value).length > 0) {
      handleModal('Genre already added!', true);
      return;
    };

    setListOfGenres([...genres, e.target.value]);
  };


  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
    console.log(state.year)
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  const validateForm = () => {
    const { title, director, year, imageUrl, shortDescription, description } = state;
    const isInvalid = !title || !director || !year || !imageUrl || !shortDescription || !description;
    return isInvalid;
  };

  const onSubmit = (e, addMovie) => {
    e.preventDefault();

    addMovie().then(({ data }) => {
      console.log(data);
      clearState();
      history.push('/');
    })
      .catch(err => {
        console.log(err);
        handleModal(err.message, true);
      });
  };

  // updateCache

  const { title, imageUrl, director, year, shortDescription, description, username } = state;

  return (
    <>
      <ScrollToTopOnMount />
      <Mutation
        mutation={ADD_MOVIE}
        variables={{ title, imageUrl, director, year: Number(year), genres, shortDescription, description, username }}
      >
        {(addMovie, { loading }) => {

          return (
            <Section>
              <h1 className="main-title">Add new <strong className="accent">Movie.</strong></h1>
              <p className="main-info">All fields are required. Remember to provide the right data.</p>
              <Form onSubmit={e => onSubmit(e, addMovie)}>
                <TextFieldGroup
                  label="Title"
                  placeholder="* Title ..."
                  id="title"
                  name="title"
                  value={title}
                  onChange={onChange}
                />
                <TextFieldGroup
                  label="Director"
                  placeholder="* Director ..."
                  id="director"
                  name="director"
                  value={director}
                  onChange={onChange}
                />
                <SelectListGroup
                  name="year"
                  id="year"
                  label="Select year"
                  value={year}
                  onChange={onChange}
                  options={years}
                />
                <SelectListGroup
                  name="genres"
                  id="genres"
                  label="Select genres"
                  onChange={e => onGenresSelectChange(e)}
                  options={genreOptions}
                />
                {genres.length > 0 && <ul className="selected">
                  <p>Selected genres:</p>
                  {genres.map((genre, i) => (
                    <p key={i}>{genre}</p>
                  ))}
                </ul>}
                <TextareaFieldGroup
                  label="Short description"
                  placeholder="* One sentence about the movie ..."
                  id="shortDescription"
                  name="shortDescription"
                  value={shortDescription}
                  onChange={onChange}
                />
                <TextareaFieldGroup
                  label="Description"
                  placeholder="* Movie description ..."
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
                <Button
                  type="submit"
                  disabled={loading || validateForm()}
                  btnType={validateForm() && 'disabled'}
                >Done</Button>
              </Form>
            </Section>
          )
        }}
      </Mutation>
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