import React from 'react'
import Footer from './Footer'
import Header from './Header'
import MainContents from './MainContents'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <Header />

    <div className="container-fluid">
      <div className="row">
        <VisibleTodoList />
        <MainContents />
      </div>
    </div>
        
    
    <Footer />
  </div>
)

export default App
