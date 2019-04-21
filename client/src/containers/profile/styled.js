import styled from 'styled-components';
import { fonts, colors } from '../../utils/styles';

export const FriendWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .65em;

  .username {
    font-size: .8em;
    font-weight: ${fonts.fontLight};
    padding-left: .3em;
    color: ${colors.mainWhite};
  }

  .btn {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 30px;
  }
`;

export const InvitationWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: .65em;

  .username {
    font-size: .8em;
    font-weight: ${fonts.fontLight};
    padding-left: .5em;
    color: ${colors.mainWhite};
  }

  .btn {
    font-weight: ${fonts.fontBold};
    font-size: 1.1em;
    color: ${colors.mainColor};
    background: transparent;
    border: none;
    width: 40px;
  }

  span {
    display: flex;
  }
`;

export const MovieWrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .4em;
  padding-left: .6em;
  margin-bottom: .8em;
  border-radius: 7px;
  background: #171717;

  .movie-title {
    font-size: .85em;
    line-height: 1em;
    color: ${colors.mainWhite};
  }

  .rating {
    font-weight: ${fonts.fontBold};
    font-size: .85em;
    color: ${colors.mainColor};
  }
`;

export const SearchWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;

  .username {
    font-size: 1em;
    font-weight: ${fonts.fontLight};
    color: ${colors.mainWhite};
    padding-left: 1em;
  }
`;