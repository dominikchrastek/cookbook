import React, { Component } from 'react'
import R from 'ramda';
import Styled, { keyframes } from 'styled-components'
import { connect } from 'react-redux'
import * as actions from './services/actions'
import * as selectors from './services/'
import Recipe from './components/Recipe/';


const animation = keyframes`
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg)
  }
`

const Animated = Styled.button`
position: relative;
top: 300px;
animation: ${animation} 4s linear infinite;
`

class Main extends Component {

  componentWillMount() {
    this.props.fetch()
  }

  like = (recipe) => {
    this.props.editRecipe(Object.assign(recipe, { likes: recipe.likes + 1}))
  }

  dislike = (recipe) => {
    this.props.editRecipe(Object.assign(recipe, { likes: recipe.likes - 1}))
  }

  editInputs = (recipe) => {
    this.props.editRecipe(recipe)
  }

  handleErrorRequest = (recipe) => {
    this.props.editRecipe({ 
      id: 123123,
      name: 'kek',
      description: 'bur',
      likes: 1,
     })
  }

  render() {
    const { recipes, isLoaded, isError, isLoading, isInit, editRecipe, error } = this.props;
    if (isError) {
      return <span>{error.toString()}</span>
    }

    if (!isLoaded) {
      return <span>Loading</span>
    }

    return (
      <div>
        {R.map(recipe => (
          <Recipe
            key={recipe.id}
            recipe={recipe}
            like={this.like}
            dislike={this.dislike}
            edit={this.editInputs}
          />
        ), recipes)}
        <Animated onClick={() => {this.handleErrorRequest()}}>
          send error request
        </Animated>
      </div>
    )
  }
}


export default connect(state => ({
  recipes: selectors.getData(state),
  isInit: selectors.isInit(state),
  isLoading: selectors.isLoading(state),
  isLoaded: selectors.isLoaded(state),
  isError: selectors.isError(state),
  error: selectors.getError(state),
}), {
  fetch: actions.fetchData,
  editRecipe: actions.editRecipe,
})(Main)