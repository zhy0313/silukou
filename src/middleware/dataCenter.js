

/**
 * 数据中心，通过访问本地数据库，本地文件，网络数据源，获取相关的数据，并返回到用户界面中去
 */

import { GetData } from '../utils/GetData'


//下载并更新股票列表信息
function stocklist(store){
    //放在中间件中，凡是进入软件之后，有操作，就会自动检查，股票列表文件是否是最新的
    var sourcedata = store.data.currentDataSource   //获取股票数据源
    //股票列表文件stocklist
}



export default store => next => action => {
    console.log('hello DataCenter', action)
    //用户提交制定好的action过来，执行相应的数据操作
    //获取所有状态
    var state = store.getState() 
    var gd = GetData.create()

    //获取所有股票日线数据,这个代码没有问题
    // gd.getSinaStockDailyHistory(state.data, next)
 gd.getSinaStockMinsHistory(state.data, next)
    
    //开启软件获取股票列表,第一次执行
    // if(!state.data.isDownStockList){
        
    //     gd.getNewStockList( next)
    // }

    //这里加一个条件，用来控制，下载分时线
    if(state.data.startDownloading){
        
        gd.getSinaStockMinsHistory(state.data, next)
    }




    let result = next(action)
    console.log('byby DataCenter', store.getState())
    return result
}





// // 下面的代码，是为了测试，promise是不是可以嵌套的，经过测试，是可以嵌套的，没有问题，很符合逻辑
// function test1(){
//     var p = new Promise(function(resolve, reject){
//         console.log('外面这一层')
        
//         setTimeout(function() {
//             resolve("第一层里面")
//         }, 3000);
//     })
//     return p
// }
// function test2(){
//     var p = new Promise(function(resolve, reject){
//         test1().then((d)=>{
//             console.log('test1回调的里面应该什么都没有'+d )
//             resolve("第二层里面")
//         })
            
//     })
    
//     return p
// }

// test2().then((d)=>{
//     console.log('test2回调的应该什么都没有'+d )
// })