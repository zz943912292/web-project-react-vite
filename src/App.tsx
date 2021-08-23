import React, { Suspense } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import { reducers, createStoreWithMdware } from './redux';

const store = createStoreWithMdware(reducers);

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          {routes.map((route) => (
            <Route {...route} />
          ))}
        </Switch>
      </Suspense>
    </HashRouter>
  </Provider>
);

export default App;
