


//涉及到数据操作的相关

//在数据源列表中选择数据源
const setCurrentDataSource = (currentDataSource, action) => {
    if(action.type == 'CHANGE_DATA_SOURCE'){
        return currentDataSource = action.name;
    }
    return currentDataSource
}


//数据源列表以及相关数据源连接情况
const dataSourceList = (dataSourceList, action) => {
    //测试网速的action
    //然后更具测得的速度更改状态
    return dataSourceList
}

function data(data = {}, action) {
  return {
    currentDataSource: setCurrentDataSource(data.currentDataSource, action),
    dataSourceList: dataSourceList(data.dataSourceList, action),
    stockList: getStockList(data.stockList,action),
    download: getStockList1(data.download,action),
    // willdown: willdown(data.willdown,action),
    // willdown: return {  //错误的写法
        // willdownItem:willdownItem(data.willdown.willdownItem,action),
        // willdownitemtype:willDownItemType(data.willdown.willdownitemtype,action),
        // setdownloadui: setdownloadui(data.willdown.setdownloadui,action), //默认情况下，软件开始后是没有设置的
        // starttime: starttime(data.willdown.starttime,action), //开始时间
        // endtime: endtime(data.willdown.endtime,action), //结束时间
    // }
        willdownItem:willdownItem(data.willdownItem,action),
        willdownitemtype:willDownItemType(data.willdownitemtype,action),
        setdownloadui: setdownloadui(data.setdownloadui,action), //默认情况下，软件开始后是没有设置的
        starttime: starttime(data.starttime,action), //开始时间
        endtime: endtime(data.endtime,action), //结束时间

  }
}

// const willdown = (willdown, action) => {
//     return {
//         willdownItem:willdownItem(willdown.willdownItem,action),
//         willdownitemtype:willDownItemType(willdown.willdownitemtype,action),
//         setdownloadui: setdownloadui(willdown.setdownloadui,action), //默认情况下，软件开始后是没有设置的
//         starttime: starttime(willdown.starttime,action), //开始时间
//         endtime: endtime(willdown.endtime,action), //结束时间
//     }
// }

/**
 * 获取股票列表数据数据
 */
const getStockList = (state, action) => {
    
    if(action.type == 'LOAD_STOCK_LIST'){
        return action.stockList;
    }
}
/**
 * 通过middleware获取所有股票代码
 */
const getStockList1 = (state, action) => {
    
    if(action.type == 'DOWN_STOCK_LIST'){
        return action.data;
    }
    
}

/**
 * 在下载设置区域，选择要下载的项目，返回下载选择的现在元素的集合，数组格式返回的
 */
const willdownItem = (state, action) => {
    if(action.type == 'WILLDOWNITEN'){
        return action.items;
    }
    return state
}

//下载数据的类型
const willDownItemType = (state, action) => {
    if(action.type == 'WILLDOWNITENTYPE'){
        return action.itemtype;
    }
    return state
}
//设置下载，关于下载设置界面的变化
const setdownloadui = (state, action) => {
    if(action.type == 'SETDOWNLOADUI'){
        return "OPEN";
    }else{
        return "CLOSE";
    }
}
//开始时间
const starttime = (state, action) => {
    if(action.type == 'STARTTIME'){
        return action.time
    }
    return state
}
//结束时间
const endtime = (state, action) => {
    if(action.type == 'EDNTIME'){
        return action.time
    }
    return state
}


export default data