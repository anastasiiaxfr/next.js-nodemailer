import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import { Dict } from '@chakra-ui/utils';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: Dict) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('#1A202C', 'black.2')(props),
        color: mode('white', 'gray.1')(props),
      },
    }),
  },

});

export default theme;
