import React, { PropTypes } from 'react'

const Header = ({data,showDownloadArea, onDownloadAreaClick,onDataSourceClick}) => (
  
    <nav className="navbar main_navbar navbar-fixed-top">
      <div className="container-fluid">
          
        <div className="sys_close">
        <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </div>
        </div>
        <div className="nav_search">
        <div className="collapse navbar-collapse" >
            <ul className="nav navbar-nav navbar-right">
            <li>
                <form className="navbar-form navbar-left">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
                </form>
            </li>
            <li className={showDownloadArea?"dropdown open":"dropdown"} >
                <a href="#" 
                    className="dropdown-toggle" 
                    // data-toggle="dropdown" 
                    // role="button" 
                    // onClick={() => onDownloadAreaClick()}
                    onClick={()=>{ $('.dropdown-menu').toggle()} }  //这里添加jquery的另一种写法
        //             onClick={e => {
        // e.preventDefault()
        // onDownloadAreaClick()}}
                >
                    新浪数据(优) <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                    {data.dataSourceList.map(dataSource =>
                    <li  key={dataSource.name} onClick={() => onDataSourceClick(dataSource.name)}>
                      <div className="row" >
                        <div className="col-md-2">{ data.currentDataSource===dataSource.name ? <span className="glyphicon glyphicon-ok"></span> : ''}</div>
                        <div className="col-md-4">{dataSource.name}</div>
                        <div className="col-md-5"><span className="label label-default">Default</span></div>
                      </div>
                    </li>
                    )}
                    <li role="separator" className="divider"></li>
                    <li>
                      <div className="row">
                        <div className="col-md-2"><span className="glyphicon "></span></div>
                        <div className="col-md-4">腾讯</div>
                        <div className="col-md-5"><span className="label label-default">Default</span></div>
                      </div>
                    </li>
                    <li role="separator" className="divider"></li>
                    <li>
                      <div className="row">
                        <div className="col-md-2"><span className="glyphicon"></span></div>
                        <div className="col-md-4">阿里</div>
                        <div className="col-md-5"><span className="label label-default">Default</span></div>
                      </div>
                    </li>
                </ul>
            </li>
            </ul>
        </div>

        </div>
        <div className="center-block title">
        <sapn>标题标题</sapn>
        </div>
        
      </div>
    </nav>
)

Header.propTypes = {
    // header: PropTypes.objectOf(PropTypes.shape({
      showDownloadArea: PropTypes.bool.isRequired,
    // }).isRequired).isRequired,
    onDownloadAreaClick: PropTypes.func.isRequired
}
export default Header




// export default class Header extends React.Component {
//   constructor(props) {
//     super(props);
//   }
  
//   static propTypes = {
//     // header: PropTypes.objectOf(PropTypes.shape({
//     //   showDownloadArea: PropTypes.bool.isRequired
//     // }).isRequired).isRequired,
//       showDownloadArea: PropTypes.bool.isRequired,
//     onDownloadAreaClick: PropTypes.func.isRequired
//   }

//   render() {
//     return (
      

//     <nav className="navbar main_navbar navbar-fixed-top">
//       <div className="container-fluid">
          
//         <div className="sys_close">
//         <div className="navbar-header">
//             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
//             <span className="sr-only">Toggle navigation</span>
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//             </button>
//             <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//             <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
//         </div>
//         </div>
//         <div className="nav_search">
//         <div className="collapse navbar-collapse" >
//             <ul className="nav navbar-nav navbar-right">
//             <li>
//                 <form className="navbar-form navbar-left">
//                 <div className="form-group">
//                     <input type="text" className="form-control" placeholder="Search" />
//                 </div>
//                 <button type="submit" className="btn btn-default">Submit</button>
//                 </form>
//             </li>
//             <li className={this.props.showDownloadArea?"dropdown ":"dropdown open"} >
//                 <a href="#" 
//                     className="dropdown-toggle" 
//                     data-toggle="dropdown" 
//                     role="button" 
//               onClick={() => this.props.onDownloadAreaClick()}
//                 >
//                     Dropdown <span className="caret"></span>
//                 </a>
//                 <ul className="dropdown-menu">
//                 <li><a href="#">Action</a></li>
//                 <li><a href="#">Another action</a></li>
//                 <li><a href="#">Something else here</a></li>
//                 <li role="separator" className="divider"></li>
//                 <li><a href="#">Separated link</a></li>
//                 </ul>
//             </li>
//             </ul>
//         </div>

//         </div>
//         <div className="center-block title">
//         <sapn>标题标题</sapn>
//         </div>
        
//       </div>
//     </nav>

//     );
//   }
// }