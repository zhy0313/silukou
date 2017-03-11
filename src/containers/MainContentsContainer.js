import { connect } from 'react-redux'
import { toggleTodo,willDownItem } from '../actions'
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
var data = [
  {
    text: "Paresdfsdnt 1",
    nodes: [
      {
        text: "Child 1",
        nodes: [
          {
            text: "Grandchild 1"
          },
          {
            text: "Grandchild 2"
          }
        ]
      },
      {
        text: "Child 2"
      }
    ]
  },
  {
    text: "Parent 2"
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

const mapStateToProps = (state) => ({
  currentUri: getMainContentsUri(state ),
  tv:data,
  chartData:chartData,
  chartOptions:chartOptions,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onTodoClick: toggleTodo,
  onWillDownItem: (items) => {
    dispatch(willDownItem(items))
  }
})



const MainContentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContents)

export default MainContentsContainer
