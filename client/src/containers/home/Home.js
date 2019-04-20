import React, { useContext } from 'react';
import styled from 'styled-components';
import { title, device, fonts } from '../../utils/styles';
import { Redirect } from 'react-router-dom';
import { ModalContext } from '../../store/UIStore/UIstore';
import { Query } from 'react-apollo';
import { GET_LAST_ADDED, GET_TOP_10 } from '../../queries';

import MovieWrapper from '../../components/UI/MovieWrapper';
import Aside from './Aside';
import TopMovie from '../../components/UI/TopMovie';
import Spinner from '../../components/UI/Spinner';

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

const HomeWrapper = styled.div`
  ${title}
  display: grid;

  @media ${device.laptop} {
    grid-template-columns: 84% 13%;
    grid-column-gap: 3%;
  }

  .note {
    font-weight: ${fonts.fontLight};
    font-size: .9em;
    max-width: 400px;
  }
`;

const List = styled.ul`
  margin-bottom: .6em;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: .3em;

  @media ${device.mobileL} {
    grid-template-columns: repeat(auto-fill, 120px); 
    grid-column-gap: .5em;
  }
`;

const TopList = styled.ul`
  margin-bottom: .6em;
  display: flex;
  flex-direction: column;

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: .4em;
  }
`;

export default Home;