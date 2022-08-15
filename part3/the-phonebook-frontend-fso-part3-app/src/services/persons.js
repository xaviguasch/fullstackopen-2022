/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = (newContact) => {
  return axios.post(baseUrl, newContact)
}

const deleteItem = (id) => {
  return axios.delete(`${baseUrl}/${id}`, id)
}

const updatePhone = (id, changedContact) => {
  return axios.put(`${baseUrl}/${id}`, changedContact)
}

export default {
  getAll,
  create,
  deleteItem,
  updatePhone,
}
