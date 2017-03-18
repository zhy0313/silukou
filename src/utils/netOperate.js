'use strict';

/**
 * 网络访问操作模块
 * 2017年03月02日
 */

var http = require('http');


var obj = {
// export var obj = {

    create:function(options){

        var t = {}
        t.options = Object.assign({
            hostname: '', //这个需要指定的
            port: 80,
            path: '', //这个也是需要单独指定的
            method: 'GET'
            },
            options
        )


        /**
         * 如果在对象初始化的时候，没有给options注入参数，也可以在get函数中注入
         * @param {*} options 
         */
        // t.get = function( options,callback ) {
        t.get = function( options ) {
            var options = Object.assign(
                t.options,
                options
            );
            var p = new Promise(function(resolve, reject){
                var req = http.request( options, (res)=>{
                    if(res.statusCode=='200'){
                        //如果使用编码，数据就不能得到完整性确认了
                        // res.setEncoding('utf8');
                        var data = '';
                        var dataLength = 0;
                        // 由于新浪是live-active 的所以没有content-length
                        // var contentLength =  res.headers["content-length"];

                        res.on('data', (chunk) => {
                            data += chunk;
                            dataLength += chunk.length;
                        });
                        
                        res.on('end', () => {
                            // callback( data ); //调用回调函数，获取数据
                            // console.log(' 数据下载完成，数据完整'+dataLength)
                            console.log( '数据成功返回' )
                            // resolve('数据成功返回')
                            resolve( data )
                        })
                        res.on('readable', () => {
                            console.log("Not all Readable streams will emit the 'close' event.")
                        })
                        res.on('error', (e) => {
                            console.log(`problem with respons: ${e.message}`);
                        });
                        res.on('close', () => {
                            console.log( "数据连接断开");
                        });
                        
                    }else if( res.statusCode == '404'){
                        console.log( "404 Not Found");
                        resolve( '' )
                    }
                });
                req.on('error', (e) => {
                    console.log(`problem with request: ${e.message}`);
                });

                // 请求的附带数据，一般是通过post方式提交
                // req.write(postData);
                req.end();
            })
            return p

        }
        return t
    }



}
module.exports=obj;
// //测试用例
// var options = {
//   hostname: 'cnodejs.org',
//   path: '/topic/533ba719b267342678006e48',
// };
// var callback = function( data ){
//   console.log( data );
// }
// var o = obj.create();
// o.get( options,callback );


//下面这段代码，类的设计是有问题的，我已经解决了这个问题
//但是还不是很了解，解决这个问题的方法，以及其他的一些解决这种问题的方法
//现在的主要任务要明确，就是要赶进度的

// // class netOperate {
// export default class netOperate {
//   constructor(options) {
//     var options = Object.assign({
//         hostname: '', //这个需要指定的
//         port: 80,
//         path: '', //这个也是需要单独指定的
//         method: 'GET'
//       },
//       options
//     );

//   }

//   /**
//    * 如果在对象初始化的时候，没有给options注入参数，也可以在get函数中注入
//    * @param {*} options 
//    */
//   get( options ) {
//     var options = Object.assign(
//       this.options,
//       options
//     );
//     var options = this.options;
//     var req = http.request( options, (res)=>{
//       if(res.statusCode=='200'){
//         //如果使用编码，数据就不能得到完整性确认了
//         // res.setEncoding('utf8');
//         var data = '';
//         var dataLength = 0;
//         var contentLength =  res.headers["content-length"];

//         res.on('data', (chunk) => {
//           data += chunk;
//           dataLength += chunk.length;
//         });
        
//         res.on('end', () => {
//           if( contentLength == dataLength){
//             return data; //先直接返回数据，实现了之后，再看看有什么更好的解决方法，就是这样来迭代的
//             // callback( data ); //调用回调函数，获取数据
//             // console.log(' 数据下载完成，数据完整'+dataLength)
//           }
//         })
//         res.on('readable', () => {
//           console.log("Not all Readable streams will emit the 'close' event.")
//         })
//         res.on('error', (e) => {
//           console.log(`problem with respons: ${e.message}`);
//         });
        
//       }
//     });

//     req.on('error', (e) => {
//       console.log(`problem with request: ${e.message}`);
//     });

//     // 请求的附带数据，一般是通过post方式提交
//     // req.write(postData);
//     req.end();

//   }


// }

// // //类函数测试用例
// // //http://cnodejs.org/topic/533ba719b267342678006e48
// // var options = {
// //   hostname: 'cnodejs.org',
// //   path: '/topic/533ba719b267342678006e48',
// // };
// // var callback = function( data ){
// //   console.log( data.length );
// // }
// // var client = new netOperate(options)
// // client.get(callback);

