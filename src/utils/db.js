
/**
 * 数据库操作类
 * 单例模式
 */

var pg = require('pg');

//  var db = (function() {
export var db = (function() {
    var instance
    //提交执行sql
    function query( qstring ) {
        var conString = "postgres://silukou:silukou@localhost/silukou";
        var client = new pg.Client(conString);
        client.connect(); //就先连接上数据库,算为初始化
        var p = new Promise(function(resolve, reject){
            client.query( qstring ,(err, result)=>{
                if(err){
                    console.log( err )
                }
                if(result){
                    //如果是select则返回数据
                    if(result.command=='SELECT'){
                        resolve( result.rows )
                        reject( '查询失败'+ result )
                    }else if(result.command=='INSERT'){
                        resolve( '插入成功'+result.rowCount )
                        reject( '插入失败'+ result )
                    }else if(result.command=='UPDATE'){
                        resolve( '更新成功'+result.rowCount )
                        reject( '更新失败'+ result )
                    }
                }
                
                client.end();
            })
        })
        return p;
    }
    function select( qstring ){
        
    }
    //执行
    function init() {
        /*暴露方法列表*/
        return {
            query: query,
        };
    }
    return {
        getInstance: function(){
            if(!instance){
                instance = init()
            }
            return instance
        }
    }
})()

// var conString = "postgres://silukou:silukou@localhost/silukou";

// var client = new pg.Client(conString);
// client.connect(function(err) {
//     if(err) {
//         return console.error('could not connect to postgres', err);
//     }
// var qstr = "insert into stocklist( symbol, code, name, trade, pricechange, changepercent, buy, sell, settlement, open, high, low, volume, amount, ticktime, per,  per_d, nta,  pb,  mktcap,  nmc, turnoverratio, favor, guba ) \
// values('abaddfsef','300606','sdfsdf','46.600','0.570','1.238','46.590','46.600','46.030','45.800','46.860','45.510','7318832','338563846','15:55:03',77.667,0,'3.6300',12.837,415672,103918,32.81987,'','');"

//     client.query(qstr, function(err) {
//         if(err) {
//             return console.error('error running query', err);
//         }
//         //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
//         client.end();
//     });
// });


// var obj = db.getInstance();

// // // var qstr = "insert into stocklist( symbol, code, name, trade, pricechange, changepercent, buy, sell, settlement, open, high, low, volume, amount, ticktime, per,  per_d, nta,  pb,  mktcap,  nmc, turnoverratio, favor, guba ) \

// var select = "select name from t"
// var insert = "insert into t(name,text) values('fsdfs','sfefsd')"
// var update = "update t set text='text' where name='2' "

// for(var i=0; i<100000; i++){
//     insert += ",('fsdfs','sfefsd')"
// }
// function t(insert){
//     obj.query( insert ).then( (data)=>{
//         console.log( data )
//         return t(insert)
//     })
// }
// t(insert)
// obj.query( insert ).then( (data)=>{
//     console.log( data )
//     // var str = "update t set des = case name "
//     // var where = "where name in ("
//     // for(var i=0; i<data.length; i++){
//     //     str += "when '"+data[i].name+ "' then '更新的数据' "
//     //     where += "'"+data[i].name+"'"
//     //     if(i<data.length-1){
//     //         where += ","
//     //     }
//     // }
//     // str += "end "
//     // where += ")"
//     // var qstring = str+where
//     //     // console.log( qstring )
//     // obj.query( qstring ).then( (data)=>{
//     //     // console.log( qstring )
//     //     console.log( data )
//     // })
// })
// obj.query( insert )
// obj.query( insert )
// obj.query( insert )
// obj.query( insert )
// obj.query( insert )
// obj.query( insert )
// obj.query( insert )
// obj.query( insert )

// var update = "update t set text='22' where id='2', text='33' where id='3' "
// var update = "update t set ( where id='2', text='33' where id='3' "
//下面这个是可行的
// var update = "update t set text = case id when 1 then 12 when 2 then 1 when 3 then 56 end,\
//     name = case id when 1 then 6 when 2 then 45 when 3 then 3 end where id in (1, 2, 3)"

// var test = "update stocklist set trade = case symbol  when 'sh600000' then '16.200' when 'sh600004' then '16.160' when 'sh600006' then '7.090' when 'sh600007' then '20.210' when 'sh600008' then '4.300' when 'sh600009' then '28.460' when 'sh600010' then '3.070' when 'sh600011' then '7.560' when 'sh600012' then '14.640' when 'sh600015' then '11.280' when 'sh600016' then '8.810' when 'sh600017' then '4.060' when 'sh600018' then '5.570' when 'sh600019' then '6.720' when 'sh600020' then '4.720' when 'sh600021' then '12.370' when 'sh600022' then '2.740' when 'sh600023' then '5.680' when 'sh600026' then '7.020' when 'sh600027' then '5.050' when 'sh600028' then '5.560' when 'sh600029' then '7.850' when 'sh600030' then '16.310' when 'sh600031' then '7.480' when 'sh600033' then '3.610' end where symbol in ( 'sh600000','sh600004','sh600006','sh600007','sh600008','sh600009','sh600010','sh600011','sh600012','sh600015','sh600016','sh600017','sh600018','sh600019','sh600020','sh600021','sh600022','sh600023','sh600026','sh600027','sh600028','sh600029','sh600030','sh600031','sh600033','sh600035','sh600036','sh600037','sh600038','sh600039','sh600048','sh600050','sh600051','sh600052','sh600053','sh600054','sh600055','sh600056','sh600057','sh600058','sh600059','sh600060','sh600061','sh600062','sh600063','sh600064','sh600066','sh600067','sh600068','sh600070')
// var test = ""
// // var update = "update t set (name,text) from  ( values ( 2, 2), ( 2, 2) ) where id in (1, 2, 3)"
// obj.query( test ).then((res)=>{
//     console.log( res )
// })

// var insert = "insert into t (id) values('1')"
// obj.query( insert ).then( (data)=>{
//     console.log( data )
// })

// update t as t
// set a = t.name, b = t.text
// from 
// (
//   values
//   (1, 2, 2),
//   (2, 2, 2)
// ) as t(id, name, text)
// where id in (1, 2, 3)

// update t set des = case name
//     when '1' then 'fidesrst'
//     when '2' then 'secdesond'
//     when '3' then 'thrdseee'
//     end
//     where name in ('1','2','3')
// update t set
//     text = case id when 1 then 12 when 2 then 1 when 3 then 56 end,
//     name = case id when 1 then 6 when 2 then 45 when 3 then 3 end
// where id in (1, 2, 3)

// update t as t set
//     column_a = c.column_a,
//     column_c = c.column_c
// from (values
//     ('123', 1 ),
//     ('345', 2 )
// ) as (text, name) 
// where c.column_b = t.column_b;


// update test as t set
//     column_a = c.column_a,
//     column_c = c.column_c
// from (values
//     ('123', 1, '---'),
//     ('345', 2, '+++')  
// ) as c(column_b, column_a, column_c) 
// where c.column_b = t.column_b;