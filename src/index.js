import React           from 'react';
import { render }      from 'react-dom';
import { Provider }    from 'react-redux';


let store = configureStore();



render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
