import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config })
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

  root.render(
    <ChakraProvider theme = {theme}>
      <App />
    </ChakraProvider>
);

