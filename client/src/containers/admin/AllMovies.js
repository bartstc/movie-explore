import React, { useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query, Mutation } from 'react-apollo';
import { DELETE_MOVIE, GET_MOVIES } from './queries';
import { AllMoviesWrapper } from './styled';

import Spinner from '../../shared/Spinner';

const AllMovies = () => {
  const { handleModal } = useContext(ModalContext);

  const onClick = (deleteMovie) => {
    deleteMovie().then(() => {
      handleModal('Movie removed!', false);
    })
      .catch(err => handleModal(err.message, true));
  };

  return (
    <AllMoviesWrapper>
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
                    variables={{ _id }}
                    update={(cache, { data: { deleteMovie } }) => {
                      // console.log(cache); // access to queries in this comp (data -> data -> ROOT_QUERY)
                      // console.log(data); // access to current mutation (DELETE_MOVIE)
                      const { getMovies } = cache.readQuery({
                        query: GET_MOVIES
                        // variables if required: variables: {var}
                      });

                      cache.writeQuery({
                        query: GET_MOVIES,
                        // variables if required: variables: {var}
                        data: {
                          getMovies: getMovies.filter(movie => movie._id !== deleteMovie._id)
                        }
                      })
                    }}>
                    {(deleteMovie, attrs = {}) => (
                      <button onClick={() => onClick(deleteMovie)} className="remove">{attrs.loading ? 'deleting ...' : 'x'}</button>
                    )}
                  </Mutation>
                </li>
              ))}
            </ul>
          )
        }}
      </Query>
    </AllMoviesWrapper>
  );
};

export default AllMovies;