import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'styles/index.css';
import routes from 'routes/route';

const App: React.FC<any> = () => {
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
