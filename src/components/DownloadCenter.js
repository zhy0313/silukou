import React from 'react'

//DOWNLOADCENTER

const DownloadCenter = () => (

<div id='downloadcenter'>


          <div className="panel panel-default">
            
            <div className="panel-heading">数据下载设置</div>

            <ul className="list-group">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">品种范围</div>
                  <div className="col-xs-10 ">
                    
                    <div className="tagsinput-primary">
                      <input name="tagsinput" className="tagsinput" data-role="tagsinput" value="School, Teacher, Colleague" />
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item"  id="collapseExample1">
                <div className="row">
                  <div className="col-xs-10 ">
                    
                    <div id="tree"></div>
                  </div>
                  <div className="col-xs-2">
                    <button className="btn btn-primary" >开始</button>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">数据类型</div>
                  <div className="col-xs-10 ">
                    
                    <div className="tagsinput-primary">
                      <input name="tagsinput" className="tagsinput" data-role="tagsinput" value="School, Teacher, Colleague" />
                    </div>
                  </div>
                </div>
              </li>
              <li className="list-group-item" id="data_type_choice">
                <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="col-xs-10 ">
                    
                    <ul className="list-group list-inline">
                      <li>
                        <label className="checkbox" for="checkbox1">
                          <input type="checkbox" value="" id="checkbox1" data-toggle="checkbox" className="custom-checkbox" />
                          <span className="icons">
                            <span className="icon-unchecked"></span>
                            <span className="icon-checked"></span>
                          </span>
                          Checkbox
                        </label>
                      </li>
                      <li>
                        <label className="checkbox" for="checkbox2">
                        <input type="checkbox" value="" id="checkbox2" data-toggle="checkbox" className="custom-checkbox" />
                          <span className="icons">
                            <span className="icon-unchecked"></span>
                            <span className="icon-checked"></span>
                          </span>
                          Checkbox
                        </label>
                      </li>
                      <li>
                        <label className="checkbox" for="checkbox3">
                          <input type="checkbox" value="" id="checkbox3" data-toggle="checkbox" className="custom-checkbox" />
                          <span className="icons">
                            <span className="icon-unchecked"></span>
                            <span className="icon-checked"></span>
                          </span>
                          Checkbox
                        </label>
                      </li>
                      <li>
                        <label className="checkbox" for="checkbox4">
                          <input type="checkbox" value="" id="checkbox4" data-toggle="checkbox" className="custom-checkbox" />
                          <span className="icons">
                            <span className="icon-unchecked"></span>
                            <span className="icon-checked"></span>
                          </span>
                          Checkbox
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-xs-2 text-center">时间区间</div>
                  <div className="col-xs-10 ">
                    <input size="16" type="text" value="2012-06-15 14:45" readonly className="form_datetime" />
                    <input size="16" type="text" value="2012-06-15 14:45" readonly className="form_datetime" />
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
