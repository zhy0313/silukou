import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'


let todos = {
todos:[
  {text: 'Sporting1 Goods',uri: 'wwwwww', completed: false, id: 0},
  {text: 'Sporting2 Goods',uri: 'aaaaaa', completed: false,  id: 1},
  {text: 'Sporting3 Goods',uri: 'bbbbbbb', completed: false,  id: 2},
  {text: 'Electro4nics',uri: 'ccccccc', completed: false,  id: 3},
  {text: 'Electro5nics',uri: 'dddddd', completed: false,  id: 4},
  {text: 'Electron6ics',uri: 'eeeeeee', completed: true,  id: 5}
]};


const store = createStore(reducer, todos)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
