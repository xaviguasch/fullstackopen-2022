/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newContact) => {
  return axios.post(baseUrl, newContact)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`, id)
}

export default {
  getAll,
  create,
  deleteItem,
}
