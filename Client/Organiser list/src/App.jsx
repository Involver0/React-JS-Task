import { routes } from './Routes';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
};

export default App;
