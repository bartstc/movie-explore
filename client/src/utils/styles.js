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

// Style packages
export const sectionBasic = `
  width: 100%;
  padding: 55px .5em 10px .5em;

  @media ${device.tablet} {
    padding-top: 90px;
  }
`;

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