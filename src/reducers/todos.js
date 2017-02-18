const todo = (state, action) => {


  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false,
        uri:  action.uri
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        state.completed = false
        return state 
      }

      return {
        ...state,
        completed: true 
      }
    default:
      return state
  }
}

const todos = (state = [], action) => {
  
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos

