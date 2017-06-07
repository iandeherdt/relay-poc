import 'babel-polyfill';

import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

ReactDOM.render(
  <Relay.Renderer
    environment={Relay.Store}
    Container={App}
    queryConfig={new AppHomeRoute({
      factIds: [1, 2, 3, 4],
      elementIds: [400100, 400200, 400300]
    })}
  />,
  document.getElementById('root')
);
