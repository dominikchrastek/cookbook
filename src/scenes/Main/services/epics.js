import { combineEpics } from 'redux-observable';
// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as api from './api';
import * as actions from './actions';


const fetchDataEpic = (action$) =>
  action$
    .filter(({ type }) => type === actions.FETCH_DATA)
    .flatMap(() =>
      api
        .getData()
        .then((data) => ({
          type: actions.FETCH_SUCCESS,
          payload: { data },
        }))
        .catch(error => ({
          type: actions.FETCH_ERROR,
          payload: { error },
        })),
    );
  const editEpic = action$ =>
    action$
      .filter(action => action.type === actions.EDIT)
      .flatMap(action => (
        api
          .putRecipe(action.payload.data)
          .then(() => ({
            type: actions.EDIT_SUCCESS,
            payload: action.payload.data,
          }))
          .catch(error => ({
            type: actions.EDIT_ERROR,
            payload: { error },
          }))
      ));
export default combineEpics(
  fetchDataEpic,
  editEpic,
);
