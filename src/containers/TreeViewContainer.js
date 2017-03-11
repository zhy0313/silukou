import { connect } from 'react-redux'
import TreeView from '../components/TreeView'
import React, { Component, PropTypes } from 'react'
import { willDownItem } from '../actions'





//通过下面这些代码，与系统中的state保有连接
const mapStateToProps = (state ) => ({
  items: "只是做一个测试",
})



const mapDispatchToProps = (dispatch) => ({
  onWillDownItem: (items) => {
    dispatch(willDownItem(items))
  }
})

const TreeViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeView)

export default TreeViewContainer


