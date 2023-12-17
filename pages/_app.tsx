import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "../components/AppContainers";
import theme from "../config/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ChakraProvider>
  );
}

export default MyApp;