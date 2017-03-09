import React from 'react'
import { render } from 'react-dom'
// import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
// import reducer from './reducers'
import configureStore from './store/configureStore'

 import TreeView from 'treeview-react-bootstrap';

let todos = {
  todos:[
    {text: '下载中心',uri: 'DOWNLOADCENTER', completed: false, id: 0,sdf:0,qw:0},
    {text: '图表中心',uri: 'CHARTCENTER', completed: false,  id: 1},
    {text: 'Sporting3 Goods',uri: 'bbbbbbb', completed: false,  id: 2},
    {text: 'Electro4nics',uri: 'ccccccc', completed: false,  id: 3},
    {text: 'Electro5nics',uri: 'dddddd', completed: false,  id: 4},
    {text: 'Electron6ics',uri: 'eeeeeee', completed: true,  id: 5}
  ],
  data:{
    dataSourceList:[
      {name:'SINA', status:'OFF', speed:0},
      {name:'QQ', status:'OFF', speed:0},
      {name:'ALI', status:'OFF', speed:0},
    ],
    currentDataSource:'SINA',
  }
};

var data = [
  {
    text: "Parent 1",
    nodes: [
      {
        text: "Child 1",
        nodes: [
          {
            text: "Grandchild 1"
          },
          {
            text: "Grandchild 2"
          }
        ]
      },
      {
        text: "Child 2"
      }
    ]
  },
  {
    text: "Parent 2"
  }
];
const store = configureStore( todos)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// render(
//   <Provider store={store}>
//     <TreeView data={data} />,
//   </Provider>,
//   document.getElementById('root')
// )

// render(                
// 	React.createElement(TreeView, {data: data}),
// 	document.getElementById('root')
//   );

