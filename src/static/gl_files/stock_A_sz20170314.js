/*让ie6缓存背景图*/
// if (/ie 6/i.test(navigator.userAgent)) {
//     document.execCommand("BackgroundImageCache", false, true);
// }
"use strict";

var Conn = {};
var digit = 2;

! function($) {
    var UPCOLOR = 'up',
        DOWNCOLOR = 'down',
        FLATCOLOR = 'flat';
    window.UPCOLOR = UPCOLOR;
    window.DOWNCOLOR = DOWNCOLOR;
    window.FLATCOLOR = FLATCOLOR;
    var hqURL = 'http://hq.sinajs.cn/rn=$rn&list=';
    var hqURL_txt = hqURL.replace('$rn', '$rn&format=text');
    var pageURL = 'http://finance.sina.com.cn/realstock/company/$symbol/nc.shtml';
    var pageURL2 = 'http://finance.sina.com.cn/fund/quotes/$symbol/bc.shtml';

    var h5Test = document.createElement('canvas');
    window.h5Status = 0;
    var flStatus = 0;

    //判断支持FL、H5
    if ((h5Test.getContext && h5Test.getContext('2d'))) {
        h5Status = 1;
    } else {
        h5Status = 0;
    }
    
flStatus = 0
    clock.init();
    $(function() {
        //        clock.init([{ elID: 'time',area: 'CN',template: 'H:M:S'}]);
        holdStatus.init();
        adnotice.init();
        notice.init();
        hydb.init();
        //        breakingNewsCtrl.init();
        stockNews.init();
        stockTip.init();
        // new DataTable('#tt6_01', 'position_as_type_c1', 'http://vip.stock.finance.sina.com.cn/quotes_service/view/CN_BillList.php?sort=ticktime&symbol=' + papercode + '&num=11', 'bill_detail_list', {
        //         time: 0,
        //         now: 2,
        //         volume: 1,
        //         BS: 3
        //     }, {
        //         now: {
        //             digit: digit
        //         }
        //     },
        //     function(data) {
        //         var _d = hqParser.a(window['hq_str_' + papercode]);
        //         /*成交量向下取整*/
        //         data.volume = Math.floor(data.volume / 100) * 100;
        //         data.BS = data.BS.toLowerCase();
        //         data['买卖'] = {
        //             'up': '买入',
        //             'down': '卖出'
        //         }[data.BS] || '中性盘';
        //         data.change = data.now - _d.preClose;
        //     });

        // new DataTable('#tt6_02', 'position_as_type_c2', 'http://vip.stock.finance.sina.com.cn/quotes_service/view/cn_price_list.php?&symbol=' + papercode + '&num=11', 'price_statist_list', {
        //         now: 0,
        //         volume: 1,
        //         ZB: 2
        //     }, {
        //         now: {
        //             digit: digit
        //         },
        //         volume: {
        //             digit: 0,
        //             '万/亿': true
        //         }
        //     },
        //     function(data) {
        //         var _d = hqParser.a(window['hq_str_' + papercode]);
        //         data.change = data.now - _d.preClose;
        //     });

        // new DataTable('#tt6_03', 'position_as_type_c3', 'http://vip.stock.finance.sina.com.cn/quotes_service/view/vML_DataList.php?asc=j&symbol=' + papercode + '&num=11', 'minute_data_list', {
        //         time: 0,
        //         now: 1,
        //         volume: 2
        //     }, {
        //         now: {
        //             digit: digit
        //         },
        //         volume: {
        //             digit: 0,
        //             '万/亿': true
        //         }
        //     },
        //     function(data) {
        //         var _d = hqParser.a(window['hq_str_' + papercode]);
        //         data.change = data.now - _d.preClose;
        //     });

        // new TabCont('ltgd');
        // //        new TabCont('finance_overview');
        // hoverShow.init();
        // new TabCont('trade_buy', 'mouseover').show(0);
        // new TabCont('trade_info', 'mouseover').show(0);
        // technology.init();
        // louver.init();
        // if (stockType != 'B') {
        //     moneyFlow.init();
        // }

        // initWeiboJS();
        //        stockAsk.init();

        // mgzb.init();
        // cwbl.init();

       
    });

    /*主行情*/
    var hq = window.hq = new function() {
        var _drawer;
        var _pause = false;
        var _cookieCfg = {
                    path: '/',
                    domain: 'finance.sina.com.cn',
                    expires: '7'
                };
        var _cookieKey = 'FINA_V5_HQ';

        this.webSocketInterval = 3;
        //  if(!this.webSocketObj)
        // {
        //     this.webSocketObj =null
        // }
        if(!this.hqoldInterval)
        {
            this.hqoldInterval =null
        }
        //主要初始化入口
        this.init = function() {
            console.log('主要初始化入口')
            //that = Object {webSocketInterval: 3, webSocketObj: null, hqoldInterval: null, init: function}
            var that = this; 
            //  if(this.webSocketObj)
            //  this.webSocketObj.close();
            if (/^sh900/.test(papercode)) {
                digit = 3;
            }
            //_f_cfg_now = Object {key: "now", digit: 2}
            var _f_cfg_now = {
                key: 'now',
                digit: digit
            };
            var _f_cfg_up_limit = {
                key: 'up_limit',
                digit: digit
            };
            var _f_cfg_down_limit = {
                key: 'down_limit',
                digit: digit
            };
            var _f_cfg_open = {
                key: 'open',
                digit: digit
            };
            var _f_cfg_preClose = {
                key: 'preClose',
                digit: digit
            };
            var _f_cfg_high = {
                key: 'high',
                digit: digit
            };
            var _f_cfg_low = {
                key: 'low',
                digit: digit
            };
            var _f_cfg_change = {
                key: 'low',
                digit: digit
            };
            var _f_cfg_volume = {
                key: 'volume',
                digit: 0,
                '万/亿': true,
                shift: -2,
                p: '$1手'
            };
            var _f_cfg_amount = {
                key: 'amount',
                digit: 0,
                '万/亿': true,
                p: '$1元'
            };
            _drawer = new DataDrawer('hq', {
                now: _f_cfg_now,
                change: _f_cfg_change,
                up_limit: _f_cfg_up_limit,
                down_limit: _f_cfg_down_limit,
                open: _f_cfg_open,
                preClose: _f_cfg_preClose,
                high: _f_cfg_high,
                low: _f_cfg_low,
                volume: _f_cfg_volume,
                amount: _f_cfg_amount
            });
            //载入脚本，如果载入脚本，就要改代码，改成本地的
            // alert( hqURL)
            loadScript(hqURL.replace('$rn', random()) + papercode, function(){_gotData(false,true);}, true);
            //Cookie.set(_cookieKey,0, _cookieCfg);
            //0514 zyc
            // if (window['hq_str_' + papercode]&&window['hq_str_' + papercode+'_i']) {
            //     _gotData(true);
            // }
            //_getData();
            /*主行情报价不做限制，一直刷*/
            //setInterval(_getData, 5 * 1000); 
            //5秒钟做一次提交，执行这个函数
            setInterval(_abhbk_getData, 5 * 1000);
            //websocket
            // if (this.webSocketObj) {
            //     //没有载入websocket 下一步要删掉websocket
            //     this.webSocketObj.close();
            //     this.webSocketObj = null
            // }
            // _getData.call(this);
            
            
            if (location.search.indexOf('showimg') > -1) {
                //这里有设计到jQuery的操作
                //图片行情，这不是我所需要的
                hqImg.init();
            } else if (location.search.indexOf('showh5') > -1) {
                //这里有设计到jQuery的操作
                if (h5Status == 1) {
                    initH5.init();
                    $('#h5Container').show();
                } else {
                    hqImg.init();
                }
            } else {
                if(h5Status ==1){   
                //这里有设计到jQuery的操作
                    initH5.init();
                    $('#h5Container').show();
                }
            }
            //that = Object {webSocketInterval: 3, webSocketObj: null, hqoldInterval: null, init: function, switchfive: function}
            // that.switchfive = function clickSz(){
            //     //设置一些cookie之类的，这些东西，我是不需要的
            //     //_cookieCfg = Object {path: "/", domain: "finance.sina.com.cn", expires: "7"}
            //     var _cookieCfg = {
            //         path: '/',
            //         domain: 'finance.sina.com.cn',
            //         expires: '7'
            //     };
            //     var _cookieKey = 'FINA_V5_HQ';
            //     $('.js-five-hq').bind('click',function(){
            //         var self = $(this);
            //         if(self.hasClass('five-hq'))
            //         {
            //         //    Cookie.set(_cookieKey,0, _cookieCfg);
            //            //that.init();
            //            window.location.href="http://finance.sina.com.cn/realstock/company/"+papercode+"/nc.shtml";
            //         }
            //         else
            //         {
            //             // Cookie.set(_cookieKey,1, _cookieCfg);
            //             //that.init();
            //             window.location.href='http://finance.sina.com.cn/realstock/company/'+papercode+'/5g.shtml';
            //         }
            //     });
            // };
            // that.switchfive();
        };
        function _appendScript(src){
            var o = document.createElement('script');
            o.src = src;
            document.getElementsByTagName('head')[0].appendChild(o);
        };
        //exp = "IO.WebPush4", cb = function (), time = 30
        function _waitfor(exp, cb, time){
            var e, r;
            if (!time)
            {
                time = 100;
            }
            try
            {
                r = eval(exp);
            }
            catch(e)
            {
            }
            if (r)
            {
                return cb();
            }
            //exp = "IO.WebPush4", cb = function (), time = 30
            //36秒执行一次
            //var _t = this;
            setTimeout(function()
            {
                return _waitfor(exp, cb, time);
            }, time * 1.2);
        };
        function _getData() {
            /*需要连比价的股票数据一起加载*/
            // var self = this;
            // var _list = [papercode];
            // _list.push(papercode+'_i');
            // a_code && _list.push(a_code);
            // b_code && _list.push(b_code);
            // b_code && _list.push({
            //     sh: 'RMBUSD',
            //     sz: 'RMBHKD'
            // }[b_code.replace(/\d/g, '')]);
            // corr_hkstock && _list.push('rt_hk' + corr_hkstock) && _list.push('RMBHKD');
            // corr_bdc && _list.push(corr_bdc);
            // !corr_bdc && corr_bde && _list.push(corr_bde);
            // RS.corr_future&&RS.corr_future.length && _list.push(/\d/.test(RS.corr_future[0]) ? RS.corr_future[0] : 'hf_' + RS.corr_future[0]);
            // _list.push('bk_' + bkSymbol);
            // //请求行情串接口
            // //这里也下了一个文件
            // loadScript(hqURL.replace('$rn', random()) + _list.join(','), _gotData, true);
            //cookie
            // if(1||Cookie.get('FINA_V5_HQ')*1)
            // {
            //     var self = this;
            //     if (!window.IO || !window.IO.WebPush4)
            //     {
            //         //再插入一个脚本
            //         // _appendScript('http://woocall.sina.com.cn/lib/IO.WebPush4.js');
            //         // //request_hqstr = "hq.sinajs.cn/rn=1490440582707&list=sz000651"
            //         // var request_hqstr = hqURL.replace('$rn',random()).replace('http:\/\/','') + papercode;

            //         // _waitfor('IO.WebPush4',function(){
            //         //     //websocket
            //         //     self.webSocketObj = new IO.WebPush4('hq.sinajs.cn',[papercode,papercode+'_i'],function(m) {
            //         //         _gotData.call(self,false,m);
            //         //     },{
            //         //         interval: self.webSocketInterval
            //         //     });
            //         // },30);
            //     }
            //     else
            //     {
            //         //websocket
            //         self.webSocketObj = new IO.WebPush4('hq.sinajs.cn',[papercode,papercode+'_i'],function(m) {
            //                 _gotData.call(self,false,m);
            //             },{
            //                 interval: self.webSocketInterval
            //             });
            //     }
            // }
            // else
            // {
                // clearInterval(self.hqoldInterval);
                // loadScript(hqURL.replace('$rn', random()) + _list.join(','), function(){_gotData(false,true);}, true);
                // self.hqoldInterval = setInterval(function(){
                //     loadScript(hqURL.replace('$rn', random()) + _list.join(','), function(){_gotData(false,true);}, true);
                // },3000);
            // }

        }
        //5秒钟刷一次的函数
        function _abhbk_getData() {
            /*需要连比价的股票数据一起加载*/
            //self = Object {webSocketInterval: 3, webSocketObj: null, hqoldInterval: null, init: function}
            var self = this;
            //_list = ["sz000651"]
            var _list = [papercode];
            //_list = ["sz000651", "sz000651_i"]
            _list.push(papercode+'_i');
            a_code && _list.push(a_code);
            //_list = ["sz000651", "sz000651_i"]
            b_code && _list.push(b_code);
            b_code && _list.push({
                sh: 'RMBUSD',
                sz: 'RMBHKD'
            }[b_code.replace(/\d/g, '')]);
            corr_hkstock && _list.push('rt_hk' + corr_hkstock) && _list.push('RMBHKD');
            corr_bdc && _list.push(corr_bdc);
            !corr_bdc && corr_bde && _list.push(corr_bde);
            RS.corr_future&&RS.corr_future.length && _list.push(/\d/.test(RS.corr_future[0]) ? RS.corr_future[0] : 'hf_' + RS.corr_future[0]);
            //_list = ["sz000651", "sz000651_i", "sz000651", "bk_new_jdhy"]
            _list.push('bk_' + bkSymbol);
            //请求行情串接口
            loadScript(hqURL.replace('$rn', random()) + _list.join(','),function(){
                abhBk.draw();
            }, true);
        }
        //onlyPaperCode = false, m = true
        function _gotData(onlyPaperCode,m) {
            //that = Window {stop: function, open: function, alert: function, confirm: function, prompt: function…}
             //改成websocket方式
             var that = this;
             if(!m)return;
             var hqstr;
            //  if(that.webSocketObj)
            //  {
            //      hqstr = m[papercode];//window[papercode]
            //  }
            //  else
            //  {
                 //hqstr = "格力电器,31.360,31.200,31.540,32.680,31.290,31.530,31.540,128281355,4089320722.160,438240,31.530,41100,31.520,30300,31.510,143700,31.500,69700
                hqstr  = window['hq_str_'+papercode];
            //  }
            /* if (!onlyPaperCode) {
                abhBk.draw(m);
            }*/
            /*不是正常交易股票提示*/
            if (stock_state != 1) {
                _notTrading();
                return;
            }
            /*没有行情串全部输出--，按停牌给予提示*/
            if (!hqstr) {
                _drawer.draw({});
                $('#trading').hide();
                $('#closed').html('--').show();
                $('#hq').removeClass('has_limit');
                return;
            }
            var _data =  hqParser.a(hqstr,papercode);//格式化
            //var _data = hqParser.a(window['hq_str_' + papercode], papercode);
            /*if(window['hq_str_' + papercode +'_i']){//0514 zyc
                var _data_i = window['hq_str_' + papercode+'_i'].split(',');
                var totalcapital =  _data_i[7];
            }*/
            var once_hq_i = m[papercode +'_i']||window['hq_str_'+papercode+'_i'];
            if(once_hq_i){//0514 zyc
                var _data_i = once_hq_i.split(',');
                window.totalcapital =  _data_i[7];//总股本
            }
            if (_data.name && _data.name != '--'){
                //_data = Object {symbol: "sz000651", sym: "000651", name: "格力电器", open: 31.36, preClose: 31.2
                var stockname = _data.name;
                var _stockName = $id('stockName');
                if(_stockName)
                _stockName.innerHTML = _stockName.innerHTML.replace(/^[^<]*/, _data.name);
            }
            var _price = ((_data.now * 1) || _data.preClose);
            _data.open_color = _data.open - _data.preClose;
            _data.high_color = _data.high - _data.preClose;
            _data.low_color = _data.low - _data.preClose;
            //判断流通股本
            if (flag == 1)
            //var currcapital = window.currcapital;
            currcapital = _data_i?_data_i[8]:window.currcapital;
            if (flag == 2)
                var currcapital = curracapital;
            if (flag == 3)
                var currcapital = currbcapital;
            if (currcapital * 1) {
                _data.turnover = _data.volume / currcapital / 10000 * 100;
            }
            _data.totalShare = _price * totalcapital * 10000;
            _data.cvs = _price * currcapital * 10000;
            if (profit_four > 0) {
                _data.pe = _data.totalShare / profit_four / 100000000;
            } else {
                _data.pe = '--';
            }
            if (mrq_mgsy > 0) {
                _data.pe_mrq = (_price / mrq_mgsy).toFixed(2);
            } else {
                _data.pe_mrq = '--';
            }
            if (mgjzc > 0) {
                _data.pb = _price / mgjzc;
            } else {
                _data.pb = '--';
            }
            /*需要注意数据计算、draw、修改显示的顺序，必须按这个先后来*/
            if (_data.stopDay && !_data.buy && !_data.sell) {
                _data.volume = _data.amount = _data.swing = _data.turnover = '--';
                document.title = stockname + '(停牌)_股票行情_新浪财经_新浪网';
                $('#hq').removeClass('has_limit');
            } else {
                document.title = stockname + ' ' + _data.now.toFixed(isSHB(papercode) ? 3 : 2) + '(' + _data.changeP.toFixed(2) + '%)_股票行情_新浪财经_新浪网';
                var _limit_rate = 1 / 10;
                if (/S/.test(stockname)) {
                    _limit_rate = 1 / 20;
                }
                /*先算一个涨跌停限制，具体要不要显示最后再判断*/
                if (!window.trans_flag || /^N/.test(stockname)) {
                    _limit_rate = false;
                }
                if (_limit_rate === false) {
                    $('#hq').removeClass('has_limit');
                } else {
                    $('#hq').addClass('has_limit');
                    _data.up_limit = _data.preClose * (1 + _limit_rate);
                    _data.down_limit = _data.preClose * (1 - _limit_rate);
                }
            }
            
            //数据渲染
            _drawer.draw(_data);

            /*全天停牌的话显示提示*/
            if (_data.stopDay && !_data.buy && !_data.sell) {
                $('#trading').hide();
                $('#closed').html('停牌').show();
                return;
            } else {
                /*有买入价或卖出价的话就认为恢复交易了*/
                if (_data.status == '00' || _data.buy || _data.sell) {
                    _pause = false;
                } else {
                    $('#hqTime').hide();
                    $('#hqPause').show();
                    if (!_pause) {
                        /*请求停牌时间*/
                        getScript('http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/var%20continueTime=/CN_StockForGDTXService.getStockStatus04Info?code=' + papercode, function() {
                            $('#hqPause').html('临时停牌至' + (continueTime.endtime || ' ').split(' ')[1]);
                        });
                    } else if (window.continueTime) {
                        $('#hqPause').html('临时停牌至' + (continueTime.endtime || ' ').split(' ')[1]);
                    }
                    _pause = true;
                }
            }
            barBets.drawBets(hqstr);
            everyDeal.updateDeal(hqstr);
        }

        function _notTrading() {
            $('#trading').hide();
            $('#closed').html({
                '0': '无记录',
                '2': '未上市',
                '3': '已退市'
            }[stock_state]).show();
            if (stock_state == '2') {
                /*请求上市时间*/
                if (!window.ListingDate) {
                    getScript('http://vip.stock.finance.sina.com.cn/api/jsonp.php/var%20ListingDate=/BasicStockSrv.getStockInfo?PaperCode=' + papercode, function() {
                        if (ListingDate.LISTDATE) {
                            $('#hqTime').html('上市日：' + ListingDate.LISTDATE.split(' ')[0]);
                        }
                    });
                } else {
                    if (ListingDate.LISTDATE) {
                        $('#hqTime').html('上市日：' + ListingDate.LISTDATE.split(' ')[0]);
                    }
                }
            }
        }

    }();

    var abhBk = new function(m) {
        var _inited = false;
        var _drawer;
        var _otherSymbol;
        var _bondData;
        var _type;
        this.AH = '';
        var hqObj  = m;

        this.draw = function() {
            /*没初始化的话先初始化*/
            if (!_inited) {
                this.init();
            }
            var _data = {};
            var _myData = hqParser.a(window['hq_str_' + papercode], papercode);
            //var _myData = hqParser.a(hqObj[papercode], papercode);
            /*有对应a/b的话算个数出来*/
            if (_otherSymbol) {
                var _otherData = hqParser.a(window['hq_str_' + _otherSymbol], _otherSymbol);
                _data.name = _otherData.name || _otherSymbol;
                _data.now = _otherData.now;
                _data.changeP = _otherData.changeP;
                // _data['a%b'] = a_code == papercode ? _myData.now / _otherData.now * 100 : _otherData.now / _myData.now * 100;
                // _data['a%b'] /= window['hq_str_' + { sh: 'RMBUSD',sz: 'RMBHKD'}[b_code.replace(/\d/g,'')]].split(',')[3] / 100;
            }
            /*有对应港股的话，计算*/
            if (corr_hkstock) //corr_hkstock为A股对应港股代码
            {
                var _hkData = hqParser.hk(window['hq_str_rt_hk' + corr_hkstock], 'hk' + corr_hkstock);
                _data.hkSymbol = _hkData.symbol;
                _data.hkName = _hkData.name || _hkData.symbol;
                _data.hkNow = _hkData.now; //当前价
                _data.hkchangeP = _hkData.changeP; //
                /*只算AH比价，BH不算*/
                _data.AH = (_hkData.now / hqParser.a(window['hq_str_' + a_code]).now * window.hq_str_RMBHKD.split(",")[3]).toFixed(2) + '%';
                _data['hk%a'] = _hkData.now / hqParser.a(window['hq_str_' + a_code]).now * window.hq_str_RMBHKD.split(",")[3];
                //console.log(_data['hk%a'],corr_hkstock,a_code,window.hq_str_RMBHKD.split(",")[3],_data.hkNow,_data.hkchangeP);//（corr_hkstock--港股代码,a_code==papercode--A股代码,100港元对应多少人民币）
            }
            if (corr_bdc) {
                _bondData = hqParser.a(window['hq_str_' + corr_bdc], corr_bdc);
                _data.bondSymbol = _bondData.symbol;
                _data.bondName = _bondData.name || _bondData.symbol;
                _data.bondNow = _bondData.now;
                _data.bondchangeP = _bondData.changeP;
            } else {
                if (corr_bde) {
                    _bondData = hqParser.a(window['hq_str_' + corr_bde], corr_bde);
                    _data.bondSymbol = _bondData.symbol;
                    _data.bondName = _bondData.name || _bondData.symbol;
                    _data.bondNow = _bondData.now;
                    _data.bondchangeP = _bondData.changeP;
                }
            }
            var _bkData = window['hq_str_bk_' + bkSymbol].split(',');
            _data.bkName = _bkData[1];
            _data.bkchangeP = _bkData[5];
            _data.lzName = _bkData[12];
            _data.lzSymbol = _bkData[8];
            _data.lzNow = _bkData[10];

            if (isSHB(_data.lzSymbol)) {
                _data.fieldsImportant = {
                    lzNow: {
                        digit: 3
                    }
                };
            }
            _data.lzchangeP = _bkData[9];

            if (RS.corr_future&&RS.corr_future.length) {
                if (/\d/.test(RS.corr_future[0])) {
                    if (window['hq_str_' + RS.corr_future[0]]) {
                        var _qhData = window['hq_str_' + RS.corr_future[0]].split(',');
                        _data.qhNow = _qhData[8];
                        _data.qhchangeP = (_qhData[8] - _qhData[10]) / _qhData[10] * 100;
                    }
                } else {
                    if (window['hq_str_hf_' + RS.corr_future[0]]) {
                        var _qhData = window['hq_str_hf_' + RS.corr_future[0]].split(',');
                        _data.qhNow = _qhData[0];
                        _data.qhchangeP = (_qhData[0] - _qhData[7]) / _qhData[7] * 100;
                    }
                }
            }
            
            _drawer.draw(_data);
        };
        this.init = function() {
            _inited = true;

            var _html = [];
            _otherSymbol = (a_code + b_code).replace(papercode, '');
            if (_otherSymbol) {
                _html.push('<a href="' + pageURL.replace('$symbol', _otherSymbol) + '">@name@</a> @now@ <span class="@UD_changeP@">@changeP@</span>'); //@AH@代表_data.AH
            }
            var _hkSymbol = corr_hkstock;
            this.AH = this.AH ? this.AH + '%' : "0.00%";
            /*必须当前页是A股时才出对应港股信息*/
            if (_hkSymbol /* && a_code == papercode*/ ) {
                _html.push('<a href="http://biz.finance.sina.com.cn/suggest/lookup_n.php?strict=1&country=hk&q=' + _hkSymbol + '" target="_blank">@hkName@.HK</a> @hkNow@ <span class="hk_@UD_hkchangeP@"> @hkchangeP@ </span> H/A<span> @AH@</span>');
            }
            if (RS.corr_future&&RS.corr_future.length) {
                if (/\d/.test(RS.corr_future[0])) {
                    _html.push('<a href="http://finance.sina.com.cn/money/future/quote.html?' + RS.corr_future[0] + '" target="_blank" title="相关期货">' + RS.corr_future[1] + '</a> @qhNow@ <span class="@UD_qhchangeP@">@qhchangeP@</span>');
                } else {
                    _html.push('<a href="http://finance.sina.com.cn/money/future/quote_hf.html?' + RS.corr_future[0] + '" target="_blank" title="相关期货">' + RS.corr_future[1] + '</a> @qhNow@ <span class="us_@UD_qhchangeP@">@qhchangeP@</span>');
                }
            }
            var _bondSymbol = corr_bdc || corr_bde;
            /*债券部分*/
            if (_bondSymbol) {
                if (_html.length < 2) _html.push('<a href="http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=bond&q=' + _bondSymbol + '" target="_blank">@bondName@</a> @bondNow@ <span class="@UD_changeP@">@bondchangeP@</span>');
                if (_hkSymbol && _otherSymbol) _html.push('<a href="http://biz.finance.sina.com.cn/suggest/lookup_n.php?country=bond&q=' + _bondSymbol + '" target="_blank">@bondName@</a> @bondNow@ <span class="@UD_changeP@">@bondchangeP@</span>');
            }
            if (_html.length < 3) {
                if (_html.length == 2) {
                    _html.push('<span class=""><a href="http://vip.stock.finance.sina.com.cn/mkt/#' + bkSymbol + '" target="_balnk" title="所属板块">@bkName@</a></span> <span class="@UD_bkchangeP@">@bkchangeP@</span>');
                } else {
                    _html.push('<span class=""><a href="http://vip.stock.finance.sina.com.cn/mkt/#' + bkSymbol + '" target="_balnk" title="所属板块">@bkName@</a></span> <span class="@UD_bkchangeP@">@bkchangeP@</span> <span class="blue_d">领涨股：</span><a href="' + pageURL.replace('$symbol', '@lzSymbol@') + '">@lzName@</a> @lzNow@ <span class="@UD_lzchangeP@">@lzchangeP@</span>');
                }
            }

            $('#abhbk').html(_html.join('&nbsp;&nbsp;'));

            var _cfgNum = {
                digit: 2,
                cfg: 8
            };
            var _cfgP = {
                digit: 2,
                cfg: 4 + 8,
                p: '$1%'
            };
            var _cfgHkNum = {
                digit: 3,
                cfg: 8
            };
            var _cfgHkP = {
                digit: 2,
                cfg: 4 + 8,
                p: '$1%'
            };
            var _cfgP2 = {
                digit: 2,
                cfg: 8,
                p: '$1%'
            };
            var _cfg = {};
            _cfg.now = _cfg.lzNow = _cfg.qhNow = _cfg.bondNow = _cfgNum;
            /*如果当前页是A股，且B股是上海的，B股小数位改3位*/
            if (b_code != papercode && /sh900/.test(b_code)) {
                _cfg.now = {
                    digit: 3,
                    cfg: 8
                };
            }
            _cfg.chaneP = _cfg.bkchangeP = _cfg.lzchangeP = _cfg.qhchangeP = _cfg.bondchangeP = _cfgP;
            _cfg['a%b'] = _cfg['hk%a'] = _cfgP2;
            _cfg.hkNow = _cfgHkNum;
            _cfg.hkchangeP = _cfgHkP;
            //导入数据并渲染
            _drawer = new DataDrawer('abhbk', _cfg);
        };
    }();

    function f2(condition, amt, decimal, unit) {
        amt = parseFloat(amt);
        return (condition == 0 || isNaN(amt)) ? "--" : ((decimal === undefined ? amt : amt.toFixed(decimal)) + (unit || ""));
    }

    function getDiffCls(amt) {
        amt = parseFloat(amt);
        return amt > comparePrice ? "red" : (amt == comparePrice ? "" : "green");
    }

    function setDomCls(dom) {
        if(!dom) return
        dom.className = dom.className.replace(/\s(red|green|)$/, '');
        dom.className += ' ' + getDiffCls(dom.innerHTML);
    }

    function setCss(dom, css) {
        if(!dom) return
        dom.className = dom.className.replace(/\s(up|down|)$/, '');
        dom.className += ' ' + css;
    }
    var barBets = new function() {
        var _trs = "#tabfive tr";
        var _fiveRate = '#fiveRate';
        var _fiveAmt = '#fiveAmt';

        function _drawBets(hqStr) {
            if (!hqStr) {
                return;
            }
            var trs = $(_trs);
            var fiveRate = $(_fiveRate);
            var fiveAmt = $(_fiveAmt);
            var buy = 0, sell = 0;
            var data = hqStr.split(',');
            var _data = hqParser.a(hqStr);
            var now = _data.now;
            var preClose = _data.preClose;
            if($(trs[6]).find("td")[0])
            $(trs[6]).find("td")[0].innerHTML = now.toFixed(digit); //价格

            for (var i = 0; i < 5; i++) {
                //更新买
                var tds = $(trs[7 + i]).find("td");
                if(tds[1])
                tds[1].innerHTML = f2(data[3] + data[10 + i * 2], parseInt(data[10 + i * 2]) / 100 || '--', 0); //数量
                if(tds[0])
                tds[0].innerHTML = f2(data[3] + data[10 + i * 2 + 1], data[10 + i * 2 + 1] * 1 || '--', digit); //价格
                setCss(tds[0], checkUD(null, data[10 + i * 2 + 1] - preClose));
                buy += (data[10 + i * 2] * 1) || 0;

                //更新卖
                tds = $(trs[5 - i]).find("td");
                if(tds[1])
                tds[1].innerHTML = f2(data[3] + data[20 + i * 2], parseInt(data[20 + i * 2]) / 100 || '--', 0); //数量
                if(tds[0])
                tds[0].innerHTML = f2(data[3] + data[20 + i * 2 + 1], data[20 + i * 2 + 1] * 1 || '--', digit); //价格
                setCss(tds[0], checkUD(null, data[20 + i * 2 + 1] - preClose));
                sell += (data[20 + i * 2] * 1) || 0;
            }
            //if (tickettime >= 92500) {
            if (isNaN(sell))
                sell = 0;
            var tmp = 100 * (buy - sell) / (buy + sell);
            fiveRate.html(isNaN(tmp) ? "--" : f2(data[3], tmp, 2, "%")); //委比
            var diff = ((buy - sell) / 100).toFixed(2);
            fiveAmt.html(f2(data[3], diff, 0)); //委差
            var cls = checkUD({}, diff);
            if(fiveAmt[0])
            fiveAmt[0].className = cls;
            if(fiveRate[0])
            fiveRate[0].className = cls;
        }
        this.drawBets = _drawBets;
    }();

    var everyDeal = new function() {
        var _hasInited = false;
        var _lastVolume;
        var _lastPrice, _lastBuy, _lastSell;

        function _initDeal() {
            if (_hasInited) {
                return;
            }
            _hasInited = true;
            getScript('http://vip.stock.finance.sina.com.cn/quotes_service/view/CN_TransListV2.php?num=11&symbol=' + papercode + '&rn=' + Math.round(Date.now()/60000), function() {
                var body = $("#position_as_type_c0 tbody").empty();
                for (var i = 0; i < trade_item_list.length; i++) {
                    var data = trade_item_list[i];
                    var tr = $("<tr>").addClass('row_' + (i + 1) % 2);
                    $("<th>").html(data[0]).appendTo(tr);
                    var td = $("<td>").html(parseFloat(data[2]).toFixed(digit)).appendTo(tr);
                    setCss(td[0], checkUD(null, data[2] - window['hq_str_' + papercode].split(',')[2]));
                    $("<td>").html(parseInt(parseFloat(data[1]) / 100)).appendTo(tr);
                    $("<td>").html(data[3] == "UP" ? "买入" : (data[3] == "EQUAL" ? "中性盘" : "卖出")).addClass(data[3] == "UP" ? "up" : (data[3] == "EQUAL" ? "equal" : "down")).appendTo(tr);
                    body.append(tr);
                }

                $("#outamt").html(f2(parseInt(trade_INVOL_OUTVOL[0] / 100), trade_INVOL_OUTVOL[0] / 100, 0, "手")); //外盘
                $("#inamt").html(f2(parseInt(trade_INVOL_OUTVOL[1] / 100), trade_INVOL_OUTVOL[1] / 100, 0, "手")); //内盘
                _lastVolume = (trade_INVOL_OUTVOL[0] + trade_INVOL_OUTVOL[1]) || 0;
                _lastPrice = trade_item_list[0] ? trade_item_list[0][2] : undefined;
            });
        }
        this.init = _initDeal;

        function _updateDeal(hqStr) {
            if (!_hasInited) {
                _initDeal();
                // setTimeout(arguments.callee.bindArg(hqStr), 200);
                return;
            }
            var _data = hqParser.a(hqStr);
            try {
                if (_lastVolume < _data.volume) {
                    var _change = _data.volume - _lastVolume;
                    var _direct = 'equal';
                    if (_lastBuy || _lastSell) {
                        if (_data.now >= _lastSell && _lastSell) {
                            _direct = 'up';
                        }
                        if (_data.now <= _lastBuy && _lastBuy) {
                            _direct = 'down';
                        }
                    } else {
                        if (_data.now > _lastPrice) {
                            _direct = 'up';
                        }
                        if (_data.now < _lastPrice) {
                            _direct = 'down';
                        }
                    }
                    /*只在第一次时用于弥补接口和行情串差异，之后完全依靠买卖盘口*/
                    _lastPrice = undefined;


                    var body = $("#position_as_type_c0 tbody");
                    var tr = $("<tr>");
                    $("<th>").html(_data.time).appendTo(tr); //时间
                    $("<td>").html(_data.now.toFixed(digit)).addClass(checkUD(_data)).appendTo(tr); //成交价
                    $("<td>").html(parseInt(_change / 100)).appendTo(tr); //成交量
                    $('<td>').html({
                        up: '买入',
                        down: '卖出',
                        'equal': '中性盘'
                    }[_direct]).addClass(_direct).appendTo(tr);

                    //保证添加时只有8条
                    while (body.find("tr").length > 10) {
                        $(body.find("tr")[10]).remove();
                    }
                    body.prepend(tr);
                    var trs = body.find('tr');
                    for (var i = 0; i < trs.length; i++) {
                        trs[i].className = 'row_' + (i + 1) % 2;
                    }

                    trade_INVOL_OUTVOL[0] += _direct == "up" ? _change : (_direct == " " ? _change / 2 : 0); //外盘
                    trade_INVOL_OUTVOL[1] += _direct == "down" ? _change : (_direct == " " ? _change / 2 : 0); //内盘

                    $("#outamt").html(parseInt(trade_INVOL_OUTVOL[0] / 100) == 0 ? "--" : f2(_data.now, parseInt(trade_INVOL_OUTVOL[0] / 100), undefined, "手")); //外盘
                    $("#inamt").html(parseInt(trade_INVOL_OUTVOL[1] / 100) == 0 ? "--" : f2(_data.now, parseInt(trade_INVOL_OUTVOL[1] / 100), undefined, "手")); //内盘
                }
            } catch (e) {}
            _lastVolume = _data.volume;
            _lastBuy = hqStr.split(',')[11] * 1;
            _lastSell = hqStr.split(',')[21] * 1;
        }
        this.updateDeal = _updateDeal;
    }();

    // function DataTable(label, cont, interface, dataName, fields, fieldCfg, dataProcess) {
    //     // this.drawer = new DataDrawer(cont, fieldCfg);
    //     // this.interface = interface;
    //     // this.dataName = dataName;
    //     // this.fields = fields;
    //     // this.dataProcess = dataProcess;
    //     // $(label).mouseover(this.getData.fnBind(this));
    // }
    // merge(DataTable.prototype, {
    //     lastTime: undefined,
    //     freq: 120,
    //     getData: function() {
    //         if (new Date().getTime() - this.lastTime < this.freq * 1000) {
    //             return;
    //         }
    //         var _this = this;
    //         getScript(this.interface, function() {
    //             var _data = window[_this.dataName];
    //             var _dd = [];
    //             for (var i = 0; i < _data.length; i++) {
    //                 _dd.push({});
    //                 for (var f in _this.fields) {
    //                     _dd[i][f] = _data[i][_this.fields[f]];
    //                 }
    //                 if (_this.dataProcess) {
    //                     _this.dataProcess(_dd[i]);
    //                 }
    //                 _dd[i].rowIndex = (i + 1) % 2;
    //             }
    //             _this.drawer.draw(_dd);
    //         });
    //         this.lastTime = new Date().getTime();
    //     }
    // });


    /*图片版行情*/
    var hqImg = new function() {
        var _showingIndex = 0;
        this.init = function() {
            $('#picContainer').show();
            new TabCont('picContainer', 'click', _show).show(0);
            setInterval(_show, 30 * 1000);

            function _changeURL(img) {
                img.attr('url', img.attr('url').replace(/newchart\/.*?\/n/, 'newchart/' + this.value + '/n'));
                _show();
            }
            $('#selectImgK').change(_changeURL.bindArg($('#imgK')));
            new VSelect('selectImgK');
            $('#selectImgFqK').change(_changeURL.bindArg($('#imgFqK')));
            new VSelect('selectImgFqK');
            $('#selectImgJS').change(_changeURL.bindArg($('#imgJS')));
            new VSelect('selectImgJS');


            attention.init('img');
        };

        function _show(argIndex) {
            if (typeof argIndex == 'number') {
                _showingIndex = argIndex;
            }
            var _cont = $('#picContainer .cont').eq(_showingIndex);
            var _img = _cont.find('img');
            _img.attr('src', _img.attr('url').replace('$symbol', papercode) + '?' + random());

        }
    }();
  
  

    //init of h5:
    var _compareColor=['#f69931','#f2c700','#3e4de1','#bf58ef'];
    var _cnChart;
    //第一次执行这个，加载了"http://finance.sina.com.cn/sinafinancesdk/js/plugins/sinaTKChart.js" 这个脚本
    var initH5 = new function() {

        this.init=function(){
            if(!window.KKE)
            {
                getScript('http://finance.sina.com.cn/sinafinancesdk/js/sf_sdk.js', function() {
                           getH5img();
                });
            }
            else
            {
                getH5img();
            }
            function getH5img(){
            KKE.api('plugins.sinaTKChart.get',{
                compare:{color:_compareColor},
                symbol:papercode,//证券代码
                mt:'cnlv1',
                dom_id:'h5Figure'//放置图形的dom容器id
            },function(chart_){
                _cnChart=chart_;
                //多空
                if(window.location.search.indexOf('showBBI')!=-1)
                {
                     _cnChart.showView({view:'kdd',active:3});
                    $(document.body).scrollTop(480);
                }
                compareH5.init();
            });
            }
        }
    };

    /*对比功能*/
    var compareH5 = new function() {
        var _indexs = '#compareIndexH5 a';
        var _comList = [];
        var _max = 4;
        var _msg = '#compareMSGH5';
        var _suggest;
    var mkt;
        var idxSymbol;

        var _status=false;
        function _setmkt(){
            var idx={};
            switch (mkt) {
                case 'sh':
                    idx.symbol='sh000001';
                    idx.name='上证指数';
                    $($id('h5Lv1added')).text('对比沪指');
                    break;
                case 'sz':
                    idx.symbol='sz399001';
                    idx.name='深证指数';
                    $($id('h5Lv1added')).text('对比深指');
                    break;
            }
            return idx;
        }

        function _addCompare(argSym) {
            /*空内容不响应*/
            argSym = replace$(argSym);
            if (!argSym || argSym == '拼音/代码/名称') {
                _noCompare();
                return;
            }

            var __arrayData = (_suggest._objectData["key_" + argSym] || "").replace(/&amp;/g, "&").replace(/;$/, "").split(";");
            //有的话取第一个
            if (__arrayData.length) {

                var xm=__arrayData[0].split(',');
                //23,11,12,41,31
                switch (xm[1]){
                    case '11':
                    case '12':
                    case '23':
                    case '81':
                        argSym=xm[3];
                        break;
                    case '41':
                        argSym='gb_'+xm[2];
                        break;
                    case '31':
                        argSym='rt_hk'+xm[2];
                        break;
                    case '73':
                        argSym='sb'+xm[2];
                        break;
                    case '71':
                        if(xm[2]==='diniw'||xm[2]==='usdcny') {
                            argSym=xm[2];
                            argSym=argSym.toUpperCase();
                        }
                        else argSym='fx_s'+xm[2];
                        break;
                }
            }
            //没有报错
            else {
                _error('请输入正确的股票代码');
            }

            if(_comList.length >= _max)
            {
                _compareTooMore();
                return;
            }
            for(var i = 0;i < _comList.length;i++)
            {
                if(_comList[i].symbol == argSym)
                {
                    _addedCompare();
                    return;
                }
            }

            KKE&&KKE.api('datas.hq.get',{symbol:argSym},function(obj_){

                if(!obj_.data[0].name){
                    _error('此证券已退市');
                    return;
                }
                // var obj={symbol:argSym,name:obj_.data[0].name};
                var name=obj_.data[0].name.length>4?obj_.data[0].name.substring(0,4)+'..':obj_.data[0].name;
                var obj={symbol:argSym,name:name};
                _comList.push(obj);
                _cnChart.compare({symbol:argSym,linecolor:{K_N:_compareColor[_comList.length-1]}});
                $('#h5CompareCon').show();
                cSymbol(obj,_compareColor[_comList.length-1]);


                if(argSym==idxSymbol.symbol){
                    if(argSym=='sh000001')$($id('h5Lv1added')).text('取消对比');
                    else $($id('h5Lv1added')).text('取消对比');
                    _status=true;
                }
            })

            return false;
        }

        function cSymbol(obj_,color_){
            var d=$C('div'),s1=$C('span'),s2=$C('span');
            d.appendChild(s1);
            d.appendChild(s2);
            $id('h5CompareCon').appendChild(d);

            s1.className='item-span-del';
            s2.className='item-span-name1';

            s2.style.color=color_;
            s2.innerHTML  =obj_.name;
            d.setAttribute('data-symbol',obj_.symbol);

            $(d).click(function(){

                var delSymbol=this.getAttribute('data-symbol');

                if(delSymbol==idxSymbol.symbol){
                    if(delSymbol=='sh000001')$($id('h5Lv1added')).text('对比沪指');
                    else $($id('h5Lv1added')).text('对比深指');;
                    _status=false;
                }

                _cnChart.compare({symbol:delSymbol},true);

                for(var i = _comList.length - 1;i >= 0;i--){
                    if(_comList[i].symbol == delSymbol){
                        _comList.splice(i,1);

                        _compareColor.push(_compareColor[i]);
                        _compareColor.splice(i,1);
                    }
                }

                $id('h5CompareCon').removeChild(this);

                if(_comList.length<=0)$('#h5CompareCon').hide();
            });

            return d;
        }


        this.addCompare = _addCompare;

        function _noCompare() {
            _msg.html('请选择要对比的股票').show();
            setTimeout(function() {
                _msg.hide();
            }, 3 * 1000);
        }

        function _compareTooMore() {
            _error('最多可对比5只股票');
        }

        function _addedCompare() {
            _error('已经添加了该股票');
        }

        function _error(msg) {
            _msg.html(msg).show();
            setTimeout(function() {
                _msg.fadeOut();
            }, 2 * 1000);
        }
      
        this.init = function() {
            mkt=papercode.substring(0,2);
            idxSymbol=_setmkt();
            /*指数浮层*/
            $('#compareIndexH5').mouseover(function() {
                $(this).find('.is').show();
            }).mouseleave(function() {
                $(this).find('.is').hide();
            });
            _indexs = $(_indexs);
            _indexs.click(function() {
                var _sym = $(this).attr('symbol');
                _addCompare(_sym);
            });


            $($id('h5Lv1added')).click(function(){

                if(!_status){
                    for(var i = 0;i < _comList.length;i++)
                    {
                        if(_comList[i].symbol == idxSymbol.symbol)
                        {
                            _addedCompare();
                            return;
                        }
                    }
                }

                switch (mkt){
                    case 'sh':
                        if(_status){
                            $($id('h5Lv1added')).text('对比沪指');;
                        }else{
                            $($id('h5Lv1added')).text('取消对比');
                        }
                        break;
                    case 'sz':
                        if(_status){
                            $($id('h5Lv1added')).text('对比深指');
                        }else{
                            $($id('h5Lv1added')).text('取消对比');
                        }
                        break;
                }

                if(_status){

                    _cnChart.compare({symbol:idxSymbol.symbol},_status);

                    for(var i = _comList.length - 1;i >= 0;i--){
                        if(_comList[i].symbol == idxSymbol.symbol){
                            _comList.splice(i,1);

                            _compareColor.push(_compareColor[i]);
                            _compareColor.splice(i,1);
                        }
                    }

                    var child=$id('h5CompareCon').childNodes;
                    var len=child.length;
                    for(i=0;i<len;i++){
                        if(child[i].getAttribute('data-symbol')==idxSymbol.symbol){
                            $id('h5CompareCon').removeChild(child[i]);
                            break;
                        }
                    }

                    if(_comList.length<=0)$('#h5CompareCon').hide();
                }else{

                    _comList.push(idxSymbol);

                    _cnChart.compare({symbol:idxSymbol.symbol,linecolor:{K_N:_compareColor[_comList.length-1]}});

                    $('#h5CompareCon').show();

                    cSymbol(idxSymbol,_compareColor[_comList.length-1]);
                }

                _status=!_status;
            });


            _msg = $(_msg);
            if(window.SuggestHtml5)
            {
                 suggestH5();
            }
            else
            {
                getScript('http://n.sinaimg.cn/finance/hqimg20160510/suggestHtml5_20160510.js',function(){
                     suggestH5();
                });
            }
            function suggestH5(){
                _suggest = new SuggestHtml5();//SuggestServer();
                _suggest.bind({
                    // 除"input"必须设置外 其他均为可选
                    "input": "compareTxtH5", //*(必选) 指定suggest绑定的对象 [string|HTMLElement.input]
                    "default": "拼音/代码/名称", // 可指定input默认值 [string] 默认空
                    "type": "23,11,12,41,31,71,73,81", // 类型 [string] 例如"stock"、"23"、"11,12"
                    "callback": _addCompare // 选定提示行时的回调方法，回调该方法时传入当前input内value [function|null]
                });
            }
            $('#compareBtnH5').click(function() {
                _addCompare($('#compareTxtH5').val());
            });

            attention.init('html5');
        };
    }();
    //end of h5
    var technology = new function() {
        
        

        function _show() {
            var _this = $(this);
            var _param = _this.attr('param');
            
                var _img = $C('img');
                _img.src = 'http://image2.sinajs.cn/newchart/$type/n/$symbol.gif'.replace('$type', _param).replace('$symbol', papercode);
                var _offset = $('#technology').offset();
                _img.style.position = 'absolute';
                _img.style.zIndex = 90;
                _img.style.left = _offset.left + 185 + 'px';
                _img.style.top = Math.min(_offset.top - 100, (document.body.scrollTop || document.documentElement.scrollTop) + $(window).height() - 320) + 'px';
                _img.style.backgroundColor = '#fff';
                _img.style.padding = '5px';
                _img.style.border = '1px solid #ccc';
                document.body.appendChild(_img);
                _img.style.display = 'none';
                $(_img).fadeIn();

                function _click(ev) {
                    ev = ev || window.event;
                    var _target = ev.srcElement || ev.target;
                    if (_target != _img) {
                        $(_img).remove();
                        $(document.documentElement).unbind('click', _click);
                    }
                }
                setTimeout(function() {
                    $(document.documentElement).click(_click);
                }, 10);
                
        }
        this.init = function() {
            $('#technology a').click(_show);
        }
    }();

    /*对比功能*/
    var compare = new function() {
        var _indexs = '#compareIndex a';
        var _comList = [];
        var _max = 4;
        var _msg = '#compareMSG';
        var _suggest;

        function _addCompare(argSym) {
            /*空内容不响应*/
            if (!argSym || argSym == '拼音/代码/名称') {
                _noCompare();
                return;
            }
            /*如果代码不是规整的*/
            if (!/s[hz]\d{6}/.test(argSym)) {
                /*取suggest的数据*/
                var __arrayData = (_suggest._objectData["key_" + argSym] || "").replace(/&amp;/g, "&").replace(/;$/, "").split(";");
                /*有的话取第一个*/
                if (__arrayData.length) {
                    argSym = __arrayData[0].split(',')[3];
                }
                /*没有报错*/
                else {
                    _error('请输入正确的股票代码');
                }
            }
            
            return false;
        }
        this.addCompare = _addCompare;

        function _noCompare() {
            _msg.html('请选择要对比的股票').show();
            setTimeout(function() {
                _msg.hide();
            }, 3 * 1000);
        }

        function _compareToMore() {
            _error('最多可对比5只股票');
        }

        function _addedCompare() {
            _error('已经添加了该股票');
        }

        function _error(msg) {
            _msg.html(msg).show();
            setTimeout(function() {
                _msg.fadeOut();
            }, 2 * 1000);
        }
    
        this.init = function() {
            /*指数浮层*/
            $('#compareIndex').mouseover(function() {
                $(this).find('.is').show();
            }).mouseleave(function() {
                $(this).find('.is').hide();
            });
            _indexs = $(_indexs);
            _indexs.click(function() {
                var _sym = $(this).attr('symbol');
                _addCompare(_sym);
            });

            _msg = $(_msg);

            _suggest = new SuggestServer();
            _suggest.bind({
                // 除"input"必须设置外 其他均为可选
                "input": "compareTxt", //*(必选) 指定suggest绑定的对象 [string|HTMLElement.input]
                "default": "拼音/代码/名称", // 可指定input默认值 [string] 默认空
                "type": "stock", // 类型 [string] 例如"stock"、"23"、"11,12"
                "callback": _addCompare // 选定提示行时的回调方法，回调该方法时传入当前input内value [function|null]
            });
            $('#compareBtn').click(function() {
                _addCompare($('#compareTxt').val());
            });

        };
    }();

    /*同时被关注*/
    var attention = new function() {
        /*股票列表，每次切换删除换新的，数据加载后排序并显示。添加一个sorted属性作为标识*/
        var _stockList = [];
        var _showingIndex = 0;
        /*自动刷新定时器，每次切换重置，并马上加载一次数据*/
        var _timer;
        var _maxNum = 9;
        var _type;
        var _requestIndex = 0;
        this.init = function(type) {
            _type = type;
            if (_type == 'img') {
                _maxNum = 30;
                $('#attention .cont').height('205px');
            }
            _show();
        };
        this.stop = function() {
            clearInterval(_timer);
        };

        function _show(argIndex) {
            /*确保是切换的*/
            if (typeof argIndex == 'number') {
                _showingIndex = argIndex;
            }
            /*设置好各种状态*/
            clearInterval(_timer);
            _stockList.sorted = false;
            /*清空股票*/
            while (_stockList.length) {
                _stockList.pop().release();
            }
            /*创建新的股票列表*/
            var _list = (window.attentionList || [])[_showingIndex] || [];
            var _stock;
            for (var i = 0; i < _list.length && i < _maxNum; i++) {
                _stock = new _Stock(_list[i]);
                _stockList.push(_stock);
            }
            if (_stockList.length) {
                _getData();
                _timer = setInterval(function() {
                    if (checkDayTime()) {
                        _getData();
                    }
                }, 5 * 1000);
            } else {
                $('#attention .cont ul').eq(_showingIndex).html('<li>没有相关股票</li>');
            }
        }

        function _getData() {
            // var _list = [];
            // for (var i = 0; i < _stockList.length; i++) {
            //     _list.push(_stockList[i].symbol);
            // }
            // if (_list.length) {
            //     _requestIndex++;
            //     // loadScript(hqURL.replace('$rn', random()) + 's_' + _list.join(',s_'), _gotData.bindArg(_requestIndex));
            // }
        }

        function _gotData(argRequestIndex) {
            // if (_requestIndex != argRequestIndex) {
            //     return;
            // }
            // var _datas = {};
            // var _d, _ds, _symbol;
            /*输出数据*/
            // for (var i = 0; i < _stockList.length; i++) {
            //     _symbol = _stockList[i].symbol;
            //     _ds = window['hq_str_s_' + _symbol] || '';
            //     _d = {};
            //     _datas[_symbol] = _d;
            //     _ds = _ds.split(',');
            //     _d.name = _ds[0] || _symbol;
            //     _d.now = _ds[1] * 1 ? _ds[1].toFixed(isSHB(_symbol) ? 3 : 2) : '--';
            //     _d.changeP = _ds[1] * 1 ? _ds[3] + '%' : '--';
            //     _stockList[i].draw(_d);
            // }
            /*如果没排过序的话说明是初始化，排序并加入页面*/
            // if (!_stockList.sorted) {
            //     _stockList.sorted = true;
            //     //                _stockList.sort(function ($1,$2)
            //     //                {
            //     //                    var _d1 = _datas[$1.symbol].changeP;
            //     //                    var _d2 = _datas[$2.symbol].changeP;
            //     //                    if(_d1 == '--')
            //     //                    {
            //     //                        return '1';
            //     //                    }
            //     //                    if(_d2 == '--')
            //     //                    {
            //     //                        return '-1';
            //     //                    }
            //     //                    return parseFloat(_d2) - parseFloat(_d1);
            //     //                });
            //     var _container = $('#attention .cont ul').eq(_showingIndex);
            //     for (var i = 0; i < _stockList.length; i++) {
            //         _container.append(_stockList[i].obj);
            //     }
            // }
        }

        function _Stock(symbol) {
            // this.symbol = symbol;
            // this.obj;
            // this.nameLink;
            // this.dataSpan;
            // this.compareBtn;
            // this.createDom();
            
            // if(_type =='html5'){
            //     this.addEvent();
            // }
        }
        // merge(_Stock.prototype, {
        //     createDom: function() {
        //         this.obj = $C('li');

        //         this.nameLink = $C('a');
        //         this.nameLink.href = pageURL.replace('$symbol', this.symbol);
        //         this.nameLink.innerHTML = this.symbol;
        //         this.obj.appendChild(this.nameLink);

        //         this.obj.appendChild(document.createTextNode('('));

        //         this.dataSpan = $C('span');
        //         this.dataSpan.innerHTML = '--.-- --.--';
        //         this.obj.appendChild(this.dataSpan);

        //         this.compareBtn = $C('a');
        //         this.compareBtn.innerHTML = '加入走势对比';
        //         this.compareBtn.href = 'javascript:void(0)';
        //         this.compareBtn.className = 'add_compare';
        //         this.obj.appendChild(this.compareBtn);

        //         this.obj.appendChild(document.createTextNode(')'));
        //     },
        //     addEvent: function() {
        //         var _this = this;
        //         $(this.nameLink).mouseenter(function() {
        //             _this.dataSpan.style.display = 'none';
        //             _this.compareBtn.style.display = 'inline';
        //         });
        //         $(this.obj).mouseleave(function() {
        //             _this.dataSpan.style.display = '';
        //             _this.compareBtn.style.display = '';
        //         });

        //         if(_type=='html5'){
        //             $(this.compareBtn).click(compareH5.addCompare.fnBind(compareH5, [this.symbol]));
        //         }

        //     },
        //     draw: function(argData) {
        //         this.nameLink.innerHTML = argData.name || this.symbol;
        //         this.dataSpan.innerHTML = argData.now + ' ' + argData.changeP;
        //         this.dataSpan.className = checkUD(undefined, parseFloat(argData.changeP));
        //     },
        //     release: function() {
        //         this.obj.parentNode && this.obj.parentNode.removeChild(this.obj);
        //         this.obj = null;
        //         this.dataSpan = null;
        //         this.compareBtn = null;
        //     }
        // });
    }();

    /*行业对比*/
    var hydb = new function() {
        var _timer;
        var _cfg = {
            changepercent_up: {
                dTitle: '涨幅(%)',
                url: hqURL_txt + '$bkSymbol_changepercent_up',
                varName: '$bkSymbol_changepercent_up',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5,
                color: true
            },

            changepercent_down: {
                dTitle: '跌幅(%)',
                url: hqURL_txt + '$bkSymbol_changepercent_down',
                varName: '$bkSymbol_changepercent_down',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5,
                color: true
            },

            swingpercent: {
                dTitle: '振幅(%)',
                url: hqURL_txt + '$bkSymbol_swingpercent',
                varName: '$bkSymbol_swingpercent',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            volumerate: {
                dTitle: '量比',
                url: hqURL_txt + '$bkSymbol_volumerate',
                varName: '$bkSymbol_volumerate',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            commissionrate: {
                dTitle: '委比(%)',
                url: hqURL_txt + '$bkSymbol_commissionrate',
                varName: '$bkSymbol_commissionrate',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            volume: {
                dTitle: '成交量(手)',
                url: hqURL_txt + '$bkSymbol_volume',
                varName: '$bkSymbol_volume',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            turnoverrate: {
                dTitle: '换手率(%)',
                url: hqURL_txt + '$bkSymbol_turnoverrate',
                varName: '$bkSymbol_turnoverrate',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            peratio: {
                dTitle: '市盈率',
                url: hqURL_txt + '$bkSymbol_peratio',
                varName: '$bkSymbol_peratio',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            pbratio: {
                dTitle: '市净率',
                url: hqURL_txt + '$bkSymbol_pbratio',
                varName: '$bkSymbol_pbratio',
                fields: {
                    symbol: {
                        key: 0
                    },
                    name: {
                        key: 1
                    },
                    now: {
                        key: 2
                    },
                    data: {
                        key: 3
                    }
                },
                delay: 5
            },

            bkrank_netamount: {
                dTitle: '净流入(万元)',
                url: 'http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp_v2.php/var bkrank_netamount=/MoneyFlow.ssl_bkzj_ssggzj?page=1&num=10&sort=netamount&asc=0&bankuai=$bkSymbol&shichang=',
                varName: 'bkrank_netamount',
                fields: {
                    symbol: {
                        key: 'symbol'
                    },
                    name: {
                        key: 'name'
                    },
                    now: {
                        key: 'trade',
                        digit: 2
                    },
                    data: {
                        key: 'netamount',
                        digit: 2,
                        shift: -4
                    }
                },
                delay: 60 * 2
            },

            bkrank_ratioamount: {
                dTitle: '净流入率(%)',
                url: 'http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp_v2.php/var bkrank_ratioamount=/MoneyFlow.ssl_bkzj_ssggzj?page=1&num=10&sort=ratioamount&asc=0&bankuai=$bkSymbol&shichang=',
                varName: 'bkrank_ratioamount',
                fields: {
                    symbol: {
                        key: 'symbol'
                    },
                    name: {
                        key: 'name'
                    },
                    now: {
                        key: 'trade',
                        digit: 2
                    },
                    data: {
                        key: 'ratioamount',
                        digit: 2,
                        shift: 2
                    }
                },
                delay: 60 * 2
            }
        };
        var _currentCfg;
        this.init = function() {
            if (bkSymbol == 'hs_b') {
                $('#hydb_container').hide();
                return;
            }
            new VSelect('select_hydb');
            // $('#select_hydb').change(_start);
            // _start();
        };

        function _start() {
            clearInterval(_timer);
            _currentCfg = _cfg[$id('select_hydb').value];
            $('#hydb_key').html(_currentCfg.dTitle);
            _getData();
            if (_currentCfg.delay) {
                _timer = setInterval(_getData, _currentCfg.delay * 1000);
            }
        }

        function _getData() {
            getScript(_currentCfg.url.replace('$bkSymbol', bkSymbol), _draw);
        }

        function _draw() {
            var _data = window[_currentCfg.varName.replace('$bkSymbol', bkSymbol)];
            var _tbody = $('#table_hydb').empty();
            var _tr, _th, _td;
            var _d;
            for (var i = 0; i < _data.length; i++) {
                _tr = $('<tr>').addClass('row_' + i % 2).appendTo(_tbody);
                _th = $('<th>').appendTo(_tr);
                $('<a>').attr('href', pageURL.replace('$symbol', _data[i][_currentCfg.fields.symbol.key])).html(_data[i][_currentCfg.fields.name.key]).appendTo(_th);

                _d = _data[i][_currentCfg.fields.now.key];
                if (_currentCfg.fields.now.digit) {
                    _d = _d.toFixed(_currentCfg.fields.now.digit);
                }
                _td = $('<td>').html(_d).appendTo(_tr);

                _d = _data[i][_currentCfg.fields.data.key];
                if (_currentCfg.fields.data.shift) {
                    _d = _d * Math.pow(10, _currentCfg.fields.data.shift);
                }
                if (_currentCfg.fields.data.digit) {
                    _d = _d.toFixed(_currentCfg.fields.data.digit);
                }
                _td = $('<td>').html(_d).appendTo(_tr);
                if (_currentCfg.color) {
                    _td.addClass(checkUD(undefined, _data[i][_currentCfg.fields.data.key]));
                }
            }
        }
    }();

    /*关注状态*/
    var holdStatus = new function() {
        var _statusHolder = [];
        var _hasLogin = false;
        var _loginOKCall = [];

        function _loginChecker(loginOKCall) {
            if (_hasLogin) {
                return true;
            } else {
                loginLayer.open();
                _loginOKCall.push(loginOKCall);
                return false;
            }
        }
        this.init = function() {
            // LoginManager.add({
            //     onLoginSuccess: function() {
            //         _hasLogin = true;
            //         for (var i = 0; i < _statusHolder.length; i++) {
            //             _statusHolder[i].getStatus();
            //         }
            //         while (_loginOKCall.length) {
            //             _loginOKCall.shift()();
            //         }
            //     },
            //     onUserChanged: function() {
            //         for (var i = 0; i < _statusHolder.length; i++) {
            //             _statusHolder[i].getStatus();
            //         }
            //     },
            //     /*退出切换状态，并删除所有自选股DOM*/
            //     onLogoutSuccess: function() {
            //         _hasLogin = false;
            //         for (var i = 0; i < _statusHolder.length; i++) {
            //             _statusHolder[i].hasNotHold();
            //         }
            //     }
            // });

            // getScript('http://finance.sina.com.cn/basejs/holdStatus.js', function() {
            //     _statusHolder.push(new HoldStatus(papercode, 'holdStatus', _loginChecker, '', '', '加入自选股', '已添加自选'));
            //     if (_hasLogin) {
            //         for (var i = 0; i < _statusHolder.length; i++) {
            //             _statusHolder[i].getStatus();
            //         }
            //     }
            // });
        };
    }();

    var moneyFlow = new function() {
        var _mrDrawer;
        var _flDrawer;
		var pie2D;

        function _getData() {
            getScript('http://vip.stock.finance.sina.com.cn/quotes_service/api/jsonp.php/var moneyFlowData=/MoneyFlow.ssi_ssfx_flzjtj?daima=' + papercode + '&gettime=1', _gotData);
        }

        function _gotData() {
            _drawMR();
            _drawFL();
        }

        function _drawMR() {
            var data = moneyFlowData;
            var cvs = data.curr_capital * data.trade * 10000;
            var total = data.r0 - -data.r1 - -data.r2 - -data.r3;
            var _data = {};
            _data.mainIn = doNaN(data.r0_in - -data.r1_in);
            _data.mainInP = doNaN(_data.mainIn / total * 100);
            _data.mainOut = doNaN(data.r0_out - -data.r1_out);
            _data.mainOutP = doNaN(_data.mainOut / total * 100);
            _data.retailIn = doNaN(data.r3_in - -data.r2_in);
            _data.retailInP = doNaN(_data.retailIn / total * 100);
            _data.retailOut = doNaN(data.r3_out - -data.r2_out);
            _data.retailOutP = doNaN(_data.retailOut / total * 100);

            _mrDrawer.draw(_data);

			var distance = h5Status==1?5:15;
            var xmldata = '<chart smartLabelClearance="'+distance+'" slicingDistance="'+distance+'" showAboutMenuItem="0" showValues="0" chartLeftMargin="-10"  baseFontSize="13" paletteColors="BD1C00,638E00,FF8600,A5DB00" bgColor="FFFFFF" showShadow="0" showBorder="0" radius3D="100" pieRadius="70"><set label="主力买入" value="@mainIn@" toolText="主力买入：@mainInS@(@mainInP@)" /><set label="主力卖出" value="@mainOut@" toolText="主力卖出：@mainOutS@(@mainOutP@)" /><set label="散户买入" value="@retailIn@" toolText="散户买入：@retailInS@(@retailInP@)" /><set label="散户卖出" value="@retailOut@" toolText="散户卖出：@retailOutS@(@retailOutP@)" /></chart>';
            xmldata = xmldata.replace('@mainIn@', (data.r0_in - -data.r1_in) || 0)
                .replace('@mainInS@', dataFormat(_data.mainIn, {
                    digit: 2,
                    shift: -4,
                    p: '$1万元'
                }))
                .replace('@mainInP@', dataFormat(_data.mainInP, {
                    digit: 2,
                    p: '$1%'
                }))
                .replace('@mainOut@', (data.r0_out - -data.r1_out) || 0)
                .replace('@mainOutS@', dataFormat(_data.mainOut, {
                    digit: 2,
                    shift: -4,
                    p: '$1万元'
                }))
                .replace('@mainOutP@', dataFormat(_data.mainOutP, {
                    digit: 2,
                    p: '$1%'
                }))
                .replace('@retailIn@', (data.r3_in - -data.r2_in) || 0)
                .replace('@retailInS@', dataFormat(_data.retailIn, {
                    digit: 2,
                    shift: -4,
                    p: '$1万元'
                }))
                .replace('@retailInP@', dataFormat(_data.retailInP, {
                    digit: 2,
                    p: '$1%'
                }))
                .replace('@retailOut@', (data.r3_out - -data.r2_out) || 0)
                .replace('@retailOutS@', dataFormat(_data.retailOut, {
                    digit: 2,
                    shift: -4,
                    p: '$1万元'
                }))
                .replace('@retailOutP@', dataFormat(_data.retailOutP, {
                    digit: 2,
                    p: '$1%'
                }));
			
			if(!pie2D)pie2D=h5Status==1?new FusionCharts('Pie2D','chartid01','390','218','0','1'):
				new FusionCharts("http://i0.sinaimg.cn/dy/fusioncharts/v3_2_2/o_swf/Pie2D.swf","chartid01","390","218","0","1");
			
            pie2D.setTransparent(true);
            pie2D.setXMLData(xmldata);
            setTimeout(function() {
                pie2D.render('chartdiv');
            }, 2 * 1000);
        }

        function _drawFL() {
            var data = moneyFlowData;
            var cvs = data.curr_capital * data.trade * 10000;
            var total = data.r0 - -data.r1 - -data.r2 - -data.r3;
            var _data = {};
            _data.r3_r_in = doNaN(data.r3_in - data.r3_out);
            _data.r2_r_in = doNaN(data.r2_in - data.r2_out);
            _data.r1_r_in = doNaN(data.r1_in - data.r1_out);
            _data.r0_r_in = doNaN(data.r0_in - data.r0_out);

            _data.r3_p_svs = doNaN(data.r3 / cvs * 100);
            _data.r2_p_svs = doNaN(data.r2 / cvs * 100);
            _data.r1_p_svs = doNaN(data.r1 / cvs * 100);
            _data.r0_p_svs = doNaN(data.r0 / cvs * 100);

            _data.r3_p_turnover = doNaN(data.r3 / total * 100);
            _data.r2_p_turnover = doNaN(data.r2 / total * 100);
            _data.r1_p_turnover = doNaN(data.r1 / total * 100);
            _data.r0_p_turnover = doNaN(data.r0 / total * 100);

            _flDrawer.draw(_data);

            var _max = Math.max(Math.abs(_data.r3_r_in), Math.abs(_data.r2_r_in), Math.abs(_data.r1_r_in), Math.abs(_data.r0_r_in), 1);
            var _flowMap = $('#flowMap');
            var _bar;
            for (var i = 0; i <= 3; i++) {
                _bar = _flowMap.find('.flow_R_map_bar_' + i)[0];
                _bar.className = 'flow_R_map_bar_' + i + ' ' + checkUD(undefined, _data['r' + (3 - i) + '_r_in']);
                _bar.style.height = (85 * Math.abs(_data['r' + (3 - i) + '_r_in']) / _max || 0) + 'px';
            }
        }
        this.init = function() {
            var _cfgNum = {
                digit: 2,
                shift: -4
            };
            var _cfgP = {
                digit: 2,
                p: '$1%'
            };
            var _cfgMR = {};
            _cfgMR.mainIn = _cfgMR.mainOut = _cfgMR.retailIn = _cfgMR.retailOut = _cfgNum;
            _cfgMR.mainInP = _cfgMR.mainOutP = _cfgMR.retailInP = _cfgMR.retailOutP = _cfgP;

            var _cfgFL = {};
            _cfgFL.r3_r_in = _cfgFL.r2_r_in = _cfgFL.r1_r_in = _cfgFL.r0_r_in = _cfgNum;
            _cfgFL.r3_p_svs = _cfgFL.r2_p_svs = _cfgFL.r1_p_svs = _cfgFL.r0_p_svs = _cfgP;
            _cfgFL.r3_p_turnover = _cfgFL.r2_p_turnover = _cfgFL.r1_p_turnover = _cfgFL.r0_p_turnover = _cfgP;

            _mrDrawer = new DataDrawer('MRFlow', _cfgMR);
            _flDrawer = new DataDrawer('FLFlow', _cfgFL);
            _getData();
            setInterval(_getData, 60 * 2 * 1000);
        };
    }();

    var mgzb = new function() {
        this.init = function() {
            new VSelect('select_mgzb');
            $('#select_mgzb').change(drawAjaxCont.bindArg('select_mgzb', 'cont_mgzb')).change(new drawFusion('select_mgzb', 'rank_chart_l', 'tabs_rank_chart_l', 'rankSummary_l', '6A6DA9', 'A3CF62')).change();
        };
    }();

    var cwbl = new function() {
        this.init = function() {
            new VSelect('select_cwbl');
            $('#select_cwbl').change(drawAjaxCont.bindArg('select_cwbl', 'cont_cwbl')).change(new drawFusion('select_cwbl', 'rank_chart_r', 'tabs_rank_chart_r', 'rankSummary_r', 'AA2116', '2A5CAA')).change();
        };
    }();

    function drawAjaxCont(selectID, contID) {
        var _value = $('#' + selectID).val();
        new Ajax('http://finance.sina.com.cn/realstock/company/' + papercode + '/iframe/' + _value + '.html', {
            onComplete: function(html) {
                $('#' + contID).html(html);
            }
        }).request();
    }

    function drawFusion(selectID, contID, tabsID, summaryID, color1, color2) {
        var _value, _contID = contID,
            _summaryID = summaryID;
        var _color1 = color1,
            _color2 = color2;
        var _type = 'xl';

        function _getData() {
            var _select = $id(selectID);
            var _value = $(_select).val();
            var _txt = $(_select).find('option')[_select.selectedIndex].innerHTML;
            getScript('http://stock.finance.sina.com.cn/stock/api/jsonp.php/var rankData_' + contID + '=/StockService.getRankBySymbol?symbol=' + papercode + '&sort=' + _value + '&type=' + _type, function() {
                var _data = window['rankData_' + contID];
                if(!_data || !_data.data) return;
                var _id = ('fusion' + Math.random()).replace('.', '');
                var _color = [],
                    _sets = [];
                var _max = 0;
                for (var i = 0; i < _data.data.length; i++) {
                    if (_data.data[i].full_symbol != papercode) {
                        _color.push(_color1);
                    } else {
                        _color.push(_color2);
                    }
                    if (_data.data[i].value > _max) {
                        _max = _data.data[i].value * 1;
                    }
                    _sets.push('<set label="' + _data.data[i].name + '" value="' + _data.data[i].value + '" link="n-' + pageURL.replace('$symbol', _data.data[i].full_symbol) + '"/>');
                }
                _max = _max * 1.1;
                var myChart = h5Status==1?new FusionCharts("Column2D", _id, "380", "240", "0", "1"):
					new FusionCharts("http://i3.sinaimg.cn/dy/fusioncharts/v3_2_2/o_swf/Column2D.swf", _id, "380", "240", "0", "1");
                var xmldata = '<chart showBorder="0" baseFontSize="12" canvasLeftMargin="50" showAboutMenuItem="0" showValues="0" outCnvBaseFontColor="000000" baseFontColor="FF0000" canvasBorderColor="CCCCCC" canvasBorderThickness="1" labelDisplay="ROTATE" slantLabels="1" paletteColors="' + _color.join(',' + _color1 + ',') + '" bgColor="FFFFFF">' + _sets.join('<set label="" value=""/>') + '</chart>';
                myChart.setXMLData(xmldata);
                myChart.render(_contID);

                $('#' + summaryID).html('<span style="float:right;" class="blue_l">' + _data.base.date + '</span>' + stockname + ' <span class="up">' + _txt + '</span> 行业排名为 <span class="up">第' + _data.base.pos + '(' + _data.base.total + '家)</span>');
            });
        }

        $('#' + tabsID).find('.tab').click(function() {
            _type = $(this).attr('type');
            $(this).parent().find('.tab').removeClass('on');
            $(this).addClass('on');
            _getData();
        });
        return _getData;
    }

    var breakingNewsCtrl = new function() {
        var _timer;
        var _hovering = false;

        function _get() {
            getScript('http://finance.sina.com.cn/js/stock/breakingnews.js?rn' + random(), _got);
        }

        function _got() {
            if (_hovering) {
                setTimeout(arguments.callee, 1000);
                return;
            }
            var _container = $('#breakingNews');
            _container.fadeOut(function() {
                clearInterval(_timer);
                _container.empty();
                var _a, _span;
                for (var i = 0; i < breaking_news.length; i++) {
                    _a = $('<a>').attr('target', '_blank').attr('href', breaking_news[i].url).html(breaking_news[i].title).appendTo(_container);
                    _span = $('<span>').html('(' + breaking_news[i].date.replace(/^\d{4}\-/, '') + ' ' + breaking_news[i].time + ')').appendTo(_container);
                }
                _container.show();
                _start();
            });
        }

        function _start() {
            var _container = document.getElementById('breakingNews');
            var _width = $('#breakingNews *:first').width();
            var _left = 430;
            _container.style.left = _left + 'px';
            _timer = setInterval(function() {
                if (_hovering) {
                    return;
                }
                _left -= 2;
                if (_left + _width < 0) {
                    _container.style.left = '0px';
                    $('#breakingNews *:first').appendTo('#breakingNews');
                    _left += _width;
                    _width = $('#breakingNews *:first').width();
                }
                _container.style.left = _left + 'px';
            }, 30);
        }
        this.init = function() {
            _get();
            setInterval(_get, 60 * 2 * 1000);
            $('#breakingNews').mouseenter(function() {
                _hovering = true;
            }).mouseleave(function() {
                _hovering = false;
            });
        };
    }();

    var stockNews = new function() {
        var papercode;

        function _getData() {
            getScript('http://news.sinajs.cn/rn=$rn&maxcnt=20&scnt=20&list=$papercode,gg_$papercode,ntc_$papercode,blog_$papercode,tg_$papercode,lcs_$papercode'.replace('$rn', random()).replace(/\$papercode/g, papercode), _gotData);
        }
        /*截取时间*/

        function _sub_time() {

            $('#stockNews ul li span').each(function(index) {
                var str = $(this).html();
                str = str.substr(0, 6) + ')';
                $(this).html(str);

            });

        }

        function _gotData() {
            if (!finance_news.length) {
                return;
            }
            var _container = $('#stockNews').empty();
            var _ul, _li, _a, _pdf, _span;
            var _single;
            var _max;
            for (var i = 0; i < finance_news.length && i < 12; i++) {
                _single = finance_news[i];
                if (i % 6 == 0) {
                    _ul = $('<ul>').appendTo(_container);
                }
                _li = $('<li>').appendTo(_ul);
                _span = $('<span>').html('(' + _single[0].replace(/(^\d*?\-)|(\:\d*?$)/g, '') + ')').appendTo(_li);
                if (/^ntc_/.test(_single[4])) {
                    _li.append('[<a class="a_blue_d_all" target="_blank" href="http://vip.stock.finance.sina.com.cn/corp/view/vCB_AllMemordDetail.php?stockid=' + papercode.replace(/[^0-9]/g, '') + '">地雷</a>] ');
                } else if (/^gg_/.test(_single[4])) {
                    _li.append('[<a class="a_blue_d_all" target="_blank" href="http://vip.stock.finance.sina.com.cn/corp/go.php/vCB_AllBulletin/stockid/' + papercode.replace(/[^0-9]/g, '') + '.phtml">公告</a>] ');
                } else if (/^blog_/.test(_single[4])) {
                    _li.append('[<a class="a_blue_d_all" target="_blank" href="http://blog.sina.com.cn/lm/stock/">博客</a>] ');
                } else if (/^tg_/.test(_single[4])) {
                    _li.append('[<a class="a_blue_d_all" target="_blank" href="http://finance.sina.com.cn/stock/2013tougu/">投顾大赛</a>] ');
                } else if (/^lcs_/.test(_single[4])) {
                    _li.append('[<a class="a_blue_d_all" target="_blank" href="http://licaishi.sina.com.cn/">理财师</a>] ');
                } else {
                    _li.append('[<a class="a_blue_d_all" target="_blank" href="http://vip.stock.finance.sina.com.cn/corp/go.php/vCB_AllNewsStock/symbol/' + papercode + '.phtml">资讯</a>] ');
                }

                if (_single[5] != 'NOPDF') {
                    _max = 27;
                } else if (/^lcs_/.test(_single[4])) {
                    _max = 26;
                } else {
                    _max = 28;
                }
                _a = $('<a>').attr('target', '_blank').attr('href', _single[3] + (/blog/.test(_single[4]) ? '?tj=1' : '') + (/licaishi/.test(_single[3]) ? '&fr=f_stock_cn' : '')).attr('title', _single[2]).html(_single[2].length > _max ? _single[2].substring(0, _max - 1) + '..' : _single[2]).appendTo(_li);

                if (/^lcs_/.test(_single[4])) {
                    $('<a>').addClass('lcs_logo').attr('target', '_blank').attr('href', 'http://licaishi.sina.com.cn/web/searchList?s=' + stockname + '&fr=f_stock_cn').appendTo(_li);
                } else if (_single[5] != 'NOPDF') {
                    _pdf = $('<a>').addClass('pdf').attr('target', '_blank').attr('href', _single[5]).appendTo(_li);
                }
                if (i == 5) {
                    _container.append('<div class="dotted_line"></div>');
                }
            }
            _sub_time();

        }
        this.init = function() {
            papercode = window.papercode;
            if (window.papercode == b_code && a_code) {
                papercode = a_code;
            }
            _getData();
            setInterval(_getData, 60 * 2 * 1000);
        };
    }();

    var stockTip = new function() {
        var stockname, fullsymbol;

        function _getPrefer() {
            getScript('http://finance.sina.com.cn/js/286/20140416/qs/161.js', _gotPrefer);
        }

        function _gotPrefer() {
            var _container = $('#stockTip').empty();

            /*if(president.indexOf(fullsymbol) != -1)
             {
             $('<a>').attr('target','_blank').css('color','#ff0000').attr('href','http://finance.sina.com.cn/focus/ssgsdmpx/').html('为'+stockname+'评选2013最佳上市公司董秘').appendTo(_container);
             }
             else*/
            if (company.indexOf(fullsymbol) != -1) {
                $('<a>').attr('target', '_blank').css('color', '#ff0000').attr('href', 'http://finance.sina.com.cn/focus/2014ssgspx.html').html('海选你心中最佳上市公司：我要为' + stockname + '投票').appendTo(_container);
            } else {
                _getData();
            }
        }

        function _getData() {
            getScript('http://finance.sina.com.cn/api/437/2013/1018/json/breaknews_152.js', _gotData);
        }

        function _gotData() {
            var _container = $('#stockTip').empty();
            var _single;
            _single = stock_tip;
            $('<a>').attr('target', '_blank').attr('href', _single.url).html(_single.title.replace('###', stockname)).appendTo(_container);
        }

        function _getSpecial() {
            var _container = $('#stockTip').empty();
            $('<a>').attr('target', '_blank').attr('href', 'http://finance.sina.com.cn/focus/15qgcgcgds/rank.html?f=gszx').html('<span style="color:#ff0000;padding-left:28px;display:inline-block;background:url(http://n.sinaimg.cn/finance/zt/15qgcgcgds/images/hot.png) no-repeat 0 5px;">高手重仓银禧科技即获拉升，收益翻番蝉联榜首</span>').appendTo(_container);
        }
        this.init = function() {
            stockname = window.stockname;
            fullsymbol = window.papercode;
            //_getData();
            try {
                //_getSpecial();
            } catch (e) {}
        };
    }();
    var hoverShow = new function() {
        function _show() {
            if (this.className.indexOf('finance_overview_on') > -1) {
                return;
            }
            var _this = $(this);
            var _tds = _this.find('tr').eq(0).find('td');
            _this.addClass('finance_overview_on');
            _this.stop().animate({
                width: 120 + 66 * _tds.length
            }).css('overflow', '').find('.close').show();
        }

        function _hide() {
            var _this = $(this);
            _this.stop().animate({
                width: 185
            }, {
                complete: function() {
                    _this.removeClass('finance_overview_on').find('.close').hide();
                }
            }).css('overflow', '');
        }

        function _ltgd_show() {
            if (this.className.indexOf('ltgd_on') > -1) {
                return;
            }
            var _this = $(this);
            _this.addClass('ltgd_on');
            _this.stop().animate({
                width: 485
            }).css('overflow', '').find('.close').show();
        }

        function _ltgd_hide() {
            var _this = $(this);
            _this.stop().animate({
                width: 185
            }, {
                complete: function() {
                    _this.removeClass('ltgd_on').find('.close').hide();
                }
            }).css('overflow', '');
        }
        this.init = function() {
            var _finance_overview = $id('finance_overview');
            $(_finance_overview).mouseenter(_show).find('.close').click(function() {
                $(this).hide().parent().css('width', '').removeClass('finance_overview_on');
            });
            $(_finance_overview).find('.open').click(_show.fnBind(_finance_overview));

            var _ltgd = $id('ltgd');
            $(_ltgd).mouseenter(_ltgd_show).find('.close').click(function() {
                $(this).hide().parent().css('width', '').removeClass('ltgd_on');
            });
            $(_ltgd).find('.open').click(_ltgd_show.fnBind(_ltgd));
        };
    }();

    var weibo = new function() {
        var _weiboSubmit, _submitNew, _weibo_new_txt, _weiboNewTxtrem, _weiboMore;
        var _pageIndex = 1;
        var _getting = false;
        /*正在编辑转发评论的微博id，同时也用来判断是否在显示编辑框*/
        var _rc_mid;
        /*验证内容长度*/

        function _keypress(argID) {
            var _value = this.value;
            var _length = _value.replace(/[^\x00-\xff]/g, '**').length;
            var _less = 280 - _length;
            _less = _less / 2;
            if (_less >= 0) {
                $('#' + argID).html('还可以输入<span>' + Math.floor(_less) + '</span>字').removeClass('weibo_new_over');
            } else {
                $('#' + argID).html('已经超过<span>' + Math.ceil(-_less) + '</span>字').addClass('weibo_new_over');
            }
            /*动过输入内容的话就不自动发布了*/
            _loginOKCall = null;
        }
        /*输入有问题的提示*/

        function _error(g, f) {
            g = document.getElementById(g || 'pub_editor');
            if (!f) {
                f = {}
            }
            var d = f.orbit || ["#fee", "#fdd", "#fcc", "#fdd", "#fee", "#fff"];
            var i = f.times || 2;
            var c = f.delay || 15;
            var b = 0;
            var h = setInterval(function() {
                if (b / c >= d.length) {
                    i -= 1;
                    if (i > 0) {
                        b = 0
                    } else {
                        clearInterval(h);
                        return false
                    }
                }
                g.style.backgroundColor = d[b / c];
                b += 1;
            }, 1);
            return false;
        }
        /*显示转发框*/

        function _repost(mid) {
            /*先把之前的框删掉，如果当前是显示状态，指定也是删，不显示了，或者会换个新微博下面去*/
            var _commentDiv = $('#commentDiv');
            var _showingComment = _commentDiv.length;
            $('#commentDiv').remove();
            $('#repostDiv').remove();
            /*不是当前的微博的话加个新的*/
            if (_rc_mid !== mid || _showingComment) {
                _rc_mid = mid;
                $(this).parents('.weibo_s').append('<div id="repostDiv" class="feedback fwrd"><div class="arrcon"><div class="arr"></div><div class="arrin"></div></div> <div class="feedbackcon"> <div class="txtarea"><textarea id="fc_editor" style="color: rgb(153, 153, 153); "></textarea> <div class="tips" id="fc_tips" style="display: none; "></div> </div> <div class="fdbckspe"> <a id="fc_submit" class="btn_s" href="javascript:void(0)">转发</a> <p id="fc_limit" class="txtrem">140</p> <div class="fdbckspein"> <input type="checkbox" id="fc_issync"> <label for="fc_issync">同时评论</label> </div> </div> </div></div>');
                var _editor = $('#fc_editor').keyup(_keypress.bindArg('fc_limit')).keydown(_keypress.bindArg('fc_limit')).keyup()[0];
                _editor.onfocus = function() {
                    this.style.color = '';
                };
                _editor.onblur = function() {
                    this.style.color = '#9E9E9E';
                };
                $('#fc_submit').click(_repostSubmit);
            }
            /*是的话为隐藏操作，清掉mid*/
            else {
                _rc_mid = '';
            }
        }

        function _repostSubmit() {
            /*先更新下剩余字数*/
            _keypress.call(document.getElementById('fc_editor'), 'fc_limit');
            /*没登陆的话登录*/
            if (!weiboLoginManager.userInfo()) {
                _loginOKCall = arguments.callee;
                weiboLoginManager.login();
                return false;
            }
            var _words = $('#fc_editor').val();
            if (_words.replace(/[^\x00-\xff]/g, '**').length > 280) {
                _error('fc_editor');
                return;
            }
            if (!_words) {
                _error('fc_editor');
                return;
            }
            WB2.anyWhere(function(W) {
                W.parseCMD("/statuses/repost.json", function(sResult, bStatus) {
                    if (bStatus == true) {
                        $('#fc_tips').html('<div class="tips" id="pub_error"><em class="icon_ok"></em>转发成功！</div>').show();
                        setTimeout(function() {
                            $('#repostDiv').slideUp(function() {
                                $('#repostDiv').remove();
                                _rc_mid = '';
                            });
                        }, 2000);
                    } else {
                        $('#fc_tips').html('<div class="tips" id="pub_error"><em class="icon_warning"></em>转发失败，请稍后再试！</div>').show();
                        setTimeout(function() {
                            $('#fc_tips').empty().hide();
                        }, 2000);
                    }
                }, {
                    source: wbAppKey,
                    id: _rc_mid,
                    status: encodeURIComponent(_words),
                    is_comment: document.getElementById('fc_issync').checked ? '1' : '0'
                }, {
                    method: 'post'
                });
            });
            return false;
        }

        function _comment(mid) {
            /*先把之前的框删掉，如果当前是显示状态，指定也是删，不显示了，或者会换个新微博下面去*/
            $('#commentDiv').remove();
            var _repostDiv = $('#repostDiv');
            var _showingRepost = _repostDiv.length;
            _repostDiv.remove();
            /*不是当前的微博的话加个新的*/
            if (_rc_mid !== mid || _showingRepost) {
                _rc_mid = mid;
                $(this).parents('.weibo_s').append('<div id="commentDiv" class="feedback comm"><div class="arrcon"><div class="arr"></div><div class="arrin"></div></div> <div class="feedbackcon"> <div class="txtarea"><textarea id="fc_editor" style="color: rgb(153, 153, 153); "></textarea> <div class="tips" id="fc_tips" style="display: none; "></div> </div> <div class="fdbckspe"> <a id="fc_submit" class="btn_s" href="javascript:void(0)">评论</a> <p id="fc_limit" class="txtrem">140</p> <div class="fdbckspein"> <input type="checkbox" id="fc_issync"> <label for="fc_issync">同时转发</label> </div> </div> </div></div>');
                var _editor = $('#fc_editor').keyup(_keypress.bindArg('fc_limit')).keydown(_keypress.bindArg('fc_limit')).keyup()[0];
                _editor.onfocus = function() {
                    this.style.color = '';
                };
                _editor.onblur = function() {
                    this.style.color = '#9E9E9E';
                };
                $('#fc_submit').click(_commentSubmit);
            }
            /*是的话为隐藏操作，清掉mid*/
            else {
                _rc_mid = '';
            }

        }

        function _commentSubmit() {
            /*先更新下剩余字数*/
            _keypress.call(document.getElementById('fc_editor'), 'fc_limit');
            /*没登陆的话登录*/
            if (!weiboLoginManager.userInfo()) {
                _loginOKCall = arguments.callee;
                weiboLoginManager.login();
                return false;
            }
            var _words = $('#fc_editor').val();
            if (_words.replace(/[^\x00-\xff]/g, '**').length > 280) {
                _error('fc_editor');
                return;
            }
            if (!_words) {
                _error('fc_editor');
                return;
            }
            WB2.anyWhere(function(W) {
                var _method, _data = {};
                if (document.getElementById('fc_issync').checked) {
                    _method = '/statuses/repost.json';
                    _data = {
                        source: wbAppKey,
                        id: _rc_mid,
                        status: encodeURIComponent(_words),
                        is_comment: '1'
                    };
                } else {
                    _method = '/comments/create.json';
                    _data = {
                        source: wbAppKey,
                        id: _rc_mid,
                        comment: encodeURIComponent(_words)
                    };
                }
                W.parseCMD(_method, function(sResult, bStatus) {
                    if (bStatus == true) {
                        $('#fc_tips').html('<div class="tips" id="pub_error"><em class="icon_ok"></em>评论成功！</div>').show();
                        setTimeout(function() {
                            $('#commentDiv').slideUp(function() {
                                $('#commentDiv').remove();
                                _rc_mid = '';
                            });
                        }, 2000);
                    } else {
                        $('#fc_tips').html('<div class="tips" id="pub_error"><em class="icon_warning"></em>评论失败，请稍后再试！</div>').show();
                        setTimeout(function() {
                            $('#fc_tips').empty().hide();
                        }, 2000);
                    }
                }, _data, {
                    method: 'post'
                });
            });
            return false;
        }

        function _initJP() {
            _getData = _getJP;
            _getData();
        }

        function _getJP() {
            if (_getting) {
                return false;
            }
            getScript('http://topic.t.sina.com.cn/api/api.php?s=api&a=get_weibo_by_zhuanti&zid=683&cid=2247&format=json&page=' + _pageIndex + '&page_size=25&callback=gotWeiboData', _gotJP);
            _pageIndex++;
            _getting = true;
            _weiboMore.html('加载中...');
            return false;
        }

        function _gotJP() {
            var _container = $('#weiboList');
            var _datas = window['weiboData'].result.data || [];
            for (var i = 0; i < _datas.length; i++) {
                _container.append(_createSingle(_datas[i], 'JP'));
            }
            $('#weiboList').append(_weiboMore);
            _weiboMore.html('更多..');
            _getting = false;
        }

        function _initWHT() {
            _getData = _getWHT;
            _getData();
        }

        function _getWHT() {
            if (_getting) {
                return false;
            }
            getScript('http://stock.finance.sina.com.cn/weibo/api/2/search/statuses.php?callback=gotWeiboData&page=' + _pageIndex + '&count=25&q=' + encodeURIComponent(stockname), _gotWHT);
            _pageIndex++;
            _getting = true;
            _weiboMore.html('加载中...');
            return false;
        }

        function _getData() {

        }

        function _gotWHT() {
            var _container = $('#weiboList');
            var _datas = window['weiboData'].statuses || [];
            for (var i = 0; i < _datas.length; i++) {
                _container.append(_createSingle(_datas[i], 'WHT'));
            }

            $('#weiboList').append(_weiboMore);
            _weiboMore.html('更多..');
            _getting = false;
        }

        function _regTime(argT) {
            var _postTime = new Date(argT);
            var _now = clock.time();
            var _differ = Math.round((_now - _postTime) / 1000);
            var _showTime;
            if (_differ <= 0) {
                _differ = 1;
            }
            if (_differ < 60) {
                _showTime = _differ + '秒前';
            } else if (_differ < 3600) {
                _showTime = Math.floor(_differ / 60) + '分钟前';
            } else if (_now.getDate() == _postTime.getDate()) {
                _showTime = '今天 ' + _postTime.getHours().preFull() + ':' + _postTime.getMinutes().preFull();
            } else {
                _showTime = (_postTime.getMonth() + 1).preFull() + '月' + _postTime.getDate().preFull() + '日 ' + _postTime.getHours().preFull() + ':' + _postTime.getMinutes().preFull();
            }
            return _showTime;
        }

        function _createSingle(argData, type) {
            if (type == 'JP') {
                argData.created_at = argData.created_at * 1000;
                argData.base62_id = argData.mid;
                argData.mid = argData.v_id;
            } else {
                argData.created_at = argData.created_at.replace('+', /ie/i.test(navigator.userAgent) ? 'UTC +' : '+');
            }
            var _weibo_s = $C('div');
            _weibo_s.className = 'weibo_s';

            var _weibo_head = $C('div');
            _weibo_head.className = 'weibo_head';
            _weibo_s.appendChild(_weibo_head);

            var _a1 = $C('a');
            _a1.href = 'http://weibo.com/' + argData.user.profile_url;
            _a1.target = '_blank';
            _a1.title = argData.user.screen_name;
            _weibo_head.appendChild(_a1);
            var _headPic = $C('img');
            _headPic.height = '30';
            _headPic.width = '30';
            _headPic.src = argData.user.profile_image_url.replace('/50/', '/30/');
            _a1.appendChild(_headPic);

            var _weibo_cont = $C('div');
            _weibo_cont.className = 'weibo_cont';
            _weibo_s.appendChild(_weibo_cont);
            var _p1 = $C('p');
            _weibo_cont.appendChild(_p1);
            var _a2 = $C('a');
            _a2.href = 'http://weibo.com/' + argData.user.profile_url;
            _a2.target = '_blank';
            _a2.title = argData.user.screen_name;
            _a2.innerHTML = argData.user.screen_name;
            _p1.appendChild(_a2);
            if (argData.user.verified) {
                var _vip = $C('img');
                _vip.title = argData.user.verified_reason;
                _vip.src = 'http://www.sinaimg.cn/cj/realstock/2012/images/transparent.gif';
                if (argData.user.verified_type != '0') {
                    _vip.className = 'vip_c';
                } else {
                    _vip.className = 'vip';
                }
                _a2.appendChild(_vip);
            }
            var _tt = argData.text;
            _tt = _tt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            _tt = _tt.replace(/@([0-9a-zA-Z\u4e00-\u9fa5_-]+)/g, function($1, $2) {
                return '<a target="_blank" href="http://weibo.com/n/' + $2 + '">@' + $2 + '</a>';
            }).replace(/#(.*?)#/g, function($1, $2) {
                return '<a target="_blank" href="http://s.weibo.com/weibo/' + $2 + '">#' + $2 + '#</a>';
            }).replace(/http\:\/\/t.cn\/[a-zA-Z0-9]+/g, function($1) {
                return '<a target="_blank" href="' + $1 + '">' + $1 + '</a>';
            });
            var _txt = $C('span');
            _txt.innerHTML = '：' + _tt;
            _p1.appendChild(_txt);

            if (argData.thumbnail_pic) {
                var _pic = $C('div');
                _pic.className = 'weibo_img';
                _p1.appendChild(_pic);
                if (argData.original_pic) {
                    var _a3 = $C('a');
                    _a3.href = argData.original_pic;
                    _a3.target = '_blank';
                    _pic.appendChild(_a3);
                }
                var _thumb = $C('img');
                _thumb.src = argData.thumbnail_pic;
                if (argData.original_pic) {
                    _a3.appendChild(_thumb);
                } else {
                    _pic.appendChild(_thumb);
                }
            }

            var _weibo_info = $C('div');
            _weibo_info.className = 'weibo_info';
            _weibo_cont.appendChild(_weibo_info);
            var _time = $C('a');
            _time.className = 'weibo_time';
            _time.target = '_blank';
            _time.href = 'http://weibo.com/' + argData.user.id + '/' + argData.base62_id;
            _time.innerHTML = _regTime(argData.created_at);
            _weibo_info.appendChild(_time);
            var _span = $C('span');
            _weibo_info.appendChild(_span);
            var _rp = $C('a');
            _rp.href = 'javascript:void(0)';
            _rp.innerHTML = '转发';
            _rp.onclick = _repost.bindArg(argData.mid);
            _span.appendChild(_rp);
            var _t1 = document.createTextNode(' ');
            _span.appendChild(_t1);
            var _i = $C('i');
            _i.innerHTML = '|';
            _span.appendChild(_i);
            var _t2 = document.createTextNode(' ');
            _span.appendChild(_t2);
            var _cmt = $C('a');
            _cmt.href = 'javascript:void(0)';
            _cmt.innerHTML = '评论';
            _cmt.onclick = _comment.bindArg(argData.mid);
            _span.appendChild(_cmt);

            return _weibo_s;
        }

        function _showSubmit() {
            var _txt = _weibo_new_txt.val('#' + stockname + '#').keyup();
            _weiboSubmit.show();
        }

        function _publish() {
            /*没登录的话登录*/
            if (!weiboLoginManager.userInfo()) {
                _loginOKCall = arguments.callee;
                weiboLoginManager.login();
                return false;
            }
            /*验证内容，没问题发布*/
            var _words = _weibo_new_txt.val();
            if (_words.replace(/[^\x00-\xff]/g, '**').length > 280) {
                _error('weibo_new_txt');
                return false;
            }
            if (!_words) {
                _error('weibo_new_txt');
                return false;
            }
            WB2.anyWhere(function(W) {
                W.parseCMD('/statuses/update.json', function(sResult, bStatus) {
                    if (bStatus) {
                        $('#weiboNewEdit').hide();
                        _weibo_new_txt.val('#' + stockname + '#').keyup();
                        $('#weiboNewSuccess').show();
                        $('#weiboNewLink').attr('href', 'http://weibo.com/' + weiboLoginManager.userInfo().id + '/profile');
                        setTimeout(function() {
                            $('#weiboNewSuccess').fadeOut(function() {
                                $('#weiboNewEdit').show();
                            });
                        }, 3 * 1000);
                    } else {
                        var _errorMsg = {
                            '20016': '发布失败，发布内容过于频繁',
                            '20017': '发布失败，刚刚发布了相似的信息',
                            '20018': '发布失败，包含非法网址',
                            '20019': '发布失败，刚刚发布了相同的信息',
                            '20021': '发布失败，包含非法内容',
                            '20111': '发布失败，不能发布相同的微博'
                        };
                        alert(_errorMsg[sResult.error_code] || '发布失败');
                    }
                }, {
                    source: wbAppKey,
                    status: encodeURIComponent(_words)
                }, {
                    method: 'post'
                });
            });
        }
        var _loginOKCall;
        this.init = function() {
            window.gotWeiboData = function(argData) {
                window.weiboData = argData;
            };
            _weiboSubmit = $('#weiboSubmit');
            _submitNew = $('#weiboNew');
            _weibo_new_txt = $('#weibo_new_txt');
            _weiboNewTxtrem = $('#weiboNewTxtrem');
            _weiboMore = $('#weiboMore');

            //            _initJP();
            _initWHT();
            _weiboMore.click(_getData);
            /*发布框键盘事件*/
            _weibo_new_txt.keyup(_keypress.bindArg('weiboNewTxtrem')).keydown(_keypress.bindArg('weiboNewTxtrem')).keyup(function(ev) {
                ev = ev || window.event;
                if (ev.ctrlKey && ev.keyCode == 13) {
                    _publish();
                }
            });
            $('#weiboNewPublish').click(_publish);
            /*切换发布框显示*/
            $('#weiboNew,#weiboLoginOpener').click(function() {
                if (_weiboSubmit.css('display') != 'none') {
                    if (this.id == 'weiboLoginOpener') {
                        weiboLoginManager.login();
                        return false;
                    }
                    _submitNew.html('我要发言..');
                    _weiboSubmit.hide();
                    return false;
                }
                if (weiboLoginManager.userInfo()) {
                    _showSubmit();
                    _submitNew.html('收起');
                } else {
                    weiboLoginManager.login();
                    _loginOKCall = arguments.callee;
                }
                return false;
            });
            $('#weiboLogoutBtn').click(function() {
                weiboLoginManager.logout();
            });
            //            LoginManager.add(
            //            {
            //                logoutBtn: 'weiboLogoutBtn'
            //            });

            weiboLoginManager.add({
                onLoginSuccess: function() {
                    var _userInfo = weiboLoginManager.userInfo();
                    $('#weiboLogined').show();
                    $('#weiboNotLogin').hide();
                    $('#weiboNick,#weiboNick2').html(_userInfo.screen_name);
                    if (_loginOKCall) {
                        _loginOKCall();
                        _loginOKCall = null;
                    }
                },
                onLogoutSuccess: function() {
                    $('#weiboLogined').hide();
                    $('#weiboNotLogin').show();
                    $('#weiboNick2').html('您尚未登录，发言提交后将进入登录界面');
                }
            });

        };
    }();
    /*加载微博的js SDK等*/

    function initWeiboJS() {
        var _jsNum = 2;

        function _scriptLoaded() {
            _jsNum--;
            if (!_jsNum) {
                weiboLoginManager.init();
                weiboRecommend.init();
                //                weibo.init();
            }
        }
        getScript('http://tjs.sjs.sinajs.cn/open/api/js/wb.js?appkey=' + wbAppKey + '&rn=' + random(), _scriptLoaded, 'utf-8');
        getScript('http://finance.sina.com.cn/basejs/wbfollower.js', _scriptLoaded);

    }
    /*微博登陆状态控制组件*/
    var weiboLoginManager = new function() {
        var _logined = false;
        var _userInfo;
        var _components = [];
        this.userInfo = function() {
            return _userInfo;
        };
        this.add = function(com) {
            _components.push(com);
            if (_userInfo) {
                com.onLoginSuccess(_userInfo);
            }
        };
        this.login = function() {
            WB2.login(_checkStatus);
        };
        this.logout = function() {
            WB2.logout(function() {
                _checkStatus();
            });
        };

        function _checkStatus() {
            var _status = WB2.checkLogin();
            /*登录了，取微博信息，通知各模块登陆成功*/
            if (!_logined && _status) {
                _logined = true;
                WB2.anyWhere(function(W) {
                    W.parseCMD('/account/get_uid.json', function(uid) {
                        W.parseCMD('/users/show.json', function(info) {
                            _userInfo = info;
                            for (var i = 0; i < _components.length; i++) {
                                _components[i].onLoginSuccess(info);
                            }
                        }, {
                            source: wbAppKey,
                            uid: uid.uid
                        }, {
                            method: 'get'
                        });
                    }, {
                        source: wbAppKey
                    }, {
                        method: 'get'
                    });
                });
                return;
            }
            if (_logined && !_status) {
                _logined = false;
                _userInfo = null;
                for (var i = 0; i < _components.length; i++) {
                    _components[i].onLogoutSuccess();
                }
                return;
            }
        }
        this.init = function() {
            WB2.checkLogin();
            //            _checkStatus();
            //            LoginManager.add(
            //            {
            //                onLogoutSuccess: this.logout.fnBind(this)
            //            });
            setInterval(_checkStatus, 100);
        };
    }();
    var weiboRecommend = new function() {
        var _followers = [];
        var _timer;

        function _scrollUp() {
            $('#weiboRecommend .go_down').css('visibility', 'visible');
            clearInterval(_timer);
            var _outer = $('#weiboRecommend .wrs')[0];
            _outer.scrollTop -= 1;
            _timer = setInterval(function() {
                if (_outer.scrollTop % 71) {
                    _outer.scrollTop -= 14;
                } else {
                    clearInterval(_timer);
                    if (_outer.scrollTop == 0) {
                        $('#weiboRecommend .go_up').css('visibility', 'hidden');
                    }
                }
            }, 30);
        }

        function _scrollDown() {
            // $('#weiboRecommend .go_up').css('visibility', 'visible');
            // clearInterval(_timer);
            // var _outer = $('#weiboRecommend .wrs')[0];
            // _outer.scrollTop += 1;
            // _timer = setInterval(function() {
            //     if (_outer.scrollTop % 71) {
            //         _outer.scrollTop += 14;
            //     } else {
            //         clearInterval(_timer);
            //         if (_outer.scrollTop == _outer.scrollHeight - $(_outer).height()) {
            //             $('#weiboRecommend .go_down').css('visibility', 'hidden');
            //         }
            //     }
            // }, 30);

        }

        function _checkStatus() {
            if (weiboLoginManager.userInfo()) {
                for (var i = 0; i < _followers.length; i++) {
                    _followers[i].getStatus();
                }
            } else {
                for (var i = 0; i < _followers.length; i++) {
                    _followers[i].hasNotFollow();
                }
            }
        }

        function _createDom() {
            var _wrs = $('#weiboRecommend .wrs').empty();
            var _wr, _wr_head, _a, _img, _wr_details, _p, _a2, _v, _vr, _p3, _btn;
            var _single;
            for (var i = 0; i < recommendList.length; i++) {
                _single = recommendList[i];
                _wr = $('<div>').addClass('wr');
                _wr.mouseenter(_getWb.bindArg(_single.sso_uid)).mouseleave(_remove);
                _wr_head = $('<div>').addClass('wr_head').appendTo(_wr);
                _a = $('<a>').attr('href', 'http://weibo.com/u/' + _single.sso_uid).attr('target', '_blank').appendTo(_wr_head);
                _img = $('<img>').attr('width', '50').attr('height', '50').attr('src', _single.avatar_url).appendTo(_a);
                _wr_details = $('<div>').addClass('wr_details').appendTo(_wr);
                _p = $('<p>').appendTo(_wr_details);
                _a2 = $('<a>').attr('href', 'http://weibo.com/u/' + _single.sso_uid).attr('target', '_blank').html(_single.nick).appendTo(_p);
                if (_single.verified_type !== '' && _single.verified_reason) {
                    _v = $('<img>').attr('src', 'http://www.sinaimg.cn/cj/realstock/2012/images/transparent.gif').addClass(_single.verified_type == '0' ? 'vip' : 'vip_c').appendTo(_a2);
                }
                _vr = $('<p>').html('&nbsp;').appendTo(_wr_details);
                if (_single.verified_type !== '' && _single.verified_reason) {
                    _vr.html(_single.verified_reason).attr('title', _single.verified_reason);
                } else {
                    _vr.css('height', '10px');
                }
                _p3 = $('<p>').appendTo(_wr_details);
                _btn = $('<a>').attr('href', 'javascript:void(0)').addClass('add_follow').html('加关注').appendTo(_p3);
                _followers.push(new Follower(_btn[0], _single.sso_uid, 'add_follow', 'added_follow', '加关注', '已关注'));
                _wrs.append(_wr);
            }
        }
        var _removeTimer;

        function _remove(immediately) {
            clearTimeout(_removeTimer);

            function _remove() {
                $('#weiboRecommend').find('.wb_review').remove();
            }
            if (immediately === true) {
                _remove();
            } else {
                _removeTimer = setTimeout(_remove, 200);
            }
        }
        var _requestIndex = 0;

        function _getWb(uid) {
            _requestIndex++;
            _remove(true);
            window['gotWb' + uid] = _gotWb.bindArg(_requestIndex, $(this).offset().top + 60);
            getScript('http://api.sina.com.cn/weibo/users/show.json?source=' + wbAppKey + '&user_id=' + uid + '&callback=gotWb' + uid);
        }

        function _gotWb(argRequestIndex, top, data) {
            if (argRequestIndex != _requestIndex) {
                return;
            }
            data = data.result.data;
            var _review = $('<div>').addClass('wb_review a_blue_l_all').appendTo('#weiboRecommend').css('top', top + 'px').mouseenter(function() {
                clearTimeout(_removeTimer);
            }).mouseleave(_remove.bindArg(true));
            $('<div>').addClass('top_arr').appendTo(_review);
            var _cont = $('<div>').addClass('cont').appendTo(_review);
            var _time = $('<a>').attr('target', '_blank').attr('href', 'http://weibo.com/' + data.id + '/' + data.status.mid_base62).html(_regTime(data.status.created_at.replace('+', /ie/i.test(navigator.userAgent) ? 'UTC +' : '+'))).appendTo(_cont);
            _cont.append(' ' + data.status.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/@([0-9a-zA-Z\u4e00-\u9fa5_-]+)/g, function($1, $2) {
                return '<a target="_blank" href="http://weibo.com/n/' + $2 + '">@' + $2 + '</a>';
            }).replace(/#(.*?)#/g, function($1, $2) {
                return '<a target="_blank" href="http://s.weibo.com/weibo/' + $2 + '">#' + $2 + '#</a>';
            }).replace(/http\:\/\/t.cn\/[a-zA-Z0-9]+/g, function($1) {
                return '<a target="_blank" href="' + $1 + '">' + $1 + '</a>';
            }));
        }

        function _init() {
            // var _num = 2;

            // function _listLoaded() {
            //     _num--;
            //     if (!_num) {
            //         recommendList = recommendList.concat(recommendList2);
            //         _createDom();
            //         var _container = $('#weiboRecommend');
            //         if (recommendList.length > 6) {
            //             // _container.find('.go_up').click(_scrollUp);
            //             // _container.find('.go_down').click(_scrollDown);
            //         } else {
            //             _container.find('.go_down').css('visibility', 'hidden');
            //         }
            //         _checkStatus();
            //     }
            // }
            // getScript('http://f2.bar.sina.com.cn/?s=weibo&order=enforce&a=get_weibo_account&callback=var recommendList=&symbol=' + papercode, _listLoaded);
            // getScript('http://f2.bar.sina.com.cn/?s=weibo&order=enforce&a=get_weibo_account&callback=var recommendList2=&symbol=sh000001', _listLoaded);
        }
        // this.init = function() {
        //     _init();

        //     weiboLoginManager.add({
        //         onLoginSuccess: _checkStatus,
        //         onLogoutSuccess: _checkStatus
        //     });
        // }
    }();

    function _regTime(argT) {
        var _postTime = new Date(argT);
        var _now = clock.time();
        var _differ = Math.round((_now - _postTime) / 1000);
        var _showTime;
        if (_differ <= 0) {
            _differ = 1;
        }
        if (_differ < 60) {
            _showTime = _differ + '秒前';
        } else if (_differ < 3600) {
            _showTime = Math.floor(_differ / 60) + '分钟前';
        } else if (_now.getDate() == _postTime.getDate()) {
            _showTime = '今天 ' + _postTime.getHours().preFull() + ':' + _postTime.getMinutes().preFull();
        } else {
            _showTime = (_postTime.getMonth() + 1).preFull() + '月' + _postTime.getDate().preFull() + '日 ' + _postTime.getHours().preFull() + ':' + _postTime.getMinutes().preFull();
        }
        return _showTime;
    }
    var stockAsk = new function() {

        function _getData() {
            // getScript('http://talk.finance.sina.com.cn/api/ajax/get_answer?page=1&order=0&num=20&sid=2&channel=finance&callback=stockAskCallback&json=1', function() {}, 'utf-8');
        }

        function _gotData(data) {
            function _addAsk(argData) {
                var _intanswers = $C('div');
                _intanswers.className = 'intanswers';
                var _MIB_mbloglist = $C('div');
                _MIB_mbloglist.className = 'MIB_mbloglist';
                _intanswers.appendChild(_MIB_mbloglist);


                _MIB_mbloglist.appendChild(_createWB(argData));

                var _intaskpos = $C('div');
                _intaskpos.className = 'intaskpos';
                _intanswers.appendChild(_intaskpos);

                _container.append(_intanswers);
            }

            function _addAnswer(argData) {
                var _intanswers = $C('div');
                _intanswers.className = 'intanswers';
                var _MIB_mbloglist = $C('div');
                _MIB_mbloglist.className = 'MIB_mbloglist';
                _intanswers.appendChild(_MIB_mbloglist);

                for (var i = 0; i < argData.length; i++) {
                    _MIB_mbloglist.appendChild(_createWB(argData[i]));
                }

                var _intanswerpos = $C('div');
                _intanswerpos.className = 'intanswerpos';
                _intanswers.appendChild(_intanswerpos);

                _container.append(_intanswers);
            }

            function _addComment(argData) {
                var _intreview = $C('div');
                _intreview.className = 'intreview';
                var _MIB_mbloglist = $C('div');
                _MIB_mbloglist.className = 'MIB_mbloglist';
                _intreview.appendChild(_MIB_mbloglist);


                _MIB_mbloglist.appendChild(_createWB(argData));

                var _intreviewpos = $C('div');
                _intreviewpos.className = 'intreviewpos';
                _intreview.appendChild(_intreviewpos);

                _container.append(_intreview);
            }

            function _createWB(argData) {
                var _MIB_feed_c = $C('div');
                _MIB_feed_c.className = 'MIB_feed_c';

                var _sms = $C('p');
                _sms.className = 'sms';
                _MIB_feed_c.appendChild(_sms);

                var _name = $C('a');
                _name.target = '_blank';
                _name.title = argData.wb_data.user.screen_name;
                _name.innerHTML = argData.wb_data.user.screen_name;
                _name.href = 'http://weibo.com/' + argData.wb_data.user.profile_url;
                if (argData.wb_data.user.verified_type != '-1') {
                    var _vip = $C('img');
                    _vip.src = 'http://www.sinaimg.cn/cj/realstock/2012/images/transparent.gif';
                    _vip.className = argData.wb_data.user.verified_type == 0 ? 'vip' : 'vip_c';
                    _vip.title = argData.wb_data.user.verified_reason;
                    _name.appendChild(_vip);
                }
                _sms.appendChild(_name);

                var _tt = argData.text;
                _tt = _tt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                _tt = _tt.replace(/@([0-9a-zA-Z\u4e00-\u9fa5_-]+)/g, function($1, $2) {
                    return '<a target="_blank" href="http://weibo.com/n/' + $2 + '">@' + $2 + '</a>';
                }).replace(/#(.*?)#/g, function($1, $2) {
                    return '<a target="_blank" href="http://s.weibo.com/weibo/' + $2 + '">#' + $2 + '#</a>';
                }).replace(/http\:\/\/t.cn\/[a-zA-Z0-9]+/g, function($1) {
                    return '<a target="_blank" href="' + $1 + '">' + $1 + '</a>';
                });
                var _txt = $C('span');
                _txt.innerHTML = '：' + _tt;
                _sms.appendChild(_txt);

                var _feed_att = $C('div');
                _feed_att.className = 'feed_att';
                _MIB_feed_c.appendChild(_feed_att);

                if (argData.is_reply == '1') {
                    var _time = $C('span');
                } else {
                    var _time = $C('a');
                    _time.target = '_blank';
                    _time.href = 'http://weibo.com/' + argData.wb_data.user.id + '/' + argData.wb_mid;
                }
                _time.innerHTML = _regTime(argData.create_time * 1000);
                _feed_att.appendChild(_time);

                var _lz = document.createTextNode(' 来自');
                _feed_att.appendChild(_lz);

                var _lz_a = $C('a');
                _lz_a.target = '_blank';
                _lz_a.innerHTML = '股市专家坐堂';
                _lz_a.href = 'http://talk.finance.sina.com.cn/finance/zhuanjia/index.shtml';
                _feed_att.appendChild(_lz_a);

                return _MIB_feed_c;
            }
            var _container = $('#makeSweet').empty();
            data = data.result.data.list;
            for (var i = 0; i < data.length; i++) {
                data[i].question && _addAsk(data[i].question);
                data[i].answer && _addAnswer(data[i].answer);
                data[i].comment && _addComment(data[i].comment);
                _container.append('<div class="interviewsline"></div>');
            }


            //            _container.hide().html(data.result.data.html);
            //            _container.find('.rt,.head_pic,.intreviewT,.intreviewB').remove();
            //            _container.show();
        }
        this.init = function() {
            window.stockAskCallback = _gotData;
            _getData();
        };
    }();

    var visitedAndPort = window.visitedAndPort = new function() {
        var _cookieKey = 'FINA_V_S_2';
        var _cookieCfg = {
            path: '/',
            domain: 'finance.sina.com.cn',
            expires: '365'
        };
        var _maxVisited = 20;
        var _max = 12;
        var _showHot = true;
        var _portInited = false;
        var _showingPort = false;
        var _visitedList = [];
        var _hotList = [];
        var _portList = [];
        /*1为倒排，-1正排，0不排*/
        var _asc = 0;
        var _hasLogin = false;
        this.init = function() {
            _buildVisited();
            _getData();
            setInterval(function() {
                /*周一到周五8点到16点刷新*/
                if (checkDayTime()) {
                    _getData();
                }
            }, 5 * 1000);

            //            $('#portLogoutBtn').click(weiboLoginManager.logout.fnBind(weiboLoginManager));
            // LoginManager.add({
            //     // logoutBtn: 'portLogoutBtn',
            //     // /*登录切换自选股状态*/
            //     // onLoginSuccess: function(user) {
            //     //     _hasLogin = true;
            //     //     $('#portLoginFalse').hide();
            //     //     $('#portLoginTrue').show();
            //     //     /*如果正在自选股页签中，直接初始化*/
            //     //     if (_showingPort) {
            //     //         _buildPort();
            //     //         _showingPort = true;
            //     //     }
            //     //     $('#portNick').html(user.nick).attr('title', user.nick);
            //     // },
            //     // onUserChanged: function(user) {
            //     //     if (_portInited) {
            //     //         _buildPort();
            //     //         $('#portNick').html(user.nick).attr('title', user.nick);
            //     //     }
            //     // },
            //     // /*退出切换状态，并删除所有自选股DOM*/
            //     // onLogoutSuccess: function() {
            //     //     _hasLogin = false;
            //     //     _portInited = false;
            //     //     $('#portLoginFalse').show();
            //     //     $('#portLoginTrue').hide();
            //     //     while (_portList.length) {
            //     //         _portList.pop().release();
            //     //     }
            //     // }
            // });

            // loginLayer.addOpener('port_show_login');

            // $('#sortBtnV').click(_doSort);
            // $('#sortBtnP').click(_doSort);
            // var _tabCont = new TabCont('tcVP', 'mouseenter', function(argIndex) {
            //     // /*如果之前就是这个签，不操作*/
            //     // if (!_showingPort ^ argIndex) {
            //     //     return;
            //     // }
            //     // /*如果选的是自选股，并且自选股没有初始化，也登陆了，就初始化自选股*/
            //     // /*自选股初始化标志立即修改，不做初始化失败准备*/
            //     // if (argIndex == 1 && !_portInited && _hasLogin) {
            //     //     _buildPort();
            //     //     _portInited = true;
            //     // }
            //     // /*把当前显示状态切换*/
            //     // _showingPort = !! argIndex;
            //     // /*加载数据。自选没初始化时portList为空，不会发请求*/
            //     // _getData(true);
            //     // return false;
            // });

        }

        function _getData(immediately) {
            // var _list = [];
            // /*显示的是自选的话取自选列表*/
            // if (_showingPort) {
            //     for (var i = 0, il = _portList.length; i < il; i++) {
            //         _list.push(_portList[i].symbol);
            //     }
            // }
            // /*否则把最近访问股和热股取了*/
            // else {
            //     for (var i = 0, il = _visitedList.length; i < il; i++) {
            //         _list.push(_visitedList[i].symbol);
            //     }

            //     for (var i = 0, il = _hotList.length; i < il; i++) {
            //         _list.push(_hotList[i].symbol);
            //     }
            // }
            // /*没有列表的话不请求数据*/
            // if (_list.length) {
            //     loadScript(hqURL.replace('$rn', random()) + 's_' + _list.join(',s_'), _gotData, immediately);
            // }
            // return false;
        }

        function _gotData() {
            var _stockList = [];
            if (_showingPort) {
                _stockList = _portList.slice(0);
            } else {
                _stockList = _visitedList.slice(0).concat(_hotList.slice(0));
            }
            /*不需要区分当前股票列表是否还是这个请求的，有行情就显示，没有就跳过*/
            for (var i = 0, il = _stockList.length; i < il; i++) {
                var _hq_str = window['hq_str_s_' + _stockList[i].symbol];
                if (!_hq_str) {
                    continue;
                }
                _hq_str = _hq_str.split(',');
                var _data = {};
                _data.name = _hq_str[0] || _stockList[i].symbol;
                _data.now = _hq_str[1] * 1 ? _hq_str[1].toFixed(isSHB(_stockList[i].symbol) ? 3 : 2) : '--';
                _data.changeP = _hq_str[1] * 1 ? _hq_str[3] + '%' : '--';
                _stockList[i].draw(_data);
            }
            _doSort();
        }
        /*排序。使用共同的排序方式。传入参数才改变排序状态。点击时this和参数直接会自动传入*/

        function _doSort(argDo) {
            var _sortList = [];
            if (argDo) {
                _asc++;
                if (_asc > 1) {
                    _asc = -1;
                }
            }
            if (_showingPort) {
                _sortList = _portList.slice(0);
                $id('sortBtnP').className = {
                    '1': 'sort_down',
                    '0': '',
                    '-1': 'sort_up'
                }[_asc];
            } else {
                _sortList = _visitedList.slice(0);
                $id('sortBtnV').className = {
                    '1': 'sort_down',
                    '0': '',
                    '-1': 'sort_up'
                }[_asc];
            }
            if (_asc) {
                _sortList.sort(function($1, $2) {
                    var _data1 = window['hq_str_s_' + $1.symbol];
                    /*没行情或者当前价位0都排到最后去*/
                    if (_data1) {
                        if (!(_data1.split(',')[1] * 1)) {
                            return 1;
                        }
                        _data1 = parseFloat(_data1.split(',')[3]);
                    } else {
                        return 1;
                    }
                    var _data2 = window['hq_str_s_' + $2.symbol];
                    if (_data2) {
                        if (!(_data2.split(',')[1] * 1)) {
                            return -1;
                        }
                        _data2 = parseFloat(_data2.split(',')[3]);
                    } else {
                        return -1;
                    }
                    return (_data2 - _data1) * _asc;
                });
            }
            for (var i = 0, il = _sortList.length; i < il; i++) {
                _sortList[i].tr.parentNode.appendChild(_sortList[i].tr);
                _sortList[i].tr.className = 'row_' + i % 2;
            }
        }
     

        function _buildPort() {
            //            getScript('http://vip.stock.finance.sina.com.cn/portfolio/web/api/jsonp.php/var _myPort=/FinanceUserService.getZXByNC?type=stock&rn=' + random(),function ()
            // getScript('http://stock.finance.sina.com.cn/portfolio/api/openapi.php/PortfolioInterfaceService.getPyListFace?type=cn&one=first&format=json&callback=var _myPort=&rn=' + random(), function() {
            //     while (_portList.length) {
            //         _portList.pop().release();
            //     }
            //     $('#tbodyPort').empty();
            //     var _stock;
            //     var _tbody = $id('tbodyPort');
            //     _myPort = _myPort.result.data[0].symbols;
            //     for (var i = 0; i < _myPort.length; i++) {
            //         if (/s[hz]\d{6}/.test(_myPort[i])) {
            //             _stock = new _Stock(_myPort[i], null, true);
            //             _stock.tr.className = 'row_' + _portList.length % 2;
            //             _tbody.appendChild(_stock.tr);
            //             _portList.push(_stock);
            //         }
            //     }
            //     if (!_myPort.length) {
            //         _tr = $C('tr');
            //         _th = $C('th');
            //         _th.style.lineHeight = '140px';
            //         _th.style.textAlign = 'center';
            //         $(_th).attr('colspan', '3');
            //         _th.innerHTML = '<a href="http://vip.stock.finance.sina.com.cn/portfolio/main.php" target="_blank" class="a_blue_d_all">尚未添加自选，点击进入..</a>';
            //         _tr.appendChild(_th);
            //         _tbody.appendChild(_tr);
            //     }
            //     _getData(true);
            // });
        }
  

        /*股票类*/

        function _Stock(symbol, onDelete, noDel) {
            this.symbol = symbol;
            this.dataObj = {};
            this.tr;
            this.onDelete = onDelete;
            this.noDel = noDel || false;
            this._type = (symbol.slice(0,3).toUpperCase() == 'SZ1' || symbol.slice(0,3).toUpperCase() == 'SH5') ? 1 : 0;
            this.createDom();
        }
        // merge(_Stock.prototype, {
        //     /*创建元素*/
        //     createDom: function() {
        //         this.tr = $C('tr');
        //         var _th = $C('th');
        //         this.tr.appendChild(_th);
        //         var _a = $C('a');
        //         _a.href = pageURL.replace('$symbol', this.symbol);
        //         if(this._type) {
        //             _a.href = pageURL2.replace('$symbol', this.symbol.slice(2));
        //         }
        //         _a.innerHTML = this.symbol;
        //         _th.appendChild(_a);
        //         this.dataObj.nameLink = _a;

        //         var _td = $C('td');
        //         _td.innerHTML = '--';
        //         this.tr.appendChild(_td);
        //         this.dataObj.now = _td;

        //         _td = $C('td');
        //         this.dataObj.changePTd = _td;
        //         this.tr.appendChild(_td);
        //         var _span = $C('span');
        //         _span.innerHTML = '--';
        //         this.dataObj.changeP = _span;
        //         _td.appendChild(_span);
        //         if (!this.noDel) {
        //             var _em = $C('em');
        //             _td.appendChild(_em);
        //             this.dataObj.del = _em;
        //         }

        //         this.addEvent();
        //     },
        //     addEvent: function() {
        //         if (!this.noDel) {
        //             var _tr = $(this.tr);
        //             _tr.mouseenter(this.showDel.fnBind(this)).mouseleave(this.hideDel.fnBind(this));
        //             $(this.dataObj.del).click(this.deleteMe.fnBind(this));
        //         }
        //     },
        //     showDel: function() {
        //         this.dataObj.del.style.display = 'inline-block';
        //     },
        //     hideDel: function() {
        //         this.dataObj.del.style.display = '';
        //     },
        //     deleteMe: function() {
        //         this.release();
        //         if (this.onDelete) {
        //             this.onDelete(this.symbol);
        //         }
        //         return false;
        //     },
        //     release: function() {
        //         $(this.tr).remove();
        //         this.dataObj = {};
        //         this.tr = undefined;
        //     },
        //     draw: function(argData) {
        //         this.dataObj.nameLink.innerHTML = argData.name;
        //         this.dataObj.now.innerHTML = argData.now;
        //         this.dataObj.changeP.innerHTML = argData.changeP;
        //         this.dataObj.changeP.className = checkUD(undefined, parseFloat(argData.changeP));
        //     }
        // });
    }();

    var notice = new function() {
        var _scrolling = false;
        var _hovering = false;

        function _getData() {
            // getScript('http://vip.stock.finance.sina.com.cn/api/jsonp.php/var noticeData=/CB_AllService.getMemordlistbysymbol?num=8&PaperCode=' + papercode.replace(/[^0-9]/g, ''), _gotData);
        }

        function _gotData() {
            // if (_scrolling) {
            //     setTimeout(arguments.callee, 500);
            //     return;
            // }
            // var _ul = $('#notice ul').empty();
            // var _li, _a;
            // for (var i = 0; i < noticeData.length; i++) {
            //     _li = $('<li>').appendTo(_ul);
            //     _a = $('<a>').attr('target', '_blank').attr('href', 'http://vip.stock.finance.sina.com.cn/corp/view/vCB_AllMemordDetail.php?stockid=' + papercode.replace(/[^0-9]/g, '') + '#_' + noticeData[i].id).attr('title', noticeData[i].title).html(noticeData[i].date + ' ' + noticeData[i].title).appendTo(_li);
            // }
        }

        function _scrollUp() {
            // if (_scrolling) {
            //     return;
            // }
            // _scrolling = true;
            // var _notice = $('#notice li:first');
            // _notice.animate({
            //     marginTop: -1 * _notice.height() + 'px'
            // }, {
            //     complete: function() {
            //         _notice.css('marginTop', '0px').appendTo(_notice.parent());
            //         _scrolling = false;
            //     }
            // });
        }

        function _scrollDown() {
            // if (_scrolling) {
            //     return;
            // }
            // _scrolling = true;
            // var _notice = $('#notice li:last');
            // _notice.prependTo(_notice.parent());
            // _notice.css('marginTop', -1 * _notice.height() + 'px');
            // _notice.animate({
            //     marginTop: '0px'
            // }, {
            //     complete: function() {
            //         _scrolling = false;
            //     }
            // });
        }
        this.init = function() {
            // _getData();
            // setInterval(_getData, 60 * 2 * 1000);

            // // $('#hqNoticeUp').click(_scrollDown);
            // // $('#hqNoticeDown').click(_scrollUp);

            // setInterval(function() {
            //     if (!_hovering) {
            //         _scrollUp();
            //     }
            // }, 5 * 1000);

            // $('#notice').mouseenter(function() {
            //     _hovering = true;
            // }).mouseleave(function() {
            //     _hovering = false;
            // });
        };
    }();
	
	var adnotice = new function() {
        var _scrolling = false;
        var _hovering = false;

        function _scrollUp() {
            // if (_scrolling) {
            //     return;
            // }
            // _scrolling = true;
            // var _notice = $('#adnotice li:first');
            // _notice.animate({
            //     marginTop: -1 * _notice.height() + 'px'
            // }, {
            //     complete: function() {
            //         _notice.css('marginTop', '0px').appendTo(_notice.parent());
            //         _scrolling = false;
            //     }
            // });
        }

        function _scrollDown() {
            // if (_scrolling) {
            //     return;
            // }
            // _scrolling = true;
            // var _notice = $('#adnotice li:last');
            // _notice.prependTo(_notice.parent());
            // _notice.css('marginTop', -1 * _notice.height() + 'px');
            // _notice.animate({
            //     marginTop: '0px'
            // }, {
            //     complete: function() {
            //         _scrolling = false;
            //     }
            // });
        }
        this.init = function() {

            setInterval(function() {
                if (!_hovering) {
                    _scrollUp();
                }
            }, 5 * 1000);

            $('#adnotice').mouseenter(function() {
                _hovering = true;
            }).mouseleave(function() {
                _hovering = false;
            });
        };
    }();

    var louver = new function() {
        function _click() {
            // var _className = this.className;
            // var _this = $(this);
            // if (!_this.find('a').length) {
            //     return;
            // }
            // var _sec_cont = _this.parent().find('.sec_cont');
            // if (_className.indexOf('on') == -1) {
            //     _sec_cont.animate({
            //         height: _sec_cont[0].scrollHeight + 'px'
            //     });
            //     _this.addClass('on');
            // } else {
            //     var _className = _sec_cont[0].className;
            //     _className = _className.replace(/[^0-9]/g, '') || 2;
            //     _sec_cont.animate({
            //         height: _className * 24 + 'px'
            //     });
            //     _this.removeClass('on');
            // }
        }
        this.init = function() {
            // $('#louver .sec_btn').click(_click);
            // $('#louverAllUnfold').click(function() {
            //     var _btns = $('#louver .sec_btn');
            //     for (var i = 0; i < _btns.length; i++) {
            //         if (_btns[i].className.indexOf('on') == -1) {
            //             _btns.eq(i).click();
            //         }
            //     }
            // });
            // $('#louverAllFold').click(function() {
            //     var _btns = $('#louver .on');
            //     _btns.click();
            // });
        }
    }();

    /*页签切换*/
    /*repeatCall如果传true则每次划过都调用函数，可作为时间响应*/

    function TabCont(container, evType, callback, repeatCall) {
        this.tabs = $('#' + container + ' .tab');
        this.conts = $('#' + container + ' .cont');
        this.evType = evType || 'mouseenter';
        this.callback = callback;
        this.repeatCall = repeatCall;
        if (this.tabs.length != this.conts.length) {
            error(container + '标签与内容数目不对应');
        }
        this.addEvent();
    }
    // merge(TabCont.prototype, {
    //     addEvent: function() {
    //         for (var i = 0; i < this.tabs.length; i++) {
    //             this.tabs.eq(i)[this.evType](this.show.fnBind(this, [i]));
    //         }
    //     },
    //     /*显示第几个页签，外露，可直接调用*/
    //     show: function(argIndex) {
    //         if (!/(\s|^)on(\s|$)?/.test(this.tabs[argIndex].className)) {
    //             this.tabs.removeClass('on');
    //             this.tabs.eq(argIndex).addClass('on');
    //             this.conts.hide();
    //             this.conts.eq(argIndex).show();

    //             this.callback && this.callback(argIndex);
    //         } else if (this.repeatCall) {
    //             this.callback && this.callback(argIndex);
    //         }
    //     }
    // });
    /*虚拟下拉列表*/

    function VSelect(selectID) {
        // this.selectID = selectID;
        // this.vselect;
        // this.showout;
        // this.createDom();
        // this.addEvent();
    }
    // merge(VSelect.prototype, {
    //     // createDom: function() {
    //     //     // var _select = $('#' + this.selectID);
    //     //     // /*隐掉原生select*/
    //     //     // _select.hide();
    //     //     // this.vselect = $C('div');
    //     //     // this.vselect.className = 'vselect';
    //     //     // this.showout = $C('span');
    //     //     // this.vselect.appendChild(this.showout);
    //     //     // _select.after(this.vselect);
    //     //     // this.setWord();
    //     // },
    //     // addEvent: function() {
    //     //     // $(this.vselect).click(this.show.fnBind(this));
    //     // },
    //     // show: function(ev) {
    //     //     // ev = ev || window.event;
    //     //     // /*如果已是显示状态了就不做操作，上次添加的hide函数会自动进行隐藏操作*/
    //     //     // /*所有已显示状态下的点击都应该是隐藏操作*/
    //     //     // if ($(this.vselect).find('voptions').length) {
    //     //     //     return;
    //     //     // }
    //     //     // /*展开时的点击需要把事件冒泡停掉，否则documentElement的点击事件会马上隐藏层*/
    //     //     // /*多个vselect联动，所以不能再停止冒泡了，延后绑定事件来避免这个问题*/
    //     //     // //            else
    //     //     // //            {
    //     //     // //                ev.stopPropagation && ev.stopPropagation();
    //     //     // //                ev.cancelBubble = true;
    //     //     // //            }

    //     //     // function _hide() {
    //     //     //     $(_voptions).remove();
    //     //     //     $(document.documentElement).unbind('click', _hide);
    //     //     // }
    //     //     // setTimeout(function() {
    //     //     //     $(document.documentElement).click(_hide);
    //     //     // }, 10);

    //     //     // var _voptions = $C('voptions');
    //     //     // _voptions.className = 'voptions';
    //     //     // var _select = $id(this.selectID);
    //     //     // var _options = $(_select).find('option');
    //     //     // var _selectedIndex = _select.selectedIndex;
    //     //     // var _a;
    //     //     // for (var i = 0; i < _options.length; i++) {
    //     //     //     _a = $C('a');
    //     //     //     _a.href = 'javascript:void(0)';
    //     //     //     _a.innerHTML = _options[i].innerHTML;
    //     //     //     if (i == _selectedIndex) {
    //     //     //         _a.className = 'on';
    //     //     //     }
    //     //     //     _a.onclick = this.select.fnBind(this, [i]);
    //     //     //     _voptions.appendChild(_a);
    //     //     // }
    //     //     // this.vselect.appendChild(_voptions);
    //     //     // _voptions.style.display = 'block';
    //     // },
    //     // /*选择某一个选项，第二个参数true则不会触发onchange事件。也可以直接调用来改变选择*/
    //     // select: function(argIndex, argNocall) {
    //     //     // var _select = $id(this.selectID);
    //     //     // var _selectedIndex = _select.selectedIndex;
    //     //     // if (_selectedIndex !== argIndex) {
    //     //     //     _select.selectedIndex = argIndex;
    //     //     //     this.setWord();
    //     //     //     if (argNocall !== true) {
    //     //     //         $(_select).change();
    //     //     //     }
    //     //     // }
    //     //     // return false;
    //     // },
    //     // setWord: function() {
    //     //     // this.showout.innerHTML = $('#' + this.selectID).find('option:selected').html();
    //     // }
    // });
    /*判断是否是交易时间*/

    function checkDayTime() {
        var _hour = clock.time().getHours();
        var _day = clock.time().getDay();
        if (_hour >= 8 && _hour < 16 && _day != 0 && _day != 6) {
            return true;
        }
        return false;
    }

    /*合并hq请求发送*/
    var loadScript = new function() {
        var _list = [];
        var _call = [];
        var _list_txt = [];
        var _call_txt = [];
        var _timer, _timerTxt;
        /*发请求，把列表清空，以后的重新累积*/

        function _get() {
            if (!_list.length || !_list.join(',')) {
                return;
            }
            getScript(hqURL.replace('$rn', random()) + _list.join(','), _got.bindArg(_call));
            _call = [];
            _list = [];
        }

        function _getTxt() {
            if (!_list_txt.length || !_list_txt.join(',')) {
                return;
            }
            getScript(hqURL_txt.replace('$rn', random()) + _list_txt.join(','), _got.bindArg(_call_txt));
            _call_txt = [];
            _list_txt = [];
        }

        function _got(argCall) {
            for (var i = 0; i < argCall.length; i++) {
                argCall[i]();
            }
        }
        //arr = "http://hq.sinajs.cn/rn=1490439435932&list=sz000651", callback = function (), immediately = true
        /*第三个参数传入true则立即发送请求*/
        return function(arr, callback, immediately) {
            var _isTxt;
            var _listTmp, _callTmp, _getTmp;
            // console.log( arr )
            //arr = "http://hq.sinajs.cn/rn=1490439435932&list=sz000651"
            if (typeof arr == 'string' && arr.indexOf('format=text') > -1) {
                _listTmp = _list_txt;
                _callTmp = _call_txt;
                _getTmp = _getTxt;
                _isTxt = true;
            } else {
                _listTmp = _list;
                _callTmp = _call;
                _getTmp = _get;
                _isTxt = false;
            }
            var _arr = arr;
            if (typeof _arr == 'string') {
                //_arr = ["sz000651"], arr = "http://hq.sinajs.cn/rn=1490439435932&list=sz000651"
                //把list=之后的留下，然后用，逗号分组
                _arr = _arr.replace(/^[\s\S]*list=/, '').split(',');
            }
            /*如果加一起会超出url长度则马上把之前的请求发出去*/
            if ((_listTmp.join(',') + _arr.join(',')).length > 750) {
                //_listTmp = [], _arr = ["sz000651"]
                _getTmp(); //_getTmp = function _get()
            }
            //_sList = ",,", _listTmp = []
            var _sList = ',' + _listTmp.join(',') + ',';
            //循环，用来连接字符串
            for (var i = 0; i < _arr.length; i++) {
                if (_sList.indexOf(',' + _arr[i] + ',') == -1) {
                    _listTmp.push(_arr[i]);
                    _sList += _arr[i] + ',';
                }
            }
            //_callTmp = [function], callback = function ()
            _callTmp.push(callback); 
            /*延后发送请求，如果有其他hq请求则会累积到一起*/

            clearTimeout(_isTxt ? _timerTxt : _timer);
            if (immediately) {
                _getTmp();
            } else {
                if (_isTxt) {
                    _timerTxt = setTimeout(_getTmp, 50);
                } else {
                    _timer = setTimeout(_getTmp, 50);
                }
            }
        };
    }();

    function doNaN(data, argChange) {
        if (isNaN(data) || !isFinite(data)) {
            data = argChange || '--';
        }
        return data;
    }

    function replace$(symbol)
    {
        if(typeof symbol == 'string')
        {
            return symbol.replace(/\./g,'$');
        }
        else
        {
            return replace$(symbol + '').split(',');
        }
    }

    function $id(id) {
        return document.getElementById(id);
    }

    function $C(tag) {
        return document.createElement(tag);
    }

    function random() {
        return new Date().getTime();
    }

    function error(msg) {
        window.console && console.error && console.error(msg);
    }

    function isSHB(symbol) {
        return /^(sh900|sz1|sh5)/.test(symbol);
    }


    // if (!window.XMLHttpRequest) {
    //     for (var i = 5; i; i--) {
    //         try {
    //             if (i == 2) {
    //                 new ActiveXObject("Microsoft.XMLHTTP");
    //                 XMLHttpRequest = function() {
    //                     return new ActiveXObject("Microsoft.XMLHTTP");
    //                 }
    //                 break;
    //             } else {
    //                 new ActiveXObject("Msxml2.XMLHTTP." + i + ".0");
    //                 XMLHttpRequest = function(argI) {
    //                     return new ActiveXObject("Msxml2.XMLHTTP." + argI + ".0");
    //                 }.fnBind(this, [i]);
    //                 break;
    //             }
    //         } catch (e) {

    //         }
    //     }
    // }
    // String.prototype.contains = function(string, s) {
    //     return (s) ? (s + this + s).indexOf(s + string + s) > -1 : this.indexOf(string) > -1;
    // };
    // Object.toQueryString = function(source) {
    //     if (typeof source == 'string') {
    //         return encodeURIComponent(source);
    //     }
    //     var queryString = [];
    //     for (var property in source) {
    //         queryString.push(encodeURIComponent(property) + '=' + encodeURIComponent(source[property]));
    //     }
    //     return queryString.join('&');
    // };
    // var Ajax = function(url, options) {
    //     // this.url = url;
    //     // this.running = false;
    //     // this.timer = null;
    //     // this.options = {
    //     //     method: 'GET',
    //     //     data: null,
    //     //     time: 30,
    //     //     async: true,
    //     //     onComplete: false,
    //     //     onFailure: false,
    //     //     onTimeOut: false,
    //     //     onRequest: false,
    //     //     charset: 'utf-8'
    //     // };
    //     // this.setOptions(options);
    //     // this.transport = new XMLHttpRequest();
    // };
    // Ajax.prototype.setOptions = function(options) {
    //     // this.options.onComplete = false;
    //     // this.options.onFailure = false;
    //     // this.options.onTimeOut = false;
    //     // this.options.onRequest = false;
    //     // for (var option in options) {
    //     //     this.options[option] = options[option];
    //     // }
    // };
    // Ajax.prototype.request = function() {
    //     // if (this.running) {
    //     //     return this;
    //     // }
    //     // this.running = true;
    //     // var data = this.options.data && Object.toQueryString(this.options.data);
    //     // if (data && (this.options.method == 'GET')) {
    //     //     this.url = this.url + (this.url.contains('?') ? '&' : '?') + data;
    //     //     data = null;
    //     // }
    //     // this.transport.open(this.options.method, this.url, this.options.async);
    //     // this.transport.setRequestHeader("charset", this.options.charset);
    //     // if (this.options.method == 'POST') {
    //     //     this.transport.setRequestHeader('Content-type', 'application/x-www-form-urlencoded; charset=' + this.options.charset);
    //     // }
    //     // this.transport.onreadystatechange = this.onStateChange.fnBind(this);
    //     // this.transport.send(data);
    //     // if (this.options.onTimeOut) {
    //     //     var cancel = this.cancel.fnBind(this);
    //     //     var timeOut = this.options.onTimeOut.fnBind(this);
    //     //     this.timer = setTimeout(function() {
    //     //         cancel();
    //     //         timeOut();
    //     //     }, this.options.time * 1000);
    //     // }
    //     // if (this.options.onRequest) {
    //     //     this.options.onRequest();
    //     // }
    //     // return this;
    // };
    // Ajax.prototype.cancel = function() {
    //     // if (!this.running) {
    //     //     return this;
    //     // }
    //     // this.running = false;
    //     // if (this.timer) {
    //     //     clearTimeout(this.timer);
    //     // }
    //     // this.transport.abort();
    //     // return this;
    // };
    // Ajax.prototype.onStateChange = function() {
    //     // if (this.transport.readyState != 4 || !this.running) return;
    //     // this.running = false;
    //     // var status = this.transport.status;
    //     // if (this.timer) {
    //     //     clearTimeout(this.timer);
    //     // }
    //     // if ((status >= 200) && (status < 300)) {
    //     //     this.options.onComplete(this.transport.responseText);
    //     // } else {
    //     //     if (this.options.onFailure) {
    //     //         this.options.onFailure();
    //     //     }
    //     // }
    // };
}(jQuery);