import {useSelector} from 'react-redux';

/**
 * Define Const color use for whole application
 */
export const BaseColor = {
  grayColor: '#9B9B9B',
  dividerColor: '#BDBDBD',
  whiteColor: '#FFFFFF',
  fieldColor: '#F5F5F5',
  yellowColor: '#eaab0c',
  navyBlue: '#304676',
  kashmir: '#5D6D7E',
  orangeColor: '#E5634D',
  blueColor: '#5DADE2',
  pinkColor: '#562D66',
  greenColor: '#1C9340',
  opaqueRed: '#C14439',
  primary: '#5663A9',
  secondary: '#DCDA00',
  tertiary: '#343D55',
};

/**
 * Define default theme use for whole application
 */
export const DefaultTheme = {
  // THIS IS USED NOW
  light: {
    dark: false,
    colors: {
      primary: '#5663A9',
      secondary: '#DCDA00',
      tertiary: '#343D55',
      primaryDark: '#FFA000',
      primaryLight: '#FFECB3',
      accent: '#795548',
      background: 'white',
      card: '#F5F5F5',
      text: '#212121',
      border: '#c7c7cc',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#DC880A',
      primaryDark: '#BF740D',
      primaryLight: '#FFECB3',
      accent: '#2e8964',
      background: '#020101',
      card: '#121212',
      text: '#e5e5e7',
      border: '#272729',
    },
  },
};

/**
 * Define list font use for whole application
 */
export const FontSupport = ['Raleway'];

/**
 * Define font default use for whole application
 */
export const DefaultFont = 'Raleway';

/**
 * export theme and colors for application
 * @returns theme,colors
 */
export const useTheme = () => {
  const theme = DefaultTheme;

  return {theme: theme.light, colors: theme.light.colors};
};

/**
 * export font for application
 * @returns font
 */
export const useFont = () => {
  const font = useSelector(state => state.application.font);
  return font ?? DefaultFont;
};
