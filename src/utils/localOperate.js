
/**
 * 本地文件操作类 localOperate
 * 2017年03月03日
 */

const fs = require('fs');
const util = require('util');


// export default class localOperate {
class localOperate {
    constructor(option) {


    }

    /**
     * 出现文件操作错误，返回错误的具体类型
     */
    errorReport( err ){
        if(err.code=='EACCES'){
            console.log("文件目录拒绝访问")
        }else if(err.code=='EEXIST'){
            console.log("文件已近存在")
        }else if(err.code=='EISDIR'){
            console.log("是一个目录")
        }else if(err.code=='EMFILE'){
            console.log("系统打开了太多文件")
        }else if(err.code=='ENOENT'){
            console.log("无此文件或目录")
        }else if(err.code=='ENOTDIR'){
            console.log("不是一个目录")
        }else if(err.code=='ENOTEMPTY'){
            console.log("目录非空")
        }else if(err.code=='ETIMEDOUT'){
            console.log("操作超时")
        }else if(err.code=='ECONNREFUSED'){
            console.log("连接被拒绝")
        }else if(err.code=='ECONNRESET'){
            console.log("连接被重置")
        }
    }

    /**
     * 创建文件夹
     * 发现创建文件夹，还是不能用异步的函数，因为超过两级就会出现问题，调用
     * 没有尾递归优化
     */
    createDir(path){
        var isUp = false
        try {
            fs.mkdirSync( path )
        } catch (err) {
            this.errorReport( err )
            if(err.code=='ENOENT'){
                isUp = true
                //无此文件或目录
                //返回上一层目录，继续重做
                //先用递归实现，到时候再想想用尾调用优化
                var pathUp = this.split(path)
                pathUp.pop()
                pathUp = pathUp.join('/')
                
                this.createDir(pathUp )
                
            }
        }
        //本级创建失败，然后先创建上一级，在返回本级创建
        if(isUp){
            this.createDir(path )
        }


        /* 
        //问题代码，这样异步的递归调用是会出问题的，因为同步访问下一级的时候，异步本级可能还没有创建好
        fs.mkdir(path, (err)=>{
            var isUp = false
            if(err){
                // console.log('创建文件夹错误：'+err.message);
                //如果出现错误，应该没有该目录，或是目录禁止访问
                //EACCES: permission denied, mkdir 't/t1'  出现访问的权限问题
                //出现权限问题，一般是不会出现权限问题的，但是也最好写一下，以防止出现故意行为，程序不会报错，最后无法运行
                this.errorReport( err )
                
                if(err.code=='ENOENT'){
                    isUp = true
                    //无此文件或目录
                    //返回上一层目录，继续重做
                    //先用递归实现，到时候再想想用尾调用优化
                    var pathUp = this.split(path)
                    pathUp.pop()
                    pathUp = pathUp.join('/')
                    
                    this.createDir(pathUp, callback)
                    
                }
                //ENOENT: no such file or directory, mkdir 't2/fw/sf/sdf' 属于上一级目录没有创建问题 
                //上一级目录没有的话，就较少一层，再进行创建活动

            }
            //本级创建失败，然后先创建上一级，在返回本级创建
            if(isUp){
                this.createDir(path, callback)
            }

        })
        */

    }

    /**
     * 存储数据
     * callback 还没有写入函数
     */
    writeData( path, data, mode='w', callback){
        
        //然后分析path,path可能传入的一长串字符串，其中以\ /这类的分隔符分开的,我们需要把这个字符串变成数组
        //对这串字符串进行分析，是不是符合文件路径的格式
        if(this.isPath(path)){

            //官方推荐的写法是，先直接访问，目录文件，不能写入则返回再进行测试
            fs.open( path, mode, (err, fd)=>{
                //是否需要调用，创建上一级目录
                 var isUp = false   

                if(err){
                    //访问目录错误的时候调用
                    this.errorReport( err )
                    
                    if(err.code=='ENOENT'){
                        isUp = true
                        var pathUp = this.split(path)
                        pathUp.pop()
                        pathUp = pathUp.join('/')
                        //创建目录
                        this.createDir(pathUp)
                    }

                }else{
                    //写入数据
                    fs.write(fd,data,"utf-8",(err, written, string)=>{
                        if(err){
                            console.log('write error')
                        }else{
                            console.log('写入成功，'+written)
                            console.log('写入成功，'+string)
                        }
                    })
                }
                if(isUp){
                    this.writeData( path, data, callback)
                }

            })


        }else{
            //通知系统路径出错
            console.log('传入系统路径参数格式有错')
        }

    }

    /**
     * 访问目录，查看所要访问的对象目录状态
     * 官方推荐的写法是，先直接访问，目录文件，不能写入则返回再进行测试
     */
    access(path){
        
    }

    /**
     * 工具函数,字符串路径按 分隔符 不管是 正斜杠 /  还是反斜杠 \
     * 分割后，按原先字符顺序返回数组
     * 2017年03月03日
     */
    split(str){
        //由于我不知道怎么使用正则匹配 两种情况的斜杠 所以只能用嵌套函数来实现相同的效果
        // 使用正则的分支结构不能实现效果   \\|\/   这种写法不能实现我想要的效果 
        // 2017年03月03日 经过了我觉得要有4个小时的练习研究，我发现了，为什么这个正则不能如你所愿的实现
        // 是因为反斜杠需要 \\\\ 4个这样的反斜杠   ，还有就是，需要RegExp 对象实现之后调入
        var re = new RegExp("[\\\\\/]",'im');
        return str.split( re );

        //一天前，我自己实现的写法，效率应该没有直接正则高，起码下面这个用了两次正则，还有两个循环
        //不过代码我还是要保留下来的，毕竟是我自己写的哇
        /**
         * 
        var arr = [];
        var arr1 = str.split('\\');
        for(var i=0; i<arr1.length; i++){
            var arr2 = arr1[i].split('\/');
            for( var j=0; j<arr2.length; j++){
                arr.push( arr2[j]);
            }
        }
        return arr;
            * 
            */
    }

    /**
     * 检查输入的path路径是否符是合法的路径
     * 没有非法字符之类的
     * 返回 boolean
     */
    isPath( path ){
        //  下面这个是验证文件路径的正则表达式，只要不是:\\ /这三种字符，其他的字符都是可以通过验证的。
        //  ^([a-zA-Z]:)?(?=[\/\\\\])(\.?){2}[\/\\\\]?([^\/:\\\\]+[\/\\\\]?)*$
        //  用了几乎3个小时来写这么小一串代码，注意零宽断言，放下之前？的后面

        // var re = new RegExp("^([a-zA-Z]:)?(?=[\/\\\\])(\.?){2}[\/\\\\]?([^\/:\\\\]+[\/\\\\]?)*$",'im');
        // 这个正则还是有问题的，我把它拆分成两部分，这两个正则互补的，只要一个成立，就成立

        //分开两个，也是能够很好的解决问题的
        // var re1 = new RegExp("^([a-zA-Z]:)?(?=[\/\\\\])[\/\\\\]?([^\/:\\\\]+[\/\\\\]?)*$",'im');
        // var re2= new RegExp("^([^\/:\\\\]+[\/\\\\]?)*$",'im');
        // return re1.test( path ) || re2.test( path );

        //正解，刚刚上床又想了一下，出来的结果，应该是正解了
        var re = new RegExp("^([a-zA-Z]:(?=[\/\\\\]))?[\/\\\\]?([^\/:\\\\]+[\/\\\\]?)*$",'im');

        
        return re.test( path );

    }
}


/**
 * 思路
 * 代码需要独立，所以想想要传入什么参数
 * 存储的相对路径，软件生成文件的存储根目录都在 data文件夹下
 * 传入option对象中应该包含:
 * 要存储的内容数据
 * 数据源
 * 文件类型
 * 数据的URL   存储的路径可以按这个URL来做对应处理
 * 
 * 要有创建目录的函数
 * 穿件文件的函数
 * 
 * 
 * 
 */

// var path = './s/temp.js';
// fs.open( path, 'w', (err, fd)=>{

//     fs.stat(path, (err, stats)=>{
        
//         if(err){
//             console.log( err.message);
//         }else{
//             console.log( util.inspect( stats ) )
//         }


//         // if(err){
//         //     //访问目录错误的时候调用
//         //     console.log('error');
//         // }else{
//         //     //写入数据
//         //     fs.write(fd,"fsjfsldjfowej","utf-8",(err, written, string)=>{
//         //         if(err){
//         //             console.log('write error')
//         //         }else{
//         //             console.log('写入成功，'+written)
//         //             console.log('写入成功，'+string)
//         //         }
//         //     })
//         // }

//     })
    
// })


//测试访问路径 其实不需要的，程序写文件出错之后，错误处理好即可
// fs.access('./etc/passwd', fs.constants.R_OK | fs.constants.W_OK, (err) => {
//   console.log(err ? 'no access!' : 'can read/write');
// });




var fo = new localOperate();
module.exports=fo;
// fo.writeData('./t/temp.js',"一洗瞬间发生的纠纷类似");

