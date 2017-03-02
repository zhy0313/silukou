


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
    download: {}
  }
}

/**
 * 获取股票列表数据数据
 */
const getStockList = (state, action) => {
    
    if(action.type == 'LOAD_STOCK_LIST'){
        return action.stockList;
    }
    
}


export default data