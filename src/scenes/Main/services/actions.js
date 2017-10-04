export const FETCH_DATA = 'main/FETCH_DATA';
export const FETCH_SUCCESS = 'main/FETCH_SUCCESS';
export const FETCH_ERROR = 'main/FETCH_ERROR';

export const EDIT = 'main/EDIT';
export const EDIT_SUCCESS = 'main/EDIT_SUCCESS';
export const EDIT_ERROR = 'main/EDIT_ERROR';


export const fetchData = () => ({
  type: FETCH_DATA,
});

export const editRecipe = (data) => ({
  type: EDIT,
  payload: { data },
});