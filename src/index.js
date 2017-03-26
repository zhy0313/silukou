import React from 'react'
import { render } from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
// import reducer from './reducers'
import configureStore from './store/configureStore'
import config from './utils/config'
import GlobalKeyBind   from './utils/global-key-bind';



const store = configureStore( config.todos)
GlobalKeyBind.subscribe(store);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)



