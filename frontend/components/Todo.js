import React from 'react'

class Todo extends React.Component {
  render() {
    return (
      <div
        onClick={this.props.toggleComplete(this.props.todo.id)}
        
      >
        {this.props.todo.name}{this.props.todo.completed ? "✔️" : ''}
      </div>
    )
  }
}
export default Todo;