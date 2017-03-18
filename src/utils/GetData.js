'use strict';

/**
 * 通过此模块获取数据
 * 本模块通过访问本地和网络获取数据，返回到内存当中
 * 2017年03月06日
 * 在这里，需要组织URL，然后提交数据，异步返回Promise,这样就可以在maddleware中处理，将数据导入到内存中去
 */


var iconv = require('iconv-lite');

var netOperate = require('./netOperate.js');
var localOperate = require('./localOperate');
import { db } from './db'

var dbo = db.getInstance();
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
            // var param = "[%22hq%22,%22hs_a%22,%22{sort}%22,{asc},{page},{num}]"
            var param = options.param
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
            //应该在外围先，查找数据，如果找到有数据的


            no.get( g.options ).then((data)=>{
                //测试输出数据
                g.totalData += data
                // console.log(g.totalData +'\n\n\n\n\n\n' )
                // console.dir( data.count )
                // console.log( "data返回正常" ); //显示数据，测试完了之后，就可以用来做存储数据了
                // data = data.replace(/\"/g,"\'") //替换全部双引号

                data = JSON.parse(data)

                // console.dir( data )




                // var inserts = "insert into stocklist(symbol,code,name,trade,pricechange,changepercent,buy,sell,settlement,open,high,low,volume,\
                // amount,ticktime,per,per_d,nta,pb,mktcap,nmc,turnoverratio,favor,guba) values "

                // for(var i=0; i<data[0].items.length; i++){
                //     var item = data[0].items[i]
                //     var subtext = "('"+item[0]+"','"+item[1]+"','"+item[2]+"','"+item[3]+"','"+item[4]+"','"+item[5]+"','"+item[6]+
                //     "','"+item[7]+"','"+item[8]+"','"+item[9]+"','"+item[10]+"','"+item[11]+"','"+item[12]+"','"+item[13]+"','"+item[14]+"','"+
                //     item[15]+"','"+item[16]+"','"+item[17]+"','"+item[18]+"','"+item[19]+"','"+item[20]+"','"+item[21]+"','"+item[22]+"','"+
                //     item[23]+"')"
                //     // var subtext = "("+item[0]+","+item[1]+","+item[2]+","+item[3]+","+item[4]+","+item[5]+","+item[6]+
                //     // ","+item[7]+","+item[8]+","+item[9]+","+item[10]+","+item[11]+","+item[12]+","+item[13]+","+item[14]+","+
                //     // item[15]+","+item[16]+","+item[17]+","+item[18]+","+item[19]+","+item[20]+","+item[21]+","+item[22]+","+
                //     // item[23]+")"
                //     inserts += subtext
                //     if(i<data[0].items.length-1){
                //         inserts += ","
                //     }
                // }
// console.log( inserts )
// inserts = iconv.encode(inserts, 'utf-8');

            //  dbo.query( inserts )
            //检索数据库数据，然后在回调函数中，判断，根据是否有数据，来决定是update还是insert
             var select = "select symbol from stocklist"
             dbo.query( select ).then( (seldata)=>{
                // console.log( seldata )
                // console.log( data )
                for(var i=0; i<seldata.length; i++){
                    seldata[i] = seldata[i].symbol
                }

                var insertsql = "insert into stocklist(symbol,code,name,trade,pricechange,changepercent,buy,sell,settlement,open,high,low,volume,\
                amount,ticktime,per,per_d,nta,pb,mktcap,nmc,turnoverratio,favor,guba) values "
                var subinsertsql = ""  //到时候用来判断是否有新插入的语句
                //更新sql的样本案例
                // var updatesql = "update t set \
                // text = case id when 1 then 12 when 2 then 1 when 3 then 56 end,\
                // name = case id when 1 then 6 when 2 then 45 when 3 then 3 end \
                // where id in (1, 2, 3)"
                var updatesql = "update stocklist set "
                // var subupdatesql = "" //用来判断是否有需要更新的语句
                var updatesql3 = " trade = case symbol "
                var updatesql4 = " end,pricechange = case symbol "
                var updatesql5 = " end,changepercent = case symbol "
                var updatesql6 = " end,buy = case symbol "
                var updatesql7 = " end,sell = case symbol "
                var updatesql8 = " end,settlement = case symbol "
                var updatesql9 = " end,open = case symbol "
                var updatesql10 = " end,high = case symbol "
                var updatesql11 = " end,low = case symbol "
                var updatesql12 = " end,volume = case symbol "
                var updatesql13 = " end,amount = case symbol "
                var updatesql14 = " end,ticktime = case symbol "
                var updatesql15 = " end,per = case symbol "
                var updatesql16 = " end,per_d = case symbol "
                var updatesql17 = " end,nta = case symbol "
                var updatesql18 = " end,pb = case symbol "
                var updatesql19 = " end,mktcap = case symbol "
                var updatesql20 = " end,nmc = case symbol "
                var updatesql21 = " end,turnoverratio = case symbol "
                var updatesql22 = " end,favor = case symbol "
                var updatesql23 = " end,guba = case symbol "
                var updatesqlwhere = " end where symbol in ( "
                var subupdatesqlwhere = ""
                
                //查找网上载下来的数据，是否在本地数据库中有
                for(var i=0; i<data[0].items.length; i++){
                    var item = data[0].items[i]  //0号位置是 symbol 字段
                    // console.log( 'item' )
                    // console.log( item )
                    //本地数据库中有该数据，则需要更新
                    if(seldata.indexOf(item[0])>=0 ){
                        //写更新的语句
                        updatesql3 += " when '"+item[0]+"' then "+item[3]
                        updatesql4 += " when '"+item[0]+"' then "+item[4]
                        updatesql5 += " when '"+item[0]+"' then "+item[5]
                        updatesql6 += " when '"+item[0]+"' then "+item[6]
                        updatesql7 += " when '"+item[0]+"' then "+item[7]
                        updatesql8 += " when '"+item[0]+"' then "+item[8]
                        updatesql9 += " when '"+item[0]+"' then "+item[9]
                        updatesql10 += " when '"+item[0]+"' then "+item[10]
                        updatesql11 += " when '"+item[0]+"' then "+item[11]
                        updatesql12 += " when '"+item[0]+"' then "+item[12]
                        updatesql13 += " when '"+item[0]+"' then "+item[13]
                        updatesql14 += " when '"+item[0]+"' then '"+item[14]+"'"
                        updatesql15 += " when '"+item[0]+"' then "+item[15]
                        updatesql16 += " when '"+item[0]+"' then "+item[16]
                        updatesql17 += " when '"+item[0]+"' then "+item[17]
                        updatesql18 += " when '"+item[0]+"' then "+item[18]
                        updatesql19 += " when '"+item[0]+"' then "+item[19]
                        updatesql20 += " when '"+item[0]+"' then "+item[20]
                        updatesql21 += " when '"+item[0]+"' then '"+item[21]+"'"
                        updatesql22 += " when '"+item[0]+"' then '"+item[22]+"'"
                        updatesql23 += " when '"+item[0]+"' then '"+item[23]+"'"
                        if(subupdatesqlwhere){
                            subupdatesqlwhere += ","
                        }
                        subupdatesqlwhere += "'"+item[0]+"'"
                    }else{
                        //subinsert 不为空的话，那肯定是第二次来了哇
                        if(subinsertsql){ 
                            insertsql += ","
                        }
                        //写插入的语句
                        subinsertsql = "('"+item[0]+"','"+item[1]+"','"+item[2]+"','"+item[3]+"','"+item[4]+"','"+item[5]+"','"+item[6]+
                    "','"+item[7]+"','"+item[8]+"','"+item[9]+"','"+item[10]+"','"+item[11]+"','"+item[12]+"','"+item[13]+"','"+item[14]+"','"+
                    item[15]+"','"+item[16]+"','"+item[17]+"','"+item[18]+"','"+item[19]+"','"+item[20]+"','"+item[21]+"','"+item[22]+"','"+
                    item[23]+"')"
                        insertsql += subinsertsql
                    }
                }
                //合成更新的sql语句
                updatesqlwhere += subupdatesqlwhere + ")";
                updatesql += updatesql3+updatesql4+updatesql5+updatesql6+updatesql7+updatesql8+updatesql9+updatesql10+updatesql11+updatesql12+updatesql13+
                updatesql14+updatesql15+updatesql16+updatesql17+updatesql18+updatesql19+updatesql20+updatesqlwhere;
                
                // console.log(insertsql )
                //执行插入sql
                if(subinsertsql){
                    dbo.query( insertsql ).then((res)=>{
                        console.log( "数据插入成功" + res )
                    })
                }
                //执行更新sql
                if(subupdatesqlwhere){
                    dbo.query( updatesql ).then((res)=>{
                        console.log( "数据更新成功" + res )
                    })
                }
                // console.log(updatesql )

//在这里要编写两组sql语句，一个是insert，一个是update
//insert是为了防止有新的股票上市
//update除了三个字段不需要更新，其他字段都需要更新的
                

// var update = "update t set text = case id when 1 then 12 when 2 then 1 when 3 then 56 end,\
//     name = case id when 1 then 6 when 2 then 45 when 3 then 3 end where id in (1, 2, 3)"

                // var up = function(field){
                //     var str = "update stocklist set "+field+" = case symbol "
                //     var where = "where name in ("
                //     for(var i=0; i<seldata.length; i++){
                //         str += "when '"+seldata[i].symbol+ "' then '更新的数据' "
                //         where += "'"+seldata[i].symbol+"'"
                //         if(i<seldata.length-1){
                //             where += ","
                //         }
                //     }
                //     str += "end "
                //     where += ")"
                //     var qstring = str+where
                //     return qstring
                // }

                    // console.log( qstring )
                // obj.query( qstring ).then( (data)=>{
                //     console.log( data )
                // })


                var pages = data[0].count / op.number
                pages += data[0].count % op.number > 0 ? 1 : 0; //如果还有余数的话，就加一
                op.page = op.page+1

                while(op.page < pages){
                    return g.download(op, next) //继续申请数据
                }
                
                //这里应该写next的代码，因为，这个时候，totalData已经获取到了所有的股票代码及相关数据了
                next({
                    type: 'DOWN_STOCK_LIST',
                    data:g.totalData
                })

            })
            }).catch(function(reason){
                console.log('rejected');
                console.log(reason);
                return
            });
          
        }         

        /**
         * 获取最新的股票列表
         * addr 为数据源 默认为sina
         */
         g.getNewStockList = function(  next ){
             var astock = {
                 code: "ASTOCK",
                 param:"[%22hq%22,%22hs_a%22,%22{sort}%22,{asc},{page},{num}]",
             }
             var cyb = {
                 code: "CYB",
                 param:"[%22hq%22,%22cyb%22,%22{sort}%22,{asc},{page},{num}]",
             }
             var zxqy = {
                 code: "ZXQY",
                 param:"[%22hq%22,%22zxqy%22,%22{sort}%22,{asc},{page},{num}]",
             }
             var zhishu = {
                 code: "ZHISHU",
                 param:"[%22hq%22,%22dpzs%22,%22{sort}%22,{asc},{page},{num}]",
             }
             var gstock = {
                 code: "GSTOCK",
                 param:"[%22hk%22,%22qbgg_hk%22,%22{sort}%22,{asc},{page},{num}]",
             }
             var mstock = {
                 code: "MSTOCK",
                 param:"[%22us_c%22,0,%22%22,%22{sort}%22,{asc},{page},{num}]",
             }
             
            var op = { page:0, number: 500, addr:'sina' }
            op = Object.assign( op,  astock )
            g.download(op, next)
            //重新修改op 会有问题的，应为object 里的元素会被替换的，造成不是你想要的结果
            // op = Object.assign( op,  cyb )
            // g.download(op, next)
            // op = Object.assign( op,  zxqy )
            // g.download(op, next)
            // op = Object.assign( op,  zhishu )
            // g.download(op, next)
            // op = Object.assign( op,  gstock )
            // g.download(op, next)
            // op = Object.assign( op,  mstock )
            // g.download(op, next)

         }

         //按时间来循环
         g.getSymbolHistoryMinsTimeLoop = function( minsoption,options,symbols ){
            //这里负责，遍历掉每一个时间节点
            //组织URL
            console.log( minsoption )
            console.log( options )
            console.log( options.symbol )
            g.makeSinaHistoryUrl( options )
            options.starttime[0] -= 0;
            options.starttime[1] -= 0;
            options.starttime[2] -= 0;           
            options.starttime[1] += 1;
            if(options.starttime[1]>12){
                options.starttime[0] += 1
                options.starttime[1] = 1
            }
            //时间节点是否走完，走完则返回到下一个symbol
            if( (options.starttime[0]>minsoption.endtime[0]) ||  (options.starttime[0]==minsoption.endtime[0] && options.starttime[1]>minsoption.endtime[1]) ){
                //时间走到底了，返回
                return g.getSymbolHistoryMins( symbols, minsoption )
            }
            var time = options.starttime[0]+'-'+options.starttime[1]+'-'+options.starttime[2]
            console.log( g.options )
            
            //进行网络请求
            no.get( g.options ).then((data)=>{
                //在这里就要进行数据库插入处理了
                

                console.log( "返回数据了" )
                console.log( data )
                // var insertsql = "insert into stockmins(symbol,time,data ) values('"+minsoption.symbol+"','"+time+"','"+ data +"')";
                // console.log( insertsql )
                //现在直接写插入数据
                // dbo.query( insertsql ).then((res)=>{
                //     console.log( "数据插入成功" + res )
                // })
                
                return g.getSymbolHistoryMinsTimeLoop( minsoption,options,symbols )
            })

         }


         //得到一个symol，然后获取该symbol的历史一分钟线
         //minsoption 包含了开始时间以及结束时间
         //symbos 股票列表
         g.getSymbolHistoryMins = function( symbols, minsoption ){
            if(symbols.length==0){
                //已经没有元素了,直接返回
                return
            }
            //有元素，那就继续pop
            var symbol = symbols.pop();//这里负责pop掉每一个元素
            var options = {
                starttime: [ minsoption.starttime[0],minsoption.starttime[1],minsoption.starttime[2] ] ,
                symbol: symbol,
                type: minsoption.type
            }
            // console.log('getSymbolHistoryMins')
            // console.log( minsoption )
            // console.log( symbols )
 
            //调用该函数,用于处理一直股票，中有很多时间段具体文件，需要多次网络请求
            g.getSymbolHistoryMinsTimeLoop( minsoption,options,symbols )
         }


         //得到一个symbol,然后获取该symbol的历史日线
         g.getSymbolHistoryDaily = function( symbols ){
            if(symbols.length==0){
                //已经没有元素了,直接返回
                return
            }
            //有元素，那就继续pop
            var symbol = symbols.pop();
            var historyop = {}
            historyop.symbol = symbol
            historyop.type = 'DAILY'

            //组织URL
            g.makeSinaHistoryUrl(historyop )
            //进行网络请求
            no.get( g.options ).then((data)=>{
                //在这里就要进行数据库插入处理了
                var insertsql = "insert into stockdaily(symbol,daily ) values('"+symbol+"','"+ data +"')";
                //现在直接写插入数据
                dbo.query( insertsql ).then((res)=>{
                    console.log( "数据插入成功" + res )
                })
                return g.getSymbolHistoryDaily(symbols) //尾优化，直接递归，知道全部插入数据
            })
         }

         //下载一分钟线
         g.getSinaStockMinsHistory = function( data, next){
            //验证时间范围是否符合要求，分时线时间大于2008年，小于今天
            //开始时间小于等于结束时间
            // var starttime = data.starttime.split('-')
            // var endtime = data.endtime.split('-')
            var starttime = [2008,'01','01']
            var endtime = [2016,'11','01']
 console.log( endtime )
            // var thisyear = new Date().getFullYear()
            // var thismonth = new Date().getMonth()+1
            //设置时间条件为合理区间内
            // if( starttime[0]<2008 ){ starttime[0] = 2008 } //开始年份小于2008，则默认设置为2008
            // if( endtime[0]>thisyear ){ endtime[0]=thisyear  } //结束年份比今年还晚，则设置为今年
            // //在今年，开始月份比本月还晚，则设置开始月份和结束月份都为本月
            // if( starttime[0]==thisyear && starttime[1]>thismonth ){  starttime[1] = thismonth; endtime[1] = thismonth;  } 
            // //在今年，结束时间晚于本月，则设置结束时间为本月
            // if( starttime[0]==thisyear && endtime[1]>thismonth ){ endtime[1] = thismonth;  } 
            // if(starttime[0]>endtime[0]){ starttime[0] = endtime[0]  } //开始年份比结束年份还晚，则设置为结束年份
            // if( starttime[0]==endtime[0] && starttime[1]>endtime[1] ){  starttime[1] = endtime[1] } //开始月份比结束月份晚，设置为结束月份
           
            var minsoption = {
                starttime: starttime,
                endtime: endtime,
                type: 'MINS'
            }
            console.log( minsoption )
            //首先要检索，数据库中股票列表stocklist表中的
            //检索数据表stocklist中的股票列表，饭后根据这个股票列表，来请求每一只股票的数据，并插入的数据库中
            var select = "select symbol from stocklist"
            dbo.query( select ).then( (seldata)=>{
                //获取纯正的股票列表数组
                for(var i=0; i<seldata.length; i++){
                    seldata[i] = seldata[i].symbol
                }
                //请求数据，并插入数据库
                g.getSymbolHistoryMins( seldata, minsoption ) 
            })


         }

        /**
         * 下载日线
         * next 为middleware 传入的dispatch，用来发送消息用的
         * data 是用来传送软件store的中state.data项目下设定好的状态
         */
        g.getSinaStockDailyHistory = function(data, next){
            //首先要检索，数据库中股票列表stocklist表中的
            //检索数据表stocklist中的股票列表，饭后根据这个股票列表，来请求每一只股票的数据，并插入的数据库中
            var select = "select symbol from stocklist"
            dbo.query( select ).then( (seldata)=>{
                //获取纯正的股票列表数组
                for(var i=0; i<seldata.length; i++){
                    seldata[i] = seldata[i].symbol
                }
                //请求数据，并插入数据库
                g.getSymbolHistoryDaily(seldata)
            })
        }

        /**
         * 构建申请历史数据的新浪请求URL
         * 
         */
        g.makeSinaHistoryUrl = function(options){
            //分钟线URL组织的格式
            // var url = 'http://finance.sina.com.cn/realstock/company/' + stock_code + '/hisdata/' + year + '/' + str_month + '.js';
            //日线组织的格式
            // http://finance.sina.com.cn/realstock/company/sh000002/hisdata/klc_kl.js
            //当天的实时数据
            //当天到那一时刻的分钟数据，有没有的？应该有的

            var symbol = options.symbol
            var year = options.starttime[0]
            var month = options.starttime[1]
            
            var path = ''
            if(options.type=='DAILY'){
                var path = '/realstock/company/' + symbol + '/hisdata/klc_kl.js';
            }else if(options.type=='MINS'){
                //这个是历史的分钟线数据
                month -= 0
                if( month < 10 ){
                    month = '0' + month;
                }
                var path = '/realstock/company/'+symbol+'/hisdata/'+year+'/'+month+'.js';
            }else{
                throw new Error("没有选中下载数据类型，分钟线还是日线");
            }
            
            
            //通过直接给this.options赋值，来作为当前的提交URL
            g.options = Object.assign(
                g.options,
                {
                    hostname: 'finance.sina.com.cn',
                    // path: '/d/api/openapi_proxy.php/?__s=[[%22hq%22,%22hs_a%22,%220%22,0,page,num]]'
                    path: path
                }
            )
        }
        

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

//http://finance.sina.com.cn/h5charts/tchart.html?symbol=sh000001&date=2016-06-27&rangeselector=true&indicator=tvol


// http://finance.sina.com.cn/realstock/company/sh600628/hisdata/2008/01.js

// http://finance.sina.com.cn/realstock/company/sh600628/hisdata/2007/02.js