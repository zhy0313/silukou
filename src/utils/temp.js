

var http = require('http');

var obj = {

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
        t.get = function( options,callback ) {
            var options = Object.assign(
                t.options,
                options
            );
            var req = http.request( options, (res)=>{
                if(res.statusCode=='200'){
                //如果使用编码，数据就不能得到完整性确认了
                // res.setEncoding('utf8');
                var data = '';
                var dataLength = 0;
                var contentLength =  res.headers["content-length"];

                res.on('data', (chunk) => {
                    data += chunk;
                    dataLength += chunk.length;
                });
                
                res.on('end', () => {
                    if( contentLength == dataLength){
                    // return data; //先直接返回数据，实现了之后，再看看有什么更好的解决方法，就是这样来迭代的
                    callback( data ); //调用回调函数，获取数据
                    // console.log(' 数据下载完成，数据完整'+dataLength)
                    }
                })
                res.on('readable', () => {
                    console.log("Not all Readable streams will emit the 'close' event.")
                })
                res.on('error', (e) => {
                    console.log(`problem with respons: ${e.message}`);
                });
                
                }
            });

            req.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
            });

            // 请求的附带数据，一般是通过post方式提交
            // req.write(postData);
            req.end();
            
        }

        return t
    }



}

var options = {
  hostname: 'cnodejs.org',
  path: '/topic/533ba719b267342678006e48',
};
var callback = function( data ){
  console.log( data );
}
var o = obj.create();
o.get( options,callback );
