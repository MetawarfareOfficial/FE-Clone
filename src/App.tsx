import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'styles/index.css';
import routes from 'routes/route';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useEagerConnect, useInactiveListener } from 'hooks';

const App: React.FC<any> = () => {
  const { connector } = useWeb3React<Web3Provider>();
  const triedEager = useEagerConnect();

  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <div className={'container mx-auto p-4'}>
      <React.Suspense fallback={<div>....Loading</div>}>
        <Switch>
          {Object.keys(routes).map((key) => {
            //@ts-ignore
            const route = routes[key];
            return <route.route key={route.path} {...route} />;
          })}
          <Route path="*" />
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default App;
