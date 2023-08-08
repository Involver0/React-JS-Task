import { routes } from './routes';
import { RouterProvider } from 'react-router-dom';
import './App.css';

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
