import { connect } from 'react-redux'
import { showDownloadArea,changeDataSource,fetchPosts } from '../actions'
import Header from '../components/Header'
import React, { Component, PropTypes } from 'react'

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    // const { dispatch, selectedReddit } = this.props
    const { dispatch } = this.props

    //发送异步的方法
    // dispatch(fetchPostsIfNeeded(selectedReddit))
    // dispatch(fetchPosts() )  //尝试获取数据，一个测试 
    //现在写这里倒是不是必须的，因为这里表示的是，加载这个模块的时候，就运行这个dispatch
    //我需要的是，点击数据源运行，所以，这里只是一个测试而已
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedReddit !== this.props.selectedReddit) {
    //   const { dispatch, selectedReddit } = nextProps
    //   dispatch(fetchPostsIfNeeded(selectedReddit))
    // }
    //这里是我需要的真正，当这个模块要从props接收数据的时候，调用这里
     dispatch(fetchPosts() )
    // dispatch(showDownloadArea)
  }

  render() {
    //这里几个变量的引用是通过this.props
    //然后this.props中的这些变量是从最下面mapStateToProps 然后通过connect函数导入进来的，具体的流程是怎么走的我还是不太清楚
    const { selectedReddit, posts, isFetching, lastUpdated } = this.props
    const isEmpty = posts.length === 0
    return (
      <Header />
    )
  }

}


const mapStateToProps = (state ) => ({
  showDownloadArea: state.showDownloadArea,
  data: state.data,
})



const mapDispatchToProps = (dispatch) => ({
  onDownloadAreaClick: () => {
    dispatch(showDownloadArea)
  },
  onDataSourceClick: ( source) => {
    dispatch(changeDataSource( source )); //选择数据源
    dispatch(showDownloadArea)
    dispatch(fetchPosts() )  //尝试获取数据，一个测试
    
  }
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer

