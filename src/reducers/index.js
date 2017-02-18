import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import currentUri from './currentUri'
import showDownloadArea from './header'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  currentUri,
  showDownloadArea,
})

export default todoApp
