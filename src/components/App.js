import React from 'react'
import Footer from './Footer'
import Header from './Header'
import MainContentsContainer from '../containers/MainContentsContainer'

import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <Header />

    <div className="container-fluid">
      <div className="row">
        <VisibleTodoList />
        <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <MainContentsContainer />
        </div>
      </div>
    </div>
        
    
    <Footer />
  </div>
)

export default App
