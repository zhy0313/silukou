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

const mapStateToProps = (state) => ({
  currentUri: getMainContentsUri(state ),
  tv:data,
})

const mapDispatchToProps =  ({
//   onTodoClick: toggleTodo
})



const MainContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContents)

export default MainContentsContainer
