import { useState, useEffect } from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import personService from './services/persons'

import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data)
    })
  }, [])

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
      const newContact = { name: newName, number: newNumber }

      personService
        .create(newContact)
        .then((response) => setPersons([...persons, response.data]))
    }

    setNewName('')
    setNewNumber('')
  }

  const deleteNameHandler = (id) => {
    const personToDelete = persons.find((p) => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService.deleteItem(id).then((response) => console.log(response))

      setPersons(persons.filter((p) => p.id !== id))
    }
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

      <Persons
        onPersons={persons}
        onFilterText={filterText}
        onDeleteNameHandler={deleteNameHandler}
      />
    </div>
  )
}

export default App
