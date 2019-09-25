import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

const Colors = {
    yellow: '#FECD45',
    grey: '#949EB0',
    blue: '#6D69FB'
};
  

const Fonts = {
    regular: 'rubik-regular',
    bold: 'rubik-bold',
    medium: 'rubik-medium'
}

export { Layout, Colors, Fonts }