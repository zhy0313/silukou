
//头部Header区域需要的状态就以这里为节点

const showDownloadArea = (showDownloadArea = false, action) => {
    if(action.type == 'SHOW_DOWNLOAD_AREA'){
        return !showDownloadArea
    }
    return showDownloadArea
}


export default showDownloadArea
