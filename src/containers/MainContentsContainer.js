import { connect } from 'react-redux'
import { toggleTodo,willDownItem,willDownItemType,startTime,endTime , setdownloadui,startdownloading } from '../actions'
// import { * } from '../actions'
import MainContents from '../components/MainContents'

//返回当前页面的url
const getMainContentsUri = (state) => {
    let tabList = state.todos;
    for(let i=0; i<tabList.length; i++){
        if(tabList[i].completed){
            let currentUri = tabList[i].uri;
            state.currentUri = currentUri;
            return currentUri;
        }
    }
}
//位于下载区域的选中数据
var data = [
    {
        text: "股票",
        code: "STOCK",
        param:"",
        nodes: 
            [{
                text: "A股",
                code: "ASTOCK",
                param:"[%22hq%22,%22hs_a%22,%22{sort}%22,{asc},{page},{num}]",
                nodes: 
                    [{
                        text: "创业板",
                        code: "CYB",
                        param:"[%22hq%22,%22cyb%22,%22{sort}%22,{asc},{page},{num}]",
                    },{
                        text: "中小板块",
                        code: "ZXBK",
                        param:"[%22hq%22,%22zxqy%22,%22{sort}%22,{asc},{page},{num}]",
                    },{
                        text: "上海主板",
                        code: "ZXBK",
                        param:"[%22jjhq%22,{page},{num},%22{sort}%22,{asc},%22zhishu_000001%22]",
                    }]
            },{
                text: "A股指数",
                code: "ZHISHU",
                param:"[%22hq%22,%22dpzs%22,%22{sort}%22,{asc},{page},{num}]",
            },{
                text: "港股",
                code: "GSTOCK",
                param:"[%22hk%22,%22qbgg_hk%22,%22{sort}%22,{asc},{page},{num}]",
            },{
                text: "美股",
                code: "MSTOCK",
                param:"[%22us_c%22,0,%22%22,%22{sort}%22,{asc},{page},{num}]",
            }]
    },{
        text: "基金",
        code: 'FUND',
        param:"",
        nodes: 
            [{
                text: "国内期货",
                code:"",
                param:"",
            },{
                text: "外盘期货",
                code: "",
                param:"",
            }]
    },{
        text: "期货",
        code: 'FUTURES',
        param:"",
    }
];

var chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(231,233,237)'
};

var randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
}

var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [{
        type: 'line',
        label: 'Dataset 1',
        borderColor: chartColors.blue,
        borderWidth: 2,
        fill: false,
        data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ]
    }, {
        type: 'bar',
        label: 'Dataset 2',
        backgroundColor: chartColors.red,
        data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ],
        borderColor: 'white',
        borderWidth: 2
    }, {
        type: 'bar',
        label: 'Dataset 3',
        backgroundColor: chartColors.green,
        data: [
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor(), 
            randomScalingFactor()
        ]
    }]

};

var chartOptions = {
    responsive: true,
    title: {
        display: true,
        text: 'Chart.js Combo Bar Line Chart'
    },
    tooltips: {
        mode: 'index',
        intersect: true
    }
}
var tags = [
  ['text', 'code',  'someth1ing else'],
  ['text', 'code',  'somet2hing else'],
  ['text', 'code',  'someth3ing else'],
]


//位于下载区域的选中数据
var datatype = [
    {
        text: "日线",
        code: 'DAILY',
        param:"",
    },{
        text: "分钟线",
        code: 'MINIS',
        param:"",
    }
];


const mapStateToProps = (state) => ({
  currentUri: getMainContentsUri(state ),
  tv:data,
  chartData:chartData,
  chartOptions:chartOptions,
  tags:tags,
//   currentInput:state.data.willdown.willdownItem,
//   dcs:{
//       willdownitemtype: state.data.willdown.willdownitemtype,
//       datatype: datatype,
//   }
  currentInput:state.data.willdownItem,
  dcs:{
      willdownitemtype: state.data.willdownitemtype,
      datatype: datatype,
      setdownloadui: state.data.setdownloadui,
      starttime: state.data.starttime,
      endtime: state.data.endtime,
  }
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTodoClick: toggleTodo,
    onwillDownItemType: willDownItemType,
    onWillDownItem: willDownItem,
    // starttime: (time) => {   //下载内容的开始时间
    //     dispatch(startTime(time)) 
    // },
    // endtime: (time) => {     //结束时间
    //     dispatch(endTime(time))
    // },
  //下载区域的事件处理
  dcd:{
    onwillDownItemType:(itemtype) => {
        dispatch(willDownItemType(itemtype))
    },  
    onWillDownItem: (items) => {
        dispatch(willDownItem(items))
    },
    starttime:(time) => {   //下载内容的开始时间
        dispatch(startTime(time)) 
    },
    endtime:(time) => {     //结束时间
        dispatch(endTime(time))
    },
    setdownloadui:() => {
        dispatch(setdownloadui())
    },
    startdownloading:() => {
        dispatch(startdownloading())
    }
    
  }
})



const MainContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContents)

export default MainContentsContainer
