import { connect } from 'react-redux'
// import { toggleTodo } from '../actions'
import MainContents from '../components/MainContents'

//返回当前页面的url
const getMainContentsUri = (state) => {
    let tabList = state.todos;
    for(let i=0; i<tabList.length; i++){
        if(tabList[i].completed){
            let currentUri = tabList[i].uri;
            state.currentUri = currentUri;
            return currentUri;
        }
    }
}


const mapStateToProps = (state) => ({
  currentUri: getMainContentsUri(state )
})

const mapDispatchToProps =  ({
//   onTodoClick: toggleTodo
})



const MainContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContents)

export default MainContentsContainer
