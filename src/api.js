import axios from 'axios'

const API = axios.create({
  baseURL: 'https://69f8a1e0f7044aa0103e3165.mockapi.io'
})

// GET all employees
export const getAllEmployees = () => API.get('/employees')

// POST - create new employee
export const createEmployee = (data) => API.post('/employees', data)

// PUT - update existing employee
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data)

// DELETE - delete employee
export const deleteEmployee = (id) => API.delete(`/employees/${id}`)
