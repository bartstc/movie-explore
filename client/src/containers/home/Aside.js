import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query } from 'react-apollo';
import { GET_MOST_POPULAR } from './queries';
import { AsideWrapper } from './styled';

import MovieWrapper from '../../components/UI/MovieWrapper';
import Spinner from '../../shared/Spinner';

const Aside = () => {
  const { handleModal } = useContext(ModalContext);

  return (
    <AsideWrapper>
      <h2 className="semi-title">Most popular.</h2>
      <Query query={GET_MOST_POPULAR}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return (
            <>
              {handleModal('Something goes wrong!', true)}
              <Redirect to="/signup" />
            </>
          );

          return (
            <ul className="most-popular">
              {data.getMostPopular.map(movie => (
                <MovieWrapper key={movie._id} {...movie} />
              ))}
            </ul>
          )
        }}
      </Query>
    </AsideWrapper>
  )
};

export default Aside;