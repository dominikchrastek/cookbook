const API_URL = 'http://localhost:3000'

function errorHandler(res) {
  if (!res.ok) {
    return res.json().then(body => Promise.reject(body.error));
  }
  return res;
}

export function getData() {
  return fetch(`${API_URL}/recipe/`)
    .then(errorHandler)
    .then(res => res.json())
    .then(res => res)
}
export function putRecipe(data) {
  return fetch(`${API_URL}/recipe/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
    .then(errorHandler)
    .then(res => res.json())
    .then(res => res)
}