import R from 'ramda';
import { createSelector } from 'reselect';
import * as actions from './actions';

const initialState = {
  data: null,
  phase: 'init',
  error: null,
};

function mainReducer(state = initialState, action) {
  switch(action.type) {
    case actions.FETCH_DATA:
      return R.compose(
        R.assoc('phase', 'loading'),
        R.assoc('error', null),
        R.assoc('data', null),
      )(state)

    case actions.FETCH_SUCCESS:
      return R.compose(
        R.assoc('phase', 'success'),
        R.assoc('data', action.payload.data.data),
        R.assoc('error', null),
      )(state)

    case actions.FETCH_ERROR:
      return R.compose(
        R.assoc('phase', 'error'),
        R.assoc('data', null),
        R.assoc('error', action.payload.error),
      )(state)

    case actions.EDIT:
      return R.assoc('phase', 'loading', state);

    case actions.EDIT_SUCCESS:
    return R.compose(
      R.over(R.lensProp('data'), R.map(recipe => {
        // ugly as fuck
        if (recipe.id === action.payload.id) {
          return action.payload;
        }
        return recipe;
      })),
      R.assoc('phase', 'success'),
    )(state)

    case actions.EDIT_ERROR:
    return R.compose(
      R.assoc('error', action.payload.error),
      R.assoc('phase', 'error'),
    )(state)

    default:
      return state
  }
}

const mainState = state => state.main;

export const isInit = createSelector(mainState, R.propEq('phase', 'init'));
export const isLoading= createSelector(mainState, R.propEq('phase', 'loading'));
export const isLoaded = createSelector(mainState, R.propEq('phase', 'success'));
export const isError = createSelector(mainState, R.propEq('phase', 'error'));

export const getData = createSelector(
  mainState,
  R.prop('data'),
);

export const getError = createSelector(
  mainState,
  R.prop('error'),
);

export default mainReducer;