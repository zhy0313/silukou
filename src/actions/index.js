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