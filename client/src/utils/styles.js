import bg from '../assets/bg.png';

export const colors = {
  mainColor: `#B41027`,
  mainBlack: `#060606`,
  mainWhite: `#fff`,
};

export const fonts = {
  fontPrimary: `'Comfortaa', cursive`,
  fontExtraLight: `200`,
  fontLight: `300`,
  fontBold: `600`
};

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
}

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`
};

export const headerBasic = `
  .main-title {
    text-align: center;
    font-size: 1.6em;
    font-weight: ${fonts.fontLight};
    margin-bottom: .6em;
  }

  .accent {
    font-weight: ${fonts.fontBold};
    color: ${colors.mainColor};
  }

  .main-info {
    font-size: .8em;
    text-align: center;
    max-width: 425px;
    margin: 0 auto;
    margin-top: .7em;
  }
`;

export const title = `
  .title {
    font-weight: ${fonts.fontLight};
    border-left: 2px solid ${colors.mainColor};
    padding-left: .3em;
    margin-bottom: .8em;
    font-size: 1.2em;
    color: ${colors.mainWhite};

    @media ${device.mobileL} {
      font-size: 1.6em;
    }
  }
`;

export const semiTitle = `
  .semi-title {
    font-weight: ${fonts.fontLight};
    border-left: 2px solid ${colors.mainColor};
    padding-left: .3em;
    margin-bottom: .8em;
    font-size: 1.05em;
    color: ${colors.mainWhite};
  }
`;

export const profileBasic = `
  ${title}
  margin-bottom: 1em;
  max-width: 650px;
  margin: 0 auto;

  .content-wrapper {
    display: grid;
    margin-bottom: 1.2em;
    
    @media ${device.mobileL} {
      grid-template-columns: 1fr 1fr;
      grid-column-gap: .5em;
    }
  }

  .list-title {
    font-size: 1.1em;
    font-weight: ${fonts.fontLight};
    border-bottom: 1px solid ${colors.mainColor};
    margin-bottom: .5em;
  }

  .movies-list {
    max-width: 320px;
  }

  .alt {
    font-size: .9em;
    margin-bottom: 1.2em;
  }
`;

export const authStyles = `
  ${headerBasic}
    
  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1em;
  }

  .img-showcase {
    display: none;
    background: url(${bg}) no-repeat center;
    background-size: cover;
    min-height: 500px;

    @media ${device.tablet} {
      display: block;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1em;
  }
`;