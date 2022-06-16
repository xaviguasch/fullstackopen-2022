import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const checkRepeats = (formName) =>
    persons.some((p) => p.name.toLowerCase() === formName.toLowerCase())

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterText(event.target.value)
  }

  const addNameHandler = (event) => {
    event.preventDefault()

    if (checkRepeats(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons([
        ...persons,
        { name: newName, number: newNumber, id: persons.length + 1 },
      ])
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterText={filterText} onHandleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      <PersonForm
        onAddNameHandler={addNameHandler}
        onHandleNameChange={handleNameChange}
        onHandleNumberChange={handleNumberChange}
        onNewName={newName}
        onNewNumber={newNumber}
      />

      <h3>Numbers</h3>

      <Persons onPersons={persons} onFilterText={filterText} />
    </div>
  )
}

export default App
