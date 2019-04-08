import React, { useState, useContext } from 'react';
import AuthWrapper from '../../utils/AuthWrapper';
import { ModalContext } from '../../utils/UIstore';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries';

import TextFieldGroup from '../../components/UI/inputs/TextFieldGroup';
import Button from '../../components/UI/Button';
import Spinner from '../../components/UI/Spinner';

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

  const clearState = () => {
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
        localStorage.setItem('token', data.signinUser.token);
        clearState();

        await refetch(); // we pass refetch func throught withSession (in App.js), refetch getCurrentUser query
        history.push('/');
      })
      .catch(err => {
        handleModal(err.message.substring(15), true);
      });
  };

  const { username, password } = state;

  return (
    <AuthWrapper>
      <div className="content">
        <header>
          <h1 className="main-title">Let's <strong className="accent">Sign In.</strong></h1>
          <p className="main-info">Join to create a history of watched movies and be up-to-date with the world's cinema.</p>
          <p className="main-info">You dont have an account yet? <Link className="accent" to="/signup">Sign Up.</Link></p>
        </header>
        <Mutation mutation={SIGNIN_USER} variables={{ username, password }}>
          {(signinUser, { loading }) => {
            if (loading) return <Spinner />

            return (
              <form className="form" onSubmit={e => handleSubmit(e, signinUser)}>
                <TextFieldGroup
                  label="Username:"
                  placeholder="Username ..."
                  id="username"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
                <TextFieldGroup
                  label="Password:"
                  placeholder="Password ..."
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={onChange}
                />
                <Button
                  type="submit"
                  disabled={loading || validateForm()}
                  btnType={validateForm() && 'disabled'}
                >Done</Button>
              </form>
            )
          }}

        </Mutation>
      </div>
      <aside className="img-showcase"></aside>
    </AuthWrapper>
  )
};

export default withRouter(SignUp);