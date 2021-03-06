import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthWrapper from './styled';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Link, withRouter } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from './queries';

import bg from '../../assets/bg.png';
import { base64 } from '../../utils/base64';
import TextFieldGroup from '../../shared/inputs/TextFieldGroup';
import Button from '../../shared/Button';
import Spinner from '../../shared/Spinner';
import BlurImage from '../../components/UI/BlurImage';

const initialState = {
  username: '',
  email: '',
  password: '',
  password2: ''
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
    const { username, email, password, password2 } = state;
    const isInvalid = !username || !email || !password || !password2 || password !== password2;
    return isInvalid;
  };

  const handleSubmit = (e, signupUser) => {
    e.preventDefault();
    signupUser()
      .then(async ({ data }) => {
        localStorage.setItem('token', data.signupUser.token);
        clearState();

        await refetch(); // we pass refetch func throught withSession (in App.js)
        history.push('/');
      })
      .catch(err => {
        console.log(err);
        handleModal(err.message.substring(15), true);
      });
  };

  const { username, email, password, password2 } = state;

  return (
    <AuthWrapper>
      <div className="content">
        <header>
          <h1 className="main-title"><strong className="accent">Sign Up</strong> for free.</h1>
          <p className="main-info">Join to create a history of watched movies and be up-to-date with the world's cinema.</p>
          <p className="main-info">Have already account? Let's <Link className="accent" to="signin">Sign In.</Link></p>
        </header>
        <Mutation mutation={SIGNUP_USER} variables={{ username, email, password }}>
          {(signupUser, { loading }) => {
            if (loading) return <Spinner />

            return (
              <form className="form" onSubmit={e => handleSubmit(e, signupUser)}>
                <TextFieldGroup
                  label="Username:"
                  placeholder="Username ..."
                  id="username"
                  name="username"
                  value={username}
                  onChange={onChange}
                />
                <TextFieldGroup
                  label="Email:"
                  placeholder="Email ..."
                  id="email"
                  name="email"
                  type="email"
                  value={email}
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
                <TextFieldGroup
                  label="Confirm password:"
                  placeholder="Confirm password ..."
                  id="password2"
                  name="password2"
                  type="password"
                  value={password2}
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

SignUp.propTypes = {
  history: PropTypes.object,
  refetch: PropTypes.func
};

export default withRouter(SignUp);