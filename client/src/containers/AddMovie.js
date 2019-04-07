import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import secret from '../config/secret';
import styled from 'styled-components';
import { sectionBasic, headerBasic, fonts } from '../utils/styles';
import { ModalContext } from '../utils/UIstore';
import { withRouter } from 'react-router-dom';
import withAuth from '../utils/withAuth';
import { Mutation } from 'react-apollo';
import { ADD_MOVIE } from '../queries';

import TextFieldGroup from '../components/UI/inputs/TextFieldGroup';
import TextareaFieldGroup from '../components/UI/inputs/TextareaFieldGroup';
import SelectListGroup from '../components/UI/inputs/SelectListGroup';
import Button from '../components/UI/Button';
import ScrollToTopOnMount from '../utils/scrollToTopOnMount';

const initialState = {
  title: '',
  imageUrl: null,
  director: '',
  year: '',
  description: '',
  username: '',
  fileLoading: false
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

    setState({ ...state, username: session.getCurrentUser.username });
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
  };

  const onImageChange = async e => {
    setState({ ...state, fileLoading: true });
    const image = e.target.files[0];

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', secret.preset);
    data.append('cloud_name', secret.cloud);
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${secret.cloud}/image/upload`, data);

    setState({ ...state, fileLoading: false, imageUrl: res.data.url });
  };

  const handleUploadImage = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  const clearState = () => {
    setState({ ...initialState });
  };

  const validateForm = () => {
    const { title, director, year, imageUrl, description } = state;
    const isInvalid = !title || !director || !year || !imageUrl || !description;
    return isInvalid;
  };

  const onSubmit = async (e, addMovie) => {
    e.preventDefault();

    addMovie().then(({ data }) => {
      clearState();
      history.push('/');
    })
      .catch(err => {
        console.log(err);
        handleModal(err.message, true);
      });
  };

  // updateCache

  const { title, imageUrl, director, year, description, username, fileLoading } = state;

  return (
    <>
      <ScrollToTopOnMount />
      <Mutation
        mutation={ADD_MOVIE}
        variables={{ title, imageUrl, director, year: Number(year), genres, description, username }}
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
                  label="Description"
                  placeholder="* Movie description ..."
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
                <input
                  type="file"
                  id="imageInput"
                  onChange={onImageChange}
                  hidden="hidden"
                />
                <p className="file-input">
                  <span className="label">{fileLoading ? 'Loading ...' : 'Upload Image'}</span>
                  <Button onClick={handleUploadImage}>{imageUrl ? 'Image selected' : 'Select image'}</Button>
                </p>
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

  .file-input {
    text-align: center;
    margin-bottom: 1.6em;
    display: flex;
    flex-direction: column;

    .label {
      font-size: 1em;
      margin-bottom: .4em;
      font-weight: ${fonts.fontExtraLight};
    }
  }
`;

export default withAuth(session => session && session.getCurrentUser)(withRouter(AddMovie));