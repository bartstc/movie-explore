import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { device, sectionBasic, headerBasic } from '../../utils/styles';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';
import { ModalContext } from '../../utils/UIstore';

import bg from '../../assets/bg.png';
import TextFieldGroup from '../../components/UI/inputs/TextFieldGroup';
import Button from '../../components/UI/Button';

const initialState = {
  username: '',
  password: ''
};

const SignUp = ({ refetch, history }) => {
  const { handleModal } = useContext(ModalContext);
  const [state, setState] = useState({ ...initialState });

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const clearState = e => {
    setState({ ...initialState });
  };

  const validateForm = () => {
    const { username, password } = state;
    const isInvalid = !username || !password;
    return isInvalid;
  };

  const handleSubmit = (e, signinUser) => {
    e.preventDefault();

    signinUser()
      .then(async ({ data }) => {
        // console.log(data);
        localStorage.setItem('token', data.signinUser.token);
        clearState();

        await refetch(); // we pass refetch func throught withSession (in App.js)
        history.push('/dashboard');
      })
      .catch(err => {
        console.log(err);
        handleModal(err.message, true);
      });
  };

  const { username, password } = state;

  return (
    <SignUpWrapper>
      <div className="content">
        <header>
          <h1 className="main-title">Let's <strong className="accent">Sign In.</strong></h1>
          <p className="main-info">Join to create a history of watched movies and be up-to-date with the world's cinema.</p>
          <p className="main-info">You dont have an account yet? <Link className="accent" to="/">Sign Up.</Link></p>
        </header>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { data, loading, error }) => {

            return (
              <Form onSubmit={e => handleSubmit(e, signinUser)}>
                <TextFieldGroup
                  label="Username:"
                  placeholder="Username ..."
                  id="username"
                  name="username"
                  value={username || ''}
                  onChange={onChange}
                />
                <TextFieldGroup
                  label="Password:"
                  placeholder="Password ..."
                  id="password"
                  name="password"
                  type="password"
                  value={password || ''}
                  onChange={onChange}
                />
                <Button
                  type="submit"
                  disabled={loading || validateForm()}
                  btnType={validateForm() && 'disabled'}
                >Done</Button>
              </Form>
            )
          }}

        </Mutation>
      </div>
      <aside className="img-showcase"></aside>
    </SignUpWrapper>
  )
};

const SignUpWrapper = styled.section`
  ${sectionBasic}
  ${headerBasic}
  
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
    padding-top: calc(5em + 4.5vw);
  }
  
  .img-showcase {
    display: none;
    background: url(${bg}) no-repeat center;
    background-size: cover;
    min-height: 500px;

    @media ${device.tablet} {
      display: block;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;
`;

export default withRouter(SignUp);