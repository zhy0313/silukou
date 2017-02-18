import { connect } from 'react-redux'
import { showDownloadArea } from '../actions'
import Header from '../components/Header'

const mapStateToProps = (state ) => ({
  showDownloadArea: state.showDownloadArea
})


// const mapDispatchToProps = () => ({
//   onDownloadAreaClick: showDownloadArea
// })
const mapDispatchToProps = (dispatch) => ({
  onDownloadAreaClick: () => {
    dispatch(showDownloadArea)
  }
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
