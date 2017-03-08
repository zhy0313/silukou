

/**
 * 数据中心，通过访问本地数据库，本地文件，网络数据源，获取相关的数据，并返回到用户界面中去
 */

import { GetData } from '../utils/GetData'


export default store => next => action => {
    console.log('hello DataCenter', action)
    //用户提交制定好的action过来，执行相应的数据操作

    if ( action.type !== 'DOWN_STOCK_LIST') {
        //没有定义的API就直接返回原先的store
        return next(action)
    }

    //获取所有股票代码及其他一些数据
    var gd = GetData.create()
    var op = {
        page:0,
        number: 500
    }
    gd.download(op ,next )
    

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