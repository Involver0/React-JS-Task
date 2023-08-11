import { createBrowserRouter } from 'react-router-dom';
import PageTemplate from './layouts/page-template/PageTemplate';
import EventListPage from './pages/event-list-page/EventListPage';
import RegisterPage from './pages/register-page/RegisterPage';
import LoginPage from './pages/login-page/LoginPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <PageTemplate />,
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/attendees',
        element: <EventListPage />,
      },
    ],
  },
]);
