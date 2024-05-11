import React from 'react'
import TodoList from './TodoList';
import Form from './Form';
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

class App extends React.Component {
  constructor() {
    console.log('constructor here')
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleted: true
    }
  }
  nameInputChange = evt => {
    const { value } = evt.target
    this.setState({ ...this.state, todoNameInput: value })

  }

  resetForm = () => this.setState({ ...this.state, todoNameInput: '' })

  setAxiosErrResponse = err => this.setState({ ...this.state, error: err.response.data.message}) 

  addNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
      .then(res => {
        this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
        this.resetForm()
      })
      .catch(this.setAxiosErrResponse)
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.addNewTodo()
  }

  getTodos = () => {
    axios.get(URL)
      .then(res => {
        this.setState({ ...this.state, todos: res.data.data })
      })
      .catch(this.setAxiosErrResponse)
  }

  toggleComplete = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({
          ...this.state, todos: this.state.todos.map(td => {
            if (td.id !== id) return td
            return res.data.data
          })
        })
      })
      .catch(err => {
        this.setState({ ...this.state, error: err.response.data.message })
      })
  }

  hideCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted})
  }

  componentDidMount() {
    this.getTodos()
  }


  render() {
    return (
      <div>
        <TodoList 
        todos={this.state.todos}
        toggleComplete={this.toggleComplete}
        displayCompleted={this.state.displayCompleted}
         />
        <Form
          todoNameInput={this.state.todoNameInput}
          formSubmit={this.formSubmit}
          nameInputChange={this.nameInputChange}
          hideCompleted={this.hideCompleted}
          displayCompleted={this.state.displayCompleted} />


      </div>
    )
  }
}
export default App;
