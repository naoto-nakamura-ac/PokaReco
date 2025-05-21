import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import './index.css'
import { UIProvider, Box } from '@yamada-ui/react';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UIProvider>
      <Box bg="#FFF4D8" minH="100vh">
        <App />
      </Box>
    </UIProvider>
  </StrictMode>
);
