import React, { useContext } from 'react';
import styled from 'styled-components';
import { semiTitle, device } from '../../utils/styles';
import { Redirect } from 'react-router-dom';
import { ModalContext } from '../../utils/UIstore';
import { Query } from 'react-apollo';
import { GET_MOST_POPULAR } from '../../queries';

import MovieWrapper from '../../components/UI/MovieWrapper';
import Spinner from '../../components/UI/Spinner';

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

const AsideWrapper = styled.aside`
  ${semiTitle}
  
  .most-popular {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: .3em;

    @media ${device.mobileL} {
      grid-template-columns: repeat(auto-fill, 120px); 
      grid-column-gap: .5em;
    }

    @media ${device.laptop} {
      padding: 0;
      grid-template-columns: 1fr;
      grid-column-gap: 0;
    }
  }
`;

export default Aside;