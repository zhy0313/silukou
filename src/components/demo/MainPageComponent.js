import React from 'react';

import { Link } from 'react-router'
import DynamicChartComponent from './DynamicChartComponent.js';
import AdSense from 'react-adsense';


const MainPageComponent = React.createClass({
  propTypes: {
  },
  render: function() {
    return (
      <div>
        <h1> echarts-for-react {this.props.params.type} </h1>
        <h3> A very simple echarts(v3.0) wrapper for React. <a href='https://github.com/hustcc/echarts-for-react'>hustcc/echarts-for-react</a></h3>
        
        <AdSense.Google client='ca-pub-7292810486004926'
                        slot='7806394673' />

        <h4>
            <Link to="/echarts/simple">Simple demo</Link> | 
            <Link to="/echarts/loading">Echarts loading</Link> | 
            <Link to="/echarts/api">Echarts API</Link> | 
            <Link to="/echarts/events">Echarts events</Link> | 
            <Link to="/echarts/theme">Echarts theme</Link> | 
            <Link to="/echarts/dynamic">Dynamic chart</Link> | 
            <Link to="/echarts/map">Map chart</Link>
        </h4>

        { this.props.children || <DynamicChartComponent />}
        
        <h3>Get it on GitHub! <a href='https://github.com/hustcc/echarts-for-react'>hustcc/echarts-for-react</a></h3>
      </div>
    );
  }
});

export default MainPageComponent;