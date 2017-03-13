import React from 'react'


// import TreeView from 'treeview-react-bootstrap';


import TreeView from '../components/TreeView'
import TaggedInput from '../components/TaggedInput'
//DOWNLOADCENTER

// var DateTimeField = require('react-bootstrap-datetimepicker');
import DateTimeField from 'react-bootstrap-datetimepicker'


const DownloadCenter = ( {tv, tags,currentInput, dcd, dcs, starttime, endtime } ) => (

<div >


          <div className="panel panel-default">
            
            <div className="panel-heading">
              数据下载设置
              <div className="pull-right">
                <a href="#fakelink" className="btn btn-block btn-xs btn-success">点击设置</a>
              </div>
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">品种范围</div>
                  <div className="col-xs-10 ">
                    
    <TaggedInput
    autofocus={false}
    backspaceDeletesWord={true}
    placeholder={'Name some fruits'}
    unique={true}
    onBeforeAddTag={function() { return true; }}
    onAddTag={function() { console.log('Tag added', arguments); }}
    onBeforeRemoveTag={function() { return true; }}
    // onRemoveTag={function(tag) { onWillDownItem(tag) }}
    // tags={['one', 'two', 'three']}
    tags={tags}
    currentInput={currentInput}
    
  />


                  </div>
                </div>
              </li>
              <li className="list-group-item" >
                <div className="row">
                    
<TreeView data={tv}  onWillDownItem={dcd.onWillDownItem} />
{/* //{React.createElement(TreeView, {data: data})} */}

                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">数据类型</div>
                  <div className="col-xs-10 ">
                    
                    <div className="tagsinput-primary">
                      
    <TaggedInput
    unique={true}
    tags={tags}
    currentInput={dcs.willdownitemtype}
    
  />

                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item" >
                <div className="row">
                    
                    <ul className="list-group list-inline">

<TreeView data={dcs.datatype}  onWillDownItem={dcd.onwillDownItemType} />
                      
                    </ul>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">时间范围</div>
                  <div className="col-xs-10 ">
                    <DateTimeField  defaultText="开始日期"  onChange={starttime} />
                    <DateTimeField  defaultText="结束日期"  onChange={endtime} />
                    
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-10 ">  </div>
                  <div className="col-xs-2 text-center">
                    <button type="button" class="btn btn-success">时间区间</button>
                  </div>
                </div>
              </li>
              
            </ul>
          </div>


          <div className="panel panel-default">
          
            <div className="panel-heading">传输列表</div>
            
            <ul className="list-group">
              <li className="list-group-item">
                <button className="btn btn-default">开始</button>
                <button className="btn btn-primary">暂停</button>
                <button className="btn btn-danger">删除</button>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">当前进度</div>
                  <div className="col-xs-8 ">
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" >
                        0%
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-2 text-center">1000/10000</div>
                </div>
              </li>
              <li className="list-group-item">
                
                <table className="table">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>Column heading</th>
                      <th>Column heading</th>
                      <th>Column heading</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="active">
                      <th scope="row">1</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr className="success">
                      <th scope="row">3</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr>
                      <th scope="row">4</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr className="info">
                      <th scope="row">5</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr>
                      <th scope="row">6</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr className="warning">
                      <th scope="row">7</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr>
                      <th scope="row">8</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                    <tr className="danger">
                      <th scope="row">9</th>
                      <td>Column content</td>
                      <td>Column content</td>
                      <td>Column content</td>
                    </tr>
                  </tbody>
                </table>
                
              </li>
              
            </ul>
            
          </div>




</div>

)

export default DownloadCenter
