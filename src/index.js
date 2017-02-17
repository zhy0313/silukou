import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


let todos = {
todos:[
  {text: 'Sporting1 Goods', completed: false, id: 0},
  {text: 'Sporting2 Goods', completed: false,  id: 1},
  {text: 'Sporting3 Goods', completed: false,  id: 2},
  {text: 'Electro4nics', completed: false,  id: 3},
  {text: 'Electro5nics', completed: false,  id: 4},
  {text: 'Electron6ics', completed: true,  id: 5}
]};


const store = createStore(reducer, todos)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
