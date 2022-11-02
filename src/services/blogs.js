import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log('createn newObject:', newObject)
  const config = {
    headers: { Authorization: token },
  }
  console.log('createn config:', config)
  const response = await axios.post(baseUrl, newObject, config)
  console.log('createn response:', response)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject) // huom! välilyönti _/id
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${ baseUrl }/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, setToken }