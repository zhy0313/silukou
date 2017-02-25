let nextTodoId = 6 // 先这样，预定义的那几个的加入，所以要防止键的重复
export const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})

export const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

//要把这个代码给给掉了，变成setCurrentPage 设置当前的激活的页面
export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',  
  id
})

export const showDownloadArea = {
  type: 'SHOW_DOWNLOAD_AREA'
}


//选择切换数据源
//@para string name 数据源名称代码
export const changeDataSource = ( name) => ({
  type: 'CHANGE_DATA_SOURCE',  
  name
})

//获取股票列表，这里应该是一个异步的操作


//获取指定的股票数据，这里也是应该一个异步的操作