import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'
import currentUri from './currentUri'
import showDownloadArea from './header'
import data from './data'

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  currentUri,
  showDownloadArea,
  data
})

export default todoApp
