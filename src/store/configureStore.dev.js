import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'
import logger from '../middleware/logger'
import reducer from '../reducers'
// import DevTools from '../containers/DevTools'

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    applyMiddleware(thunk,logger ),
    // compose(
      // applyMiddleware(thunk, api, createLogger()),
    //   // DevTools.instrument()
    // )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextreducer = require('../reducers').default
      store.replaceReducer(nextreducer)
    })
  }

  return store
}

export default configureStore
