import { Outlet, useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Users from './pages/Users';
import CourseDetails from './pages/Courses/CourseDetails';
import DashboardLayout from './pages/DashboardLayout';

const routes = (isLoggedIn, authType, user, setUser) => [
  {
    path: '/',
    element: isLoggedIn ? (
      <DashboardLayout authType={authType} />
    ) : (
      <Login user={user} setUser={setUser} />
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/users',
        element: <Outlet />,
        children: [{ path: '/users/', element: <Users /> }],
      },
      {
        path: '/courses/',
        element: <Outlet />,
        children: [
          { path: '/courses/:courseId', element: <CourseDetails /> },
        ],
      },

      {
        path: '/logout',
        element: <Logout />,
      },
    ],
  },
];

export default function Routing(props) {
  const { user, setUser, authType, isLoggedIn } = props;
  const routing = useRoutes(
    routes(isLoggedIn, authType, user, setUser)
  );
  return routing;
}
