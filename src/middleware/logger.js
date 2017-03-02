
// 这个测试用的middleware已经经过测试，我已经表示理解了

/**
 * 这里这个只是一个样例的示范
 * 这个样例是用于记录事件操作的
 */

export default store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}