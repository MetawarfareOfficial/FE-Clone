import routesConst from 'routes/routes-const';
import PrivateRoute from 'routes/privateRoute';
import Dashboard from 'pages/Dashboard/Dashboard';

const routers = {
  dashboard: {
    exact: true,
    path: routesConst.DASHBOARD,
    component: Dashboard,
    route: PrivateRoute,
  },
};

export default routers;
