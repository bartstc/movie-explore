import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthWrapper from './styled';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from './queries';

import bg from '../../assets/bg.png';
import { base64 } from '../../utils/base64';
import TextFieldGroup from '../../shared/inputs/TextFieldGroup';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import BlurImage from '../../components/UI/BlurImage';

const initialState = {
  username: '',
  password: ''
};

const SignIn = ({ refetch, history }) => {
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
      <aside className="img-showcase">
        <BlurImage src={bg} base64={base64} alt="" />
      </aside>
    </AuthWrapper>
  )
};

SignIn.propTypes = {
  history: PropTypes.object,
  refetch: PropTypes.func
};

export default withRouter(SignIn);