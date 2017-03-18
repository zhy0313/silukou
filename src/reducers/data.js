


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
        setdownloadui: setdownloadui(data,action), //默认情况下，软件开始后是没有设置的
        starttime: starttime(data.starttime,action), //开始时间
        endtime: endtime(data.endtime,action), //结束时间
        isDownStockList: isdownstocklist(data.isDownStockList, action ), //用于判断是否第一次下载
        startDownloading:startdownloading(data.startDownloading,action), //点击开始下载按钮，根据state状态开始下载

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
//判断第一次执行下载股票列表操作，作为一个标记
const isdownstocklist = (state, action) => {
    if(action.type == 'DOWN_STOCK_LIST'){
        return true //
    }
    return state //
}
/**
 * 通过middleware获取所有股票代码
 */
const getStockList1 = (state, action) => {
    if(action.type == 'DOWN_STOCK_LIST'){
        return action.data;
    }
    return state //不返回state，要没有了状态的！！！ attention
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
        if(state.setdownloadui=="CLOSE"){
            return "OPEN" //界面已经关闭，就可以再次打开编辑
        }
        var s = state.willdownItem && state.willdownitemtype && state.starttime && state.endtime ? true : false;
        if(s){
            //当已经设置完成的时候，可以选中关闭窗口
            return "CLOSE";
        }
    }
    if(!state.setdownloadui){
        return "OPEN"
    }
    return state.setdownloadui
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
//开始下载，根据state的状态
const startdownloading = (state, action) => {
    if(action.type == 'STARTDOWNLOADING'){
        return true
    }
    return state
}



export default data