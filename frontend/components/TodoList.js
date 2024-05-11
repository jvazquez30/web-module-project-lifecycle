import React from 'react'
import Todo from './Todo';

class TodoList extends React.Component {
  render() {
    return (
      <div id="todos">
        <h2>Todos:</h2>
        {
          this.props.todos.reduce((acc, td) => {
            if (this.props.displayCompleted || !td.completed) 
              return acc.concat(
              <Todo 
              toggleComplete={this.props.toggleComplete}
              todo={td}
              key={td.id}
              />
            )
           return acc
          },[])
        }
        
      </div>
    )
  }
}
export default TodoList;