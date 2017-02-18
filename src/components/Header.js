import React, { PropTypes } from 'react'

const Header = ({showDownloadArea, onDownloadAreaClick}) => (
  
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
                    onClick={() => onDownloadAreaClick()}
        //             onClick={e => {
        // e.preventDefault()
        // onDownloadAreaClick()}}
                >
                    下载区域 <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
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