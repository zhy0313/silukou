import fetch from 'isomorphic-fetch'

//引入自定义的类，获取网络数据类
import netOperate from '../utils/netOperate';

let nextTodoId = 6 // 先这样，预定义的那几个的加入，所以要防止键的重复
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

//要把这个代码给给掉了，变成setCurrentPage 设置当前的激活的页面
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',  
  id
})

export const showDownloadArea = {
  type: 'SHOW_DOWNLOAD_AREA'
}


//选择切换数据源
//@para string name 数据源名称代码
export const changeDataSource = ( name) => ({
  type: 'CHANGE_DATA_SOURCE',  
  name
})


/**
 * 定义获取股票列表的行为，被异步函数调用
 * 参数 dataSource 字符串 存储设定好的，引用数据源
 * 参数 stockList 一个对象数组 存储从该数据源引入的股票列表数据(之前已经下载过的，有本地json就先加载本地的。本地json如果是当天更新的，就不检查
 * 否则，就异步检查该文本是否与数据源的列表同步)
 * */
export const loadStockList = ( json ) => ({
  type: 'LOAD_STOCK_LIST', 
  stockList: json,
})

//https://www.reddit.com/r/frontend.json
export function fetchPosts() {
  return dispatch => {
    // dispatch(loadStockList('first'))  //请求前的action
    // return fetch(`http://www.reddit.com/r/frontend.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(loadStockList( json)))  //请求后的action

    //这里可以放一个dispatch用来发送一个同步消息，表示程序以及执行到这一步了
    var options = {
      hostname: 'cnodejs.org',
      path: '/topic/533ba719b267342678006e48',
    };
    // var callback = function( data ){
    //   // console.log( data.length );
    //   //回调函数，当获取到数据的时候，dispatch到指定action function中
    //   dispatch(loadStockList( data));
    // }
    //这个是之前的做法，使用回调函数，现在的做法是通过promise来实现，就是下面那串代码
    // var client = new GetData(options)
    // return client.get(callback);
    var no = netOperate.create();  
    no.get( options ).then((data)=>{
        //测试输出数据
        dispatch(loadStockList( data));
    }).catch(function(reason){
        console.log('rejected');
        console.log(reason);
        return
    });


  }
}

/**
 * 获取指定的股票数据，这里也是应该一个异步的操作
 * 
 * 这个函数应该依赖 Redux thunk middleware
 * */
export const stockList = () => (dispatch, getState) => {
  // var data = getState().data;
  // var currentDataSource = data.currentDataSource;
  // var stockList = data.stockList;
  //注意，切换数据源的时候，也需要切换stockList,所以要将之前，切换数据源的代码稍微改一下
  //这里就设定数据源切换，自动也切换stockList
  //所以，这里首先看数据源是否一致
  //然后，再看是否存在stockList，不存在，则再看数据源，根据不同的数据源请求不同的数据
  //最后，看本地是否有对应的json,否则，向网络提交
  //最后，返回一个promise
  // if(dataSource==currentDataSource){
  //   if(stockList==null || stockList=="undefined" || stockList==""){

      return dispatch(fetchPosts());
  //   }
  // }

}



/**
 * 下载股票列表的action，会被自己写的middleware接收到
 */
export const downStockList = (data) => ({
  type: 'DOWN_STOCK_LIST',
  data
})



/**
 * 在下载设置区域，选择要下载的项目
 */
export const willDownItem = (items) => ({
  type: 'WILLDOWNITEN',
  items
})
/**
 * 在下载设置区域，选择要删除下载的项目
 */
export const willDownItemType = (itemtype) => ({
  type: 'WILLDOWNITENTYPE',
  itemtype
})

/**
 * 在下载设置区域，选择要下载的项目的类型，日线，分钟线等
 */
export const startTime = (time) => ({
  type: 'STARTTIME',
  time
})

/**
 * 在下载设置区域，选择要下载的项目的时间范围，开始时间，结束时间
 */
export const endTime = (time) => ({
  type: 'EDNTIME',
  time,
})



