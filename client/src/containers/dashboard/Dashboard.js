import React from 'react';
import styled from 'styled-components';
import { sectionBasic, title, device, fonts } from '../../utils/styles';
import { Query } from 'react-apollo';
import { GET_LAST_ADDED, GET_TOP_10 } from '../../queries';

import MovieWrapper from '../../components/UI/MovieWrapper';
import Aside from './Aside';
import TopMovie from '../../components/UI/TopMovie';

const Dashboard = () => (
  <DashboardWraper>
    <section>
      <h2 className="title">Last added.</h2>
      <Query query={GET_LAST_ADDED}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading ...</div>;
          if (error) return <div>Error!</div>;
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
          if (loading) return <div>Loading ...</div>;
          if (error) return <div>Error!</div>;
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
  </DashboardWraper>
);

const DashboardWraper = styled.div`
  ${title}
  ${sectionBasic}
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

export default Dashboard;