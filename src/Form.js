import React, {Component} from 'react'

class Form extends Component {
  initialState = {
    name: '',
    id: '',
  }

  state = this.initialState

  render() {
    const { name, id } = this.state;

    return (
      <form onSubmit={this.submitForm}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={this.handleChange} />
        </p>

        <p>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            id="id"
            required
            value={id}
            onChange={this.handleChange} />
        </p>

        <p>
          <button>Add</button>
        </p>
      </form>
    );
  }

  handleChange = (event) => {
    console.log(event.target)
    const {name, value} = event.target

    this.setState({
      [name]: value,
    })
  }

  submitForm = (event) => {
    console.log('form', event)
    event.preventDefault()
    this.props.handleSubmit(this.state)
    this.setState(this.initialState)
  }
}



export default Form;
