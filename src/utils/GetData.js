'use strict';

/**
 * 通过此模块获取数据
 * 本模块通过访问本地和网络获取数据，返回到内存当中
 * 2017年03月06日
 * 在这里，需要组织URL，然后提交数据，异步返回Promise,这样就可以在maddleware中处理，将数据导入到内存中去
 */




var netOperate = require('./netOperate.js');
var localOperate = require('./localOperate');
// import { netOperate } from '../netOperate'


var no = netOperate.create();



// export default class GetData {
export var GetData = {
    create:function(options){
        var g = {}
        g.options = Object.assign({
            hostname: '', //这个需要指定的
            port: 80,
            path: '', //这个也是需要单独指定的
            method: 'GET'
            },
            options
        );
        g.totalData = ""
        /**
         * 根据不同的访问需求，组织URL
         */
        g.makeUrl = function(options){

            //现在先进行测试，测试内容是完整的一个流程，下载A股所有股票内容
            //param:"[%22hq%22,%22hs_a%22,%22{sort}%22,{asc},{page},{num}]",
            //http://money.finance.sina.com.cn/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%220%22,0,1,500]]
            //全体A股的
            var param = "[%22hq%22,%22hs_a%22,%22{sort}%22,{asc},{page},{num}]"
            var path = "/d/api/openapi_proxy.php/?__s=[" + param + "]";

            var page = options.page
            var number = options.number
            path = path.replace("{page}", page);
            path = path.replace("{num}", number);
            path = path.replace("{asc}", 0);
            path = path.replace("{sort}", "0");

            //通过直接给this.options赋值，来作为当前的提交URL
            g.options = Object.assign(
                g.options,
                {
                    hostname: 'money.finance.sina.com.cn',
                    // path: '/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%220%22,0,page,num]]'
                    path: path
                }
            )


        }

        /**
         * 提交URL，并接受数据
         */
        g.download = function( op , next){
            //根据需要求，组织好URL
            //现在只是测试，所以没有带参数
            g.makeUrl(op)
            
            // var p = new Promise(function(resolve, reject){
                //该调用newOperate对象的方法了
                // no.get( g.options, callback )
            // })
            // return p

            no.get( g.options ).then((data)=>{
                //测试输出数据
                g.totalData += data
                // console.log(g.totalData +'\n\n\n\n\n\n' )
                // console.dir( data )
                // console.log( "data返回正常" ); //显示数据，测试完了之后，就可以用来做存储数据了
                data = JSON.parse(data)
                
                var pages = data[0].count / op.number
                pages += data[0].count % op.number > 0 ? 1 : 0; //如果还有余数的话，就加一
                op.page = op.page+1
                console.dir( op.page +'====='+pages )
                while(op.page < pages){
                    // console.dir( op )
                    return g.download(op, next) //继续申请数据
                }
                console.dir( op.page )
                //这里应该写next的代码，因为，这个时候，totalData已经获取到了所有的股票代码及相关数据了
                next({
                    type: 'DOWN_STOCK_LIST',
                    data:g.totalData
                })
            }).catch(function(reason){
                console.log('rejected');
                console.log(reason);
                return
            });
          
        }         

        /**
         * 判断是否本地有此文件
         */


        /**
         * 判断是否需要更新此文件
         */

        

         return g
    }


}


// //类函数测试用例


// var gd = GetData.create()
// var op = {
//     page:0,
//     number: 500
// }
// gd.download(op)

