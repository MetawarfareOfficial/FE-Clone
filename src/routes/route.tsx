import routesConst from 'routes/routes-const';
import PrivateRoute from 'routes/privateRoute';
import Dashboard from 'pages/Dashboard/Dashboard';
import MintContract from 'pages/MintContract';
import MyContract from 'pages/MyContract';

const routers = {
  dashboard: {
    exact: true,
    path: routesConst.DASHBOARD,
    component: Dashboard,
    route: PrivateRoute,
  },
  mintContract: {
    exact: true,
    path: routesConst.MINT_CONTRACT,
    component: MintContract,
    route: PrivateRoute,
  },
  myContract: {
    exact: true,
    path: routesConst.MY_CONTRACT,
    component: MyContract,
    route: PrivateRoute,
  },
};

export default routers;
