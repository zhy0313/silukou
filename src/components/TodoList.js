import React, { PropTypes } from 'react'
import Todo from './Todo'
import { addTodo } from '../actions'



export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {};
    // this.store = context.store;
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
  }

  render() {
    return (
      <ul>
        <li>中间线</li>
        {this.props.todos.map(todo =>
          <Todo
            {...todo}
            key={todo.id}
            onClick={() => this.props.onTodoClick(todo.id)}
          />
        )}
      </ul>
    );
  }
}

// const TodoList = ({ todos, onTodoClick }) => (
//   <ul>

//     <li>中间线</li>
//     {todos.map(todo =>
//       <Todo
//         {...todo}
//         key={todo.id}
//         onClick={() => onTodoClick(todo.id)}
//       />
//     )}
//   </ul>
// )

// TodoList.propTypes = {
//   todos: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     completed: PropTypes.bool.isRequired,
//     text: PropTypes.string.isRequired
//   }).isRequired).isRequired,
//   onTodoClick: PropTypes.func.isRequired
// }

// export default TodoList
