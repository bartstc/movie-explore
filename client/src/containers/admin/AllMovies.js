import React, { useContext } from 'react';
import styled from 'styled-components';
import { colors, fonts, headerBasic } from '../../utils/styles';
import { Redirect, Link } from 'react-router-dom';
import { ModalContext } from '../../utils/UIstore';
import { Query, Mutation } from 'react-apollo';
import { DELETE_MOVIE, GET_MOVIES } from '../../queries';

import Spinner from '../../components/UI/Spinner';

const AllMovies = () => {
  const { handleModal } = useContext(ModalContext);

  const onClick = (deleteMovie) => {
    deleteMovie().then(() => {
      handleModal('Movie removed!', false);
    })
      .catch(err => handleModal(err.message, true));
  };

  return (
    <All>
      <h1 className="main-title">All movies.</h1>
      <Query query={GET_MOVIES}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return (
            <>
              {handleModal('Error! Something goes wrong!', true)}
              <Redirect to="/signup" />
            </>
          );

          return (
            <ul className="most-popular">
              {data.getMovies.map(({ _id, title }) => (
                <li key={_id} className="movie">
                  <Link to={`/movie/${_id}`} className="title">{title}</Link>
                  <Mutation
                    mutation={DELETE_MOVIE}
                    variables={{ _id }}>
                    {deleteMovie => (
                      <button onClick={() => onClick(deleteMovie)} className="remove">x</button>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
    </All>
  );
};

const All = styled.section`
  ${headerBasic};
  margin-top: 2em;

  .movie {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: .65em;
  }

  .title {
    color: ${colors.mainWhite};
    font-weight: ${fonts.fontExtraLight};
  }

  .remove {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 30px;
  }
`;

export default AllMovies;