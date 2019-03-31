import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../utils/styles';

const Actions = () => (
  <ActionsWrapper>
    <li className="action">
      <button className="btn"><i className="far fa-thumbs-up"></i></button>
      <p>265</p>
    </li>
    <li className="action">
      <button className="btn"><i className="fas fa-check"></i></button>
      <p>342</p>
    </li>
    <li className="action">
      <button className="btn"><i className="far fa-eye"></i></button>
      <p>298</p>
    </li>
  </ActionsWrapper>
);

const ActionsWrapper = styled.ul`
  padding: 0 .2em;
  display: flex;
  margin-bottom: .5em;

  .action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 .2em;
    margin-right: .4em;
  }

  p {
    font-weight: ${fonts.fontLight};
    line-height: .9em;
    font-size: .8em;
  }

  .btn {
    background: transparent;
    border: none;
    width: 30px;
    height: 30px;
    color: ${colors.mainWhite};
    font-size: 1.1em;
  }
`;

export default Actions;