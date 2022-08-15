import { useState, useEffect } from 'react'

import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import SuccessMessage from './components/SuccessMessage'
import ErrorMessage from './components/ErrorMessage'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

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
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with a new one?`
        )
      ) {
        const personToUpdate = persons.find(
          (p) => p.name.toLowerCase() === newName.toLowerCase()
        )
        const updatedPerson = { ...personToUpdate, number: newNumber }

        personService
          .updatePhone(updatedPerson.id, updatedPerson)
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== updatedPerson.id ? person : updatedPerson
              )
            )

            setSuccessMsg(`Updated ${updatedPerson.name}'s number`)
            setTimeout(() => {
              setSuccessMsg(null)
            }, 5000)
          })
          .catch((error) => {
            setErrorMsg(
              `Information of ${updatedPerson.name} has already been removed from the server`
            )
            setTimeout(() => {
              setErrorMsg(null)
            }, 5000)

            setPersons(persons.filter((person) => person.id !== updatedPerson.id))
          })
      }
    } else {
      const newContact = { name: newName, number: newNumber }
      personService.create(newContact).then((response) => {
        setPersons([...persons, response.data])
        setSuccessMsg(`Added ${response.data.name}`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      })
    }

    setNewName('')
    setNewNumber('')
  }

  const deleteNameHandler = (id) => {
    const personToDelete = persons.find((p) => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      personService.deleteItem(id).then((response) => {
        console.log(response)
        setPersons(persons.filter((p) => p.id !== id))

        // SHOW SUCCESSFUL MESSAGE

        setSuccessMsg(`Deleted ${personToDelete.name} from database`)
        setTimeout(() => {
          setSuccessMsg(null)
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMsg} />
      <ErrorMessage message={errorMsg} />

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
