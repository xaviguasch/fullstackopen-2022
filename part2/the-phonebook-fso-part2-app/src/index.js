import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
console.log(promise)

promise.then((response) => {
  console.log(response)
})

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
