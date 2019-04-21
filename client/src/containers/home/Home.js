import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query } from 'react-apollo';
import { GET_LAST_ADDED, GET_TOP_10 } from './queries';
import { HomeWrapper, List, TopList } from './styled';

import MovieWrapper from '../../components/UI/MovieWrapper';
import Aside from './Aside';
import TopMovie from '../../components/UI/TopMovie';
import Spinner from '../../shared/Spinner';

const Home = () => {
  const { handleModal } = useContext(ModalContext);

  return (
    <HomeWrapper>
      <section>
        <h2 className="title">Last added.</h2>
        <Query query={GET_LAST_ADDED}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return (
              <>
                {handleModal('Something goes wrong!', true)}
                <Redirect to="/signup" />
              </>
            );

            return (
              <List>
                {data.getLastAdded.map(movie => (
                  <MovieWrapper key={movie._id} {...movie} />
                ))}
              </List>
            )
          }}
        </Query>
        <h2 className="title">Top 10.</h2>
        <Query query={GET_TOP_10}>
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return (
              <>
                {handleModal('Error! Movie not found!', true)}
                <Redirect to="/" />
              </>
            )

            return (
              <TopList>
                {data.getTop10.map(movie => (
                  <TopMovie key={movie._id} {...movie} />
                ))}
              </TopList>
            )
          }}
        </Query>
      </section>
      <Aside />
    </HomeWrapper>
  )
};

export default Home;