import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text,uri }) => (
  <li
    onClick={onClick}
    // style={{
    //   textDecoration: completed ? 'line-through' : 'none'
    // }}
    className={ completed ? 'active' : ''}
  >
    <a>
    {text}
    </a>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
