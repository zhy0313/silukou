import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import currentUri from './currentUri'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  currentUri
})

export default todoApp
