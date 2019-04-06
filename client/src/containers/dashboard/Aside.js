import React from 'react';
import styled from 'styled-components';
import { semiTitle, device, colors, fonts } from '../../utils/styles';
import { Query } from 'react-apollo';
import { GET_MOST_POPULAR } from '../../queries';

import MovieWrapper from '../../components/UI/MovieWrapper';

const allGenres = ['Action', 'Sci-Fi', 'Drama', 'Documentary', 'Fantasy', 'Historical', 'Horror', 'Comedy', 'Adventure', 'Thriller', 'War', 'Others'];

const Aside = () => (
  <AsideWrapper>
    <h2 className="semi-title">Most popular.</h2>
    <Query query={GET_MOST_POPULAR}>
      {({ data, loading, error }) => {
        if (loading) return <div>Loading ...</div>;
        if (error) return <div>Error!</div>;
        return (
          <ul className="most-popular">
            {data.getMostPopular.map(movie => (
              <MovieWrapper key={movie._id} {...movie} />
            ))}
          </ul>
        )
      }}
    </Query>
    <h2 className="semi-title">Genres.</h2>
    <ul className="genres">
      {allGenres.map(genre => (
        <li key={genre}>{genre}</li>
      ))}
    </ul>
  </AsideWrapper>
);

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

  .genres {
    color: ${colors.mainWhite};
    font-weight: ${fonts.fontExtraLight};
  }
`;

export default Aside;