
//返回当前页面的url
const getMainContentsUri = (state) => {
    let tabList = state.todos;
    for(let i=0; i<tabList.length; i++){
        if(tabList[i].completed){
            return tabList[i].uri;
        }
    }
}

const currentUri = (state = 'aaaaaa') => {

      return state
}


export default currentUri
