import { connect } from 'react-redux'
import { showDownloadArea,changeDataSource } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state ) => ({
  showDownloadArea: state.showDownloadArea,
  data: state.data,
})



const mapDispatchToProps = (dispatch) => ({
  onDownloadAreaClick: () => {
    dispatch(showDownloadArea)
  },
  onDataSourceClick: ( source) => {
    dispatch(changeDataSource( source ))  //选择数据源
  }
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
