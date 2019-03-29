import React from 'react';
import styled from 'styled-components';
import { device, sectionBasic, headerBasic } from '../../utils/styles';
import { Link } from 'react-router-dom';

import bg from '../../assets/bg.png';

import TextFieldGroup from '../../components/UI/inputs/TextFieldGroup';
import Button from '../../components/UI/Button';

const SignUp = () => (
  <SignUpWrapper>
    <div className="content">
      <header>
        <h1 className="main-title">Let's <strong className="accent">Sign In.</strong></h1>
        <p className="main-info">Join to create a history of watched movies and be up-to-date with the world's cinema.</p>
        <p className="main-info">You dont have an account yet? <Link className="accent" to="/">Sign Up.</Link></p>
      </header>
      <Form>
        <TextFieldGroup
          label="Username:"
          placeholder="Username ..."
          id="username"
          name="username"
        // value={this.state.email}
        // onChange={this.onChange}
        />
        <TextFieldGroup
          label="Password:"
          placeholder="Password ..."
          id="password"
          name="password"
        // value={this.state.email}
        // onChange={this.onChange}
        />
        <Button type="submit">Done</Button>
      </Form>
    </div>
    <aside className="img-showcase"></aside>
  </SignUpWrapper>
);

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

export default SignUp;