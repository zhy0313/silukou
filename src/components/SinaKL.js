import React from 'react'


// class DownloadCenter extends React.Component {
class SinaKL extends React.Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){
        hq.init();
    }
    render() {
        
        return (
            <div className="wrap main_wrap clearfix">
                <div className="R">
                    <div className="block_hq clearfix">
                        <div className="hq_L">
                            <div className="hq_details has_limit" id="hq">
                                格力电器
                            </div>
                            <div id="h5Container" style={{display: 'block' }}>
                                <div className="wrapflash">
                                    <div className="flash fs_full" style={{position: 'relative' }} id="h5Figure">
                                        <div className="h5_lv1_added_con">
                                            <a className="h5_lv1_added_img h5_lv1_added_shadd" id="h5Lv1added">对比深指</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
};

export default SinaKL;
