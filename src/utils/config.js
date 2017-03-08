
/**
 * 这个文件用于存储一些预定的内容，用于软件的基本内容配置
 * 例如，菜单列表，数据源列表等之类的
 * 软件后期可以修改这些内容的
 */


var config = {
    //数据下载的配置
    "data":{
        //新浪数据源的相关信息
        "sina": {
            "id": 0,
            "name": "新浪数据",
            "code": "SINA",
            "link": "",
            "category": {
                "schq": {
                    "id": 0,
                    "name": "市场行情",
                    "code": "SCHQ",
                    "category": {
                        "hsgs": {
                            "id": 0,
                            "name": "沪深股市",
                            "code": "SCHQ",
                            "category": {
                                "qbag": {
                                    "id": 0,
                                    "name": "全部A股",
                                    "code": "QBAG",
                                    //提交网页的参数
                                    "param":"[%22hq%22,%22hs_a%22,%22{sort}%22,{asc},{page},{num}]",
                                },
                                "zxqy": {
                                    "id": 1,
                                    "name": "中小板",
                                    "code": "ZXQY",
                                    "param":"[%22hq%22,%22zxqy%22,%22{sort}%22,{asc},{page},{num}]",
                                },
                                "cyb": {
                                    "id": 2,
                                    "name": "创业板",
                                    "code": "CYB",
                                    "param":"[%22hq%22,%22cyb%22,%22{sort}%22,{asc},{page},{num}]",
                                },
                                "xlhy": {
                                    "id": 3,
                                    "name": "新浪行业板块",
                                    "code": "XLHY",
                                    "sep": 1,
                                    "param":"[%22bkshy%22,%22{sort}%22,{asc}]"
                                },
                                "gnbk": {
                                    "id": 4,
                                    "name": "概念板块",
                                    "code": "GNBK",
                                    "param":"[%22bknode%22,%22gainianbankuai%22,%22{sort}%22,{asc}]"
                                },
                                "dybk": {
                                    "id": 5,
                                    "name": "地域板块",
                                    "code": "DYBK",
                                    "param":"[%22bknode%22,%22diyu%22,%22{sort}%22,{asc}]"
                                },
                                "zs": {
                                    "id": 6,
                                    "name": "指数",
                                    "code": "ZS",
                                    "sep": 1,
                                    "param":"[%22hq%22,%22dpzs%22,%22{sort}%22,{asc},{page},{num}]",
                                },
                                "zscf": {
                                    "id": 7,
                                    "name": "指数成分：",
                                    "code": "ZSCF",
                                    "sep": 1,
                                    "disable": 1
                                },
                                "szzz": {
                                    "id": 8,
                                    "name": "上证指数",
                                    "code": "SZZZ",
                                    "param":"[%22jjhq%22,{page},{num},%22{sort}%22,{asc},%22zhishu_000001%22]",
                                },
                                "szcz": {
                                    "id": 9,
                                    "name": "深证成指",
                                    "code": "SZCZ",
                                    "param":"[%22jjhq%22,{page},{num},%22{sort}%22,{asc},%22zhishu_399001%22]",
                                },
                                "hs300": {
                                    "id": 10,
                                    "name": "沪深300",
                                    "code": "HS300",
                                    "param":"[%22jjhq%22,{page},{num},%22{sort}%22,{asc},%22hs300%22]",
                                }
                            }
                        },
                        "hgt": {
                            "id": 1,
                            "name": "沪港通",
                            "link": "",
                            "category": {
                                "ggt": {
                                    "id": 0,
                                    "name": "港股通"
                                },
                                "hgt": {
                                    "id": 1,
                                    "name": "沪股通"
                                },
                                "ah": {
                                    "id": 2,
                                    "name": "沪港通A+H"
                                },
                                "allah": {
                                    "id": 3,
                                    "name": "全部A+H"
                                }
                            }
                        },
                        "xggs": {
                            "id": 3,
                            "name": "香港股市",
                            "category": {
                                "qbgg": {
                                    "id": 0,
                                    "name": "全部港股"
                                },
                                "lcg": {
                                    "id": 1,
                                    "name": "蓝筹股"
                                },
                                "hcg": {
                                    "id": 2,
                                    "name": "红筹股"
                                },
                                "gqg": {
                                    "id": 3,
                                    "name": "国企股"
                                },
                                "cyb": {
                                    "id": 4,
                                    "name": "创业板"
                                },
                                "zs": {
                                    "id": 5,
                                    "name": "指数"
                                }
                            }
                        },
                        "mggs": {
                            "id": 4,
                            "name": "美国股市",
                            "category": {
                                "qbmg": {
                                    "id": 0,
                                    "name": "全部美股"
                                },
                                "zmmg": {
                                    "id": 1,
                                    "name": "知名美股"
                                },
                                "zggng": {
                                    "id": 2,
                                    "name": "中国概念股"
                                },
                                "zscf": {
                                    "id": 3,
                                    "name": "指数成分：",
                                    "sep": 1,
                                    "disable": 1
                                },
                                "dqs": {
                                    "id": 4,
                                    "name": "道琼斯"
                                },
                                "nsdk": {
                                    "id": 5,
                                    "name": "纳斯达克"
                                },
                                "bp500": {
                                    "id": 6,
                                    "name": "标普500"
                                }
                            }
                        },
                        "qqgszs": {
                            "id": 5,
                            "name": "全球股市指数",
                            "link": "#visual-hqgszz"
                        }
                    }
                },
                "rdzz": {
                    "id": 1,
                    "name": "热点追踪",
                    "category": {
                        "scbx": {
                            "id": 0,
                            "name": "市场表现",
                            "category": {
                                "jdgd": {
                                    "id": 0,
                                    "name": "阶段最高最低"
                                },
                                "dqzd": {
                                    "id": 1,
                                    "name": "短期涨跌统计"
                                },
                                "cqzd": {
                                    "id": 2,
                                    "name": "长期涨跌统计"
                                },
                                "30xg": {
                                    "id": 3,
                                    "name": "盘中创新高个股"
                                },
                                "30xd": {
                                    "id": 4,
                                    "name": "盘中创新低个股"
                                },
                                "cjzz": {
                                    "id": 5,
                                    "name": "成交骤增个股"
                                },
                                "cjzj": {
                                    "id": 6,
                                    "name": "成交骤减个股"
                                },
                                "lxfl": {
                                    "id": 7,
                                    "name": "连续放量个股"
                                },
                                "lxsl": {
                                    "id": 8,
                                    "name": "连续缩量个股"
                                },
                                "lxsz": {
                                    "id": 9,
                                    "name": "连续上涨个股"
                                },
                                "lxxd": {
                                    "id": 10,
                                    "name": "连续下跌个股"
                                },
                                "zzd": {
                                    "id": 11,
                                    "name": "周涨跌排名"
                                },
                                "yzqs": {
                                    "id": 12,
                                    "name": "一周强势股"
                                },
                                "yzd": {
                                    "id": 13,
                                    "name": "月涨跌排名"
                                },
                                "yyqs": {
                                    "id": 14,
                                    "name": "一月强势股"
                                },
                                "ltsz": {
                                    "id": 15,
                                    "name": "流通市值排行"
                                },
                                "sylv": {
                                    "id": 16,
                                    "name": "市盈率排行"
                                },
                                "sjlv": {
                                    "id": 17,
                                    "name": "市净率排行"
                                }
                            }
                        },
                        "zjlx": {
                            "id": 1,
                            "name": "资金流向",
                            "url": "http://money.finance.sina.com.cn/moneyflow"
                        },
                        "rzrq": {
                            "id": 2,
                            "name": "融资融券"
                        },
                        "dzjy": {
                            "id": 3,
                            "name": "大宗交易"
                        },
                        "jgcg": {
                            "id": 4,
                            "name": "机构持股",
                            "category": {
                                "jgcg": {
                                    "id": 0,
                                    "name": "机构持股汇总"
                                },
                                "jjzc": {
                                    "id": 1,
                                    "name": "基金重仓股"
                                },
                                "sbzc": {
                                    "id": 2,
                                    "name": "社保重仓股"
                                },
                                "qfii": {
                                    "id": 3,
                                    "name": "QFII重仓股"
                                }
                            }
                        },
                        "zllhb": {
                            "id": 5,
                            "name": "主力龙虎榜",
                            "category": {
                                "lhb": {
                                    "id": 0,
                                    "name": "每日详情"
                                },
                                "ggtj": {
                                    "id": 1,
                                    "name": "个股上榜统计"
                                },
                                "yytj": {
                                    "id": 2,
                                    "name": "营业部上榜统计"
                                },
                                "jgzz": {
                                    "id": 3,
                                    "name": "机构席位追踪"
                                },
                                "jgmx": {
                                    "id": 4,
                                    "name": "机构席位成交明细"
                                }
                            }
                        },
                        "ggzjc": {
                            "id": 6,
                            "name": "高管增减持"
                        },
                        "xsjj": {
                            "id": 7,
                            "name": "限售解禁"
                        }
                    }
                },
                "yjfx": {
                    "id": 2,
                    "name": "研究分析",
                    "category": {
                        "nbjb": {
                            "id": 0,
                            "name": "年报季报",
                            "category": {
                                "ylnl": {
                                    "id": 0,
                                    "name": "盈利能力"
                                },
                                "yynl": {
                                    "id": 1,
                                    "name": "营运能力"
                                },
                                "cnl": {
                                    "id": 2,
                                    "name": "成长能力"
                                },
                                "cznl": {
                                    "id": 3,
                                    "name": "偿债能力"
                                },
                                "xjll": {
                                    "id": 4,
                                    "name": "现金流量"
                                },
                                "yjbb": {
                                    "id": 5,
                                    "name": "业绩报表"
                                },
                                "yjyg": {
                                    "id": 6,
                                    "name": "业绩预告"
                                },
                                "yjkb": {
                                    "id": 7,
                                    "name": "业绩快报"
                                },
                                "lrxf": {
                                    "id": 8,
                                    "name": "利润细分"
                                }
                            }
                        },
                        "qsyb": {
                            "id": 1,
                            "name": "券商研报"
                        },
                        "qgqp": {
                            "id": 2,
                            "name": "千股千评"
                        },
                        "lsfh": {
                            "id": 3,
                            "name": "历史分红"
                        },
                        "ggzd": {
                            "id": 4,
                            "name": "个股诊断",
                            "url": "http://finance.sina.com.cn/stock/message/gxq/sh600000/ggzd.html"
                        },
                        "jgc": {
                            "id": 5,
                            "name": "机构荐股池",
                            "category": {
                                "zxpj": {
                                    "id": 0,
                                    "name": "最新投资评级"
                                },
                                "stpj": {
                                    "id": 1,
                                    "name": "上调评级股票"
                                },
                                "xtpj": {
                                    "id": 2,
                                    "name": "下调评级股票"
                                },
                                "zhpj": {
                                    "id": 3,
                                    "name": "股票综合评级"
                                },
                                "scpj": {
                                    "id": 4,
                                    "name": "首次评级股票"
                                },
                                "mbzf": {
                                    "id": 5,
                                    "name": "目标涨幅排名"
                                },
                                "jggz": {
                                    "id": 6,
                                    "name": "机构关注度"
                                },
                                "hygz": {
                                    "id": 7,
                                    "name": "行业关注度"
                                },
                                "gjyc": {
                                    "id": 8,
                                    "name": "主流股价预测"
                                }
                            }
                        },
                        "pjxg": {
                            "id": 6,
                            "name": "投资评级选股",
                            "url": "http://vip.stock.finance.sina.com.cn/q/go.php/vIR_CustomSearch/index.phtml"
                        }
                    }
                },
                "tzgj": {
                    "id": 3,
                    "name": "投资工具",
                    "category": {
                        "tzrl": {
                            "id": 2,
                            "name": "投资日历"
                        },
                        "zjfw": {
                            "id": 5,
                            "name": "最近访问"
                        }
                    }
                },
                "sccyz": {
                    "id": 4,
                    "name": "市场参与者",
                    "category": {
                        "fxspm": {
                            "id": 0,
                            "name": "分析师排名",
                            "category": {
                                "zjxg": {
                                    "id": 0,
                                    "name": "最佳选股分析师"
                                },
                                "zzyc": {
                                    "id": 1,
                                    "name": "盈利预测最准分析师"
                                },
                                "qsph": {
                                    "id": 2,
                                    "name": "券商研究力量排行"
                                }
                            }
                        },
                    }
                }
            }
        }
        //放其他数据源的相关信息
    }


    //可以放其他的配置信息

};







module.exports=config;