import styled from 'styled-components';
import { fonts, headerBasic, colors } from '../../utils/styles';

export const AdminSection = styled.section`
  ${headerBasic}

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;

    .selected {
      font-size: .82em;
      text-align: center;
      margin-bottom: 1em;
    }

    .file-input {
      text-align: center;
      margin-bottom: 1.6em;
      display: flex;
      flex-direction: column;

      .label {
        font-size: 1em;
        margin-bottom: .4em;
        font-weight: ${fonts.fontExtraLight};
      }
    }
  }
`;

export const AllMoviesWrapper = styled.section`
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