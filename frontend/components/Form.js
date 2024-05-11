import React from 'react'

class Form extends React.Component {
  render() {
    return (
      <>
        <form id='todoForm' onSubmit={this.props.formSubmit}>
          <input
            onChange={this.props.nameInputChange}
            type='text'
            placeholder='Type Todo'
            value={this.props.todoNameInput} />
          <input type='submit'></input>
        </form>
        <button onClick={this.props.hideCompleted}>{this.props.displayCompleted ? "Hide" : 'Show'} Completed</button>
      </>
    )
  }
}
export default Form;