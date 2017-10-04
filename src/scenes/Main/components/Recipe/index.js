import React, { PureComponent } from 'react';

const isValid = (string) => {
  const pattern = /^[a-zA-Z0-9,\.\-\/:\(\)]*$/
  return pattern.test(string)
}


class Recipe extends PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      name: props.recipe.name,
      description: props.recipe.description,
    }
  }
  handleLike = () => {
    this.props.like(this.props.recipe)
  }
  handleDislike = () => {
    this.props.dislike(this.props.recipe)
  }

  handleDescription = (ev) => {
    this.setState({description: ev.target.value})
  }

  handleName = (ev) => {
    this.setState({name: ev.target.value})
  }

  handleInputs = () => {
    const { name, description } = this.state;
    this.props.edit(Object.assign(
      this.props.recipe,
      {
        name,
        description,
      }
    ))
  }

  render() {
    const { recipe, like, dislike } = this.props;
    const { name, description } = this.state;
    return (
      <div>
        <div>name: {recipe.name}
          <input type="text" onChange={this.handleName} value={name}/>
          {!isValid(name) && 'input is not valid'}
        </div>
        <div>description: {recipe.description}
          <input type="text" onChange={this.handleDescription} value={description}/>
          {!isValid(description) && 'input is not valid'}
        </div>
        <div>likes: {recipe.likes}</div>
        <button
          disabled={!isValid(name) || !isValid(description)}
          onClick={this.handleInputs}
        >
          update stuff in inputs
        </button>
        <button onClick={this.handleLike}>+</button>
        <button onClick={this.handleDislike}>-</button>
        <hr/>
      </div>
    )
  }
}

export default Recipe;